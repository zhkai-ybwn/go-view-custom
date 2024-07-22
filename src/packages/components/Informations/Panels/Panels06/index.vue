<template>
  <div class="go-panel06-box">
    <div class="content">
      <div class="name">{{ name }}</div>
      <div v-if="option.dataset">
        <div class="value" v-for="(item, index) in option.dataset" :key="index">
          {{ item ? item.split(' ')[0] : '-' }}<span>{{ item ? item.split(' ')[1] : '-' }}</span>
        </div>
      </div>
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

const { textAlign, name } = toRefs(props.chartConfig.option)

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
@include go('panel06-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;
  backdrop-filter: blur(5px);
  background: rgba(19, 24, 35, 0.6);
  padding: 2px 4px;
  border-radius: 4px;

  .content {
    .name {
      color: rgba(255, 255, 255, 0.85);
      font-family: HarmonyOS-Regular, sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.15px;
    }

    .value {
      color: #fff;
      font-family: HarmonyOS-Regular, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;

      span {
        font-size: 12px;
      }
    }
  }
}
</style>
