module.exports = {
  port: 3000,
  https_port: 5000,
  mongo: {
    uri: 'mongodb://localhost:27017/nodeDemoDB',
    options: {
      useMongoClient: true,
      // autoIndex: false, // Don't build indexes
      // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      // reconnectInterval: 500, // Reconnect every 500ms
      // poolSize: 10, // Maintain up to 10 socket connections.By default, poolSize is 5. 
      bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
    }
  },
  secret: 'my-demo-secret-2017',
  saltRounds: 15
}