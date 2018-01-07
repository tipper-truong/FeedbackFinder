module.exports = (req, res, next) => { // next = when middleware is completed
	if(req.user.credits < 1) {
		return res
				  .status(403)
				  .send({ error: "Not enough credits"});
	}

	next(); // else --> continue on to the next request handler
};