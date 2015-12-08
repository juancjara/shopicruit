'use strict';

let _ = require('lodash');
let request = require('request');

let sumLampsAndWallets= (products) => {
  let options = ['Wallet', 'Lamp'];
  return _(products)
        .filter(p => _.indexOf(options, p.product_type) > -1)
        .pluck('variants')
        .flatten()
        .pluck('price')
        .sum();
};

request('http://shopicruit.myshopify.com/products.json',
        (error, response, body) => {
          if (error) return console.log(error);
          let products = JSON.parse(body).products;
          let costLampAndWallets = sumLampsAndWallets(products);
          console.log(`$ ${costLampAndWallets}`);
        });


