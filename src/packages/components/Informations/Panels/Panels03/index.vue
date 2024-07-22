<template>
  <div class="go-panel03-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <div class="icon" v-if="showIcon"></div>
      <div class="detai">
        <div class="title">{{ infoName }}</div>
        <div class="value" :data-value="option.dataset ?? '-'">
          {{ option.dataset ?? '-' }}
        </div>
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

const { textAlign, infoName, showIcon, isLinkage, linkageText } = toRefs(props.chartConfig.option)

const btn = computed(() => {
  return usePackagesStore().buttons01
})

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
@include go('panel03-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 8px 16px;
    background: linear-gradient(270deg, rgb(157 180 220 / 6%) 0%, rgb(85 137 255 / 30%) 100%);
    border-radius: 4px;

    .icon {
      width: 60px;
      height: 60px;
    }

    .title {
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 32px;
    }

    .value {
      font-weight: 400;
      font-size: 20px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      line-height: 20px; /* 100% */
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
