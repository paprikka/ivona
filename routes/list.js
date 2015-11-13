module.exports = function(ivona) {
  return function handler(request, reply) {
    ivona
      .listVoices()
      .on('end', console.log.bind(console, 'RESSSS'))
      // .on('end', reply);
  };
};