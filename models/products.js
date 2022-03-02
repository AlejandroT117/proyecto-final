const moment = require('moment')
const fs = require('fs').promises

class Contenedor{
  constructor(filename){
    this.filename = filename
    this.next_id = 1
  }

  async save(new_object){
    try{
      let last_id = 0
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      if(data){
        for (let i = 0; i < data.length; i++) {
          const producto = data[i];
          last_id = producto.id          
        }
      }

      this.next_id = last_id + 1

      new_object.id = this.next_id

      data.push({
        id:new_object.id,
        nombre: new_object.nombre,
        precio: new_object.precio,
        img:new_object.img,
        stock: new_object.stock,
        timestamp: moment().format('DD:mm:yy HH:mm:ss'),
        descripcion: new_object.descripcion,
        código: new_object.código
      })

      await fs.writeFile(this.filename, JSON.stringify(data, null, 2), 'utf-8')

      return new_object
    }catch(e){
      console.log(e)
    }

  }

  async getById(id){
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      const obj = data.find((obj)=>obj.id===id)

      if(!obj){
        return null
      }

      return obj
    }catch(e){
      console.log(e)
    }
  }

  async editById(id, new_object){
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      const obj = data.find((obj)=>obj.id===id)

      if(!obj){
        return null
      }

      data.map(product=>{
        if(product.id === id){

          product.nombre= new_object.nombre
          product.precio= new_object.precio
          product.img = new_object.img
          product.stock= new_object.stock
          product.timestamp= moment().format('DD:mm:yy HH:mm:ss')
          product.descripcion= new_object.descripcion
          product.código= new_object.código          
        
          return product
        }

      })


      await fs.writeFile(this.filename, JSON.stringify(data, null, 2), 'utf-8')

      return new_objectcon


    }catch(e){
      console.log(e)
    }

  }

  async getAll() {
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      return data
    }catch(e){
      console.log(e)
    }
  }

  async deleteById(id){
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      const filtered_data = data.filter( obj => obj.id!==id)

      await fs.writeFile(this.filename, JSON.stringify(filtered_data, null, 2), 'utf-8')
    }catch(e){  
      console.log(e)
    }
  }

  async deleteAll(){
    try{
      await fs.writeFile(this.filename, JSON.stringify([], null, 2), 'utf-8')
    }catch(e){
      console.log(e)
    }
  }


}


module.exports = Contenedor