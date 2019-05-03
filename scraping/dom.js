const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio')

//const $ = cheerio.load('<h2 class="title">Hello world</h2>')

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
        var images = $('img')[3];
        var src = $(images).attr('src');
        console.log(src)

    })
}

parseFile('./blabla.html');