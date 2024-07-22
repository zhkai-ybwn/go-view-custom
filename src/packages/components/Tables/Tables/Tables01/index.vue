<template>
  <div class="go-tables01-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <table>
        <tr>
          <td class="blank"></td>
          <td class="title">{{ dimensions.split(',')[0] }}</td>
          <td class="title">{{ dimensions.split(',')[1] }}</td>
          <td class="title">{{ dimensions.split(',')[2] }}</td>
        </tr>
        <tr>
          <td class="title">{{ dimensions.split(',')[3] }}</td>
          <td>{{ option.dataset.instantCooling ?? '-' }}</td>
          <td>{{ option.dataset.instantChilledTC ?? '-' }}</td>
          <td>{{ option.dataset.instantCoolingTC ?? '-' }}</td>
        </tr>
        <tr>
          <td class="title">{{ dimensions.split(',')[4] }}</td>
          <td>{{ option.dataset.totalCooling ?? '-' }}</td>
          <td>{{ option.dataset.totalChilledTC ?? '-' }}</td>
          <td>{{ option.dataset.totalCoolingTC ?? '-' }}</td>
        </tr>
      </table>
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

const { textAlign, dimensions, isLinkage, linkageText } = toRefs(props.chartConfig.option)

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
@include go('tables01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    height: 100%;
    width: 100%;
    table {
      height: 100%;
      width: 100%;
      border-collapse: separate;
      border-spacing: 2px 2px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      .blank {
        background: rgba(255, 255, 255, 0.1);
      }
      .title {
        padding-left: 0px;
        text-align: center;
        // background: linear-gradient(
        //   270deg,
        //   rgb(157 180 220 / 3%) 0%,
        //   rgb(85 137 255 / 15%) 100%
        // );
        background: linear-gradient(270deg, rgba(157, 180, 220, 0.12) 0%, rgba(85, 137, 255, 0.6) 100%);
      }
      td {
        padding-left: 16px;
        background: linear-gradient(270deg, rgb(157 180 220 / 6%) 0%, rgb(85 137 255 / 30%) 100%);
      }
    }
  }
}
</style>
