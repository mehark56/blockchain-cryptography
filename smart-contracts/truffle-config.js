module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // (or 5777 if you prefer a specific network id)
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
}; 