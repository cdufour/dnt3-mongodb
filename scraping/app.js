const http = require('http');
const https = require('https');
const fs = require('fs');

const url = 'http://www.camping-limousin.com/var/frhpal/storage/images/media/images/c-crt-limousin-m.-turin/68117-1-dut-NL/C-CRT-Limousin-M.-Turin_chapeau.jpg';
//const url2 = 'http://www.camping-limousin.com/var/frhpal/storage/images/media/images/collonges-la-rouge-b-chanet-c-crt-limousin/67747-1-dut-NL/Collonges-la-Rouge-B-Chanet-C-CRT-Limousin_chapeau.jpg'
const url2 = 'https://static.secureholiday.net/static/photos/5571/info/basic-00000153524.jpg';
const writeStream = fs.createWriteStream('./photo-camping.jpg');
const writeStream2 = fs.createWriteStream('./photo-camping2.jpg');

http.get(url, res => {
    res.pipe(writeStream);
    res.on('end', () => {
        console.log('Fin du chargement 1')
    })
})

https.get(url2, res => {
    res.pipe(writeStream2);
    res.on('end', () => {
        console.log('Fin du chargement 2')
    })
})