// =======================================================================================
// Nom : VANBLEUS
// Prénom : Allan
// EPSI : I4
// =======================================================================================

// =======================================================================================
// Chargement de Redis
var Redis = require('ioredis');

// Déclaration du Subscriber
var sub = new Redis();

// Déclaration du Publisher
var pub = new Redis();

// Déclaration des variables de travail
var names = ['Cheval fougueux', 'Loutre timide', 'Zèbre blanc', 'Flamant rose']
var name = '';
// =======================================================================================



// =======================================================================================
// Utils
function prompt(message, callback) {
    process.stdin.resume();
    if (message && message !== '') {
    	process.stdout.write(message);
    }
    if (callback) {
	    process.stdin.on('data', function (data) {
	        callback(data.toString().trim());
	    });
    }
}
// =======================================================================================



// =======================================================================================
// Abonnement au chat
sub.subscribe('chat', function (err, count) {});
sub.on('message', function (channel, jsonString) {
  	var json = JSON.parse(jsonString);
  	if (json.name === name) {
  		process.stdout.write('You : ' + json.text + '\n');
  	}
  	else {
  		process.stdout.write(json.name + ' : ' + json.text + '\n');
  	}
});
// =======================================================================================



// =======================================================================================
// Gestion de l'envoi des messages
name = names[Math.floor(Math.random()*names.length)];
prompt('Welcome, you are ' + name + '\n', function(key) {
	if (key === '\u0003') {
		process.exit();
	}
	
	// Publishing a message on chat
	pub.publish('chat', JSON.stringify({ name: name, text: key }));
});
// =======================================================================================