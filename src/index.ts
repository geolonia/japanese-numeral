import oldJapaneseNumerics from './oldJapaneseNumerics'
import japaneseNumerics from './japaneseNumerics'

type NumHash = {
  [key: string]: number;
}

const largeNumbers: NumHash = { '兆': 1000000000000, '億': 100000000, '万': 10000 }
const smallNumbers: NumHash = { '千': 1000, '百': 100, '十': 10 }

const japaneseNumeral = {
  toNumber: (japanese: string) => {
    const numbers = japaneseNumeral.splitLargeNumber(japaneseNumeral.normalize(japanese))
    let number = 0

    // 万以上の数字を数値に変換
    for (const key in largeNumbers) {
      if (numbers[key]) {
        const n = largeNumbers[key] * numbers[key]
        number = number + n
      }
    }

    // 千以下の数字を足す
    number = number + numbers['千']

    return number
  },

  normalize: (japanese: string) => {
    for (const key in oldJapaneseNumerics) {
      const reg = new RegExp(key, 'g')
      japanese = japanese.replace(reg, oldJapaneseNumerics[key])
    }
    return japanese
  },

  /**
   * 漢数字を兆、億、万単位に分割する
   */
  splitLargeNumber: (japanese: string) => {
    let kanji = japanese
    const numbers:NumHash = {}
    for (const key in largeNumbers) {
      const reg = new RegExp(`(.+)${key}`)
      const match = kanji.match(reg)
      if (match) {
        numbers[key] = japaneseNumeral.kan2n(match[1])
        kanji = kanji.replace(match[0], '')
      } else {
        numbers[key] = 0
      }
    }

    if (kanji) {
      numbers['千'] = japaneseNumeral.kan2n(kanji)
    } else {
      numbers['千'] = 0
    }

    return numbers
  },

  /**
   * 千単位以下の漢数字を数字に変換する（例: 三千 => 3000）
   */
  kan2n: (japanese: string) => {
    let kanji = japanese
    let number = 0
    for (const key in smallNumbers) {
      const reg = new RegExp(`(.*)${key}`)
      const match = kanji.match(reg)
      if (match) {
        let n = 1
        if (match[1]) {
          n = japaneseNumerics[match[1]]
        }

        number = number + (n * smallNumbers[key])

        kanji = kanji.replace(match[0], '')
      }
    }

    if (kanji) {
      number = number + japaneseNumerics[kanji]
    }

    return number
  }
}

export default japaneseNumeral
