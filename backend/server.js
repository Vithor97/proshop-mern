const path = require('path')
const express = require('express')

const dotenv = require('dotenv')
const connectDB = require('./config/db')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
dotenv.config()

connectDB()

const app = express();

app.use(function(req, res, next){
    console.log(path.join(__dirname, '/uploads'))
    next()
})

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Api esta rodando....')
})

app.use('/api/products', productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

//soluções que deram certo
//app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
//errado
//app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(errorHandler)

app.use(notFound)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`))