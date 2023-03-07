import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/services/app.service';

describe('AppController (e2e)', () => {
  let nestApp: INestApplication;
  jest.setTimeout(20000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    nestApp = moduleFixture.createNestApplication();
    await nestApp.init();
  });

  it('app.start', async () => {
    const appService = nestApp.get(AppService);
    const result = await appService.start();

    expect(result.length).toEqual(6);
    expect(result[0].title).toEqual('Optimum: 2 GB Data - 12 Months');
    expect(result[5].title).toEqual('Basic: 6GB Data - 1 Year');
  });
});
