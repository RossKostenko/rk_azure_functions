import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { productsMockFactory } from './mocks/products-mock-factory.helper'

const MOCK_PRODUCTS_AMMOUT = 10;

export async function httpGetProducts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const products = productsMockFactory(MOCK_PRODUCTS_AMMOUT)

    return {
        body: JSON.stringify(products),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

app.http('http-get-products', {
    route: '/products',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpGetProducts
});
