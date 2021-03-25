
import { assert } from 'chai';
import { readFileSync } from 'fs';
import { describe, it } from 'mocha';
import keyword from '../src/utils/jieba';

const content = readFileSync(`${__dirname}/cases/1.md`).toString();

describe('jieba', () => {
  it('extract', () => {
    assert.deepEqual(
      keyword(content),
      [
        ['nginx', 129.13124737791895],
        ['js', 117.39204307083543],
        ['接口', 86.8574189437],
        ['auth', 82.1744301495848],
        ['njs', 58.69602153541771],
        ['https', 46.95681722833417],
        ['conf', 46.95681722833417],
        ['请求', 42.69054004182],
        ['登录', 41.41953277155],
        ['330', 35.21761292125063]
      ],
    )
  });
})