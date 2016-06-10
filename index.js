'use strict';

const Hapi = require('hapi');
const adjectives = require('./words/adjectives');
const adverbs = require('./words/adverbs');
const nouns = require('./words/nouns');
const verbs = require('./words/verbs');
const ingverbs = require('./words/ingverbs');
const groupings = require('./words/groupings');
const insultChance = 10;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 5000
});

//10% chance of insulting whoever is requesting scottbot
server.ext('onPreHandler', function(request, reply) {
    var odds = Math.random() * 100;
    if(odds <= insultChance) {
        //return reply(getInsult(request, odds));
        return reply({
            "color": "green",
            "message": getInsult(request, odds),
            "notify": false,
            "message_format": "text"
        });
    }
    return reply.continue();
});

// Add the route
server.route({
    method: 'POST',
    path:'/scottbot',
    config: {
        handler: function (request, reply) {
            var requestMessage = request.payload.item.message.message; //get user command from payload
            var replyMessage = '';

            //if user sent "/askscott <command>" we need to handle it
            if(requestMessage.split('/askscott ').length > 1) {
                var command = requestMessage.split('/askscott ')[1]; //pull command from message
                switch(command) {
                    case "stories":
                        replyMessage = getTodoList(); //command for user stories
                        break;
                    case "speech":
                        replyMessage = getParagraph(); //command to get a paradigm shifting speech
                        break;
                    case "insult":
                        replyMessage = getInsult(request, Math.random() * insultChance); //command to get an insult
                        break;
                    default:
                        replyMessage = getBusinessString(); //unrecognized command, just send regular business string
                        break;
                }
            } else {
                replyMessage = getBusinessString(); //no extra command, just send a regular business string
            }

            return reply({
                "color": "green",
                "message": replyMessage,
                "notify": false,
                "message_format": "text"
            });
        }
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

//gets an insult to the user requesting scottbot
function getInsult(request, odds) {
    var name = request.payload.item.message.from.name;
    var message = "Scott says: ";
    if(odds <= insultChance/2)
        message += 'Get back to work, ' + name + '!';
    else
        message += 'Step off, ' + name + '!';

    return message;
}

//get a business language string
function getBusinessString() {
    var Scott = 'Scott says to '; //instantiate phrase
    Scott += buildBusinessString(false, false) + '.';
    return Scott;
}

//get a list of 3-5 business language strings as stories with story points
function getTodoList() {
    var numitems = Math.floor(Math.random() * 3) + 3; //Random number of items between 3-5
    var storyPoints = ['1/2', '1', '2', '3', '5', '8']; //Array of possible story points
    var Scott = 'Scott has assigned some stories to your squad:\n';

    //for each story, build a business string for it and assign a story point value for it
    for(var i = 0; i < numitems; i++) {
        Scott += (i + 1) + ') ' + buildBusinessString(true, false) + '. ( ' + storyPoints[Math.floor(Math.random() * storyPoints.length)] + ' )\n';
    }

    return Scott;
}

//builds a paragraph of business language using groupings.js
function getParagraph() {
    var Scott = '';
    var numsentences = Math.floor(Math.random() * 3) + 3; //random number of sentences between 3-5
    var currentGroupings = groupings.slice(); //clone groupings since we're going to remove each grouping from the list as we use it

    //for each sentence, use a grouping
    for(var i = 0; i < numsentences; i++) {
        var idx = Math.floor(Math.random() * currentGroupings.length); //index to get grouping from
        var g = currentGroupings.splice(idx, 1)[0]; //get grouping at idx and remove it from the array so we don't repeat any groupings
        Scott += g.phrase1.phrase + ' ' + buildBusinessString(false, g.phrase1.ing); //build first phrase and string with ing verb if needed
        Scott += g.phrase2.phrase + ' ' + buildBusinessString(false, g.phrase2.ing) + '. '; //build second phrase and string with ing verb if needed
    }

    return Scott;
}

//builds the business language string.
//if caps is true, then the first letter of the string will be capitalized.
function buildBusinessString(caps, ing) {
    var str = '';
    //capitalize first letter if needed
    if(caps)
        str += adverbs[Math.floor(Math.random() * adverbs.length)].capitalizeFirstLetter() + ' '; //add adverb and space to phrase
    else
        str += adverbs[Math.floor(Math.random() * adverbs.length)] + ' '; //add adverb and space to phrase

    //use ing verbs if needed
    if(ing)
        str += ingverbs[Math.floor(Math.random() * ingverbs.length)] + ' '; //add verb and space to phrase
    else
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