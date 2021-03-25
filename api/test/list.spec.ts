
import { describe, it } from 'mocha';

import List from '../src/handlers/list';
import { expect } from 'chai';
import { TestApplication } from '@mohism/core';

describe('jieba', () => {

  it('test', async () => {
    let app = new TestApplication(`${__dirname}/../src/`);
    await app.bootstrap();
    const r = await List();
    expect(r).instanceOf(Array);
  })
})