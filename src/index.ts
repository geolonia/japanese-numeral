import { normalize, splitLargeNumber, largeNumbers, n2kan } from './utils'
import japaneseNumerics from './japaneseNumerics'

export function kanji2number(japanese: string) {
  japanese = normalize(japanese)
  let number = 0

  if (japanese.match('〇')) {
    let _num = ''
    for (const key in japaneseNumerics) {
      const reg = new RegExp(key, 'g')
      japanese = japanese.replace(reg, japaneseNumerics[key].toString())
    }

    number = Number(japanese)
  } else {
    const numbers = splitLargeNumber(japanese)

    // 万以上の数字を数値に変換
    for (const key in largeNumbers) {
      if (numbers[key]) {
        const n = largeNumbers[key] * numbers[key]
        number = number + n
      }
    }

    // 千以下の数字を足す
    number = number + numbers['千']
  }

  return number
}


export function number2kanji(num: number) {
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
