<template>
  <div class="go-effects01-box">
    <img
      :style="{ width: `${w}px`, height: `${h}px` }"
      :src="option.dataset.runningStatus ? yepianOpen : yepianClose"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, reactive } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import yepianOpen from '@/assets/images/chart/decorates/effects01kai.png'
import yepianClose from '@/assets/images/chart/decorates/effects01guan.png'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { textAlign, rotate } = toRefs(props.chartConfig.option)
const { w, h } = toRefs(props.chartConfig.attr)

const option = shallowReactive({
  dataset: configOption.dataset
})

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true,
    deep: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
@include go('effects01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;
  transform: rotate('`${v-bind(' rotate ')}`');
}
</style>
