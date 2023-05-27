const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');

const generatePdf = async (req, res, next) => {

   var  data = req.body.data;

        const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
        const filename = Math.random() + '_doc' + '.pdf';
        let array = [];

        data.forEach(d => {
            const prod = {
                name: d.title,
                quantity: d.qty,
                price: d.price,
                total: d.tprice,
                imgurl: d.images
            }
            array.push(prod);
        });

        let subtotal = 0;
        array.forEach(i => {
            subtotal += i.total
        });
        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax;
        const obj = {
            prodlist: array,
            subtotal: subtotal,
            tax: tax,
            gtotal: grandtotal
        }
        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(res => {
             
            }).catch(error => {
             
            });
            const filepath = 'http://localhost:3000/docs/' + filename;

            res.json({url:filepath});


}


module.exports = {
    generatePdf
}