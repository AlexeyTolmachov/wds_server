const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonialController');
router.get('/', testimonialController.getAllTestimonials);
router.delete('/', testimonialController.deleteAllTestimonials);


module.exports = router;