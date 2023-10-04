const Testimonial = require('../mysqlDB/model/testimonialModel');

exports.getAllTestimonials = async (req, res) => {
	try {
		const testimonials = await Testimonial.getAllTestimonials();
		res.json(testimonials);
	} catch (error) {
		console.error('Error receiving feedback:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.deleteAllTestimonials = async (req, res) => {
	try {
		const deletedCount = await Testimonial.deleteAllTestimonials();
		const message = `All reviews have been removed (${deletedCount} records)`;

		if (deletedCount === 0) {
			res.status(404).json({ message: 'There are no reviews to delete' });
		} else {
			res.json({ message });
		}
	} catch (error) {
		console.error('Error deleting all reviews:', error);
		res.status(500).json({ message: 'Server error' });
	}
};


