<script setup>
import { RouterView } from "vue-router";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const locale = zhCN;
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<style scoped lang="less"></style>
