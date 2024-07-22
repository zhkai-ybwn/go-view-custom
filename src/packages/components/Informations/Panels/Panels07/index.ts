import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Panels07Config: ConfigType = {
  key: 'Panels07',
  chartKey: 'VPanels07',
  conKey: 'VCPanels07',
  title: '面板07',
  category: ChatCategoryEnum.PANELS,
  categoryName: ChatCategoryEnumName.PANELS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'panels07.png'
}
