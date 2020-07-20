import japaneseNumeral from '..'
import { assert } from 'chai'

describe('Tests for japaneseNumeral.', () => {
  it('Japanese numeric should be nomarized.', () => {
    assert.deepEqual(japaneseNumeral.normalize('壱'), '一')
    assert.deepEqual(japaneseNumeral.normalize('貳拾弐'), '二十二')
  });

  it('Japanese numeric should be splited as numbers.', () => {
    assert.deepEqual(japaneseNumeral.splitLargeNumber('一千百十一兆一千百十一億一千百十一万'), { '兆': 1111, '億': 1111, '万': 1111, '千': 0 })
    assert.deepEqual(japaneseNumeral.splitLargeNumber('一千百十一兆二千百十一億三千百十一万'), { '兆': 1111, '億': 2111, '万': 3111, '千': 0 })
  });

  it('Small Japanese numeric should be parsed as numbers.', () => {
    assert.deepEqual(japaneseNumeral.kan2n('一千百十一'), 1111)
    assert.deepEqual(japaneseNumeral.kan2n('千百十一'), 1111)
    assert.deepEqual(japaneseNumeral.kan2n('二千百十一'), 2111)
    assert.deepEqual(japaneseNumeral.kan2n('百十一'), 111)
    assert.deepEqual(japaneseNumeral.kan2n('一百十一'), 111)
    assert.deepEqual(japaneseNumeral.kan2n('六百十一'), 611)
    assert.deepEqual(japaneseNumeral.kan2n('十一'), 11)
    assert.deepEqual(japaneseNumeral.kan2n('十'), 10)
    assert.deepEqual(japaneseNumeral.kan2n('一'), 1)
    assert.deepEqual(japaneseNumeral.kan2n('百'), 100)
    assert.deepEqual(japaneseNumeral.kan2n('千'), 1000)
  });

  it('Japanese numeric should be parsed as numbers.', () => {
    assert.deepEqual(japaneseNumeral.toNumber('一千百十一兆一千百十一億一千百十一万一千百十一'), 1111111111111111)
    assert.deepEqual(japaneseNumeral.toNumber('一千百十一兆一千百十一億一千百十一万'), 1111111111110000)
    assert.deepEqual(japaneseNumeral.toNumber('一千百十一兆一千百十一億一千百十一'), 1111111100001111)
    assert.deepEqual(japaneseNumeral.toNumber('百十一'), 111)
    assert.deepEqual(japaneseNumeral.toNumber('三億八'), 300000008)
    assert.deepEqual(japaneseNumeral.toNumber('三百八'), 308)
    assert.deepEqual(japaneseNumeral.toNumber('三〇八'), 308)
    assert.deepEqual(japaneseNumeral.toNumber('二〇二〇'), 2020)
  });

  it('Japanese string should not be parsed as numbers.', () => {
    assert.deepEqual(japaneseNumeral.toNumber('三あ八'), NaN)
    assert.deepEqual(japaneseNumeral.toNumber('あ'), NaN)
  });
});
