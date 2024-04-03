
import { Product } from '../models/product.type'
export function productsMockFactory(ammount?: number): Product[] {
	const collection = [];

	for (let i = 0; i < ammount; i++) {
		collection.push(singleProductFactory(i))
	}

	return collection;
}

export function singleProductFactory(index?: number): Product {
	const uniqueText = index ? ` ${index}` : '';
	const addedPrice = index ? index : 0;

	return {
		id: generateBillionId(),
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