const fs = require('fs');
//import express from "express";
const express = require('express')
var app = express();


/*
TODO
1. the getPrices make it just return the variables?
2. when the page first loads the price is always 0


*/

let price = require('crypto-price')
let base = 'USD'
let crypto = 'BTC'
let currentPrice = 0

/*
function getPrice(base, crypto) {
    price.getCryptoPrice(base, crypto).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
        console.log(obj.price)
        currentPrice = obj.price
        //return this.obj.price
    }).catch(err => {
        console.log(err)
    })
}
*/

async function getPrice(base, crypto) {
    let obj = await price.getCryptoPrice(base, crypto);
    console.log(obj.price)
    return obj.price;
}

app.get("/", (req, res, next) => {
    //res.json(["YAY"]);
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
   });

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });


app.get("/price", async (req, res, next) => {
    //example
    // http://localhost:3000/price?currency=USD&coin=BTC
    // http://localhost:3000/app.js/price?coin=&currency=&submit=Submit
    //first check to make sure we have the right query params
    if (!req.params) {
        console.log("missing queries.")
        res.json(['Error','Missing queries.'])
    }
    if (!req.query.currency || !req.query.coin) {
        //not good.
        console.log("missing queries.")
        res.json(['Error','Missing queries.'])
    }
    if (req.query.currency === "" || req.query.coin === "") {
        //not good.
        console.log("missing queries.")
        res.json(['Error','Missing queries.'])
    } else {
        var coin = req.query.coin
        var currency = req.query.currency
        console.log('queries are good')
        //now lets call the function and return
        var currentPrice = await getPrice(currency,coin)
        res.json([coin,currentPrice])
    }
    
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});


