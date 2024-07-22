<template>
  <collapse-item name="设备信息" :expanded="true">
    <setting-item-box name="名称" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.name" size="small"></n-input>
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
