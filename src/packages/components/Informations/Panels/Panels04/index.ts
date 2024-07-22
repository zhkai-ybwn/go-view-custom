import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Panels04Config: ConfigType = {
  key: 'Panels04',
  chartKey: 'VPanels04',
  conKey: 'VCPanels04',
  title: '面板04',
  category: ChatCategoryEnum.PANELS,
  categoryName: ChatCategoryEnumName.PANELS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'panels04.png'
}
