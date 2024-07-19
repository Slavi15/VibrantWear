const router = require("express").Router();

const { getProducts, getProductById, getPaginationProducts, createProduct, updateProduct, deleteProduct } = require("./controllers/productController.js");
const { stripePayments, stripeCheckoutCompleted } = require("./controllers/stripe.js");

router.get("/products", getProducts);
router.get("/products/:productID", getProductById);
router.get("/paginationProducts", getPaginationProducts);
router.post("/products", createProduct);
router.put("/products/:productID", updateProduct);
router.delete("/products/:productID", deleteProduct);

router.post("/create-checkout-session", stripePayments);
router.post("/webhook", stripeCheckoutCompleted);

module.exports = router;