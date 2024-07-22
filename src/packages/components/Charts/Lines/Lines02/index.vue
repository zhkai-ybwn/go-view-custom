<template>
  <v-chart
    ref="vChartRef"
    v-if="(option.isLinkage && option.linkageText === btn) || !option.isLinkage"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr
    }"
    autoresize
    style="pointer-events: all"
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, nextTick, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const btn = computed(() => {
  return usePackagesStore().buttons01
})

// const icon = {
//   checked:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBpZLNykFRFIbftZ3viyQ/mZ2JInED3IIhUyUDU5EbEBMpE4ULkAswNVKuwpCJkgEnvwM/yzl75v8cnsl612o/7V17UbCwyNqImwB7YI7pmUWFwsX5RG8CsAADmrAqGRDgEfiSj2JU/cOw7EdEVcyLqs+GTs4t8+bA78VUzC6ry0Ho5b0yZ9orzJbnm3PK7bMU1NNuxEP/uijkjcnG8kF6EMezE9qDHfIJp+xr/Y0+O+IZyv2gNdjKuj5c0B3t8QpjARhf8Ms/kgbrTAXTpWQE8w5pTFy9Am4EPKlshT4ZAAAAAElFTkSuQmCC',
//   normal:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgB7ZMhDsJAEEXfbJcEuYoEEkhDQsBxAAwSZDWGI3ADjsARuBISRaoQqJU0bBmWE7Cksn1uJnn55n8hstruDoIcURwJKFpqrYX9HqJy4g9iUC6Gs11v9nkgUIcXj/vtp5jZHoPRFBWcoQGd3A7Z0sdT4WNz3HAyTxZjpX1WXi/P8WxZGWQRf0nDQMS/jS0+N/IiSAappcsAAAAASUVORK5CYII='
// }

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          props.chartConfig.option.legend.data[i].name = newData.dimensions[i + 1]
          seriesArr.push(props.chartConfig.option.series[i])
        }
        replaceMergeArr.value = ['series']
        props.chartConfig.option.series = seriesArr
        nextTick(() => {
          replaceMergeArr.value = []
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, resData => {
  props.chartConfig.option.dataset = resData
})
// const onLegendSelectChanged = (params: any) => {
//   replaceMergeArr.value = ['legend']
//   const falseLegends = Object.keys(params.selected).filter(key => !params.selected[key])
//   const newLegend = props.chartConfig.option.legend
//   newLegend.data.forEach((legend: any) => {
//     if (falseLegends.includes(legend.name)) {
//       legend.icon = icon.normal // 将 icon 修改为 normal
//       // legend.selected = false // 将对应图例的状态设为未选中
//     } else {
//       legend.icon = icon.checked // 将 icon 修改为 checked
//       // legend.selected = true // 将对应图例的状态设为选中
//     }
//   })
//   // 触发 Vue 的响应式更新
//   props.chartConfig.option.legend = newLegend
//   nextTick(() => {
//     replaceMergeArr.value = []
//   })
// }
</script>
