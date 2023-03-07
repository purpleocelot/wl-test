import { Injectable } from '@nestjs/common';

import { ProductOption } from '../models/product-option.model';
import { RawData } from '../models/raw-data.model';
import { ParserService } from './parser.service';
import { ScrapeService } from './scrape.service';

@Injectable()
export class AppService {
  constructor(
    private scrapeService: ScrapeService,
    private parserService: ParserService,
  ) {}

  async start(): Promise<ProductOption[]> {
    const rawData = await this.getProducts();
    let products = this.parserService.parse(rawData);
    products = this.sort(products);
    this.displayProducts(products);
    return products;
  }

  async getProducts(): Promise<RawData> {
    const url = 'https://wltest.dns-systems.net';
    await this.scrapeService.loadPage(url);

    const result: RawData = {
      titles: await this.scrapeService.getAllTextContent('div.header h3'),
      descriptions: await this.scrapeService.getAllTextContent(
        'div.package-description',
      ),
      prices: await this.scrapeService.getAllTextContent('span.price-big'),
      discounts: await this.scrapeService.getAllTextContent('.package-price'),
    };

    await this.scrapeService.closePage();

    return result;
  }

  displayProducts(products: ProductOption[]): void {
    console.log(products);
  }

  sort(products: ProductOption[]): ProductOption[] {
    return [...products].sort(
      (a, b) => this.getAnnualPrice(b) - this.getAnnualPrice(a),
    );
  }

  getAnnualPrice(product: ProductOption): number {
    return product.title.includes('Year')
      ? product.price
      : this.toCurrency(product.price * 12);
  }

  toCurrency(value: number): number {
    return Number(Math.round(+`${value}e2`) + 'e-2');
  }
}
