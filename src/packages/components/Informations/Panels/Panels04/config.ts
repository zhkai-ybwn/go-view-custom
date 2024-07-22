import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels04Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: [
    {
      title: '冷水机组',
      percent: '75.3%',
      value: '808.1 kWh'
    },
    {
      title: '冷水泵',
      percent: '11.2%',
      value: '133.1 kWh'
    },
    {
      title: '冷却水泵',
      percent: '9.7%',
      value: '111.3 kWh'
    },
    {
      title: '冷水机组',
      percent: '3.9%',
      value: '44.5 kWh'
    }
  ],
  textAlign: 'center', // 水平对齐方式
  isLinkage: true,
  linkageText: '运行'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels04Config.key
  public chartConfig = cloneDeep(Panels04Config)
  public attr = { ...chartInitConfig, w: 140, h: 60, zIndex: 1 }
  public option = cloneDeep(option)
}
