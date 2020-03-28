<template>
  <a-card :bodyStyle="{display: 'flex'}">
    <div class="preview-container">
      <div class="phone">
        <div class="speaker"></div>
        <div class="screen">
          <div style="border: 1px solid #eee;padding: 4px 0;">
            <div style="padding: 0 8px">
              <div class="title">{{previewContent.head}}</div>
              <div class="preview-item">
                <div class="preview-title">活动名称：</div>
                <div class="preview-content">{{previewContent.title}}</div>
              </div>
              <div class="preview-item">
                <div class="preview-title">活动地点：</div>
                <div class="preview-content">{{previewContent.place}}</div>
              </div>
              <div class="preview-item">
                <div class="preview-title">活动时间：</div>
                <div class="preview-content">{{previewContent.date}}</div>
              </div>
              <div class="preview-item">
                <div class="preview-title">备注：</div>
                <div class="preview-content">{{previewContent.footer}}</div>
              </div>
            </div>
            <div class="preview-card-footer">
              <div>
                <a-avatar
                  :size="18"
                  style="margin-right: 4px;"
                  src="https://head.rongxinh.com/Fhp2sK3sNIIb-cKo33hhfrR8OSqI"
                />太平园国际家居博览城
              </div>
              <div>
                <i
                  class="iconfont icon-xiaochengxu"
                  style="color: rgb(100, 103, 239);font-size:12px;"
                />
                小程序
                <a-icon type="right" />
              </div>
            </div>
          </div>
        </div>
        <div class="home"></div>
      </div>
    </div>
    <div class="form-container">
      <a-form :form="form" @submit.prevent="handleSubmit" autocomplete="off">
        <a-form-item label="模板ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['tempId', { rules: [{ required: true, message: '请选择模板ID' }] }]">
            <a-select-option :disabled="item.title!=='预约成功通知'" :value="item.template_id" v-for="item in tempList" :key="item.template_id">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="模板标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title', {rules: [{required: true, message: '请输入模板标题'}]}]" />
        </a-form-item>
        <a-form-item label="发放人群" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select @change="selectGroup" v-decorator="['group', {rules: [{required: true, message: '请选择发放人群'}]}]">
            <a-select-option :key="item.id" :value="item.id" v-for="item in groups">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发放人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{groupTotal}}</span>
        </a-form-item>
        <a-form-item label="发放内容" :labelCol="labelCol" :wrapperCol="{span: 16}">
          <div class="content">
            <a-form-item label="首行内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['contentHead', {rules: [{required: true, message: '请填写首行内容'}]}]"
                @change="e => inputContent(e.currentTarget.value, 'head')"
              />
            </a-form-item>
            <a-form-item label="活动名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['contentTitle',{rules: [{required: true, message: '请填写活动名称'}]}]"
                @change="e => inputContent(e.currentTarget.value, 'title')"
              />
            </a-form-item>
            <a-form-item label="活动地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['contentPlace',{rules: [{required: true, message: '请填写活动地点'}]}]"
                @change="e => inputContent(e.currentTarget.value, 'place')"
              />
            </a-form-item>
            <a-form-item label="活动时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['contentDate',{rules: [{required: true, message: '请填写活动时间'}]}]"
                @change="e => inputContent(e.currentTarget.value, 'date')"
              />
            </a-form-item>
            <a-form-item label="尾行内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['contentFooter',{rules: [{required: true, message: '请填写尾行内容'}]}]"
                @change="e => inputContent(e.currentTarget.value, 'footer')"
              />
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item label="是否定时发送" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-switch v-decorator="['isTiming']" @change="changeTiming"></a-switch>
        </a-form-item>
        <a-form-item label="定时发送时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
            v-decorator="['timingTime',{ rules: [{ required: isTiming, message: '请选择发送日期' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{...wrapperCol, offset: 4}">
          <a-button type="primary" htmlType="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import '@/assets/iconfont/iconfont.css'
import {getGroups, getTpList, addTpMsg} from '@/api/temp'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
      previewContent: {
        head: '活动预约提醒',
        title: '秒杀活动预约提醒',
        date: '2019-10-31 00:00:00',
        place: 'xxx家俬广场'
      },
      isTiming: false,
      tempList: [],
      groups:[],
      groupTotal: 0
    }
  },

  mounted() {
    getGroups()
    .then(res => {
      this.groups = res
    })
    getTpList()
    .then(res => {
      this.tempList = res
    })
  },

  methods: {
    moment,
    handleSubmit() {
      this.form.validateFields((err, value) => {
        if (!err) {
          const {contentHead, contentTitle, contentPlace, contentDate, contentFooter} = value
          const str = `{"first":{"value":"${contentHead||''}"},"keyword1":{"value":"${contentTitle||''}"},"keyword2":{"value":"${contentPlace||''}"},"keyword3":{"value":"${contentDate||''}"},"remark":{"value":"${contentFooter||''}","color":"#e60c0c"}}`
          const payload = {
            title: value.title,
            template_id: value.tempId,
            gid: value.group,
            content: str
          }
          if(value.isTiming) {
            payload.time = value.timingTime.format('YYYY-MM-DD HH:mm:ss')
          }
          addTpMsg(payload)
          .then(res => {
            if(res) {
              this.$message.success('提交成功')
            }
          })
        }
      })
    },

    inputContent(value, key) {
      this.previewContent = { ...this.previewContent, [key]: value }
    },

    changeTiming(val) {
      this.isTiming = val
      if (!val) {
        this.form.setFieldsValue({
          timingTime: ''
        })
      }
      this.$nextTick(() => {
        this.form.validateFields(['timingTime'], { force: true })
      })
    },

    selectGroup(id) {
      this.groups.forEach(item => {
        if(id === item.id) {
          this.groupTotal = item.count
        }
      })
    }
  }
}
</script>

<style lang="less">
.preview-container {
  width: 300px;
}

.phone {
  border: 1px solid #444;
  width: 240px;
  height: 480px;
  border-radius: 24px;
  .title {
    color: #666;
    font-size: 16px;
    margin: 8px 0px 16px;
    line-height: 1;
    min-height: 16px;
    word-break: break-word;
  }
}

.speaker {
  border: 1px solid #666;
  width: 60px;
  height: 4px;
  margin: 10px auto;
  border-radius: 4px;
  background-color: #999;
}

.screen {
  border: 1px solid #999;
  width: 90%;
  height: 82%;
  margin: 0 auto;
  padding: 10px;
  // background-color: #111;
}

.home {
  display: flex;
  justify-content: center;
  border: 2px solid #333;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin: 10px auto;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.preview-title {
  color: #999;
  width: 48px;
  white-space: nowrap;
}

.preview-content {
  word-break: break-word;
  flex: 0.9;
}

.form-container {
  flex: 1;
}

.content {
  border: 1px solid #ddd;
}

.preview-card-header {
  border-bottom: 1px solid #eee;
  padding: 12px 16px 16px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #9a9a9a;
}

.preview-card-footer {
  border-top: 1px solid #eee;
  margin-top: 8px;
  padding: 8px 8px 4px;
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>