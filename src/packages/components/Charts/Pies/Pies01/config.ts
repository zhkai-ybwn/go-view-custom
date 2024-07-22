import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Pies01Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = []

const colorList = ['#DDE379', '#1DB571']
function interpolateColor(percent: any) {
  // 将起始颜色和终点颜色转换为RGB格式
  const startRGB = { r: 221, g: 227, b: 121 }
  const endRGB = { r: 29, g: 181, b: 113 }

  // 计算中间颜色的RGB值
  const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * percent)
  const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * percent)
  const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * percent)

  // 将RGB值转换为十六进制颜色并返回
  return `rgb(${r}, ${g},${b})`
}

const option = {
  isLinkage: true,
  linkageText: '运行',
  tooltip: {
    show: false,
    trigger: 'item'
  },
  legend: {
    show: false
  },
  dataset: 8,
  title: {
    show: false
  },
  series: [
    {
      type: 'bar',
      data: [
        {
          // 上层圆环，显示数据
          value: 7.8,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorList[0]
                },
                {
                  offset: 1,
                  // color: colorList[1],
                  color: interpolateColor(7.8 / 10)
                }
              ]
            }
          }
        }
      ],
      barGap: '-100%', // 柱间距离,上下两层圆环重合
      coordinateSystem: 'polar',
      // barWidth: 10,
      roundCap: true, // 顶端圆角
      z: 3 // 圆环层级，同zindex
    },
    {
      // 下层圆环，显示最大值
      type: 'bar',
      data: [
        {
          value: 15,
          itemStyle: {
            color: '#4B5B76',
            borderWidth: 0
          }
        }
      ],
      barGap: '-100%',
      coordinateSystem: 'polar',
      // barWidth: 10,
      roundCap: true,
      z: 1
    },
    // 仪表盘
    {
      type: 'gauge',
      startAngle: 180, // 起始角度，同极坐标
      endAngle: 0, // 终止角度，同极坐标
      min: 0, // 最小刻度
      max: 15, // 最大刻度
      splitNumber: 30, // 被分割的数量
      center: ['50%', '70%'],
      radius: '170%',
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        length: 1,
        distance: 0,
        lineStyle: {
          color: '#4B5B76'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        distance: 20,
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        // eslint-disable-next-line consistent-return
        formatter(value: any) {
          if (value === 0 || value === 15) {
            return `\n\n\n${value}`
          }
        }
      },
      splitLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      z: 4,
      detail: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'HarmonyOS-Regular',
        offsetCenter: [0, 1],
        formatter(value: any) {
          if (value || value === 0) return value
          return '-'
        }
      },
      title: {
        show: false
      },
      data: [{ value: 7.8 }]
    }
  ],
  angleAxis: {
    show: false,
    max: (15 * 360) / 180, // -45度到225度，二者偏移值是270度除360度
    type: 'value',
    startAngle: 180, // 极坐标初始角度
    splitLine: {
      show: false
    }
  },
  barMaxWidth: 8, // 圆环宽度
  radiusAxis: {
    show: false,
    type: 'category'
  },
  // 圆环位置和大小
  polar: {
    center: ['50%', '70%'],
    radius: '200%'
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = Pies01Config.key
  public chartConfig = cloneDeep(Pies01Config)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
