const db = require("../db/database.js");

module.exports = (uid, addr) => {
	let update = 'UPDATE ip_client SET addr = ? WHERE uid = ?';
	let stmt = db.prepare(update);
	let params = [addr, uid];
	stmt.run(params, (err, __) => {
		if (err){
			console.log(err);
		}
	});
	
}