import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Buttons01Config: ConfigType = {
  key: 'Buttons01',
  chartKey: 'VButtons01',
  conKey: 'VCButtons01',
  title: '按钮-01',
  category: ChatCategoryEnum.BUTTON,
  categoryName: ChatCategoryEnumName.BUTTON,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'buttons01.png'
}
