export interface IRecord {
  url: string;
  status: TRecordStatus;
  keywords?: string[];
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

export interface IBlack {
  word: string; // 禁用词
  score: number;// 分数修正系数
}