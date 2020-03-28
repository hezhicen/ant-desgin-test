<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item label="需求选项" :label-col="labelCol" :wrapper-col="wrapperCol">
      <div class="flex">
        <a-input v-model="inputValue" @pressEnter.prevent="add" />
        <a-button class="margin-left" icon="plus" type="primary" @click="add">新增</a-button>
      </div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
      <a-tag
        closable
        @close="closeTag(item)"
        v-for="(item, index) in tags"
        :key="index"
        :visible="true"
      >{{ item }}</a-tag>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Array,
      default: function () {
        return []
      }
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
      previewVisible: false,
      tags: [],
      inputValue: ''
    }
  },

  mounted () {
    if (this.initStatus) {
      this.tags = [...this.formData]
    }
  },

  methods: {
    handleSubmit () {
      this.$post('backend/active/addActiveConf', {
        needs: this.tags.join(',')
      }).then(res => {
        if (res) {
          this.$message.success('保存成功')
        }
      })
    },

    closeTag (e) {
      const idx = this.tags.indexOf(e)
      this.tags.splice(idx, 1)
    },

    add () {
      if (this.inputValue) {
        this.tags.push(this.inputValue)
        this.inputValue = ''
      }
    }
  },

  watch: {
    formData (val) {
      console.log(val)
      this.tags = [...val]
    }
  }
}
</script>
