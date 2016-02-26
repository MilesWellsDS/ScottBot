'use strict';

const Hapi = require('hapi');
const puns = require('./puns');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 5000
});

// Add the route
server.route({
    method: 'POST',
    path:'/askgreg',
    handler: function (request, reply) {
      return reply({
          "color": "green",
          "message": getPun(),
          "notify": false,
          "message_format": "text"
      });
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

function getPun(){
   var index = Math.floor(Math.random() * puns.length) + 1;
   return puns[index];
}
