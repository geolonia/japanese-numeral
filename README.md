# @geolonia/japanese-numeral

Converts Japanese Kanji numeral <=> number.

## Installation

```bash
$ npm install @geolonia/japanese-numeral --save
```

## Usage

### kanji2number()

Converts Japanese Kanji numeral to number.

```javascript
import { kanji2number, number2kanji } from '@geolonia/japanese-numeral'

console.log(kanji2number('一千百十一兆一千百十一億一千百十一万一千百十一')) // 1111111111111111

// `一千` を `千` と記述しても同じ結果になる。
console.log(kanji2number('千百十一兆千百十一億千百十一万千百十一')) // 1111111111111111

// 漢数字のゼロ `〇` を使用することも可能。
console.log(kanji2number('二〇二〇')) // 2020
```

### number2kanji

Converts number to Japanese Kanji numeral.

```javascript
import { kanji2number, number2kanji } from '@geolonia/japanese-numeral'

console.log(number2kanji(1111111111111111)) // 千百十一兆千百十一億千百十一万千百十一
```

## License

[MIT](LICENSE)
