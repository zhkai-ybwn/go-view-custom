import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Panels05Config: ConfigType = {
  key: 'Panels05',
  chartKey: 'VPanels05',
  conKey: 'VCPanels05',
  title: '面板05',
  category: ChatCategoryEnum.PANELS,
  categoryName: ChatCategoryEnumName.PANELS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'panels05.png'
}
