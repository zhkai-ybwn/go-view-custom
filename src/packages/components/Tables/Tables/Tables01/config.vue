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
  <collapse-item name="表格设置" :expanded="true">
    <setting-item-box :alone="false" name="表格数据">
      <SettingItem name="表头名称" class="form_name">
        <div style="width: 260px">
          <n-input v-model:value="optionData.dimensions" size="small" placeholder="表头数据(英文','分割)"></n-input>
        </div>
      </SettingItem>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
