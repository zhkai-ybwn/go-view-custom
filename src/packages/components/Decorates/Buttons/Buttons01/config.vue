<template>
  <collapse-item name="信息" :expanded="true">
    <setting-item-box name="名称1" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.infoName1" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="名称2" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.infoName2" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="默认名称" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.defaultName" type="textarea" size="small"></n-input>
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
