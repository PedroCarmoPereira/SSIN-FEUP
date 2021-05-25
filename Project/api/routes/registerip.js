const db = require("../db/database.js");

module.exports = (uid, addr, cp, sp) => {
	let update;
	let params;
	if (cp !== "" && sp !== ""){
		update = 'UPDATE ip_client SET addr = ?, clientPort = ?, serverPort = ? WHERE uid = ?';
		params = [addr, uid, cp, sp];
	}
	else {
		update = 'UPDATE ip_client SET addr = ? WHERE uid = ?';
		params = [addr, uid];
	}
	let stmt = db.prepare(update);
	stmt.run(params, (err, __) => {
		if (err){
			console.log(err);
		}
	});
	
}