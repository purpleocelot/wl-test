import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ParserService } from './services/parser.service';
import { ScrapeService } from './services/scrape.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, ScrapeService, ParserService],
})
export class AppModule {}
