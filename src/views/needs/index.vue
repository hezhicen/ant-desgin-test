<template>
  <a-card>
    <div class="margin-tb-sm">
      <span>用户名：</span>
      <a-input style="width: 200px" v-model="needsName" />
      <a-button class="margin-left-sm" icon="search" type="primary" @click="search">筛选</a-button>
    </div>
    <a-table
      :loading="loading"
      :dataSource="list"
      :columns="columns"
      rowKey="nid"
      @change="tableChange"
      :pagination="{total, current: page, pageSize}"
    >
      <div slot="idx" slot-scope="text, record, index" :src="text">{{ (page-1)*pageSize + index+1 }}</div>
      <div slot="needs" slot-scope="text">
        <a-tag v-for="(item, index) in text" :key="index" color="blue">{{ item }}</a-tag>
      </div>
      <div slot="action" slot-scope="text, record">
        <a-button type="danger" icon="delete" @click="del(record.nid)">删除</a-button>
      </div>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data () {
    const columns = [
      {
        title: '序号',
        scopedSlots: { customRender: 'idx' }
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '电话号码',
        dataIndex: 'tel'
      },
      {
        title: '用户需求',
        dataIndex: 'needs',
        scopedSlots: { customRender: 'needs' }
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      needsName: '',
      list: [],
      total: 0,
      columns,
      page: 1,
      pageSize: 10,
      loading: false
    }
  },

  mounted () {
    this.queryNeeds()
  },

  methods: {
    search () {
      this.page = 1
      this.pageSize = 10
      this.queryNeeds()
    },

    tableChange ({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.queryNeeds()
    },

    queryNeeds () {
      this.loading = true
      const { page, pageSize, needsName } = this
      this.$post('backend/needs/getNeedsList', { page, pageSize, name: needsName })
        .then(res => {
          this.list = res.data
          this.total = res.count
        })
        .finally(() => {
          this.loading = false
        })
    },

    del (nid) {
      this.$confirm({
        title: '操作提示',
        content: '确定要删除这个需求吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            this.$post('backend/needs/delNeeds', { nid })
              .then(res => {
                if (res) {
                  this.$message.success('删除成功')
                  this.queryNeeds()
                }
              })
              .finally(() => {
                resolve()
              })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
  }
}
</script>
