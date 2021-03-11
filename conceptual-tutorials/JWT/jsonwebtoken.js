const jwt = require('jsonwebtoken');
const fs = require('fs');

const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const payloadObj = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
  iat: 1516239022
};

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, {algorithm: 'RS256'});

console.log(signedJWT);

jwt.verify(signedJWT, PUB_KEY, {algorithms: ['RS256']}, (err, payload) => {
  if(err) {
    console.log(err);
  } else {
    console.log(payload);
  }
});