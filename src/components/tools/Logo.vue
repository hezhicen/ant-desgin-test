<template>
  <div class="logo">
    <router-link :to="{name:'activeSetting'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle" style="font-size:14px;">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '盛世太平园',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
