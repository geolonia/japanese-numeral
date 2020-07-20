# @geolonia/japanese-numeral

Converts Japanese Kanji numeral to number.

## Installation

```bash
$ npm install @geolonia/japanese-numeral --save
```

## Usage

```javascript
const japaneseNumeral = require('@geolonia/japanese-numeral')

console.log(japaneseNumeral.toNumber('一千百十一兆一千百十一億一千百十一万一千百十一')) // 1111111111111111

// `一千` を `千` と記述しても同じ結果になる。
console.log(japaneseNumeral.toNumber('千百十一兆千百十一億千百十一万千百十一')) // 1111111111111111

// 漢数字のゼロ `〇` を使用することも可能。
console.log(japaneseNumeral.toNumber('二〇二〇')) // 2020

// 判別できないときは `NaN` を返す。
console.log(japaneseNumeral.toNumber('あ')) // NaN
```
