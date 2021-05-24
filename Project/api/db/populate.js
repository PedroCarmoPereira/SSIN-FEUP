"use strict";

const bcrypt = require("bcryptjs");
const RandExp = require("randexp");

const db = require("./database.js");
const SALT_LEN = 10;

function generateId() {
	//Regex to create random one time IDs
	return new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12}$/).gen();
}

function generateUname() {
	return new RandExp(/^[a-zA-Z0-9]{8}$/).gen();
}

function generateEmail() {
	return new RandExp(/[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\.[a-z]{2,4}/).gen();
}

function populate() {
	try {
		db.exec('DROP TABLE IF EXISTS user');
	} catch {
		console.log('Error dropping users');
	}

	try {
		db.exec('DROP TABLE IF EXISTS story');
	} catch {
		console.log('Error dropping stories');
	}

	try {
		db.exec('DROP TABLE IF EXISTS appointment');
	} catch {
		console.log('Error dropping appointment');
	}

	try {
		db.exec('DROP TABLE IF EXISTS visa_request');
	} catch {
		console.log('Error dropping visa_request');
	}

	try {
		db.exec('DROP TABLE IF EXISTS message');
	} catch {
		console.log('Error dropping message');
	}

	try {
		db.exec('DROP TABLE IF EXISTS delivery');
	} catch {
		console.log('Error dropping delivery');
	}

	try {
		db.exec('DROP TABLE IF EXISTS ip_client');
	} catch {
		console.log('Error dropping ip_client');
	}

	db.run(`CREATE TABLE user (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name text,
		username varchar(8) UNIQUE, 
		email text UNIQUE, 
		password text,
		token text,
		access_lvl INTEGER,
		CONSTRAINT email_unique UNIQUE (email)
		)`,
		(err) => {
			if (err) {
				console.log('Error creating user table');
			}
			else {
				// Table just created, creating some rows
				let insert = 'INSERT INTO user (name, email, username, password, access_lvl) VALUES (?,?,?,?,?)';
				let stmt = db.prepare(insert);
				stmt.run(["Admin Account", "admin@example.com", "AdminAcc", bcrypt.hashSync("Admin1234567", SALT_LEN), 3])
				stmt.run(["Zé Ninguém", "jose_ningue@example.com", "Zenin123", bcrypt.hashSync("Zenin1234567", SALT_LEN), 0]);
				stmt.run(["José Centro", "jose_intermed@example.com", "Zemid123", bcrypt.hashSync("Zemid1234567", SALT_LEN), 1]);
				stmt.run(["Zezão Reizão", "jose_reis@example.com", "Zegran123", bcrypt.hashSync("Zegran1234567", SALT_LEN), 2]);
				stmt.run(["João Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Joana Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Pedro Silva", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Fábio Almeida", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Jeremias Dentro-da-Lei", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Generoso Primo", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Sérgio Portugal", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Alexandra Magnanima", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Mariana Ferreira", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Ada Cordão-Amor", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Carlos Babette", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Pedro Atleta", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 0]);
				stmt.run(["Fernando Tola", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 1]);
				stmt.run(["Cátia Vanessa", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 1]);
				stmt.run(["Vanessa Cátia", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 1]);
				stmt.run(["Silvestre Joanino", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 1]);
				stmt.run(["Dra. Beatriz Aranha", generateEmail(), generateUname(), bcrypt.hashSync(generateId(), SALT_LEN), 2]);
				stmt.run(["Coronel Mostarda", generateEmail(), generateUname(), bcrypt.hashSync("SGketchup755", SALT_LEN), 3]);
				stmt.run(["Tiago Ligação", generateEmail(), generateUname(), bcrypt.hashSync("AgitNMix4666", SALT_LEN), 3]);
			}
		});

	db.run(`CREATE TABLE story (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title text UNIQUE,
		article text,
		author_id INTEGER, 
		FOREIGN KEY(author_id) REFERENCES user(id)
		)`,
		(err) => {
			if (err) {
				if (err.errno !== 1) throw err;
			}
			let insert = 'INSERT INTO story (title, article, author_id) VALUES (?,?,?)';
			let stmt = db.prepare(insert);
			stmt.run('How it all began...', 'Some dude named Afonso decided Spain was shit...', 19);
			stmt.run('How it all developed...', 'They killed some A-rabs, then Spain killed some Tugas, then D. Jonh killed some Spaniards, badabim badabum, Discoveries or as the rest of the world calls it the start of the Transatatlantic Slave Trade...', 19);
			stmt.run('The fall...', 'The 1st Manuel decided it was a good idea to spend all our stolen money on a fucking marble church', 20);
			stmt.run('The DickTator', 'Salazar Slitherin wanted to purge all half-bloods and wizards of muggle blood or some shit...', 18);
			stmt.run('Where we at now', 'In debt but recovering, wait Corona-what?', 18);
			stmt.run('Visit Portugal', 'We got beaches, we got bitches. We got all the Almeida\'s you could want. We also have a guy that videobombs reporters.', 20);
		});

	db.run(`CREATE TABLE appointment (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		motive text,
		set_date DATE,
		requester_id INTEGER,
		FOREIGN KEY(requester_id) REFERENCES user(id)
		)`
	);

	db.run(`CREATE TABLE visa_request (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		motive text,
		applied date,
		requester_id INTEGER,
		accepted INTEGER DEFAULT 0,
		FOREIGN KEY(requester_id) REFERENCES user(id)
		)`
	);

	db.run(`CREATE TABLE message(
		id INTEGER,
		sender_id INTEGER NOT NULL,
		receiver_id INTEGER NOT NULL,
		content TEXT,
		sent_date date,
		FOREIGN KEY(sender_id) REFERENCES user(id),
		FOREIGN KEY(receiver_id) REFERENCES user(id),
		PRIMARY KEY(id)
	  	)`
	);

	// Missions for the secret agents
	db.run(`CREATE TABLE delivery(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		employee_id INTEGER NOT NULL,
		content TEXT,
		op_date date,
		FOREIGN KEY(employee_id) REFERENCES user(id)
	  )`
	);

	db.run(`CREATE TABLE ip_client(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		uid INTEGER NOT NULL,
		addr TEXT,
		clientPort TEXT,
		serverPort TEXT,
		FOREIGN KEY(uid) REFERENCES user(id)
	  )`
	);
}

populate();