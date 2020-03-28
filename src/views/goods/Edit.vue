<template>
  <div class="card">
    <a-form :form="form" @submit.prevent="handleSubmit" autocomplete="off">
      <div class="title">
        <div>商品信息</div>
      </div>
      <a-form-item label="商品名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['gname', { rules: [{ required: true, message: '请输入商品名称' }] }]" />
      </a-form-item>
      <a-form-item required label="商品封面图" :label-col="{ span:3 }" :wrapper-col="{ span: 12 }">
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
      <a-form-item label="商品原价" :label-col="{ span: 3}" :wrapper-col="{ span: 6 }">
        <a-input-number
          :min="0"
          :precision="2"
          v-decorator="['oprice', { rules: [{ required: true, message: '请输入商品原价' }] }]"
        />
      </a-form-item>
      <a-form-item label="折扣价" :label-col="{ span: 3}" :wrapper-col="{ span: 6 }">
        <a-input-number
          :min="0"
          :precision="2"
          v-decorator="['dprice', { rules: [{ required: true, message: '请输入商品折扣价' }] }]"
        />
      </a-form-item>
      <a-form-item label="商品库存数量" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input-number
          :min="0"
          :precision="0"
          v-decorator="['total', { rules: [{ required: false, message: '请输入库存数量' }] }]"
          :disabled="goodsStatus===2"
        />
      </a-form-item>
      <a-form-item
        label="追加库存数量"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
        v-if="goodsStatus===2"
      >
        <a-input-number
          :min="0"
          :precision="0"
          v-decorator="['appendNum', { rules: [{ required: false, message: '请输入库存数量' }] }]"
        />
      </a-form-item>
      <a-form-item label="上架状态" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <div>{{ goodsStatus===2?'已上架' : '未上架' }}</div>
        <div style="color: orange">*未上架商品可编辑库存数量，上架的商品不可进行数量编辑只能追加</div>
      </a-form-item>
      <div class="title">
        <div>品牌信息</div>
      </div>
      <a-form-item label="品牌名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['brand', { rules: [{ required: false, message: '请输入品牌名称' }] }]" />
      </a-form-item>
      <a-form-item label="商户名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['merchant', { rules: [{ required: false, message: '请输入商户名称' }] }]" />
      </a-form-item>
      <a-form-item label="商户地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['address', { rules: [{ required: false, message: '请输入商户地址' }] }]" />
      </a-form-item>
      <a-form-item label="联系电话" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['tel', { rules: [{ required: false, message: '请输入联系电话' }] }]" />
      </a-form-item>
      <div class="title">
        <div>商品详情</div>
      </div>
      <a-form-item label="商品详情" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <vue-editor
          id="editor"
          v-model="goodsInfo"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        />
      </a-form-item>
      <a-form-item label="商品类型" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-select v-decorator="['type', { rules: [{ required: true, message: '请选择类型' }] }]">
          <a-select-option :value="1">特价抢购</a-select-option>
          <a-select-option :value="2">春季特惠</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="商品系列" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-select v-decorator="['cate', { rules: [{ required: true, message: '请选择系列' }] }]">
          <a-select-option :value="1">客厅系列</a-select-option>
          <a-select-option :value="2">套房系列</a-select-option>
          <a-select-option :value="3">软体系列</a-select-option>
          <a-select-option :value="4">其他</a-select-option>
          <!-- <a-select-option :value="1">瓷砖、卫浴系列</a-select-option>
          <a-select-option :value="2">橱柜、地板、木门系列</a-select-option>
          <a-select-option :value="3">灯具、墙纸系列</a-select-option>
          <a-select-option :value="4">其他</a-select-option> -->
          <!-- <a-select-option :value="1">水果系列</a-select-option>
          <a-select-option :value="2">干杂系列</a-select-option>
          <a-select-option :value="3">冷吃系列</a-select-option>
          <a-select-option :value="4">其他</a-select-option> -->
        </a-select>
      </a-form-item>

      <a-form-item label="一级分销佣金" :label-col="{ span: 3}" :wrapper-col="{ span: 6 }">
        <a-input-number
          :min="0"
          :precision="2"
          v-decorator="['drate', { rules: [{ required: false, message: '请输入分佣比例' }] }]"
        />
      </a-form-item>
      <a-form-item label="二级分销佣金" :label-col="{ span: 3}" :wrapper-col="{ span: 6 }">
        <a-input-number
          :min="0"
          :precision="2"
          v-decorator="['irate', { rules: [{ required: false, message: '请输入分佣比例' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">{{ gid ? '保存':'新增' }}</a-button>
      </a-form-item>
    </a-form>

    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { setFileListItem } from '@/utils/util'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      form: this.$form.createForm(this),
      previewImage: '',
      previewVisible: false,
      fileList: [],
      gid: null,
      qiniuToken: localStorage.getItem('qiniuToken'),
      goodsInfo: '',
      goodsStatus: 1,
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

  mounted () {
    const gid = (this.gid = this.$route.params.id)
    if (gid) {
      this.$post('backend/goods/getGoodsInfo', { gid }).then(res => {
        if (res) {
          this.form.setFieldsValue({
            gname: res.gname,
            oprice: res.oprice,
            dprice: res.dprice,
            total: res.total,
            brand: res.brand,
            merchant: res.merchant,
            address: res.address,
            tel: res.tel,
            type: res.type,
            cate: res.cate,
            irate: res.irate,
            drate: res.drate
          })
          this.goodsStatus = res.status
          this.fileList = [setFileListItem(res.cover)]
          this.goodsInfo = res.info
        }
      })
    }
    this.$get('/api/common/getQrToken').then(res => {
      localStorage.setItem('qiniuToken', res)
    })
  },

  methods: {
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
          console.log(result)
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

    removeFile () {
      this.fileList = []
    },

    handlePreview (file) {
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
    },

    handleSubmit () {
      this.form.validateFields((err, value) => {
        if (!err) {
          const payload = {
            ...value,
            // type:1,
            cover: this.fileList.length > 0 ? this.fileList[0].url : '',
            info: this.goodsInfo
          }
          if (this.goodsStatus === 2) {
            payload.appendNum = value.appendNum
            delete payload.total
          }
          if (this.gid) {
            payload.gid = this.gid
          }
          this.$post('backend/goods/addGoods', payload).then(res => {
            if (res) {
              this.$message.success('保存成功')
              this.$router.push({ name: 'goodsList' })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  padding: 0 0 8px;
  background-color: #fff;
  .title {
    background-color: fade(#1890ff, 40);
    padding: 8px;
    margin-bottom: 16px;
    div {
      color: #1890ff;
      font-weight: 600;
      border-left: #1890ff 2px solid;
      padding-left: 12px;
    }
  }

  .ant-input-number,
  .ant-select,
  input {
    width: 200px;
  }
}
</style>
