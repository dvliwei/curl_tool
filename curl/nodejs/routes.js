module.exports = function(app) {
  app.post('/api/cdntool/decode', require('./libs/cdntool.js').decode(app));
  app.get('/api/cdntool/decode/:content', require('./libs/cdntool.js').decode(app));


};
