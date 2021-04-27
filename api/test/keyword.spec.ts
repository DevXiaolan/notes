
import { describe, it } from 'mocha';

import Keyword from '../src/handlers/keyword';
import { expect } from 'chai';
import { TestApplication } from '@mohism/core';


describe('jieba', () => {  
  it('test', async () => {
    let app = new TestApplication(`${__dirname}/../src/`);
    await app.bootstrap();
    const r = await Keyword();
    expect(r).instanceOf(Array);
  })
})