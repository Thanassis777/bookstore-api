const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/BookDb'

const app = express()

mongoose.connect(url, {newUserParser: true})

const con = mongoose.connection

con.on('open', () => {
    console.log('connected...');
})
