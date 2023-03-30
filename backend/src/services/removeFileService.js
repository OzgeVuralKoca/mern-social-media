const fs = require("fs");

const removeFile = (file) => {
  if (file != undefined) {
    fs.unlink(file.path, () => {});
  }
};

module.exports = removeFile;