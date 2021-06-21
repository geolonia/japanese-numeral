type oldJapaneseNumericsRegexType = { replacement: string, regex: RegExp }[]

export const oldJapaneseNumericsRegex: oldJapaneseNumericsRegexType = [
  { regex: new RegExp('零', 'g'), replacement: '〇'},
  { regex: new RegExp('壱', 'g'), replacement: '一'},
  { regex: new RegExp('壹', 'g'), replacement: '一'},
  { regex: new RegExp('弐', 'g'), replacement: '二'},
  { regex: new RegExp('貳', 'g'), replacement: '二'},
  { regex: new RegExp('貮', 'g'), replacement: '二'},
  { regex: new RegExp('参', 'g'), replacement: '三'},
  { regex: new RegExp('參', 'g'), replacement: '三'},
  { regex: new RegExp('肆', 'g'), replacement: '四'},
  { regex: new RegExp('伍', 'g'), replacement: '五'},
  { regex: new RegExp('陸', 'g'), replacement: '六'},
  { regex: new RegExp('漆', 'g'), replacement: '七'},
  { regex: new RegExp('捌', 'g'), replacement: '八'},
  { regex: new RegExp('玖', 'g'), replacement: '九'},
  { regex: new RegExp('拾', 'g'), replacement: '十'},
  { regex: new RegExp('廿', 'g'), replacement: '二十'},
  { regex: new RegExp('陌', 'g'), replacement: '百'},
  { regex: new RegExp('佰', 'g'), replacement: '百'},
  { regex: new RegExp('阡', 'g'), replacement: '千'},
  { regex: new RegExp('仟', 'g'), replacement: '千'},
  { regex: new RegExp('萬', 'g'), replacement: '万'},
]

type oldJapaneseNumericsType = { [key: string]: string }

const oldJapaneseNumerics: oldJapaneseNumericsType = {
  零: '〇',
  壱: '一',
  壹: '一',
  弐: '二',
  貳: '二',
  貮: '二',
  参: '三',
  參: '三',
  肆: '四',
  伍: '五',
  陸: '六',
  漆: '七',
  捌: '八',
  玖: '九',
  拾: '十',
  廿: '二十',
  陌: '百',
  佰: '百',
  阡: '千',
  仟: '千',
  萬: '万',
}

export default oldJapaneseNumerics
