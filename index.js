const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const PORT = process.env.PORT || 8080

const prodsRouter = require('./routes/productos')
const homeRouter = require('./routes/home')
const carritoRouter = require('./routes/carrito')

/* express */
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/static", express.static(path.join(__dirname, '/public')))


app.use("/", homeRouter)
app.use('/api/productos', prodsRouter)
app.use('/api/carrito', carritoRouter)

app.use((err, req, res, next)=>{
  console.log(err.stack)
  res.status(500).send('Error en middleware')
})

app.get('*', function(req, res){
  res.send('Error: -1, descripción de ruta x método y no autorizada', 404);
});

app.listen(
  PORT, ()=>console.log(`Escuchando en: http://localhost:${PORT}`)
)