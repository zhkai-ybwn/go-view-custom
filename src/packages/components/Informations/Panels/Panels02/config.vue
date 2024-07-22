<template>
  <collapse-item name="样式" :expanded="true">
    <setting-item-box name="文字">
      <setting-item name="X轴内边距">
        <n-input-number v-model:value="optionData.paddingX" size="small" placeholder="输入内边距"></n-input-number>
      </setting-item>
      <setting-item name="Y轴内边距">
        <n-input-number v-model:value="optionData.paddingY" size="small" placeholder="输入内边距"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="边框">
      <setting-item name="宽度">
        <n-input-number
          v-model:value="optionData.borderWidth"
          size="small"
          :min="0"
          placeholder="宽度"
        ></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderColor"></n-color-picker>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="圆角"
        ></n-input-number>
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
