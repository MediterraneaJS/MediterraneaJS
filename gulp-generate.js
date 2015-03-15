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
}

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

    fs.exists(output, function (exists) {
      if (!exists) {
        var json = [];
        template.meta.id = fileName;
        json.push(template.meta);
        fs.writeFile(output, JSON.stringify(json, null, 2), function (error) {
          return;
        });
      } else {
        fs.readFile(output, function (error, file) {
          var json = JSON.parse(file.toString());
          template.meta.id = fileName;
          json.push(template.meta);
          fs.writeFile(output, JSON.stringify(json, null, 2), function (error) {
            return;
          });
        });
      }
    });
  };

  var endStream = function endStream() {
    this.emit('end');
  };

  return through(stream, endStream);
};

module.exports = gulpGenerate;
