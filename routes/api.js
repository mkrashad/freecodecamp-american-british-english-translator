'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    const text = req.body.text;
    const locale = req.body.locale;
    console.log(text);
    if (text === undefined || !locale === undefined) {
      res.json({ error: 'Required field(s) missing' });
    }
    if (text === '') {
      res.json({
        error: 'No text to translate',
      });
    }
    if (locale !== 'american-to-british' || locale !== 'british-to-american') {
      res.json({
        error: 'Invalid value for locale field',
      });
    }
  });
};
