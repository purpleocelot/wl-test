import { Injectable } from '@nestjs/common';
import { Browser, launch, Page, WaitForSelectorOptions } from 'puppeteer';

@Injectable()
export class ScrapeService {
  private page: Page;
  private browser: Browser;
  private readonly maxTimeOut: number = 20000;

  async loadPage(url: string): Promise<void> {
    this.browser = await launch();
    this.page = await this.browser.newPage();
    await this.page.goto(url);
    this.page.setDefaultTimeout(this.maxTimeOut);
  }

  async closePage(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async waitForElement(
    selector: string,
    options: WaitForSelectorOptions = {},
  ): Promise<void> {
    await this.page.waitForSelector(selector, options);
  }

  async getAllTextContent(selector: string): Promise<string[] | null> {
    await this.waitForElement(selector);
    return await this.page.$$eval(selector, (elements: HTMLElement[]) =>
      elements.map((el) => el.textContent),
    );
  }
}
