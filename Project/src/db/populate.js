"use strict";

const bcrypt = require("bcryptjs");
const RandExp = require("randexp");

const db = require("./database.js");
const SALT_LEN = 10;

function generateId(){
	//Regex to create random one time IDs
	return new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12}$/).gen();
}

function generateUname(){
	return new RandExp(/^[a-zA-Z0-9]{8}$/).gen();
}

function generateEmail(){
	return new RandExp(/[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\.[a-z]{2,4}/).gen();
}

function populate(){
	db.run(`CREATE TABLE user (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name text,
		username varchar(8) UNIQUE, 
		email text UNIQUE, 
		password text,
		access_lvl INTEGER,
		CONSTRAINT email_unique UNIQUE (email)
		)`,
		(err) => {
			if (err) {}
			else{
				// Table just created, creating some rows
				let insert = 'INSERT INTO user (name, email, username, password, access_lvl) VALUES (?,?,?, ?,?)';
				db.run(insert, ["Admin Account","admin@example.com", "AdminAcc", bcrypt.hashSync("Admin1234567", SALT_LEN)], 3);
				db.run(insert, ["Zé Ninguém","jose_ningue@example.com", "Zenin123", bcrypt.hashSync("Zenin1234567", SALT_LEN)], 0);
				db.run(insert, ["José Centro","jose_intermed@example.com", "Zemid123", bcrypt.hashSync("Zemid1234567", SALT_LEN)], 1);
				db.run(insert, ["Zezão Reizão","jose_reis@example.com", "Zegran123", bcrypt.hashSync("Zegran1234567", SALT_LEN)], 2);
				db.run(insert, ["João Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Joana Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Pedro Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Fábio Almeida", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Jeremias Dentro-da-Lei", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Generoso Primo", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Sérgio Portugal", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Alexandra Magnanima", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Mariana Ferreira", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Ada Cordão-Amor", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Carlos Babette", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Pedro Atleta", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 0);
				db.run(insert, ["Fernando Tola", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 1);
				db.run(insert, ["Cátia Vanessa", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 1);
				db.run(insert, ["Vanessa Cátia", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 1);
				db.run(insert, ["Silvestre Joanino", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 1);
				db.run(insert, ["Dra. Beatriz Aranha", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN)], 2);
				db.run(insert, ["Coronel Mostarda", generateEmail(), generateUname(), bcrypt.hashSync("SGketchup755", SALT_LEN)], 3);
				db.run(insert, ["Tiago Ligação", generateEmail(), generateUname(), bcrypt.hashSync("AgitNMix4666", SALT_LEN)], 3);
			}
	}); 
}

populate();