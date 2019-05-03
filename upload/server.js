const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const app = express();
const PORT = 5000;

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json()); // parser pour requête ajax/json
//app.use(bodyParser.urlencoded());

app.post('/file', (req, res) => {
    var busboy = new Busboy({headers: req.headers});

    busboy.on('file', function(fieldname, file, filename, encoding) {
        var saveTo = __dirname + '/public/img/' + filename;
        file.pipe(fs.createWriteStream(saveTo));
    })

    busboy.on('finish', function() {
        res.sendStatus(200);
    })
    
    req.pipe(busboy);
    
})

app.listen(PORT, () => console.log(`Server on ${PORT}...`))