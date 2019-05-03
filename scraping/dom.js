const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio')

const url = 'http://www.camping-limousin.com/content/view/full/17000';

function getFile() {
    http.get(url, (res) => {
        res.pipe(fs.createWriteStream('./blabla.html'));
        res.on('end', () => {
            console.log('Fichier enregistré')
            // possible appel à parseFile
        })
    })
}

function parseFile(path) {
    fs.readFile(path, (err, file) => {
        if (err) console.log(err);
        const $ = cheerio.load(file.toString());
        var imageSrc = $('img').eq(2).attr('src');
        console.log(imageSrc);
    })
}

parseFile('./blabla.html');