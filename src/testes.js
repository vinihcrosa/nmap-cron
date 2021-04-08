const argv = process.argv.slice(2);

const elasticsearch = require('./model/elasticsearch');
const json = require('./results/' + argv[0]);

function prepare_config(port, pre_config, host_data) {
  let port_data = {};
  port_data.protocol = port._attributes.protocol;
  port_data.port = port._attributes.portid;
  port_data.state = port.state._attributes.state;
  port_data.service = port.service._attributes.name;
  const data = Object.assign({}, pre_config, host_data, port_data);
  const config = {
    index: 'security',
    type: 'nmap',
    data,
  };

  return config;
}

let pre_config = {};
pre_config.startstr = json.nmaprun._attributes.startstr;
// config do elasticsearch deve ter
// index -> index do banco (security)
// type  -> tipo de dado (nmap)
// data  -> Dados a serem inseridos
const host = json.nmaprun.host;

host.forEach((element) => {
  let host_data = {};
  host_data.addr = element.address._attributes.addr;
  console.log('addr -> ', host_data.addr);
  if (Array.isArray(element.ports.port)) {
    element.ports.port.forEach((port) => {
      const config = prepare_config(port, pre_config, host_data);
      elasticsearch
        .postInstance(config)
        .then((response) => {
          console.log('ADDR -> ', config.data.addr, 'ok');
        })
        .catch((err) => {
          console.error('ADDR -> ', config.data.addr, 'not ok -> ', err);
        });
    });
  } else {
    const config = prepare_config(element.ports.port, pre_config, host_data);
    elasticsearch
      .postInstance(config)
      .then((response) => {
        console.log('ADDR -> ', config.data.addr, 'ok', config);
      })
      .catch((err) => {
        console.error('ADDR -> ', config.data.addr, 'not ok -> ', err);
      });
  }
});
