<template>
  <div class="go-buttons01-box">
    <div class="content">
      <div :class="[state.activeLabel === infoName1 ? 'active' : 'inactive']" @click="click(infoName1)">
        <div class="label-item" :text="infoName1">{{ infoName1 }}</div>
      </div>
      <div :class="[state.activeLabel === infoName2 ? 'active' : 'inactive']" @click="click(infoName2)">
        <div class="label-item" :text="infoName2">{{ infoName2 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, reactive } from 'vue'
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

const { textAlign, infoName1, infoName2, defaultName } = toRefs(props.chartConfig.option)

const state = reactive({
  activeLabel: ''
})

const option = shallowReactive({
  dataset: configOption.dataset
})

const store = usePackagesStore()

const click = (key: string) => {
  state.activeLabel = key
  store.setButtons01(key)
}
click(defaultName.value === infoName1.value ? infoName1.value : infoName2.value)

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
@include go('buttons01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;
  pointer-events: all;

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    font-weight: 400;
    font-size: 18px;
    font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
    font-style: normal;
    line-height: 20px;
    text-align: left;
  }

  .label-item {
    background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
    background-clip: text;
    /* stylelint-disable */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 48px;
  }

  .label-item::before {
    position: absolute;
    z-index: -1;
    text-shadow: 0px 0px 2px rgba(0, 121, 255, 0.8), 0px 0px 5px #0066ff;
    content: attr(text);
  }

  .active {
    font-size: 20px;
    margin-bottom: 5px;
    width: 129px;
    height: 48px;
    padding-left: 30px;
    line-height: 48px;
    cursor: pointer;
    @include set-back('@/assets/images/chart/decorates/active.png');
  }

  .inactive {
    font-size: 18px;
    margin-bottom: 5px;
    width: 110px;
    height: 48px;
    padding-left: 30px;
    line-height: 48px;
    cursor: pointer;
    @include set-back('@/assets/images/chart/decorates/inactive.png');
  }
}
</style>
