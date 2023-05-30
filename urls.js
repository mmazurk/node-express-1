const fs = require("fs");
const axios = require("axios");

function writeFile(url, data) {
  console.log("Wrote file", url);
  const newURL = new URL(url);
  const urlHost = newURL.host.replace(/[:/]/g, "_");
  fs.writeFile(urlHost, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getData(url) {
  axios
    .get(url)
    .then(function (response) {
      // handle success
      writeFile(url, response.data);
    })
    .catch(function () {
      // handle error
      console.log(`Couldn't download ${url}`);
    });
}

function readFile(path, encoding = "utf8", callback) {
  if (!path || typeof path !== "string") {
    const error = new Error("Invalid path");
    callback(error, null);
    return;
  }

  fs.readFile(path, encoding, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}

function main() {
  if (process.argv.length > 2) {
    const filename = process.argv[2];
    readFile(filename, "utf8", (error, data) => {
      if (!error) {
        const urls = data.split("\n");
        for (let i = 0; i < urls.length; i++) {
          if (urls[i]) {
            getData(urls[i]);
          }
        }
      } else {
        console.log("Error reading file: ", error);
      }
    });
  } else {
    console.log("No filename entered!");
  }
}

main();

// read arguments
// readFile
// getURL
// writeFile
