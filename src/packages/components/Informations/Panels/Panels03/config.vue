<template>
  <collapse-item name="组件联动" :expanded="true">
    <setting-item-box name="联动开关" :alone="true">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.isLinkage" size="small" />
          <n-text>开关</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="名称" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.linkageText" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="信息" :expanded="true">
    <setting-item-box name="图标开关" :alone="true">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showIcon" size="small" />
          <n-text>开关</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="名称" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.infoName" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="数值" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
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
