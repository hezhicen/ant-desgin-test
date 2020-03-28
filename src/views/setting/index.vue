<template>
  <a-card>
    <a-radio-group v-model="typeId" buttonStyle="solid" @change="changeType">
      <a-radio-button value="a">关于我们</a-radio-button>
      <a-radio-button value="b">用户须知</a-radio-button>
    </a-radio-group>
    <div class="margin-top-sm">
      <vue-editor
        id="editor"
        v-model="curContent"
        :editorToolbar="customToolbar"
        useCustomImageHandler
        @image-added="handleImageAdded"
      />

      <a-button type="primary" class="margin-top-sm" @click="submit">保存</a-button>
    </div>
  </a-card>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import {editSetting, getEditSetting} from '@/api/setting'
export default {
  components:{
    VueEditor
  },
  data() {
    return {
      typeId: 'a',
      curContent:'',
      abount: '',
      guide: '',
      qiniuToken:'',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [
          {
            align: ''
          },
          {
            align: 'center'
          },
          {
            align: 'right'
          }
        ],
        [
          {
            list: 'ordered'
          },
          {
            list: 'bullet'
          },
          {
            list: 'check'
          }
        ],
        ['image'],
        ['strike'],
        ['clean']
      ]
    }
  },

  mounted() {
    this.$get('/api/common/getQrToken')
    .then(res => {
      this.qiniuToken = res
    })

    getEditSetting()
    .then(res => {
      this.curContent = this.abount = res.abount
      this.guide = res.guide
    })
  },

  methods:{
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)
      formData.append('token', this.qiniuToken)
      axios({
        url: 'https://upload-z2.qiniup.com',
        method: 'POST',
        data: formData
      })
        .then(result => {
          const { status, data } = result
          if (status === 200) {
            const url = process.env.VUE_APP_CDN + data.key
            Editor.insertEmbed(cursorLocation, 'image', url)
          }
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    },
    
    changeType() {
      if(this.typeId === 'a') {
        this.guide = this.curContent
        this.curContent = this.abount
      } else {
        this.abount = this.curContent
        this.curContent = this.guide
      }
    },

    submit() {
      const val = this.curContent
      let payload
      switch(this.typeId) {
        case 'a': 
          payload = {abount: val}
          break
        case 'b':
          payload = {guide: val}
          break
      }
      
      editSetting(payload)
      .then(res => {
        if(res) {
          this.$message.success('保存成功')
        }
      })
    }
  }
}
</script>

<style>

</style>