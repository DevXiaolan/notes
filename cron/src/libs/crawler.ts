
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
  constructor(url: string) {
    this.url = url;
  }

  getSelector(): string {
    const key = Object.keys(SPEC_SELECTOR).find(key => {
      return this.url.includes(key);
    })
    return key ? SPEC_SELECTOR[key] : 'body';
  }

  async fetch(): Promise<IRecord> {
    const browser = await puppeteer.launch({ slowMo: 1000 });
    const page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForTimeout(1000);
    const title = await page.title();
    const ctx = await page.$eval('body', el => el.innerHTML);

    const text = await page.$eval(this.getSelector(), el => el.innerHTML as string);
    const mKeyword = await page.$eval('head>meta[name=keywords]', el => el?.getAttribute('content')).catch(() => '');

    const keywords = await jieba(title, text, { keyword: mKeyword });
    
    await useModel('record').updateOne({ url: this.url }, {
      $set: {
        content: ctx,
        title,
        keywords,
        status: TRecordStatus.OK,
      },
    });
    await browser.close()

    return {} as IRecord;
  }
}