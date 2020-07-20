import { kanji2number, number2kanji } from '../src'
import { assert } from 'chai'

describe('Tests for japaneseNumeral.', () => {
  it('Japanese numeric should be parsed as numbers.', () => {
    assert.deepEqual(kanji2number('一千百十一兆一千百十一億一千百十一万一千百十一'), 1111111111111111)
    assert.deepEqual(kanji2number('一千百十一兆一千百十一億一千百十一万'), 1111111111110000)
    assert.deepEqual(kanji2number('一千百十一兆一千百十一億一千百十一'), 1111111100001111)
    assert.deepEqual(kanji2number('百十一'), 111)
    assert.deepEqual(kanji2number('三億八'), 300000008)
    assert.deepEqual(kanji2number('三百八'), 308)
    assert.deepEqual(kanji2number('三〇八'), 308)
    assert.deepEqual(kanji2number('二〇二〇'), 2020)
    assert.deepEqual(kanji2number('二千'), 2000)
  });

  it('Number should be converted to Japanese kanji', () => {
    assert.deepEqual(number2kanji(1111111111111111), '千百十一兆千百十一億千百十一万千百十一')
    assert.deepEqual(number2kanji(1111113111111111), '千百十一兆千百三十一億千百十一万千百十一')
    assert.deepEqual(number2kanji(1000000000000000), '千兆')
    assert.deepEqual(number2kanji(1200000), '百二十万')
    assert.deepEqual(number2kanji(18), '十八')
  });

  it('Japanese string should not be parsed as numbers.', () => {
    assert.deepEqual(kanji2number('三あ八'), NaN)
    assert.deepEqual(kanji2number('あ'), NaN)
  });
});
