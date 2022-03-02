const express = require('express')
const {Router} = express
const path = require('path')
const Contenedor = require('../models/products')
const container = new Contenedor('./database/data.json')

const router = Router()


router.get("/all", (req, res)=>{
  const allProducts = () => container.getAll()

  allProducts()
    .then((resp)=>{
      res.send(resp)
    })
    .catch((err)=>{
      res.send(err)
    })

})

router.get('/:id', (req, res)=>{
  const {id} = req.params
  const idNum = parseInt(id)

  const productoById = (id) => {
    return container.getById(id)
  }

  productoById(idNum)
    .then((resp)=>{

      if(!resp){
        res.status(404).send({
          error:'Producto no encontrado'
        })
        return
      }
    
      res.send(resp)
    })
    .catch((err)=>{
      res.send(err)
    })

})

//post
router.post('/', (req, res)=>{
  const {nombre, precio, img, stock, descripcion, código} = req.body

  const new_product = {nombre, precio, img, stock, descripcion, código}

  container.save(new_product)
    .then((resp)=>{
      res.send(`Nuevo producto: ${JSON.stringify(resp)}`)
    })
    .catch((err)=>{
      res.send(err)
    })
})

//put BY ID
router.put('/:id', (req, res)=>{
  const {id} = req.params
  const idNum = parseInt(id)
  const {nombre, precio, img, stock, descripcion, código} = req.body

  const new_product = {nombre, precio, img, stock, descripcion, código}

  container.editById(idNum, new_product)
    .then((resp)=>{
      res.send(`Producto(${idNum}) actualidado: ${JSON.stringify(resp)}`)
    })
    .catch((err)=>{
      res.send(err)
    })

})

//DELETE BY ID
router.delete('/:id', (req, res)=>{
  const {id} = req.params
  const idNum = parseInt(id)

  container.deleteById(idNum)
    .then((resp)=>{
      res.send(`Producto borrado id:${id}`)
    })
    .catch((err)=>{
      res.send(err)
    })
})


module.exports = router