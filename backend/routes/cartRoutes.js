import express from "express";
import {addToCart,getCart,removeFromCart} from "../controllers/cartController.js"
const router = express.Router();

router.post("/addToCart" , addToCart );
router.get("/getCart" , getCart );
router.delete("/removeFromCart/:id", removeFromCart);
 


 
export default router;
