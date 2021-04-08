const argv = process.argv.slice(2)

const json = require('./' + argv[0])

const { host } = json.nmaprun

console.info(host[0])
