const http = require('http');
const fs = require('fs');

const url = 'http://www.camping-limousin.com/var/frhpal/storage/images/media/images/c-crt-limousin-m.-turin/68117-1-dut-NL/C-CRT-Limousin-M.-Turin_chapeau.jpg';
//const url =  'http://www.camping-limousin.com/content/view/full/17000';
http.get(url, (res) => {
    var d;
    res.on('data', (data) => {
        d += data;
        //console.log(data.toString());
    })

    res.on('end', () => {
        console.log('FIN');
        fs.writeFile('./image.jpg', d, (err) => {
            console.log(err);
            console.log('erreur')
        })

    })
})