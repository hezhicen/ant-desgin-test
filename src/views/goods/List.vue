<template>
  <a-card>
    <div class="margin-tb-sm">
      <span>商品名称：</span>
      <a-input style="width: 200px" v-model="goodsName" />
      <a-button class="margin-left-sm" icon="search" type="primary" @click="search">筛选</a-button>
      <a-button class="margin-left-sm" icon="plus" @click="toAdd">新增</a-button>
    </div>
    <a-table
      :loading="loading"
      :dataSource="list"
      :columns="columns"
      rowKey="gid"
      @change="tableChange"
      :pagination="{total, current: page, pageSize}"
    >
      <div slot="idx" slot-scope="text, record, index" :src="text">{{ (page-1)*pageSize + index+1 }}</div>
      <a-avatar slot="cover" slot-scope="text" :src="text" />
      <a-switch
        @change="changeStatus(record.gid)"
        slot="status"
        slot-scope="text, record"
        :defaultChecked="record.status===2"
        checkedChildren="上架"
        unCheckedChildren="下架"
      />
      <div slot="action" slot-scope="text, record">
        <a-button class="margin-right-sm" type="primary" icon="edit" @click="edit(record.gid)">编辑</a-button>
        <a-button type="danger" icon="delete" @click="del(record.gid)">删除</a-button>
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
        title: '商品图片',
        dataIndex: 'cover',
        scopedSlots: { customRender: 'cover' }
      },
      {
        title: '商品名称',
        dataIndex: 'gname'
      },
      {
        title: '访问量',
        dataIndex: 'visit'
      },
      {
        title: '销量',
        dataIndex: 'salenum'
      },
      {
        title: '库存',
        dataIndex: 'total'
      },
      {
        title: '创建时间',
        dataIndex: 'addtime'
      },
      {
        title: '是否上架',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      goodsName: '',
      list: [],
      total: 0,
      columns,
      page: 1,
      pageSize: 10,
      loading: false
    }
  },

  mounted () {
    this.queryGoods()
  },

  methods: {
    search () {
      this.page = 1
      this.pageSize = 10
      this.queryGoods()
    },
    del (gid) {
      this.$confirm({
        title: '操作提示',
        content: '确定要删除这个商品吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            this.$post('backend/goods/delGoods', { gid })
              .then(res => {
                if (res) {
                  this.$message.success('删除成功')
                  this.queryGoods()
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

    changeStatus (gid) {
      this.$post('backend/goods/setGoodsStatus', { gid }).then(res => {
        if (res) {
          this.$message.success('修改成功')
        }
      })
    },

    toAdd () {
      this.$router.push({ name: 'goodsAdd' })
    },

    tableChange ({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.queryGoods()
    },

    queryGoods () {
      this.loading = true
      const { page, pageSize, goodsName } = this
      this.$post('backend/goods/getGoodsList', { page, pageSize, name: goodsName })
        .then(res => {
          this.list = res.data
          this.total = res.count
        })
        .finally(() => {
          this.loading = false
        })
    },

    edit (id) {
      this.$router.push({ name: 'goodsEdit', params: { id } })
    }
  }
}
</script>
