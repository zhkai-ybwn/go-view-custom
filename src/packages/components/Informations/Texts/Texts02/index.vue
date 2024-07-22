<template>
  <div class="go-texts02-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <div class="top" :data-value="titleText">{{ titleText }}</div>
      <div class="middle" :data-value="option.dataset">{{ option.dataset ?? '-' }}</div>
      <div class="bottom" :data-value="unitText">{{ unitText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, computed } from 'vue'
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
const btn = computed(() => {
  return usePackagesStore().buttons01
})
const { textAlign, titleText, unitText, isLinkage, linkageText } = toRefs(props.chartConfig.option)

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
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
@include go('texts02-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: HarmonyOS-Regular, sans-serif;

    .top {
      color: transparent;
      font-weight: 400;
      font-size: 14px;
      font-style: normal;
      line-height: 19px;
      vertical-align: baseline;
      background: linear-gradient(90deg, #fff 0%, #b0d0ff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 4px rgb(43 102 255 / 80%);
        content: attr(data-value);
      }
    }

    .middle {
      color: transparent;
      font-weight: bold;
      font-size: 16px;
      font-family: harmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;
      vertical-align: baseline;
      background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(data-value);
      }
    }

    .bottom {
      color: transparent;
      font-weight: 400;
      font-size: 12px;
      font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
      font-style: normal;
      line-height: 20px;
      text-transform: none;
      vertical-align: baseline;
      background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(data-value);
      }
    }
  }
}
</style>
