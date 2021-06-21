import { normalize, splitLargeNumber, largeNumbers, n2kan } from './utils'
import { japaneseNumericsRegexes } from './japaneseNumerics'

const K2N_NUMBER_MATCHER = /^[〇一二三四五六七八九]+$/

export function kanji2number(japanese: string) {
  japanese = normalize(japanese)

  if (japanese.match('〇') || japanese.match(K2N_NUMBER_MATCHER)) {
    for (const {regex, number} of japaneseNumericsRegexes) {
      japanese = japanese.replace(regex, number.toString())
    }

    return Number(japanese)
  } else {
    let number = 0
    const numbers = splitLargeNumber(japanese)

    // 万以上の数字を数値に変換
    for (const key in largeNumbers) {
      if (numbers[key]) {
        const n = largeNumbers[key] * numbers[key]
        number = number + n
      }
    }

    if (!Number.isInteger(number) || !Number.isInteger(numbers['千'])) {
      throw new TypeError('The attribute of kanji2number() must be a Japanese numeral as integer.')
    }

    // 千以下の数字を足す
    return number + numbers['千']
  }
}

const NUMBER2KANJI_NUMBER_MATCH = /^[0-9]+$/

export function number2kanji(num: number) {
  if (!num.toString().match(NUMBER2KANJI_NUMBER_MATCH)) {
    throw new TypeError('The attribute of number2kanji() must be integer.')
  }

  let number = num
  let kanji = ''

  // 万以上の数字を漢字に変換
  for (const key in largeNumbers) {
    const n = Math.floor(number / largeNumbers[key])
    if (n) {
      number = number - (n * largeNumbers[key])
      kanji = `${kanji}${n2kan(n)}${key}`
    }
  }

  if (number) {
    kanji = `${kanji}${n2kan(number)}`
  }

  return kanji
}

const num = '([0-9０-９]*)|([〇一二三四五六七八九壱壹弐貳貮参參肆伍陸漆捌玖]*)'
const basePattern = `((${num})(千|阡|仟))?((${num})(百|陌|佰))?((${num})(十|拾))?(${num})?`
const pattern = `((${basePattern}兆)?(${basePattern}億)?(${basePattern}(万|萬))?${basePattern})`
const FIND_KANJI_NUMBERS_REGEX = new RegExp(pattern, 'g')
const NUMBER_MATCHER_REGEX = /^[0-9０-９]+$/

export function findKanjiNumbers(text: string) {
  const match = text.match(FIND_KANJI_NUMBERS_REGEX)
  if (match) {
    return match.filter((item) => {
      if ((! item.match(NUMBER_MATCHER_REGEX)) && (item.length && '兆' !== item && '億' !== item && '万' !== item && '萬' !== item)) {
        return true
      } else {
        return false
      }
    })
  } else {
    return []
  }
}
