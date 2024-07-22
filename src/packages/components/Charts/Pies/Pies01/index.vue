<template>
  <v-chart
    v-if="(option.value.isLinkage && option.value.linkageText === btn) || !option.value.isLinkage"
    :theme="themeColor"
    ref="vChartRef"
    :init-options="initOptions"
    :option="option.value"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, reactive, watch, computed } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

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

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = reactive({
  value: {
    isLinkage: '',
    linkageText: ''
  }
})

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

const dataHandle = (newData: any) => {
  const d = newData
  let config = props.chartConfig.option
  // config.title.text = `${+d.toFixed(2)}%`
  config.series[0].data[0].value = d > 15 ? 15 : d
  config.series[0].data[0].itemStyle.color.colorStops[1].color = interpolateColor(d / 10)
  config.series[2].data[0].value = d
  option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
  option.value = props.chartConfig.option
}

// 配置时
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: false
  }
)

// 预览时
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (resData: number) => {
  props.chartConfig.option.dataset = resData
})
</script>
