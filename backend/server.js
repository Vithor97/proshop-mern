const express = require('express')

const dotenv = require('dotenv')
const connectDB = require('./config/db')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Api esta rodando....')
})

app.use('/api/products', productRoutes)
app.use('/api/users',userRoutes)

app.use(errorHandler)

app.use(notFound)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`))