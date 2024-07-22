import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Lines02Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

const blue =
  'image://data:image/png;base64,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'
const green =
  'image://data:image/png;base64,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'
const iconList = [green, blue]
const colorList = ['#76E144', '#0079FF']

// const icon = {
//   checked:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBpZLNykFRFIbftZ3viyQ/mZ2JInED3IIhUyUDU5EbEBMpE4ULkAswNVKuwpCJkgEnvwM/yzl75v8cnsl612o/7V17UbCwyNqImwB7YI7pmUWFwsX5RG8CsAADmrAqGRDgEfiSj2JU/cOw7EdEVcyLqs+GTs4t8+bA78VUzC6ry0Ho5b0yZ9orzJbnm3PK7bMU1NNuxEP/uijkjcnG8kF6EMezE9qDHfIJp+xr/Y0+O+IZyv2gNdjKuj5c0B3t8QpjARhf8Ms/kgbrTAXTpWQE8w5pTFy9Am4EPKlshT4ZAAAAAElFTkSuQmCC',
//   normal:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgB7ZMhDsJAEEXfbJcEuYoEEkhDQsBxAAwSZDWGI3ADjsARuBISRaoQqJU0bBmWE7Cksn1uJnn55n8hstruDoIcURwJKFpqrYX9HqJy4g9iUC6Gs11v9nkgUIcXj/vtp5jZHoPRFBWcoQGd3A7Z0sdT4WNz3HAyTxZjpX1WXi/P8WxZGWQRf0nDQMS/jS0+N/IiSAappcsAAAAASUVORK5CYII='
// }

export const option = {
  isLinkage: true,
  linkageText: '运行',
  // title: {
  //   text: '我是标题',
  //   x: 'left',
  //   y: 'top',
  //   padding: [0, 0, 0, 10],
  //   textStyle: {
  //     color: 'rgba(255,255,255,0.8)',
  //     fontSize: 14,
  //     fontFamily: 'HarmonyOS-Regular, sans-serif',
  //     fontWeight: 400
  //   }
  // },
  legend: {
    show: true,
    type: 'scroll',
    top: '0px',
    right: '0px',
    orient: 'horizontal',
    itemHeight: 14,
    itemWidth: 14,
    itemGap: 5,
    icon: 'rect',
    data: [
      {
        name: '图例一',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[0]
        },
        itemStyle: {
          color: colorList[0]
        }
      },
      {
        name: '图例二',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[1]
        },
        itemStyle: {
          color: colorList[1]
        }
      }
    ],
    selected: {}
  },
  grid: {
    left: '10%',
    top: '60',
    right: '10%',
    bottom: '60'
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(6, 12, 28, 0.50)',
    borderColor: 'rgba(6, 12, 28, 0.50)',
    textStyle: {
      color: '#BCC4D0',
      fontFamily: 'HarmonyOS-Regular,sans-serif'
    },
    extraCssText: 'border:none; backdrop-filter: blur(4px)',
    formatter: (params: any) => {
      // params 是一个数组，包含了所有系列的数据信息
      let result = '' // 存储最终的提示框内容
      result += `${params[0].value.product}<br>`
      params.forEach((el: any, index: any) => {
        result += `<div style='display:flex;align-items:center;'><div style='width:10px;height:10px;margin-right:5px;background:${
          el.color
        }'></div><div>${el.seriesName}</div><div style="flex:1;margin-left:10px;text-align: right">${
          el.value[el.seriesName] ? el.value[el.seriesName] : '-'
        }</div></div>`
      })
      return result
    }
  },
  xAxis: [
    {
      type: 'category', // x轴为 时间轴
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dashed'
        }
      },
      // min: getMin(),
      // max: getMax(),
      axisLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontFamily: 'HarmonyOS-Regular,sans-serif',
        fontWeight: 400,
        formatter: (value: any) => {
          const timePattern = /^(\d{2})-(\d{2}) (\d{2}):(\d{2})$/
          const match = value.match(timePattern)
          if (match) {
            const hours = match[3]
            return `${hours}时`
          } else {
            return ''
          }
        }
      },
      axisTick: { show: false },
      // boundaryGap: ['20%', '20%'],
      axisLine: {
        lineStyle: {
          width: 2,
          color: '#8A9194'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#8a9194',
          width: 2
        }
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontFamily: 'HarmonyOS-Regular,sans-serif',
        fontWeight: 400,
        formatter(value: any) {
          return value.toFixed(2) // 设置 Y 轴标签保留两位小数
        }
      },
      splitLine: {
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dashed'
        }
      }
    }
  ],
  dataset: { ...dataJson },
  series: [
    {
      type: 'line',
      color: colorList[0],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbolSize: 25,
      symbol: iconList[0],
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    },
    {
      type: 'line',
      color: colorList[1],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbol: iconList[1],
      symbolSize: 25,
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = Lines02Config.key
  public chartConfig = cloneDeep(Lines02Config)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
