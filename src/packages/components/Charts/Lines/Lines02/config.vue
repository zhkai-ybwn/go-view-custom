<template>
  <!-- Echarts 全局设置 -->
  <!-- <global-setting :optionData="optionData"></global-setting> -->
  <!-- <CollapseItem v-if="title" name="标题" :expanded="true">
    <SettingItemBox name="文本" :alone="true">
      <SettingItem>
        <n-input v-model:value="title.text" type="textarea" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem> -->
  <collapse-item v-if="grid" name="容器">
    <setting-item-box name="距离">
      <setting-item name="左侧距离">
        <n-input v-model:value="grid.left" size="small"></n-input>
      </setting-item>
      <setting-item name="右侧距离">
        <n-input v-model:value="grid.right" size="small"></n-input>
      </setting-item>
      <setting-item name="上侧距离">
        <n-input v-model:value="grid.top" size="small"></n-input>
      </setting-item>
      <setting-item name="下侧距离">
        <n-input v-model:value="grid.bottom" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="组件联动" :expanded="true">
    <setting-item-box name="是否联动" :alone="true">
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
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`折线图-${index + 1}`" :expanded="true">
    <SettingItemBox name="线条">
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="类型">
        <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const grid = computed(() => {
  return props.optionData.grid
})
</script>
