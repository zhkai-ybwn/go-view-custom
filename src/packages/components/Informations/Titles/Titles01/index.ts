import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Titles01Config: ConfigType = {
  key: 'Titles01',
  chartKey: 'VTitles01',
  conKey: 'VCTitles01',
  title: '标题01',
  category: ChatCategoryEnum.TITLES,
  categoryName: ChatCategoryEnumName.TITLES,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'titles01.png'
}
