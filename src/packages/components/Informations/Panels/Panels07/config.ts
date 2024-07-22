import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels07Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {
    instantPower: '25.7 kW',
    runningStatus: true,
    frequency: '',
    load: '',
    hasAlarmFlag: false
  },
  name: '#1',
  textAlign: 'center' // 水平对齐方式
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels07Config.key
  public chartConfig = cloneDeep(Panels07Config)
  public attr = { ...chartInitConfig, w: 53, h: 36, zIndex: 1 }
  public option = cloneDeep(option)
}
