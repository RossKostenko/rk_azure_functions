import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const database = client.database("products-db");
const productsContainer = database.container("products");

export async function httpPostProduct(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
	context.log(`Http function processed request for url "${request.url}"`);

	const product = request.body;

	const { resource: createdProduct } = await productsContainer.items.create(product);

	return {
		status: 201,
		body: JSON.stringify(createdProduct),
		headers: {
			'Content-Type': 'application/json'
		}
	}
}

app.http('http-post-products', {
	route: 'products',
	methods: ['POST'],
	authLevel: 'anonymous',
	handler: httpPostProduct
});
