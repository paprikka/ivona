const Hapi = require('hapi');

const Ivona = require('ivona-node');
const ivona = new Ivona({
  accessKey: 'GDNAIBB2KFI5P6X5GHXA',
  secretKey: 'MM8QyTTp7dC6sEH/zmBwgaZQYdWepJ50XXuIGYSs'
});

const fs = require('fs');

const config = {
  // https: {
  //   host: '0.0.0.0',
  //   port: 3001,
  //   tls: {
  //     key: fs.readFileSync('./certs/server.key'),
  //     cert: fs.readFileSync('./certs/server.crt')
  //   }
  // },
  http: {
    host: '0.0.0.0',
    port: 3001
  }
};

const server = new Hapi.Server();

server.connection(config.http);
// server.connection(config.https);


server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    reply('pong ' + Date.now());
  }
})

server.route({
  method: 'GET',
  path: '/tts/{text}',
  handler: require('./routes/tts')(ivona)
});

server.route({
  method: 'GET',
  path: '/list',
  handler: require('./routes/list')(ivona)
});


server.start(function() {
  console.log('Server running at:', server.info.uri);
});