const crypto = require('crypto');

const encryptWithPublicKey = (publicKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf8');

  return crypto.publicEncrypt(publicKey, bufferMessage);
};

const encryptWithPrivateKey = (privateKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf8');

  return crypto.privateEncrypt(privateKey, bufferMessage);
};

module.exports ={ 
  encryptWithPublicKey,
  encryptWithPrivateKey
};