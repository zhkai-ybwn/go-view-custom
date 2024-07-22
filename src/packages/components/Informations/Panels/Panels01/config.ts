import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels01Config } from './index'
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
  dataset: {
    avgCop: '8.91',
    deviceId: 2,
    deviceName: '设备名称',
    frequency: '0.00',
    instantCop: '0.00',
    instantPower: '0.1',
    pointDetailVoList: [
      {
        alarmLevel: {
          code: 0,
          mes: '',
          value: 0
        },
        alarmTitle: ''
      }
    ],
    runningStatus: false
  },
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
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels01Config.key
  public chartConfig = cloneDeep(Panels01Config)
  public attr = { ...chartInitConfig, w: 300, h: 120, zIndex: 1 }
  public option = cloneDeep(option)
}
