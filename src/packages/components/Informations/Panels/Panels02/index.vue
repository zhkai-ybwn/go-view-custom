<template>
  <div class="go-panel02-box">
    <div class="content" v-if="option.dataset">
      {{ option.dataset.split(' ')[0] ? option.dataset.split(' ')[0] : '- -' }}
      <span class="unit"> {{ option.dataset.split(' ')[1] ? option.dataset.split(' ')[1] : '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, reactive } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { textAlign, borderWidth, borderColor, borderRadius, paddingY, paddingX } = toRefs(props.chartConfig.option)

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
    deep: false
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
@include go('panel02-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  border-style: solid;
  border-width: v-bind('borderWidth + "px"');
  border-radius: v-bind('borderRadius + "px"');
  border-color: v-bind('borderColor');
  font-family: HarmonyOS-Regular, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  padding: v-bind('`${paddingY}px ${paddingX}px`');

  .content {
    .unit {
      font-size: 12px;
    }
  }
}
</style>
