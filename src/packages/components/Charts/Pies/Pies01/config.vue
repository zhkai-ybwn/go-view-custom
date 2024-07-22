<template>
  <!-- 遍历 seriesList -->
  <!-- v-for="(item, index) in config.series" :key="index"  -->
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
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const config = computed(() => {
  return props.optionData
})
</script>
