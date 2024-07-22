import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Panels02Config: ConfigType = {
  key: 'Panels02',
  chartKey: 'VPanels02',
  conKey: 'VCPanels02',
  title: '面板02',
  category: ChatCategoryEnum.PANELS,
  categoryName: ChatCategoryEnumName.PANELS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'panels02.png'
}
