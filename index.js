'use strict';

const Hapi = require('hapi');
const adjectives = require('./words/adjectives');
const adverbs = require('./words/adverbs');
const nouns = require('./words/nouns');
const verbs = require('./words/verbs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 5000
});

// Add the route
server.route({
    method: 'POST',
    path:'/scottbot',
    handler: function (request, reply) {
      return reply({
          "color": "green",
          "message": getBusinessString(),
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

function getBusinessString(){
    var phrase = ''; //instantiate phrase
    phrase += adverbs[Math.floor(Math.random() * adverbs.length) + 1] + ' '; //add adverb and space to phrase
    phrase += verbs[Math.floor(Math.random() * verbs.length) + 1] + ' '; //add verb and space to phrase
    phrase += adjectives[Math.floor(Math.random() * adjectives.length) + 1] + ' '; //add adjective and space to phrase
    phrase += nouns[Math.floor(Math.random() * nouns.length) + 1]; //add noun to phrase
    return phrase;
}
