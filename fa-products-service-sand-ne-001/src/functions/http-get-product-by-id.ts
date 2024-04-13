import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { singleProductFactory } from "./mocks";

export async function httpGetProductById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const productId = parseInt(request.params.productId, 10);

    if (isNaN(productId)) {
        return {
            status: 400,
            body: "Product ID must be a number.",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    const product = singleProductFactory(productId);

    return {
        body: JSON.stringify(product),
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