import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import { Product, Stock } from "./models";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const client = new CosmosClient(connectionString);
const database = client.database("products-db");
const productsContainer = database.container("products");
const stocksContainer = database.container("stocks");

export async function httpGetProducts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const { resources: products } = await productsContainer.items.query<Product>("SELECT * FROM c").fetchAll();
    const { resources: stocks } = await stocksContainer.items.query<Stock>("SELECT * FROM c").fetchAll();

    const productsWithCount = products.map((product) => {
        const count = stocks?.find((stock) => stock.id === product.id)?.count ?? 0

        return {
            ...product,
            count
        }
    })

    return {
        body: JSON.stringify(productsWithCount),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

app.http('http-get-products', {
    route: 'products',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpGetProducts
});
