var https = require('https');
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router');
var app = koa();
var Q = require('q');


// **Important** Do not store these variables in the repo.
var config = {
  PORT: process.env.PORT || 3001,
  IVONA_API_KEY: process.env.IVONA_API_KEY,
  IVONA_LOGIN_EMAIL: process.env.IVONA_LOGIN_EMAIL,
  SSL_KEY: process.env.SSL_KEY,
  SSL_CERT: process.env.SSL_CERT
};

console.log('Init::config: ', config);

// Set up Ivona credentials
var ivona = new(require('ivona'))({
  email: config.IVONA_LOGIN_EMAIL,
  key: config.IVONA_API_KEY
});

// HTTPS is required by [Sulik](https://github.com/paprikka/sulik):
var httpsOptions = {
  key: fs.readFileSync(config.SSL_KEY),
  cert: fs.readFileSync(config.SSL_CERT)
};



var textToSpeech = function(text) {
  var deferred = Q.defer();
  ivona.createSpeechFile({
      text: text,
      contentType: 'text/plain',
      voiceId: 'gb_amy',
      codecId: 'mp3/22050'
    },
    function(err, fileId, soundUrl) {
      deferred.resolve(soundUrl);
    });
  return deferred.promise;
};

app.use(router(app));

app.get('/tts/:text', function *(next) {
  var text = decodeURIComponent(this.params.text);
  this.result = yield textToSpeech(text);
  this.redirect(this.result);
});

https.createServer(httpsOptions, app.callback()).listen(config.PORT);

console.log('listening on port ' + config.PORT);