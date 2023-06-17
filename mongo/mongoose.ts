// import { MongoClient, MongoClientOptions } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

declare global {
	// eslint-disable-next-line no-unused-vars
	var _mongoClientPromise: Promise<Mongoose>;
}

let uri = process.env.MONGO_DB_URI;
const db = process.env.MONGO_DB;

// const options:MongooseOptions = {};

let clientPromise: Promise<Mongoose>;

if (!uri || !db) {
	throw new Error("Add Mongo URI to .env.local");
}

uri = uri.replace("{{database}}", db);
/*
When strict option is set to true, Mongoose will ensure that only the fields that are specified in your 
Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
Right now, this option is enabled by default, but it will be changed in Mongoose v7 to false by default. 
That means that all the fields will be saved in the database, even if some of them are not 
specified in the Schema model.
*/
if (!global._mongoClientPromise) {
	mongoose.set("strictQuery", true);
	global._mongoClientPromise = mongoose.connect(uri);
}
clientPromise = global._mongoClientPromise;

const connection: {
	isConnected: number;
} = {
	isConnected: 0,
};

const dbConnect = async () => {
	if (connection.isConnected) return;

	const clientDB = await clientPromise;

	connection.isConnected = clientDB.connections[0].readyState;
};

export default dbConnect;
