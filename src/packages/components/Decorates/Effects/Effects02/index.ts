import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Effects02Config: ConfigType = {
  key: 'Effects02',
  chartKey: 'VEffects02',
  conKey: 'VCEffects02',
  title: '动效02',
  category: ChatCategoryEnum.EFFECTS,
  categoryName: ChatCategoryEnumName.EFFECTS,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'effects02kai.png'
}
