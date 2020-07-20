# @geolonia/japanese-numeral

Converts Japanese Kanji numeral to number.

## Installation

```bash
$ npm install @geolonia/japanese-numeral --save
```

## Usage

```javascript
const japaneseNumeral = require('@geolonia/japanese-numeral')

const number = japaneseNumeral.toNumber('一千百十一兆一千百十一億一千百十一万一千百十一)
console.log(number) // 1111111111111111
```
