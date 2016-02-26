'use strict';

const Hapi = require('hapi');

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
	var pun = getPun();
        return reply({
    "color": "green",
    "message": pun,
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

var puns = [
  "1. Time flies like an arrow. Fruit flies like a banana.",  "2. Show me a piano falling down a mineshaft and I'll show you A-flat minor.",  "3. To write with a broken pencil is pointless.",  "4. A bicycle can't stand on its own because it is two-tired.",  "5. Those who get too big for their britches will be exposed in the end.",  "6. When a clock is hungry it goes back four seconds.",  "7. A chicken crossing the road is poultry in motion.",  "8. If you don't pay your exorcist you get repossessed.",  "9. What's the definition of a will? It's a dead giveaway.",
  "10. The man who fell into an upholstery machine is fully recovered.",  "11. Every calendar's days are numbered.",  "12. Bakers trade bread recipes on a knead to know basis.",  "13. When the electricity went off during a storm at a school the students were de-lighted.",  "14. I used to be a tap dancer until I fell in the sink.",  "15. He wears glasses during math because it improves division.",
    "16. She was only a whisky maker but he loved her still.",  "17. She had a boyfriend with a wooden leg, but broke it off.",  "18. Those who jump off a Paris bridge are in Seine.",  "19. It wasn't school John disliked it was just the principal of it.",  "20. It's better to love a short girl than not a tall.",  "21. There was once a cross-eyed teacher who couldn't control his  pupils.",  "22. A grenade thrown into a kitchen in France would result in Linoleum Blownapart.",
     "23. A boiled egg in the morning is hard to beat.",  "24. The one who invented the door knocker got a No-bell prize.",  "25. Old power plant workers never die they just de-generate.",  "26. There was a ghost at the hotel, so they called for an inn spectre.",  "27. With her marriage she got a new name and a dress.",  "28. The short fortune-teller who escaped from prison was a small medium at large",  "29. Some Spanish government employees are Seville servants.",
     "30. He drove his expensive car into a tree and found out how the Mercedes bends.",  "31. Show me someone in denial and I'll show you a person in Egypt up to their ankles.",  "32. Two peanuts were walking in a tough neighborhood and one of them was a-salted.",  "33. When cannibals ate a missionary they got a taste of religion.",  "34. When an actress saw her first strands of gray hair she thought she'd dye.",  "35. He often broke into song because he couldn't find the key.",  "36. Marathon runners with bad footwear suffer the agony of defeat.",
     "37. Driving on so many turnpikes was taking its toll.",  "38. To some - marriage is a word ... to others - a sentence.",  "39. Old lawyers never die they just lose their appeal.",  "40. In democracy its your vote that counts. In feudalism its your count that votes.",  "41. Atheism is a non-prophet organization",  "42. It was an emotional wedding. Even the cake was in tiers.",  "43. Old skiers never die -- they just go down hill.",  "44. A cardboard belt would be a waist of paper.",  "45. Local Area Network in Australia: the LAN down under.",
     "46. When the TV repairman got married the reception was excellent.",  "47. An office with many people and few electrical outlets could be in for a power struggle.",  "48. How do you make antifreeze? Steal her blanket.",  "49. A small boy swallowed some coins and was taken to a hospital. When his grandmother telephoned to ask how he was a nurse said 'No change yet'.",
     "50. A pediatrician is a doctor of little patients.",  "51. Nylons give women a run for their money.",  "52. Talking to her about computer hardware I make my mother board.",  "53. Ancient orators tended to Babylon.",  "54. The best way to stop a charging bull is to take away his credit card.",  "55. If you give some managers an inch they think they're a ruler.",  "56. Two silk worms had a race. They ended up in a tie.",
      "57. He had a photographic memory that was never developed.",  "58. Old burglars never die they just steal away.",  "59. A lawyer for a church did some cross-examining.",  "60. Chronic illegal parkers suffer from parking zones disease.",  "61. Some people don't like food going to waist..",  "62. A cannibal's favourite game is 'swallow the leader'.",  "63. You feel stuck with your debt if you can't budge it.",  "64. Girls who don't get asked out as often as their friends could feel out-dated.",  "65. We were so poor when I was growing up we couldn't even afford to pay attention. ",  "66. A pet store had a bird contest with no perches necessary.",  "67. A backwards poet writes inverse.",
       "68. If a lawyer can be disbarred can a musician be denoted or a model deposed?",  "69. Once you've seen one shopping center you've seen a mall.",  "70. When the smog lifts in Los Angeles, U C L A.",  "71. A plateau is a high form of flattery.",  "72. When chemists die, we barium.",  "73. A long knife has been invented that cuts four loaves of bread at a time called a four loaf cleaver.",  "74. When the wheel was invented, it caused a revolution.",  "75. Two robbers with clubs went golfing, but they didn't play the fairway.",  "76. Seven days without a pun makes one weak.",
       "77. A circus lion won't eat clowns because they taste funny.",  "78. A toothless termite walked into a tavern and said, Is the bar tender here?",  "79. Did you hear about the fire at the circus? The heat was intense.",  "80. A tattoo artist has designs on his clients.",  "81. Santa's helpers are subordinate clauses.",  "82. A lot of money is tainted. It taint yours and it taint mine.",  "83. When they bought a water bed, the couple started to drift apart.",  "84. What you seize is what you get.",
        "85. Gardeners always know the ground rules.",  "86. Some people's noses and feet are build backwards: their feet smell and their noses run.",  "87. Two banks with different rates have a conflict of interest.",  "88. A successful diet is the triumph of mind over platter.",  "89. What do you call cheese that is not yours? Nacho Cheese.",  "90. When a new hive is done bees have a house swarming party.",  "91. Looting a drugstore is called Pillaging",  "92. Never lie to an x-ray technician. They can see right through you.",  "93. Old programmers never die, they just can't C as well.",
         "94. A music store had a small sign which read: Bach in a Minuet.",  "95. Long fairy tales have a tendency to dragon.",  "96. Visitors to Cuba are usually Havana good time.",  "97. A bachelor is a guy who is footloose and fiancée-free.",  "98. A ditch digger was entrenched in his career.",  "99. A girl and her boyfriend went to a party as a barcode. They were an item.",  "100. A criminal's best asset is his lie ability."];
function getPun(){
   var index = Math.floor(Math.random() * puns.length) + 1;
   return puns[index];
}
