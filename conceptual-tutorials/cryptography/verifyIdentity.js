const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

// This is the data that we are receiving from sender.
const packageOfDataToSend = require('./signMessage');

const hash = crypto.createHash(packageOfDataToSend.algorithm);

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, packageOfDataToSend.signedAndEncryptedData);

const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(packageOfDataToSend.originalData));
const hashOfOriginalHex = hash.digest('hex');

if(hashOfOriginalHex === decryptedMessageHex) {
  console.log('Success! The data has not been tempered with and the sender is valid');
} else {
  console.log('Uh oh...! Someone is trying to manipulate the data or someone else is ...');
};

