import { Model } from '@mohism/core';
import { TRecordStatus } from '../common/type';

export default Model('record', {
  url: { type: String, default: '' },
  keywords: [
    { word: String, score: Number }
  ],
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  prevContent: { type: String, default: '' },
  status: { type: TRecordStatus, default: TRecordStatus.CREARE }
});