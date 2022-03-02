const express = require('express')
const {Router} = express
const path = require('path')
const Contenedor = require('../models/products')
const container = new Contenedor('./database/data.json')

const router = Router()


//Router index
router.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = router