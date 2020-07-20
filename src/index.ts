import { normalize, splitLargeNumber, largeNumbers, n2kan } from './utils'
import japaneseNumerics from './japaneseNumerics'

export function kanji2number(japanese: string) {
  japanese = normalize(japanese)

  if (japanese.match('〇')) {
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

    // 千以下の数字を足す
    return number + numbers['千']
  }
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
