var pagedown = require('pagedown');
conv = new pagedown.Converter();

//
var md = `# Lunae quosque mihi passim fluviumque congesta ossa

## In mater quoque

Lorem markdownum [carne](http://inrita-dictis.com/etvirgine.php): ad tibia
*vocalia*, et dare. [Matura](http://saucia.net/) ut pavidam, inseruitque Pelasgi
corporibus virgo anhelitus habet arte quae! Dixi percussis. Quis mihi manus
fiducia, te colle fiuntque relinquit paulum profecit remis gramine.

> Mollem Somni tuo meo foribusque amplexa modo odoribus in secreta capillis
> queat integer pariturae. Nomine est dat sagittis vestis. Quae dolores borean
> vulnusque ducem.

## Latebris dignus natus quietis percussit clarum imitamina

Et ira Tempe et sui Helicona nulla inter corpus loris fulmen orbem. Pars si
vincula deus.

Est Latous dat avidos iuratus. *Clarus et et*, terga, precaris sua orbe nos
quodvis vocalis, totis. Molimine vinctumque atque, oscula eundi refugitque
nostrae Semeleia, numinis nam apro. Puer erat ambitae, ait convertit ventis
inritamina aureus causa. Ne modo gratia robora certatimque ulli sine pauca fecit
dea est vultusque.

## Fetu arcus si herbas telae genus conamine

Tarentum [enim](http://www.mensae.net/humum-late): est rivi, Mendesius posses,
succedere in. [Notus](http://proximaiuvenemque.io/) adhaeret **adversum sit
cultus**, conscendit, perimunt substitit omnia vitamque mortali sacrata sibi.
*Dumque ante* tulit; et rupem corpore in **urbis dissimilemque anguibus** longa
persequar. Caeli duo tamen sed Pallas veste, circumlita ortus, pectora et
*habet* concretam dilaniat, minus Pelia virgo quae.

> Movit per et, argentea di perfusam mortis *invenio* petit licet. Alimentaque
> latos flamma clamor standi bibes: alimentaque primo, protinus ambobus; vult
> vel memoranda somnus in Battum. Proboque bidentes adfuit. Saxa non cum viscera
> *contrahit lyncum*.

Aut simulacra tenent sequitur fulmina et vestem terra notissima sexque, mens
unus Edonidas. Nido **frustra tuti paelicis** telo: exhalari veniunt, et quoque
o herbis editus facti, nec haud et.`
//
//
//
// var tags = [
// 'Tabs',
// 'Dropdowns',
// 'Accordions',
// 'Convert Weights',
// 'Animated Buttons',
// 'Side Navigation',
// 'Top Navigation',
// 'Modal Boxes',
// 'Progress Bars',
// 'Parallax',
// 'Login Form',
// 'HTML Includes',
// 'Google Maps',
// 'Range Sliders',
// 'Tooltips',
// 'Slideshow',
// 'Filter List',
// 'Sort List',
// ]
//
// const slug = require('slug');
// var n = Math.floor(Math.random() * 7);
// slugTag = ""
// if (n==0) {
//   n=3;
// }
// for (var i = 0; i < n; i++) {
//   slugTag += slug(tags[Math.floor(Math.random() * 17)]);
//   if (n!=i+1) {
//     slugTag += ","
//   }
// }


// function random10() {
//   var n = Math.floor(Math.random() * 11)
//   if (n==0) {
//     n=1;
//   }
//   return n;
// }
// n=1;
// while (n!=11) {
//   n = random10();
//   console.log(
//     n
//   )
// }



console.log(
  //   var n = Math.floor(Math.random() * 11)
  conv.makeHtml(md)
);
