const handleProfilGet = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users')
	.where({
		id: id
	})
	.then(user=>{
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('not found');
		}
	})
	.catch(err=> 'error getting user');
}



module.exports = {
	handleProfile: handleProfilGet
};