<template>
  <div class="go-chroom01-box" v-if="(isLinkage && linkageText === btn) || !isLinkage">
    <div class="content">
      <div v-for="(item, index) in option.dataset" :key="index" class="item">
        <div class="icon">
          <img :src="icons[index]" alt="" class="icon-img" />
        </div>
        <div class="value">
          {{ item.value ? parseFloat(item.value) : '-' }}
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="title">
          {{ item.title }}
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
import icon1 from '@/assets/images/chart/business/icon1.png'
import icon2 from '@/assets/images/chart/business/icon2.png'
import icon3 from '@/assets/images/chart/business/icon3.png'
import icon4 from '@/assets/images/chart/business/icon4.png'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const icons = [icon1, icon2, icon3, icon4]

const { linkHead, link, textAlign, isLinkage, linkageText } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

const btn = computed(() => {
  return usePackagesStore().buttons01
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

//打开链接
const click = () => {
  window.open(linkHead.value + link.value)
}
</script>

<style lang="scss" scoped>
@include go('chroom01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .item {
      font-family: HarmonyOS-Regular, sans-serif;
      text-align: center;

      .value {
        height: 30px;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
        font-style: normal;
      }

      .unit {
        color: rgb(255 255 255 / 60%);
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
      }

      .title {
        color: rgb(255 255 255 / 60%);
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
      }

      .icon-img {
        width: 42px;
        height: 42px;
      }
    }
  }
}
</style>
