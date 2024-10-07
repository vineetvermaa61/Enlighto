// Import the required modules
const express = require("express")
const router = express.Router()

const { verifySignature, capturePayment } = require("../controllers/Payments")
const { isInstructor, isAdmin, isStudent, auth } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router