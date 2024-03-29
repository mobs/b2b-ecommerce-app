import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { getProducts, addProduct, deleteProduct, getProductsByCategory, getCategories } from "../controllers/product.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/products").get(getProducts)
router.route("/categoryProduct/:category").get(getProductsByCategory)
router.route("/categories").get(getCategories)

// secured routes
router.route("/add").post(verifyJWT, 
    upload.single("image"),
    addProduct
)

router.route("/delete/:id").delete(verifyJWT, deleteProduct)

export default router;
