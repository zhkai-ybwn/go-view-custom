import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Panels08Config: ConfigType = {
  key: 'Panels08',
  chartKey: 'VPanels08',
  conKey: 'VCPanels08',
  title: '面板08',
  category: ChatCategoryEnum.PANELS,
  categoryName: ChatCategoryEnumName.PANELS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'panels07.png'
}
