import { oldJapaneseNumericsRegex } from './oldJapaneseNumerics'
import japaneseNumerics from './japaneseNumerics'

type NumHash = {
  [key: string]: number;
}

type NumberRegex = {
  regex: RegExp,
  number: number,
  key: string,
}[]

export const largeNumbers: NumHash = { '兆': 1000000000000, '億': 100000000, '万': 10000 }
export const smallNumbers: NumHash = { '千': 1000, '百': 100, '十': 10 }
const largeNumberRegexes: NumberRegex = Object.keys(largeNumbers).map(key => ({
  regex: new RegExp(`(.+)${key}`),
  number: largeNumbers[key],
  key,
}))
const smallNumberRegexes: NumberRegex = Object.keys(smallNumbers).map(key => ({
  regex: new RegExp(`(.*)${key}`),
  number: smallNumbers[key],
  key,
}))

export function normalize(japanese: string) {
  for (const { regex, replacement } of oldJapaneseNumericsRegex) {
    japanese = japanese.replace(regex, replacement)
  }
  return japanese
}

/**
 * 漢数字を兆、億、万単位に分割する
 */
export function splitLargeNumber(japanese: string) {
  let kanji = japanese
  const numbers: NumHash = {}
  for (const { regex, key } of largeNumberRegexes) {
    const match = kanji.match(regex)
    if (match) {
      numbers[key] = kan2n(match[1])
      kanji = kanji.replace(match[0], '')
    } else {
      numbers[key] = 0
    }
  }

  if (kanji) {
    numbers['千'] = kan2n(kanji)
  } else {
    numbers['千'] = 0
  }

  return numbers
}

const KAN2N_NUMBER_MATCHER = /^[0-9]+$/

/**
 * 千単位以下の漢数字を数字に変換する（例: 三千 => 3000）
 *
 * @param japanese
 */
export function kan2n(japanese: string) {
  if (japanese.match(KAN2N_NUMBER_MATCHER)) {
    return Number(japanese)
  }

  let kanji = zen2han(japanese)
  let number = 0
  for (const { regex, number: matchedNumber } of smallNumberRegexes) {
    const match = kanji.match(regex)
    if (match) {
      let n = 1
      if (match[1]) {
        if (match[1].match(KAN2N_NUMBER_MATCHER)) {
          n = Number(match[1])
        } else {
          n = japaneseNumerics[match[1]]
        }
      }

      number = number + (n * matchedNumber)

      kanji = kanji.replace(match[0], '')
    }
  }

  if (kanji) {
    if (kanji.match(KAN2N_NUMBER_MATCHER)) {
      number = number + Number(kanji)
    } else {
      number = number + japaneseNumerics[kanji]
    }
  }

  return number
}

/**
 * Converts number less than 10000 to kanji.
 *
 * @param num
 */
export function n2kan(num: number) {
  const kanjiNumbers = Object.keys(japaneseNumerics)
  let number = num
  let kanji = ''
  for (const key in smallNumbers) {
    const n = Math.floor(number / smallNumbers[key])
    if (n) {
      number = number - (n * smallNumbers[key])
      if (1 === n) {
        kanji = `${kanji}${key}`
      } else {
        kanji = `${kanji}${kanjiNumbers[n]}${key}`
      }
    }
  }

  if (number) {
    kanji = `${kanji}${kanjiNumbers[number]}`
  }

  return kanji
}

/**
 * Converts double-width number to number as string.
 *
 * @param num
 */
export function zen2han(str: string) {
  return str.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}
