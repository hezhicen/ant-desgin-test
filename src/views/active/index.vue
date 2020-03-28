<template>
  <a-card>
    <a-radio-group v-model="settingId" buttonStyle="solid" style="margin-bottom:16px;">
      <a-radio-button value="a">活动设置</a-radio-button>
      <a-radio-button value="b">海报设置</a-radio-button>
      <a-radio-button value="c">二维码设置</a-radio-button>
      <a-radio-button value="d">需求选项设置</a-radio-button>
      <a-radio-button value="e">活动弹窗设置</a-radio-button>
    </a-radio-group>
    <base-setting :token="qiniuToken" :formData="activeConf" :initStatus="initialStatus" v-if="settingId==='a'"/>
    <poster-setting :formData="backImg" :initStatus="initialStatus" v-if="settingId==='b'"/>
    <qr-setting :formData="qrcode" :initStatus="initialStatus" v-if="settingId==='c'"/>
    <needs-setting :formData="needs" :initStatus="initialStatus" v-if="settingId==='d'"/>
    <modal-setting :formData="window" :initStatus="initialStatus" v-if="settingId==='e'"/>
  </a-card>
</template>

<script>
import { BaseSetting, PosterSetting, QrSetting, NeedsSetting, ModalSetting } from './components'
export default {
  components: {
    BaseSetting,
    PosterSetting,
    QrSetting,
    NeedsSetting,
    ModalSetting
  },

  data () {
    return {
      qiniuToken:'',
      settingId: 'a',
      activeConf: {
        beginTime: '',
        endTime: '',
        grule: '',
        shareTitle: '',
        shareImg: '',
        shareContent: '',
        shareUrl: ''
      },
      backImg: '',
      qrcode: '',
      window: '',
      needs: [],
      initialStatus: false
    }
  },

  mounted () {
    this.$get('backend/active/getActiveConfig')
      .then(res => {
        this.activeConf = res.activeConf
        this.backImg = res.backImg
        this.qrcode = res.qrcode
        this.needs = res.needs
        this.window = res.window
        this.initialStatus = true
      })
    this.$get('/api/common/getQrToken')
      .then(res => {
        this.qiniuToken = res
        localStorage.setItem('qiniuToken', res)
      })
  }
}
</script>
