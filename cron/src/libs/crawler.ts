
// Crawler

import { IRecord, TRecordStatus } from "../common/type";
import puppeteer from 'puppeteer';
import { useModel } from "@mohism/core";
import jieba from "./jieba";
import { Dict } from '@mohism/utils';

const SPEC_SELECTOR: Dict<string> = {
  'jianshu.com': 'article',
  'juejin.im': '.article-content',
  'juejin.cn': '.article-content',
};

export default class Crawler {
  url: string;
  record: IRecord;
  constructor(record: IRecord) {
    this.url = record.url;
    this.record = record;
  }

  getSelector(): string {
    const key = Object.keys(SPEC_SELECTOR).find(key => {
      return this.url.includes(key);
    })
    return key ? SPEC_SELECTOR[key] : 'body';
  }

  async fetch(): Promise<IRecord> {
    let title, ctx, text, mKeyword;
    if (!this.record.content) {
      const browser = await puppeteer.launch({ slowMo: 1000 });
      const page = await browser.newPage();
      await page.goto(this.url);
      await page.waitForTimeout(1000);
      title = await page.title();
      ctx = await page.$eval('body', el => el.innerHTML);

      text = await page.$eval(this.getSelector(), el => el.innerHTML as string);
      mKeyword = await page.$eval('head>meta[name=keywords]', el => el?.getAttribute('content')).catch(() => '');
      await browser.close()
    } else {
      title = this.record.title;
      ctx = this.record.content;
      text = this.record.text;
      mKeyword = this.record.pageKeywords;
    }
    const keywords = await jieba(title as string, text as string, { keyword: mKeyword });

    await useModel('record').updateOne({ url: this.url }, {
      $set: {
        content: ctx,
        title,
        text,
        pageKeywords: mKeyword,
        keywords,
        status: TRecordStatus.OK,
      },
    });


    return {} as IRecord;
  }
}