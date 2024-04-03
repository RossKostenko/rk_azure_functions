
import { Product } from '../models/product.type'
export function productsMockFactory(ammount?: number): Product[] {
	const collection = [];

	for (let i = 0; i < ammount; i++) {
		collection.push(singleProductFactory(i))
	}

	return collection;
}

export function singleProductFactory(id: number): Product {
	const uniqueText = id ? ` ${id}` : '';
	const addedPrice = id ? id : 0;

	return {
		id: String(id),
		title: 'Test Product' + uniqueText,
		description: 'Test Product' + uniqueText + ' description',
		price: 20 + addedPrice,
	}
}

function generateBillionId(): string {
	let result = '';
	const characters = '0123456789';

	for (let i = 0; i < 12; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}