import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels06Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: ['25.7 ℃', '25.7 bar', '504.3 m³/h'],
  name: '低温回水',
  textAlign: 'center' // 水平对齐方式
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels06Config.key
  public chartConfig = cloneDeep(Panels06Config)
  public attr = { ...chartInitConfig, w: 140, h: 60, zIndex: 1 }
  public option = cloneDeep(option)
}
