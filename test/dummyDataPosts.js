var moment = require('moment');
var PostsDB = require('../models/Post');
var slug = require('slug');
const faker = require('faker');
var loremText = require('./loremText');

function random10() {
  var n = Math.floor(Math.random() * 11)
  if (n==0) {
    n=1;
  }
  return n;
}

// generate posts
for (var i = 0; i < 100; i++) {
  console.log(loremText);
  var type = Math.floor(Math.random() * 3);
  let title = faker.fake("{{lorem.words}}");
  new PostsDB({
    title: title,
    slug: slug(title),
    // body: req.body.body,  // removed for economy
    markdown:loremText.md,
    html:loremText.html,
    tags: loremText.tags,
    user_id:random10(),
    // category_id:random10(),
    // page_id:random10(),
    type:type
  }).save()
  .then(function(saved) {
    console.log(i+"saved");
  })
  .catch(function(err) {
    if (err.code) {
      console.log(err.code);
    }
  });
}




// how to use faker
// console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
// console.log(faker.fake("{{lorem.sentences}}"));


// ### FAKER API Methods
//
// * address
//   * zipCode
//   * city
//   * cityPrefix
//   * citySuffix
//   * streetName
//   * streetAddress
//   * streetSuffix
//   * streetPrefix
//   * secondaryAddress
//   * county
//   * country
//   * countryCode
//   * state
//   * stateAbbr
//   * latitude
//   * longitude
// * commerce
//   * color
//   * department
//   * productName
//   * price
//   * productAdjective
//   * productMaterial
//   * product
// * company
//   * suffixes
//   * companyName
//   * companySuffix
//   * catchPhrase
//   * bs
//   * catchPhraseAdjective
//   * catchPhraseDescriptor
//   * catchPhraseNoun
//   * bsAdjective
//   * bsBuzz
//   * bsNoun
// * database
//   * column
//   * type
//   * collation
//   * engine
// * date
//   * past
//   * future
//   * between
//   * recent
//   * month
//   * weekday
// * fake
// * finance
//   * account
//   * accountName
//   * mask
//   * amount
//   * transactionType
//   * currencyCode
//   * currencyName
//   * currencySymbol
//   * bitcoinAddress
//   * iban
//   * bic
// * hacker
//   * abbreviation
//   * adjective
//   * noun
//   * verb
//   * ingverb
//   * phrase
// * helpers
//   * randomize
//   * slugify
//   * replaceSymbolWithNumber
//   * replaceSymbols
//   * shuffle
//   * mustache
//   * createCard
//   * contextualCard
//   * userCard
//   * createTransaction
// * image
//   * image
//   * avatar
//   * imageUrl
//   * abstract
//   * animals
//   * business
//   * cats
//   * city
//   * food
//   * nightlife
//   * fashion
//   * people
//   * nature
//   * sports
//   * technics
//   * transport
//   * dataUri
// * internet
//   * avatar
//   * email
//   * exampleEmail
//   * userName
//   * protocol
//   * url
//   * domainName
//   * domainSuffix
//   * domainWord
//   * ip
//   * ipv6
//   * userAgent
//   * color
//   * mac
//   * password
// * lorem
//   * word
//   * words
//   * sentence
//   * slug
//   * sentences
//   * paragraph
//   * paragraphs
//   * text
//   * lines
// * name
//   * firstName
//   * lastName
//   * findName
//   * jobTitle
//   * prefix
//   * suffix
//   * title
//   * jobDescriptor
//   * jobArea
//   * jobType
// * phone
//   * phoneNumber
//   * phoneNumberFormat
//   * phoneFormats
// * random
//   * number
//   * arrayElement
//   * objectElement
//   * uuid
//   * boolean
//   * word
//   * words
//   * image
//   * locale
//   * alphaNumeric
// * system
//   * fileName
//   * commonFileName
//   * mimeType
//   * commonFileType
//   * commonFileExt
//   * fileType
//   * fileExt
//   * directoryPath
//   * filePath
//   * semver
//
//
// ## Localization
//
// As of version `v2.0.0` faker.js has support for multiple localities.
//
// The default language locale is set to English.
//
// Setting a new locale is simple:
//
// ```js
// // sets locale to de
// faker.locale = "de";
// ```
//
//  * az
//  * cz
//  * de
//  * de_AT
//  * de_CH
//  * en
//  * en_AU
//  * en_BORK
//  * en_CA
//  * en_GB
//  * en_IE
//  * en_IND
//  * en_US
//  * en_au_ocker
//  * es
//  * es_MX
//  * fa
//  * fr
//  * fr_CA
//  * ge
//  * id_ID
//  * it
//  * ja
//  * ko
//  * nb_NO
//  * nep
//  * nl
//  * pl
//  * pt_BR
//  * ru
//  * sk
//  * sv
//  * tr
//  * uk
//  * vi
//  * zh_CN
//  * zh_TW
