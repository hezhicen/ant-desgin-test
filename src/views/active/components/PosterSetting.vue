<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item label="活动背景" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :fileList="fileList"
        action="https://upload-z2.qiniup.com"
        :data="{token: qiniuToken}"
        @preview="handlePreview"
        @change="uploadFile"
        :remove="removeFile"
      >
        <div v-if="fileList.length < 1">
          <a-icon type="plus" />
          <div class="ant-upload-text">点击上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
      <a-button class="margin-right" style="background-color:#9A979B;color:#fff;">取消</a-button>
      <a-button type="primary" html-type="submit">确定</a-button>
    </a-form-item>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-form>
</template>

<script>
import { setFileListItem } from '@/utils/util'
export default {
  props: {
    formData: {
      type: String,
      default: ''
    },

    initStatus: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      wrapperCol: { span: 12 },
      labelCol: { span: 3 },
      form: this.$form.createForm(this),
      fileList: [],
      qiniuToken: localStorage.getItem('qiniuToken'),
      previewImage: null,
      previewVisible: false
    }
  },

  mounted () {
    if (this.initStatus) {
      this.setForm(this.formData)
    }
  },

  methods: {
    removeFile () {
      this.fileList = []
    },

    setForm (val) {
      this.fileList = val ? [setFileListItem(val)] : []
    },

    handleSubmit () {
      this.form.validateFields((err, value) => {
        this.$post('backend/active/addActiveConf', {
          backImg: this.fileList.length > 0 ? this.fileList[0].url : ''
        }).then(res => {
          if (res) {
            this.$message.success('保存成功')
          }
        })
      })
    },

    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },

    uploadFile ({ file, fileList }) {
      const { status, response } = file
      if (status === 'error') {
        this.$message.error(`上传失败：${response.error}`)
      }
      this.fileList = fileList
        .map(item => {
          if (item.response && item.response.key) {
            item.url = process.env.VUE_APP_CDN + item.response.key
          }
          return item
        })
        .filter(item => {
          if (item.status && item.status !== 'error') {
            return true
          } else {
            return false
          }
        })
    }
  },

  watch: {
    formData (val) {
      this.setForm(val)
    }
  }
}
</script>
