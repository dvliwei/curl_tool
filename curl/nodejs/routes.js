module.exports = function(app) {
  app.post('/api/cdntool/decode', require('./libs/cdntool.js').decode(app));
  app.get('/api/cdntool/decode/:content', require('./libs/cdntool.js').decode(app));

  app.post('/api/alarabiyatool/decode', require('./libs/alarabiyatool.js').decode(app));
  app.get('/api/alarabiyatool/decode/:content', require('./libs/alarabiyatool.js').decode(app));


};
