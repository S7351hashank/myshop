const express = require("express")
const router = express.Router()

const {
    getAllProductByUserId,
    AddOneProduct,
    AddMultipleProducts,
    UpdateProductById,
} = require("../controllers/Product")

const { auth } = require("../middlewares/Auth")

router.get("/getallproduct", auth, getAllProductByUserId)
router.post("/addallproduct", auth, AddMultipleProducts)
router.post("/addoneproduct", auth, AddOneProduct)
router.post("/updateproduct", auth, UpdateProductById)

module.exports = router