<template>
  <div
    :class="[
      'go-panel01-box',
      option.dataset.pointDetailVoList && option.dataset.pointDetailVoList.length > 0 ? 'alarm' : 'normal',
      'device-status-card'
    ]"
  >
    <div class="content">
      <div class="status-title">
        <div style="display: flex; align-items: center">
          <div :class="['status', option.dataset.runningStatus ? 'status-open' : 'status-close']"></div>
          <div class="title">{{ option.dataset.deviceName }}</div>
        </div>
        <!-- <div v-if="option.dataset.pointDetailVoList && option.dataset.pointDetailVoList.length > 0" class="view">
          查看
        </div> -->
      </div>
      <div class="info">
        <div v-if="option.dataset.instantPower" class="power">
          <div class="title">功率</div>
          <div class="value">
            {{ option.dataset.instantPower && option.dataset.instantPower }}<span class="unit">kw</span>
          </div>
        </div>
        <div v-if="option.dataset.frequency" class="frequency">
          <div class="title">频率</div>
          <div class="value">
            {{ option.dataset.frequency && option.dataset.frequency }}<span class="unit">Hz</span>
          </div>
        </div>
        <div v-if="option.dataset.instantCop" class="ins-cop">
          <div class="title">瞬时COP&nbsp;&nbsp;</div>
          <div class="value">
            {{ option.dataset.instantCop && option.dataset.instantCop }}<span class="unit" style="opacity: 0">kw</span>
          </div>
        </div>
        <div v-if="option.dataset.avgCop" class="ave-co">
          <div class="title">平均COP&nbsp;&nbsp;</div>
          <div class="value">
            {{ option.dataset.avgCop && option.dataset.avgCop }}<span class="unit" style="opacity: 0">kw</span>
          </div>
        </div>
      </div>
      <!-- <div v-if="option.dataset.pointDetailVoList && option.dataset.pointDetailVoList.length > 0" class="alarm-info">
        <div v-for="(item, index) in option.dataset.pointDetailVoList" :key="index" class="alarm-item">
          <div class="alarm-title">{{ item.alarmTitle }}</div>
          <div
            class="alarm-level"
            :style="{
              background: `${state.alarmLevelConfig[item.alarmLevel.code].color}`
            }"
          >
            {{ state.alarmLevelConfig[item.alarmLevel.code].text }}
          </div>
        </div>
      </div> -->
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

const state = reactive({
  alarmLevelConfig: [
    {},
    { color: '#18A02E', text: '提示' },
    { color: '#1890FF', text: '一般' },
    { color: '#FA8214', text: '严重' },
    { color: '#FF4D4F', text: '致命' }
  ]
})

const { textAlign } = toRefs(props.chartConfig.option)

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
@include go('panel01-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

  .content {
    .status-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .status {
        width: 20px;
        height: 20px;
      }

      .status-open {
        @include set-back('@/assets/images/chart/informations/device_status_open.svg');
      }

      .status-close {
        @include set-back('@/assets/images/chart/informations/device_status_close.svg');
      }

      .title {
        margin-left: 4px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 32px;
        letter-spacing: 0.15px;
      }

      .view {
        margin-left: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 41px;
        height: 24px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 32px;
        letter-spacing: 0.15px;
        background: rgb(255 255 255 / 10%);
        border-radius: 2px;
        cursor: pointer;
        pointer-events: all;

        &:hover {
          background: rgb(255 255 255 / 26%);
          border-radius: 2px;
        }
      }
    }

    .info {
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1px 0;
      }

      color: rgb(255 255 255 / 90%);
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;

      .title {
        font-weight: 400;
      }

      .value {
        font-weight: 500;

        .unit {
          font-size: 12px;
        }
      }
    }

    .alarm-info {
      .alarm-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5px;

        .alarm-title {
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.28px;
        }

        .alarm-level {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          margin-left: 14px;
          padding: 2px 4px;
          color: #f7f7f9;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          border-radius: 2px;
        }
      }
    }
  }
}

.normal {
  background: rgb(19 24 35 / 60%);
  border-radius: 4px;
  // backdrop-filter: blur(5px);
}

.alarm {
  background: linear-gradient(270deg, rgb(220 157 157 / 10%) 0%, rgb(255 85 85 / 50%) 100%), rgb(0 0 0 / 30%);
  border-radius: 4px;
  // backdrop-filter: blur(15px);
}
</style>
