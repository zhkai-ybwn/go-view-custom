import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Effects01Config: ConfigType = {
  key: 'Effects01',
  chartKey: 'VEffects01',
  conKey: 'VCEffects01',
  title: '动效01',
  category: ChatCategoryEnum.EFFECTS,
  categoryName: ChatCategoryEnumName.EFFECTS,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'effects01kai.png'
}
