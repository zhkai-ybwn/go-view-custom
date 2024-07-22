import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Panels03Config } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: '10.00',
  infoName: '我是名称',
  showIcon: false,
  textAlign: 'center', // 水平对齐方式
  isLinkage: true,
  linkageText: '运行'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Panels03Config.key
  public chartConfig = cloneDeep(Panels03Config)
  public attr = { ...chartInitConfig, w: 140, h: 60, zIndex: 1 }
  public option = cloneDeep(option)
}
