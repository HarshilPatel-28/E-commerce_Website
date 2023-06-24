const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const apifeatures = require("../utils/apiFeatures")

// create product  -- Admin

exports.createProduct =catchAsyncErrors(  async(req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

// get all product 

exports.getAllProducts =catchAsyncErrors( async(req,res)=>{

   const apifeature = new apifeatures(Product.find(),req.query).search().filter();
    const products = await apifeature.query;

    res.status(200).json({
        success:true,
        products
    })
})
// Get product details 

exports.getProductDetails =catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
})

// update product -- Admin 

exports.updateProduct =catchAsyncErrors( async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})

// Delete Product --Admin

exports.deleteProduct =catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })

})