const express = require('express');
const asyncHandler = require('express-async-handler')
const router = express.Router();
const Product = require('../models/productModel');
const mongoose = require('mongoose')

//@desc FETCH all products
//@route GET /api/products
//@access Public
router.get('/', asyncHandler(async (req, res)=>{
    const products = await Product.find({})
    res.json(products)
}))

//@desc FETCH single products
//@route GET /api/products/:id
//@access Public
router.get('/:id', asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product); // .json() will convert it to the json content type
      } 
    else {

        res.status(404)
        throw new Error('Produto não encontrado')
    }
    
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {//Check that our MongoDB id is valid
    //     res.status(400).json({ message: 'Invalid MongoDB ObjectId. Cannot find matching products with an invalid ObjectId.' });  
    //     // throw new Error('Invalid object ID.'); 
    //   } else {
    //     const product = await Product.findById(req.params.id);
    //     if(product){
    //       res.json(product); // .json() will convert it to the json content type
    //     } else {
    //       res.status(404).json({ message: 'Produto não encontrado' });
    //     }
    //   }

}))

module.exports = router;


