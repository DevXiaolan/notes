
// Crawler

import { IRecord, TRecordStatus } from "../common/type";
import puppeteer from 'puppeteer';
import { useModel } from "@mohism/core";
import jieba from "./jieba";

export default class Crawler {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async fetch(): Promise<IRecord> {
    const browser = await puppeteer.launch({ slowMo: 1000 });
    const page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForTimeout(1000);
    const title = await page.title();
    const ctx = await page.$eval('body', el => el.innerHTML);
    const text = await page.$eval('body', el => el.textContent as string);
    
    const keywords = jieba(title,text);
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