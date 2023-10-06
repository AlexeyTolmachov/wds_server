const express = require('express');
const router = express.Router();
const multer = require("multer");
const testimonialController = require('../controllers/testimonialController');
const importDataFromCSVController = require('../importData');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({ storage: storage });
router.get('/', testimonialController.getAllTestimonials);
router.delete('/', testimonialController.deleteAllTestimonials);
router.post('/', upload.single('csvData'), importDataFromCSVController);
module.exports = router;