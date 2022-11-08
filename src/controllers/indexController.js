const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const indexController = {
    index: (req, res) => {
        res.render('index', {title: 'Digital Movies'})
    },
    list: async (req, res) => {
        fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            return response.json();
    })
        .then(countries => {
            return res.json(countries)
        })
    }
}

module.exports = indexController