<template>
  <div class="go-titles01-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <div class="title-container">
        <div v-if="showLeftBorder" class="border-sign"></div>
        <div class="arrow-sign"></div>
        <div class="text" :text="option.dataset">{{ option.dataset }}</div>
      </div>
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

const { textAlign, showLeftBorder, linkageText, isLinkage } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

const btn = computed(() => {
  return usePackagesStore().buttons01
})

const { w, h } = toRefs(props.chartConfig.attr)

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
@include go('titles01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    background: rgb(53 81 145 / 10%);
    backdrop-filter: blur(5px);
    width: v-bind('w+"px"');
    height: v-bind('h+"px"');

    .title-container {
      display: flex;
      align-items: center;
      //   width: v-bind('w+"px"');
      height: 37px;
      border: 0.5px solid transparent;
      border-image: linear-gradient(90deg, rgba(164, 199, 255, 0.5), rgba(182, 209, 254, 0)) 1;
      background: linear-gradient(90deg, rgba(53, 81, 145, 0.3) 0%, rgba(157, 180, 220, 0) 100%);

      .border-sign {
        width: 4px;
        height: 100%;
        background: #96aadb;
      }

      .arrow-sign {
        width: 24px;
        height: 24px;
        margin-left: 8px;
        background-image: url('@/assets/images/chart/informations/title-arrow-sign.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .text {
        margin-left: 3px;
        font-weight: 400;
        font-size: 20px;
        font-family: YouSheBiaoTiHei, sans-serif;
        line-height: 23px;
        background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .text::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 4px rgb(43 102 255 / 80%);
        content: attr(text);
      }
    }
  }

  .show-left-border {
    border-left: 4px solid #96aadb;
  }
}
</style>
