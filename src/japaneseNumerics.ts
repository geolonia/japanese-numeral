type japaneseNumericsRegexType = { number: number, regex: RegExp }[]

export const japaneseNumericsRegexes: japaneseNumericsRegexType = [
  { regex: new RegExp('〇', 'g'), number: 0 },
  { regex: new RegExp('一', 'g'), number: 1 },
  { regex: new RegExp('二', 'g'), number: 2 },
  { regex: new RegExp('三', 'g'), number: 3 },
  { regex: new RegExp('四', 'g'), number: 4 },
  { regex: new RegExp('五', 'g'), number: 5 },
  { regex: new RegExp('六', 'g'), number: 6 },
  { regex: new RegExp('七', 'g'), number: 7 },
  { regex: new RegExp('八', 'g'), number: 8 },
  { regex: new RegExp('九', 'g'), number: 9 },
  { regex: new RegExp('０', 'g'), number: 0 },
  { regex: new RegExp('１', 'g'), number: 1 },
  { regex: new RegExp('２', 'g'), number: 2 },
  { regex: new RegExp('３', 'g'), number: 3 },
  { regex: new RegExp('４', 'g'), number: 4 },
  { regex: new RegExp('５', 'g'), number: 5 },
  { regex: new RegExp('６', 'g'), number: 6 },
  { regex: new RegExp('７', 'g'), number: 7 },
  { regex: new RegExp('８', 'g'), number: 8 },
  { regex: new RegExp('９', 'g'), number: 9 },
]

type japaneseNumericsType = { [key: string]: number }
const japaneseNumerics: japaneseNumericsType = {
  '〇': 0,
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '０': 0,
  '１': 1,
  '２': 2,
  '３': 3,
  '４': 4,
  '５': 5,
  '６': 6,
  '７': 7,
  '８': 8,
  '９': 9,
}

export default japaneseNumerics
