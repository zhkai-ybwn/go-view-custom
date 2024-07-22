import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Chiller01Config: ConfigType = {
  key: 'Chiller01',
  chartKey: 'VChiller01',
  conKey: 'VCChiller01',
  title: '环境参数',
  category: ChatCategoryEnum.CHILLERS,
  categoryName: ChatCategoryEnumName.CHILLERS,
  package: PackagesCategoryEnum.BUSINESS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'chiller01.png'
}
