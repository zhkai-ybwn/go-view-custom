import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { Tables01Config } from './index'

export const option = {
  textAlign: 'center', // 水平对齐方式
  dataset: {
    instantCooling: 0,
    instantChilledTC: 0,
    instantCoolingTC: 0,
    totalCooling: 0,
    totalChilledTC: 0,
    totalCoolingTC: 0
  },
  dimensions: '制冷量 (kWh),冷水输送系数,冷却水输送系数,瞬时,累计',
  isLinkage: true,
  linkageText: '运行'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Tables01Config.key
  public attr = { ...chartInitConfig, w: 600, h: 300, zIndex: -1 }
  public chartConfig = cloneDeep(Tables01Config)
  public option = cloneDeep(option)
}
