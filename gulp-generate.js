var
  through = require('through'),
  path = require('path'),
  marked = require('meta-marked'),
  fs = require('fs');

var templateName = function templateName(file) {
  return path.join(
    path.dirname(file.relative),
    path.basename(file.relative, path.extname(file.relative))
  );
};

var gulpGenerate = function gulpGenerate(options) {
  var partials = {};

  var stream = function stream(file) {
    if (file.isNull()) {
      return;
    }

    var template = marked(file.contents.toString('utf-8')),
      write = {},
      output = path.join(__dirname, 'data', options.output) + '.json',
      fileName = templateName(file);

    console.log(template.meta);

    fs.exists(output, function (exists) {
      var json = [];

      if (!exists) {
        json = [];
        template.meta.id = fileName;
        json.push(template.meta);
        fs.writeFile(output, JSON.stringify(json, null, 2), function (error) {
          return;
        });
      } else {
        var
          file = fs.readFileSync(output);

        if (file.length > 0) {
          json = JSON.parse(file.toString());
          template.meta.id = fileName;
          json.push(template.meta);
          fs.writeFileSync(output, JSON.stringify(json, null, 2));
          return;
        } else {
          return;
        }
      }
    });
  };

  var endStream = function endStream() {
    this.emit('end');
  };

  return through(stream, endStream);
};

module.exports = gulpGenerate;
