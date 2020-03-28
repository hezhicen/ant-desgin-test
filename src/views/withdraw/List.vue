<template>
  <a-card>
    <div class="margin-tb-sm">
      <span>用户名：</span>
      <a-input v-model="userName" style="width: 200px"/>
      <a-button class="margin-left-sm" icon="search" type="primary" @click="search">筛选</a-button>
      <a-button class="margin-left-sm" icon="setting" type="primary" @click="showSetting">提现设置</a-button>
    </div>
    <a-table
      :loading="loading"
      :dataSource="list"
      :columns="columns"
      rowKey="aid"
      @change="tableChange"
      :pagination="{total, current: page, pageSize:10}"
    >
      <div slot="idx" slot-scope="text, record, index" :src="text">{{ (page-1)*10 + index+1 }}</div>
      <a-avatar slot="avatar" slot-scope="text" :src="text" />
      <a-tag slot="status" slot-scope="text" :color="text|statusColor">{{text|statusLabel}}</a-tag>
      <div slot="actions" slot-scope="text, record">
        <a-button v-if=" record.status===2 && record.tag===0" type="primary" class="margin-right-sm" @click="manual(record.aid)">手动提现</a-button>
        
        <a-dropdown class="margin-right-sm" :trigger="['click']" v-if="record.status===1">
          <a-menu slot="overlay" @click="e => selectApply(e.key, record.aid)">
            <a-menu-item :key="2">同意</a-menu-item>
            <a-menu-item :key="3">拒绝</a-menu-item>
          </a-menu>
          <a-button style="background-color: #FFBF5A;border-color:#FFBF5A;color:#fff;">
            操作
          </a-button>
        </a-dropdown>
        
        <a-button type="primary" @click="toDetail(record.uid)">返利记录</a-button>
      </div>
    </a-table>
     <a-modal v-model="settingModal" title="提现设置" onOk="submit" :maskClosable="false">
      <template slot="footer">
        <a-button key="back" @click="closeModal">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleWithdraw">保存</a-button>
      </template>
      <a-form :form="form">
        <a-form-item label="每日提现金额上限" :labelCol="{span:8}" :wrapperCol="{span:10}">
          <a-input-number :min="0" :precision="2" v-model="daylimit"/>
        </a-form-item>
        <a-form-item label="提现手续费" :labelCol="{span:8}" :wrapperCol="{span:10}">
          <a-input-number :min="0" :precision="2" v-model="cashfee"/> %
        </a-form-item>
        <a-form-item label="最小提现金额" :labelCol="{span:8}" :wrapperCol="{span:10}">
          <a-input-number :min="0" :precision="2" v-model="mincash"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { getCashSetting, cashSetting, getCashApplyList, auditApply, manualCash} from '@/api/cash'
export default {
  data() {
    const columns = [
      {
        title: '序号',
        scopedSlots: { customRender: 'idx' }
      },
      {
        title: '用户ID',
        dataIndex: 'openid'
      },
      {
        title: '用户头像',
        dataIndex: 'avatar',
        scopedSlots: { customRender: 'avatar' }
      },
      {
        title: '用户名',
        dataIndex: 'nickname'
      },
      {
        title: '提现金额',
        dataIndex: 'money'
      },
      {
        title: '手续费',
        dataIndex: 'fee'
      },
      {
        title: '申请时间',
        dataIndex: 'addtime'
      },
       {
        title: '审核状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'actions' }
      }
    ]
    return {
      form: this.$form.createForm(this),
      userName: '',
      list: [],
      total: 0,
      columns,
      page: 1,
      loading: false,
      submitLoading: false,
      settingModal: false,
      daylimit:'',
      cashfee:'',
      mincash: '',

      daylimitCache: '',
      cashfeeCache:'',
      mincash: ''
    }
  },

  mounted() {
    this.queryUser()
    getCashSetting()
    .then(res => {
      if(res) {
        this.daylimitCache = this.daylimit = res.daylimit
        this.cashfeeCache = this.cashfee = res.cashfee
        this.mincashCache = this.mincash = res.mincash
      }
    })
  },

  methods: {
    submit() {
      this.settingModal = false
    },

    closeModal() {
      this.settingModal = false
      this.daylimit = this.daylimitCache
      this.cashfee = this.cashfeeCache
      this.mincash = this.mincashCache
    },

    search() {
      this.page = 1
      this.queryUser()
    },

    tableChange({ current }) {
      this.page = current
      this.queryUser()
    },

    queryUser() {
      this.loading = true
      const { page, userName } = this
      getCashApplyList({name: userName, page, pageSize: 10})
        .then(res => {
          this.list = res.data
          this.total = res.count
        })
        .finally(() => {
          this.loading = false
        })
    },

    toDetail(id) {
      this.$router.push({ name: 'userDetail', params: { id } })
    },

    selectApply(result, aid) {
      auditApply({result, aid })
      .then(res => {
        if(res) {
          if(res) {
            this.$message.success('操作成功')
            this.queryUser()
          }
        }
      })
    },

    manual(aid) {
      manualCash({aid})
      .then(res => {
        if(res) {
          this.$message.success('操作成功')
          tihs.queryUser()
        }
      })
    },

    handleWithdraw() {
      this.submitLoading = true
      cashSetting({daylimit: this.daylimit, cashfee: this.cashfee, mincash:this.mincash})
      .then(res => {
        if(res) {
          this.$message.success('保存成功')
          this.settingModal = false
          this.daylimitCache = this.daylimit
          this.cashfeeCache = this.cashfee
          this.mincashCache = this.mincash
        }
      })
      .finally(() => {
        this.submitLoading = false
      })
    },

    showSetting() {
      
      this.settingModal = true
    }
  },

  filters:{
    statusLabel(status) {
      switch(status) {
        case 1: return '未审核'
        case 2: return '通过'  
        case 3: return '驳回'
      }
    },

    statusColor(status) {
      switch(status) {
        case 1: return 'blue'
        case 2: return 'green'  
        case 3: return 'red'
      }
    }
  }
}
</script>
