<template>
  <div>
    <a-card
      class="data-card-container"
      style="margin-bottom:16px"
      :bodyStyle="{display: 'flex', flexWrap: 'wrap'}"
    >
      <div class="data-card">
        <div class="title">累计获利</div>
        <div class="value">{{ tprofit||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">累计直接获利</div>
        <div class="value">{{ dprofit||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">累计间接获利</div>
        <div class="value">{{ iprofit||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">待提现</div>
        <div class="value">{{ useful||"0.00" }}元</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">待入账</div>
        <div class="value">{{ ueprofit||"0.00" }}元</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">已提现</div>
        <div class="value">{{ cash||"0.00" }}元</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
    </a-card>
    <a-card>
      <a-form layout="inline" autocomplete="off">
        <a-form-item label="用户名">
          <a-input v-model="nickname" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="search">筛选</a-button>
          <a-button class="margin-left-sm" icon="redo" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
      <a-table
        class="margin-top-sm"
        :loading="loading"
        :dataSource="list"
        :columns="columns"
        rowKey="uid"
        @change="childrenTableChange"
        :pagination="{total:childrenTotal, current: childrenPage, pageSize:10}"
      >
        <div
          slot="idx"
          slot-scope="text, record, index"
          :src="text"
        >{{ (page-1)*10 + index+1 }}</div>
        <a-avatar slot="avatar" slot-scope="text" :src="text" />
        <div slot="action" slot-scope="text, record">
          <a-tag @click="toDetail(record.uid)" color="blue">二级明细</a-tag>
        </div>
      </a-table>
    </a-card>

    <a-modal width="60vw" title="二级明细" :visible="showDetail" @cancel="showDetail=false" :closable="false">
      <a-table
        class="margin-top-sm"
        :loading="infoLoading"
        :dataSource="children"
        :columns="detailColumns"
        rowKey="uid"
        @change="tableChange"
        :pagination="{total, current: page, pageSize:10}"
      >
        <div
          slot="idx"
          slot-scope="text, record, index"
          :src="text"
        >{{ (page-1)*10 + index+1 }}</div>
        <a-avatar slot="avatar" slot-scope="text" :src="text" />
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import {getUserRecommendsList,getSecondUserList} from '@/api/user'
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
        title: '直接获利',
        dataIndex: 'dprofit'
      },
      {
        title: '间接获利',
        dataIndex: 'iprofit'
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
    const detailColumns = [
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
        title: '间接获利',
        dataIndex: 'iprofit'
      }
    ]
    return {
      id: this.$route.params.id,
      columns,
      detailColumns,
      list: [],
      children: [],
      total: 0,
      childrenTotal: 0,
      page: 1,
      childrenPage:1,
      nickname: '',
      dprofit: '',
      iprofit: '',
      cash: '',
      ueprofit:'',
      tprofit: '',
      useful: '',
      loading: false,
      infoLoading: false,
      showDetail: false,
    }
  },

  mounted() {
    this.query()
  },

  methods: {
    moment,
    queryChildren(uid) {
      this.infoLoading = true
      getSecondUserList({ page: this.page, pageSize: 10, uid})
        .then(res => {
          if (res) {
            this.children = res.userList
          }
        })
        .finally(() => {
          console.log(111)
          this.infoLoading = false
        })
    },

    exportOrder() {
      this.query(true)
    },

    reset() {
      this.page = 1
      this.nickname = ''
      this.query()
    },

    toDetail(uid) {
      this.infoLoading = true
      this.showDetail = true
      this.queryChildren(uid)
    },

    search() {
      this.page = 1
      this.query()
    },

    query() {
      const payload = {
        page: this.page,
        pageSize: 10,
        uid: this.$route.params.id
      }
      if(this.nickname) {
        payload.name = this.nickname
      }
      this.loading = true
      getUserRecommendsList(payload)
        .then(res => {
          if (res) {
            this.list = res.userList
            this.total = res.count
            this.dprofit = res.dprofit
            this.iprofit = res.iprofit
            this.cash = res.cash
            this.ueprofit = res.ueprofit
            this.tprofit = res.tprofit
            this.useful = res.useful
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    tableChange({ current }) {
      this.page = current
      this.query()
    },

    childrenTableChange({ current }) {
      this.childrenPage = current
      this.queryChildren()
    },
  }
}
</script>

<style lang="less" scoped>
.data-card {
  width: calc((100% - 60px) / 3);
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(-45deg, #23a6d5, #23d5ab);
  color: #fff;
  padding: 16px 16px;
  margin: 8px 10px;
  .title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .value {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .desc {
    font-size: 14px;
  }
}
</style>