const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, locale) {
    let translation = text;
    const highlight = (text) => `<span class="highlight">${text}</span>`;

    if (locale === 'american-to-british') {
      // Time translation
      translation = translation.replace(
        /\b(\d{1,2}):(\d{2})\b/g,
        (match, p1, p2) => highlight(`${p1}.${p2}`)
      );

      // Titles translation
      Object.entries(americanToBritishTitles).forEach(([usTitle, ukTitle]) => {
        const regex = new RegExp(`\\b${usTitle}\\b`, 'gi');
        translation = translation.replace(regex, (match) =>
          highlight(ukTitle.replace('.', ''))
        );
      });

      // Spelling translation
      Object.entries(americanToBritishSpelling).forEach(
        ([usSpelling, ukSpelling]) => {
          translation = translation.replace(
            new RegExp(`\\b${usSpelling}\\b`, 'gi'),
            highlight(ukSpelling)
          );
        }
      );

      // American-only terms
      Object.entries(americanOnly).forEach(([usTerm, ukTerm]) => {
        translation = translation.replace(
          new RegExp(`\\b${usTerm}\\b`, 'gi'),
          highlight(ukTerm)
        );
      });
    } else if (locale === 'british-to-american') {
      // Time translation
      translation = translation.replace(
        /\b(\d{1,2})\.(\d{2})\b/g,
        (match, p1, p2) => highlight(`${p1}:${p2}`)
      );

      // Titles translation
      Object.entries(americanToBritishTitles).forEach(([usTitle, ukTitle]) => {
        const regex = new RegExp(`\\b${ukTitle}\\b`, 'gi');
        translation = translation.replace(regex, (match) =>
          highlight(`${usTitle}.`)
        );
      });

      // Spelling translation
      Object.entries(americanToBritishSpelling).forEach(
        ([usSpelling, ukSpelling]) => {
          translation = translation.replace(
            new RegExp(`\\b${ukSpelling}\\b`, 'gi'),
            highlight(usSpelling)
          );
        }
      );

      // British-only terms
      Object.entries(britishOnly).forEach(([ukTerm, usTerm]) => {
        translation = translation.replace(
          new RegExp(`\\b${ukTerm}\\b`, 'gi'),
          highlight(usTerm)
        );
      });
    }

    if (translation === text) {
      return 'Everything looks good to me!';
    }

    return translation;
  }
}

module.exports = Translator;
