<template>
  <div :class="['go-panel07-box', option.dataset ? (option.dataset.hasAlarmFlag ? 'alarm' : 'normal') : 'normal']">
    <div class="content">
      <div class="first-line">
        <div class="name">{{ name }}</div>
        <div
          :class="['status', option.dataset ? (option.dataset.runningStatus ? 'status-open' : 'status-close') : '']"
        ></div>
      </div>
      <div class="second-line">
        <div class="value" v-if="option.dataset && option.dataset.instantPower">
          {{ option.dataset.instantPower.split(' ')[0]
          }}<span>{{ option.dataset.instantPower.split(' ')[1] || 'kW' }}</span>
        </div>
        <div class="value" v-if="option.dataset && option.dataset.frequency">
          {{ option.dataset.frequency.split(' ')[0] }}<span>{{ option.dataset.frequency.split(' ')[1] || 'Hz' }}</span>
        </div>
        <div class="value" v-if="option.dataset && option.dataset.load">
          {{ option.dataset.load.split(' ')[0] }}<span>{{ option.dataset.load.split(' ')[1] || '%' }}</span>
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
@include go('panel07-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;
  padding: 2px 4px;
  border-radius: 4px;
  backdrop-filter: blur(5px);

  .content {
    .first-line {
      display: flex;
      align-items: center;

      .name {
        color: rgba(255, 255, 255, 0.85);
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.15px;
        min-width: 24px;
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

      .status {
        width: 16px;
        height: 16px;
      }

      .status-open {
        @include set-back('@/assets/images/chart/informations/panels05-open.svg');
      }

      .status-close {
        @include set-back('@/assets/images/chart/informations/panels05-close.svg');
      }
    }

    .second-line {
      display: flex;
      align-items: center;

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
}

.normal {
  background: rgb(19 24 35 / 60%);
}

.alarm {
  background: linear-gradient(270deg, rgba(255, 85, 85, 0.36) 0.37%, rgba(255, 85, 85, 0.6) 99.54%);
}
</style>
