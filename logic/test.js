const mongo  = require("./mongoClass")
let m = new mongo();

m.addProduct(
  'Product 13',
  44.99,
  "Hazelnut Butter",
  'Description 13',
  'Compound 13',
  260,
  360,
  26,
  24,
  37,
  'Suitability 13',
  1300,
  '/product13/photo.png',
  ['goodO', 'goodP'],
  'Cooking instructions 13'
);
