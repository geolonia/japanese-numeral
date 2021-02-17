import { normalize, splitLargeNumber, largeNumbers, n2kan } from './utils'
import japaneseNumerics from './japaneseNumerics'

export function kanji2number(japanese: string) {
  japanese = normalize(japanese)

  if (japanese.match('〇') || japanese.match(/^[〇一二三四五六七八九]+$/)) {
    for (const key in japaneseNumerics) {
      const reg = new RegExp(key, 'g')
      japanese = japanese.replace(reg, japaneseNumerics[key].toString())
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


export function number2kanji(num: number) {
  if (!num.toString().match(/^[0-9]+$/)) {
    throw new TypeError('The attribute of number2kanji() must be integer.')
  }

  const kanjiNumbers = Object.keys(japaneseNumerics)
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

export function findKanjiNumbers(text: string) {
  const basePattern = '([一二三四五六七八九]+千)?([一二三四五六七八九]*百)?([一二三四五六七八九]*十)?([〇一二三四五六七八九]+)?'
  const pattern = `(${basePattern}兆)?(${basePattern}億)?(${basePattern}万)?${basePattern}`
  const regex = new RegExp(pattern, 'g')
  const match = text.match(regex)
  if (match) {
    return match.filter((item) => {
      if (item.length) {
        return true
      } else {
        return false
      }
    })
  } else {
    return []
  }
}
