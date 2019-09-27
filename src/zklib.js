const ZKLib = require("zklib");
const { promisify } = require("util");

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

exports.removeUser = async ({ user, ip }) => {
  const zk = new ZKLib({
    ip,
    port: 4370,
    inport: 5200,
    timeout: 1000
  });

  zk.connectAsync = promisify(zk.connect).bind(zk);
  await zk.connectAsync();

  zk.delUserAsync = promisify(zk.delUser).bind(zk);

  return zk.delUserAsync(user);
};

exports.removeUsers = async args => {
  const result = [];
  for (let i = 0, l = args.length; i < l; i += 1) {
    try {
      result.push(await exports.removeUser(args[i]));
    } catch (e) {
      result.push(e);
    }
    await sleep();
  }
  return result;
};
