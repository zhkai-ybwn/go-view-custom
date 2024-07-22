import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Chiller01Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export enum WritingModeEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直'
}

export const WritingModeObject = {
  [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
  [WritingModeEnum.VERTICAL]: 'vertical-rl'
}

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗'
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  link: '',
  linkHead: 'http://',
  dataset: [
    {
      title: '湿球温度',
      value: null,
      unit: '℃'
    },
    {
      title: '露点温度',
      value: null,
      unit: '℃'
    },
    {
      title: '绝对湿度',
      value: null,
      unit: '%'
    },
    {
      title: '焓值',
      value: null,
      unit: 'kJ/kg'
    }
  ],
  fontSize: 20,
  fontColor: '#ffffff',
  paddingX: 10,
  paddingY: 10,
  textAlign: 'center', // 水平对齐方式
  fontWeight: 'normal',

  // 边框
  borderWidth: 0,
  borderColor: '#ffffff',
  borderRadius: 5,

  // 字间距
  letterSpacing: 5,
  writingMode: 'horizontal-tb',
  backgroundColor: '#00000000',
  isLinkage: true,
  linkageText: '运行'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Chiller01Config.key
  public chartConfig = cloneDeep(Chiller01Config)
  public attr = { ...chartInitConfig, w: 300, h: 120, zIndex: 1 }
  public option = cloneDeep(option)
}
