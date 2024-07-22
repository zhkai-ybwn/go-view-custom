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
import { PropType, computed, reactive, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
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

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = reactive({
  value: {
    isLinkage: '',
    linkageText: ''
  }
})

const btn = computed(() => {
  return usePackagesStore().buttons01
})

// 配置时
watch(
  () => props.chartConfig.option.dataset,
  () => {
    option.value = props.chartConfig.option
  },
  {
    deep: false,
    immediate: true
  }
)

// 预览时
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (resData: number) => {
  props.chartConfig.option.dataset = resData
})
</script>
