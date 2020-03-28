<template>
  <a-card>
    <div class="margin-tb-sm">
      <span>用户名：</span>
      <a-input style="width: 200px" v-model="userName" />
      <a-button class="margin-left-sm" icon="search" type="primary" @click="search">筛选</a-button>
    </div>
    <a-table
      :loading="loading"
      :dataSource="list"
      :columns="columns"
      rowKey="uid"
      @change="tableChange"
      :pagination="{total, current: page, pageSize}"
    >
      <div slot="idx" slot-scope="text, record, index" :src="text">{{ (page-1)*pageSize + index+1 }}</div>
      <a-avatar slot="avatar" slot-scope="text" :src="text" />
      <a-tag slot="actions" color="blue" slot-scope="text, record" :src="text" @click="toDetail(record.uid)">推广明细</a-tag>
    </a-table>
  </a-card>
</template>

<script>
import {getUserList} from '@/api/user'
export default {
  data () {
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
        title: '推广人数',
        dataIndex: 'total'
      },
      {
        title: '累计返利',
        dataIndex: 'tprofit'
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
        scopedSlots: { customRender: 'actions' }
      }
    ]
    return {
      userName: '',
      list: [],
      total: 0,
      columns,
      page: 1,
      pageSize: 10,
      loading: false
    }
  },

  mounted () {
    this.queryUser()
  },

  methods: {
    search () {
      this.page = 1
      this.pageSize = 10
      this.queryUser()
    },

    tableChange ({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.queryUser()
    },

    queryUser () {
      this.loading = true
      const { page, pageSize, userName } = this
     getUserList({ page, pageSize, name: userName })
        .then(res => {
          this.list = res.data
          this.total = res.count
        })
        .finally(() => {
          this.loading = false
        })
    },

    toDetail(id) {
      this.$router.push({name: 'userDetail', params: {id}})
    }
  }
}
</script>
