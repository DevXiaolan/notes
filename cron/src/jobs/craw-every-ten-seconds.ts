import { ICronexpr, useModel } from "@mohism/core";
import { IRecord, TRecordStatus } from '../common/type';
import Crawler from "../libs/crawler";
import { Logger } from '@mohism/utils';

const logger = Logger();

export default {
  name: 'craw every 10 seconds',
  expr: '*/10 * * * * *',
  immediate: false,
  func: async () => {
    const record = await useModel<IRecord>('record').findOne({ status: TRecordStatus.CREARE });
    // const record = await useModel<IRecord>('record').findOne({ url: 'https://lanhao.name/blog/331' });
    if (record !== null) {
      const { url } = record as IRecord;
      const crawler = new Crawler(url);
      try{
        await crawler.fetch();
      }catch(e){
        logger.err(`ERR: ${e.message}`);
      }
      logger.info('Success! 🔥')
    } else {
      logger.info('Record not found.')
    }
    logger.info('Run every 10 seconds');
  }
} as ICronexpr;