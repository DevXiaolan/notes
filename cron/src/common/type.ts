import { Document } from 'mongoose';

export interface IKeyword {
  word: string;
  score: number;
}

export interface IRecord extends Document {
  url: string;
  status: TRecordStatus;
  keywords?: IKeyword[];
  title?: string;
  content?: string;
  prevContent?: string;
}

export enum TRecordStatus {
  CREARE,         // 创建
  OK,             // 正常
  OUT_OF_DATE,    // 过期 （没有找到最新版本，使用上一个版本内容）
  FINAL,          // 归档，不再爬取（特定情况下设置）
}