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

// Add the route for a simple phrase
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

// Add the route for a to do list
server.route({
    method: 'POST',
    path:'/scottbottodo',
    handler: function (request, reply) {
        return reply({
            "color": "green",
            "message": getTodoList(),
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

function getBusinessString() {
    var Scott = 'Scott says to '; //instantiate phrase
    Scott += buildBusinessString() + '.';
    return Scott;
}

function getTodoList() {
    var numitems = Math.floor(Math.random() * 3) + 3; //Random number of items between 3-5
    var Scott = 'Scott would like you to integrate these dynamic opportunities:\n';
    for(var i = 0; i < numItems; i++) {
        Scott += (i + 1) + ') ' + buildBusinessString() + '.\n';
    }

    return Scott;
}

function buildBusinessString() {
    var str = '';
    str += adverbs[Math.floor(Math.random() * adverbs.length) + 1] + ' '; //add adverb and space to phrase
    str += verbs[Math.floor(Math.random() * verbs.length) + 1] + ' '; //add verb and space to phrase
    str += adjectives[Math.floor(Math.random() * adjectives.length) + 1] + ' '; //add adjective and space to phrase
    str += nouns[Math.floor(Math.random() * nouns.length) + 1]; //add noun to phrase
    return str;
}