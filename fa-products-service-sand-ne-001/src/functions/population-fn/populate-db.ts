// const { CosmosClient } = require("@azure/cosmos");

// const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
// const client = new CosmosClient(connectionString);
// const database = client.database("products-db");
// const container = database.container("products");

// async function populateDb() {
// 	const products = [
// 		{ id: "1", name: "Product 1", description: "Description 1", price: 19.99 },
// 		{ id: "2", name: "Product 2", description: "Description 2", price: 29.99 },
// 		{ id: "3", name: "Product 3", description: "Description 3", price: 39.99 },
// 		{ id: "4", name: "Product 4", description: "Description 4", price: 39.99 },
// 		{ id: "5", name: "Product 5", description: "Description 5", price: 49.99 },
// 	]

// 	for (const product of products) {
// 		await container.items.create(product);
// 	}

// 	console.log("Database populated");
// }

// populateDb().catch(err => {
// 	console.error(err);
// });