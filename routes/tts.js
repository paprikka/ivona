const voiceOptions = {
  name: 'Salli',
  language: 'en-US',
  gender: 'Female'
};

module.exports = function(ivona) {
  return function handler(request, reply) {
    ivona
      .createVoice(request.params.text, voiceOptions)
      .on('response', reply)
      .on('error', ()=> reply('Error')) // TODO: handle
  };
};