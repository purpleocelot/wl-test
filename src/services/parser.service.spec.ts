import { ParserService } from './parser.service';
import { rawData as rawDataMock } from '../mocks/raw-data';
import { products as productsMock } from '../mocks/products';

describe('ParserService', () => {
  let parserService: ParserService;

  beforeEach(async () => {
    parserService = new ParserService();
  });

  describe('toNumber', () => {
    it('should convert a currency string to a number', () => {
      expect(parserService.toNumber('£12.34')).toEqual(12.34);
    });
  });

  describe('getDiscount', () => {
    it('should extract the discount value when it is a yearly plan', () => {
      const result = parserService.getDiscount(
        'blah blah Save £12.34 blah blah',
        'Some Title Year Plan',
      );
      expect(result).toEqual(12.34);
    });

    it('should return 0 when no discount value in a yearly plan', () => {
      const result = parserService.getDiscount(
        'blah blah Save nothing blah blah',
        'Some Title Year Plan',
      );
      expect(result).toEqual(0);
    });

    it('should return null when it is a monthly plan', () => {
      const result = parserService.getDiscount(
        'blah blah Save nothing blah blah',
        'Some Title Month Plan',
      );
      expect(result).toBeFalsy();
    });
  });

  describe('parse', () => {
    it('should return null when it is a monthly plan', () => {
      const result = parserService.parse(rawDataMock);
      result.forEach((product, index) => {
        expect(product.title).toEqual(productsMock[index].title);
        expect(product.description).toEqual(productsMock[index].description);
        expect(product.price).toEqual(productsMock[index].price);
        expect(product.discount).toEqual(productsMock[index].discount);
      });
    });
  });
});
