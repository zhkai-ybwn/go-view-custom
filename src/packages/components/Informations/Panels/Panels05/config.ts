import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels05Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {
    instantPower: '25.7 kW',
    runningStatus: true,
    frequency: '34.6 Hz',
    load: '',
    hasAlarmFlag: false
  },
  name: '#1',
  textAlign: 'center' // 水平对齐方式
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels05Config.key
  public chartConfig = cloneDeep(Panels05Config)
  public attr = { ...chartInitConfig, w: 80, h: 36, zIndex: 1 }
  public option = cloneDeep(option)
}
