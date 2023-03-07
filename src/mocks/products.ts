import { ProductOption } from '../models/product-option.model';

export const products: ProductOption[] = [
  // eslint-disable-next-line prettier/prettier
  { title: 'Foo Months', description: 'aaa', price: 12.34, discount: null },
  { title: 'bar Year', description: 'bbb', price: 56.78, discount: 0 },
  { title: 'baz Year', description: 'ccc', price: 90.12, discount: 1.27 },
];
