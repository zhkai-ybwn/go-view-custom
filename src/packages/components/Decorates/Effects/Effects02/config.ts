import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Effects02Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {
    runningStatus: true
  },
  textAlign: 'center' // 水平对齐方式
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Effects02Config.key
  public chartConfig = cloneDeep(Effects02Config)
  public attr = { ...chartInitConfig, w: 20, h: 20, zIndex: 1 }
  public option = cloneDeep(option)
}
