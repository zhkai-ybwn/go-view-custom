import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Effects01Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {
    runningStatus: true
  },
  textAlign: 'center', // 水平对齐方式
  rotate: ''
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Effects01Config.key
  public chartConfig = cloneDeep(Effects01Config)
  public attr = { ...chartInitConfig, w: 20, h: 20, zIndex: 1 }
  public option = cloneDeep(option)
}
