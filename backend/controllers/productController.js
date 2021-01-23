const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel');


//@desc FETCH all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({})
    res.json(products)
})


//@desc FETCH single products
//@route GET /api/products/:id
//@access Public
const getProductById  = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product); // .json() will convert it to the json content type
    } 
    else {
        res.status(404)
        throw new Error('Produto não encontrado')
    }
})

module.exports =  { getProductById, getProducts }


