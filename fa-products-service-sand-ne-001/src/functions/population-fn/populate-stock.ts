// const { CosmosClient } = require("@azure/cosmos");

// const sc = process.env.COSMOS_DB_CONNECTION_STRING;
// const cl = new CosmosClient(sc);
// const db = cl.database("products-db");
// const cont = db.container("stocks");

// async function populateStocks() {
// 	const productCounts = [
// 		{ id: "1", count: 2 },
// 		{ id: "2", count: 3 },
// 		{ id: "3", count: 4 },
// 		{ id: "4", count: 4 },
// 		{ id: "5", count: 4 },
// 	]

// 	for (const product of productCounts) {
// 		await cont.items.create(product);
// 	}

// 	console.log("Database populated");
// }

// populateStocks().catch(err => {
// 	console.error(err);
// });