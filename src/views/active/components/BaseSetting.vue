<template>
  <a-form :form="form" @submit.prevent="handleSubmit" autocomplete="off">
    <a-form-item label="活动起止时间" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-range-picker
        :showTime="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['开始时间', '结束时间']"
        v-decorator="['time', {rules: [{required: true, message: '请设置活动时间'}]}]"
      />
    </a-form-item>
    <a-form-item label="核销密码" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: false, message: '请输入核销密码' }] },
        ]"
      />
    </a-form-item>
    <a-form-item label="按钮图片" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :fileList="btnFile"
        action="https://upload-z2.qiniup.com"
        :data="{token}"
        @preview="handlePreview"
        @change="uploadBtn"
        :remove="removeBtn"
      >
        <div v-if="btnFile.length < 1">
          <a-icon type="plus" />
          <div class="ant-upload-text">点击上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="活动规则" :label-col="labelCol" :wrapper-col="wrapperCol">
      <vue-editor
        id="editor"
        v-model="grule"
        :editorToolbar="customToolbar"
        useCustomImageHandler
        @image-added="handleImageAdded"
      />
    </a-form-item>
    <a-form-item label="分享标题" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-input
        v-decorator="[
          'shareTitle',
          { rules: [{ required: false, message: '请输入活动规则' }] },
        ]"
      />
    </a-form-item>
    <a-form-item label="分享图片" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :fileList="fileList"
        action="https://upload-z2.qiniup.com"
        :data="{token}"
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
    <a-form-item label="分享内容" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-input
        v-decorator="[
          'shareContent',
          { rules: [{ required: false, message: '请输入分享内容' }] },
        ]"
      />
    </a-form-item>
    <a-form-item label="分享链接" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-input
        v-decorator="[
          'shareUrl',
          { rules: [{ required: false, message: '请输入分享链接' }] },
        ]"
      />
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
import moment from 'moment'
import { setFileListItem } from '@/utils/util'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      wrapperCol: { span: 12 },
      labelCol: { span: 3 },
      form: this.$form.createForm(this),
      fileList: [],
      btnFile:[],
      previewImage: null,
      previewVisible: false,
      grule: '',
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
        [
          {
            background: []
          },
          {
            color: []
          }
        ],
        ['image', 'link'],
        ['strike'],
        ['clean']
      ]
    }
  },

  props: {
    token: String,
    formData: {
      type: Object,
      default: function () {
        return {
          beginTime: '',
          endTime: '',
          grule: '',
          shareTitle: '',
          shareImg: '',
          shareContent: '',
          shareUrl: ''
        }
      }
    },

    initStatus: {
      type: Boolean,
      default: false
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

    removeBtn() {
      this.btnFile = []
    },

    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)
      formData.append('token', this.token)
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

    handleSubmit () {
      this.form.validateFields((err, value) => {
        if (!err) {
          this.$post('backend/active/addActiveConf', {
            activeConf: JSON.stringify({
              password: value.password,
              shareTitle: value.shareTitle,
              shareContent: value.shareContent,
              shareUrl: value.shareUrl,
              grule: this.grule,
              beginTime: value.time[0].format('YYYY-MM-DD HH:mm:ss'),
              endTime: value.time[1].format('YYYY-MM-DD HH:mm:ss'),
              shareImg: this.fileList.length > 0 ? this.fileList[0].url : '',
              button: this.btnFile.length > 0 ? this.btnFile[0].url : '',
            })
          }).then(res => {
            if (res) {
              this.$message.success('保存成功')
            }
          })
        }
      })
    },

    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },

    uploadBtn ({ file, fileList }) {
      const { status, response } = file
      if (status === 'error') {
        this.$message.error(`上传失败：${response.error}`)
      }
      this.btnFile = fileList
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
    },

    setForm (val) {
      this.grule = val.grule
      this.form.setFieldsValue({
        password: val.password,
        shareTitle: val.shareTitle,
        shareContent: val.shareContent,
        shareUrl: val.shareUrl,
        time: [moment(val.beginTime), moment(val.endTime)]
      })
      this.fileList = val.shareImg ? [setFileListItem(val.shareImg)] : []
      this.btnFile = val.shareImg ? [setFileListItem(val.button)] : []
    }
  },

  watch: {
    formData (val) {
      this.setForm(val)
    }
  }
}
</script>
