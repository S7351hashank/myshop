const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Product = require("../models/Product");

exports.getAllProductByUserId = async (req, res) => {
    try {
        // Extracting JWT from request cookies, body or header
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const allProducts = await Product.find({ userId: decode.id });

        return res.status(200).json({
            success: true,
            data: allProducts,
        })

    } catch (error) {
        // If JWT verification fails, return 401 Unauthorized response
        return res
            .status(401)
            .json({ success: false, message: "token is invalid" });
    }
}

exports.AddOneProduct = async (req, res) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        const { medName, type, expMonth, expYear, mrp, wholeSalePrice, storeName, inStock, rate } = req.body;
        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const product = await Product.create({
            userId: decode.id,
            medName, type, expMonth, expYear, mrp, wholeSalePrice, storeName, inStock, rate,
        });

        const user = await User.findByIdAndUpdate(
            { _id: decode.id },
            {
                $push: {
                    ProductDetails: product._id,
                },
            },
            {
                new: true,
            }
        )
        return res.status(200).json({
            success:true,
            message:"Product add Successfully",
            product:product,
        })
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "token is Invalid",
            error: err,
        })
    }
}

exports.AddMultipleProducts = async (req, res) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token Missing' });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const productsArray = req.body; // Assuming the array is sent under 'products'

        if (!Array.isArray(productsArray)) {
            return res.status(400).json({ success: false, message: 'Expected an array of products' });
        }

        const productIds = [];
        for (const productData of productsArray) {
            const { medName, type, expMonth, expYear, mrp, wholeSalePrice, storeName, inStock, rate } = productData;

            const product = await Product.create({
                userId: decoded.id,
                medName,
                type,
                expMonth,
                expYear,
                mrp,
                wholeSalePrice,
                storeName,
                inStock,
                rate,
            });

            productIds.push(product._id);
        }

        const user = await User.findByIdAndUpdate(
            { _id: decoded.id },
            {
                $push: {
                    ProductDetails: { $each: productIds },
                },
            },
            {
                new: true,
            }
        );

        res.status(200).json({ success: true, message: 'Products added successfully' });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token is Invalid',
            error: err.message,
        });
    }
};


exports.UpdateProductById = async (req, res) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        const { productId, medName, type, expMonth, expYear, mrp, wholeSalePrice, storeName, inStock, rate } = req.body;
        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const product = await Product.findOneAndUpdate({
            userId: decode.id,
            _id : productId,
        },{
            medName, type, expMonth, expYear, mrp, wholeSalePrice, storeName, inStock, rate,
        });

        const user = await User.findByIdAndUpdate(
            { _id: decode.id },
            {
                $push: {
                    ProductDetails: product._id,
                },
            },
            {
                new: true,
            }
        )
        return res.status(200).json({
            success:true,
            message:"Product add Successfully",
            product:product,
        })
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "token and productId is Invalid",
            error: err,
        })
    }
}
