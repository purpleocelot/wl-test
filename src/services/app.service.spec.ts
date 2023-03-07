import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { AppService } from './app.service';
import { ParserService } from './parser.service';
import { ScrapeService } from './scrape.service';
import { products as productsMock } from '../mocks/products';

describe('AppService', () => {
  let appService: AppService;
  let scrapeService: DeepMocked<ScrapeService>;
  let parserService: DeepMocked<ParserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    })
      .useMocker(createMock)
      .compile();

    appService = module.get<AppService>(AppService);
    scrapeService = module.get(ScrapeService);
    parserService = module.get(ParserService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('start', () => {
    it('should correctly round up to 2 decimal places', async () => {
      scrapeService.getAllTextContent.mockResolvedValue(['abc', 'def', 'ghi']);
      parserService.parse.mockReturnValue(productsMock);

      const result = await appService.start();
      expect(result[0].description).toEqual('aaa');
      expect(result[1].description).toEqual('ccc');
      expect(result[2].description).toEqual('bbb');
    });
  });

  describe('getProducts', () => {
    it('should correctly round up to 2 decimal places', async () => {
      scrapeService.getAllTextContent.mockResolvedValue(['abc', 'def', 'ghi']);
      const result = await appService.getProducts();

      expect(result.titles[0]).toEqual('abc');
      expect(result.titles[1]).toEqual('def');
      expect(result.titles[2]).toEqual('ghi');
      expect(result.descriptions[0]).toEqual('abc');
      expect(result.prices[0]).toEqual('abc');
      expect(result.discounts[0]).toEqual('abc');
    });
  });

  describe('getAnnualPrice', () => {
    it('should convert a monthly price to annual', () => {
      const result = appService.getAnnualPrice(productsMock[0]);
      expect(result).toEqual(148.08);
    });

    it('should just return the price when it is yearly', () => {
      const result = appService.getAnnualPrice(productsMock[1]);
      expect(result).toEqual(56.78);
    });
  });

  describe('toCurrency', () => {
    it('should correctly round up to 2 decimal places', () => {
      const result = appService.toCurrency(1.555555);
      expect(result).toEqual(1.56);
    });
  });

  describe('sort', () => {
    it('should sort the products by descending annual price', () => {
      const result = appService.sort(productsMock);
      expect(result[0].price).toEqual(12.34);
      expect(result[1].price).toEqual(90.12);
      expect(result[2].price).toEqual(56.78);
    });
  });
});
