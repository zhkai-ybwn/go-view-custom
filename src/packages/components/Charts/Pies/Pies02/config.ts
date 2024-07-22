import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Pies02Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

const defaultColorList = [
  { start: '#7EC1FF', end: '#1A84E9' },
  { start: '#D3FFBE', end: '#6ABE43' },
  { start: '#FFF06A', end: '#FFC327' },
  { start: '#7EFFF0', end: '#41B9B9' }
]

const getColor = (index: number) => {
  return defaultColorList[index]
    ? {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          { offset: 0, color: defaultColorList[index].start },
          { offset: 1, color: defaultColorList[index].end }
        ],
        global: false
      }
    : ''
}

const option = {
  isLinkage: true,
  linkageText: '能效',
  grid: {
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    containLabel: true
  },
  dataset: { ...dataJson },
  color: [
    getColor(0),
    'transparent',
    getColor(1),
    'transparent',
    getColor(2),
    'transparent',
    getColor(3),
    'transparent'
  ],
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['72%', '82%'],
      avoidLabelOverlap: true,
      hoverAnimation: false,
      itemStyle: {
        borderRadius: 1,
        borderColor: 'rgba(38, 57, 90)',
        borderWidth: 0
      },
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      roundCap: true
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = Pies02Config.key

  public chartConfig = cloneDeep(Pies02Config)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
