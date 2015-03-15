var
  hogan = require('hogan.js'),
  through = require('through'),
  path = require('path'),
  es = require('event-stream'),
  assets = require('./dist/mediterranea'),
  template_dir = path.resolve(__dirname, 'views'),
  gutil = require('gulp-util'),
  File = gutil.File,
  partials_dir = path.resolve(__dirname, 'partials'),
  fs = require('fs');

var compiledFile = null;

var templateName = function templateName(file) {
  return path.join(
    path.dirname(file.relative),
    path.basename(file.relative, path.extname(file.relative))
  );
};

var cache = function cache(file_path, options) {
  options = options || {};
  options.filename = file_path;

  var
    key = file_path + ':string',
    rt,
    text;

  if (options.cache && hogan.fcache[key]) {
    return hogan.fcache[key];
  }

  if (typeof file_path === 'object') {
    text = file_path.toString('utf-8');
  } else {
    text = fs.readFileSync(file_path, 'utf8');
  }

  try {
    rt = hogan.generate(hogan.parse(hogan.scan(text, options.delimiters), text, options), text, options);
  } catch (error) {
    throw new Error('Error reading template file ' + file_path + ': ' + error.message);
  }

  return options.cache ? hogan.fcache[key] = rt : rt;
};

var renderPartials = function renderPartials(partials, opt) {
  var
  name,
  partial_path,
  partial_fs_path,
  result = {};


  for (name in partials) {
    partial_path = partials[name];
    if (typeof partial_path !== 'string') {
      continue;
    }

    partial_fs_path = partial_path + '.html';
    if (!fs.existsSync(partial_path)) {
      partial_fs_path = path.join('partials', partial_path + '.html');
    }

    result[name] = cache(partial_fs_path, opt);
  }
  return result;
};

var render = function render(file, options, callback) {
  var
    p = {},
    rendered,
    partials,
    compiled_layout,
    compiled;

  compiled_layout = cache(options.layout);
  compiled = cache(file);

  for (var prop in compiled.partials) {
    p[compiled.partials[prop].name] = compiled.partials[prop].name;
  }

  partials = renderPartials(p);
  partials.yield = compiled;

  compiledFile = compiled_layout.render(assets, partials);

  return callback(compiledFile);
};

var gulpRender = function gulpRender(options) {
  var partials = {};

  return es.map(function (file, cb) {
    if (file.isNull()) {
      return;
    }

    render(file.contents, options, function (rendered) {
      file.contents = new Buffer(rendered);
      return cb(null, file);
    });
  });
};

module.exports = gulpRender;
