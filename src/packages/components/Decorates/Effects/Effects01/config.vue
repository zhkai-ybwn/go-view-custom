<template>
  <collapse-item name="样式" :expanded="true">
    <setting-item-box name="位置">
      <setting-item name="旋转角度">
        <n-input-number v-model:value="optionData.rotate" size="small" placeholder="输入角度"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
