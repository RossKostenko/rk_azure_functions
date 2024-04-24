import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { CosmosClient } from "@azure/cosmos";
import { Product, Stock } from "./models";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const database = client.database("products-db");
const productContainer = database.container("products");
const stockContainer = database.container("stocks");

export async function httpGetProductById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const productId = request.params.productId;

    const { resource: product } = await productContainer.item(productId).read<Product>();
    const { resource: stock } = await stockContainer.item(productId).read<Stock>();

    const productWithCount = {
        ...product,
        count: stock.count ?? 0
    }

    return {
        body: JSON.stringify(productWithCount),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

app.http('http-get-product-by-id', {
    route: 'products/{productId}',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpGetProductById
});