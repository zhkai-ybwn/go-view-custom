<template>
  <div class="go-panel04-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <div v-for="(item, index) in option.dataset" :key="index" class="legend-item">
        <div
          :style="{
            background: state.colorList[index],
            width: '8px',
            height: '8px'
          }"
        ></div>
        <div class="title">{{ item.title }}</div>
        <div class="percent">{{ item.percent ?? '-' }}</div>
        <div class="value">
          {{ item.value ? parseFloat(item.value) : '-'
          }}<span style="font-size: 12px">{{ item.value ? item.value.split(' ')[1] : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, reactive, computed } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { textAlign, isLinkage, linkageText } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

const btn = computed(() => {
  return usePackagesStore().buttons01
})

const state = reactive({
  colorList: [
    'linear-gradient(to bottom, #7EC1FF, #1A84E9)',
    'linear-gradient(to bottom, #D3FFBE, #6ABE43)',
    'linear-gradient(to bottom, #FFF06A, #FFC327)',
    'linear-gradient(to bottom, #7EFFF0, #41B9B9)'
  ]
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
@include go('panel04-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;

    .legend-item {
      display: flex;
      align-items: center;
      font-family: HarmonyOS-Regular, san-serif;
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      line-height: 16px;

      .title {
        margin-left: 10px;
        width: 30%;
      }
      .percent {
        width: 25%;
      }
      .value {
        width: 50%;
      }
    }
  }
}
</style>
