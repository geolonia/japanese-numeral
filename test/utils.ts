import { n2kan } from '../src/utils'
import { assert } from 'chai'

describe('Tests for utils.', () => {
  it('Small Japanese numeric should be parsed as numbers.', () => {
    assert.deepEqual(n2kan(1111), '千百十一')
    assert.deepEqual(n2kan(3111), '三千百十一')
    assert.deepEqual(n2kan(1000), '千')
    assert.deepEqual(n2kan(5), '五')
  });
});
