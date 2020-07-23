import { kanji2number, number2kanji, findKanjiNumbers } from '../src'
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
    assert.deepEqual(kanji2number('壱万'), 10000)
  });

  it('Number should be converted to Japanese kanji', () => {
    assert.deepEqual(number2kanji(1111111111111111), '千百十一兆千百十一億千百十一万千百十一')
    assert.deepEqual(number2kanji(1111113111111111), '千百十一兆千百三十一億千百十一万千百十一')
    assert.deepEqual(number2kanji(1000000000000000), '千兆')
    assert.deepEqual(number2kanji(1200000), '百二十万')
    assert.deepEqual(number2kanji(18), '十八')
    assert.deepEqual(number2kanji(100100000), '一億十万')
  });

  it('should returns the instance of TypeError', () => {
    // @ts-ignore
    assert.throws(() => number2kanji('hello'), TypeError)

    // @ts-ignore
    assert.throws(() => kanji2number('三あ八'), TypeError)

    // @ts-ignore
    assert.throws(() => kanji2number('あ'), TypeError)
  });

  it('should find Japanese Kanji numbers.', () => {
    assert.deepEqual([ '二千二十', '十一', '二十' ], findKanjiNumbers('今日は二千二十年十一月二十日です。'))
    assert.deepEqual([ '二〇二〇', '十一', '二十' ], findKanjiNumbers('今日は二〇二〇年十一月二十日です。'))
    assert.deepEqual([ '二千二十億' ], findKanjiNumbers('わたしは二千二十億円もっています。'))
    assert.deepEqual([ '二〇二〇億' ], findKanjiNumbers('わたしは二〇二〇億円もっています。'))
    assert.deepEqual([ '八百六十三' ], findKanjiNumbers('今日のランチは八百六十三円でした。'))
    assert.deepEqual([ '八六三' ], findKanjiNumbers('今日のランチは八六三円でした。'))
    assert.deepEqual([ '三千' ], findKanjiNumbers('今月のお小遣いは三千円です。'))
  })
});
