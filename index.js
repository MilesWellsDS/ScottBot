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

//get a business language string
function getBusinessString() {
    var Scott = 'Scott says to '; //instantiate phrase
    Scott += buildBusinessString(false) + '.';
    return Scott;
}

//get a list of 3-5 business language strings.
function getTodoList() {
    var numitems = Math.floor(Math.random() * 3) + 3; //Random number of items between 3-5
    var Scott = 'Scott would like you to integrate these dynamic opportunities:\n';
    for(var i = 0; i < numitems; i++) {
        Scott += (i + 1) + ') ' + buildBusinessString(true) + '.\n';
    }

    return Scott;
}

//builds the business language string.
//if caps is true, then the first letter of the string will be capitalized.
function buildBusinessString(caps) {
    var str = '';
    if(caps)
        str += adverbs[Math.floor(Math.random() * adverbs.length)].capitalizeFirstLetter() + ' '; //add adverb and space to phrase
    else
        str += adverbs[Math.floor(Math.random() * adverbs.length)] + ' '; //add adverb and space to phrase
    str += verbs[Math.floor(Math.random() * verbs.length)] + ' '; //add verb and space to phrase
    str += adjectives[Math.floor(Math.random() * adjectives.length)] + ' '; //add adjective and space to phrase
    str += nouns[Math.floor(Math.random() * nouns.length)]; //add noun to phrase
    return str;
}

//capitalizes the first character in a string.
//taken from Steve Harrison http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}