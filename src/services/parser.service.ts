import { Injectable } from '@nestjs/common';

import { RawData } from '../models/raw-data.model';
import { ProductOption } from '../models/product-option.model';

@Injectable()
export class ParserService {
  parse(rawData: RawData): ProductOption[] {
    return rawData.titles.map((title, index) => {
      return {
        title: title,
        description: rawData.descriptions[index],
        price: this.toNumber(rawData.prices[index]),
        discount: this.getDiscount(rawData.discounts[index], title),
      } as ProductOption;
    });
  }

  toNumber(value: string): number {
    return Number(value.replace('£', ''));
  }

  getDiscount(value: string, title: string): number | null {
    const extractDiscountRegEx = /(?<=Save £)[0-9]{1,3}\.[0-9]{2}/gi;

    if (title.includes('Months')) {
      return null;
    }
    const matches = value.match(extractDiscountRegEx);
    return matches?.length ? Number(matches[0]) : 0;
  }
}
