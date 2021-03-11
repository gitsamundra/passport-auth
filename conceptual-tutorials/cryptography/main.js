const encryptWithPublicKey = require('./encrypt');
const fs = require('fs');
const decryptWithPrivateKey = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

// Stores a Buffer object
const encryptedMessage = encryptWithPublicKey(publicKey, 'super secret message');

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());