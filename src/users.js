const fs = require("fs");
const path = require("path");
const readline = require("readline");

const DELIMITER = process.env.DELIMITER || "|";
const FILE_PATH = process.env.FILE_PATH || "../users.txt";

exports.read = async () =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(path.join(__dirname, FILE_PATH))
    });

    const toInactive = [];

    rl.on("line", line => {
      const [ip, user] = line.split(DELIMITER);
      toInactive.push({ ip, user });
    });

    rl.on("close", () => {
      resolve(toInactive);
    });
  });
