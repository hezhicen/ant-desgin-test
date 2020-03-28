<template>
  <a-card>
    <div class="margin-tb-sm">
      <span>时间：</span>
      <a-input style="width: 200px" v-model="title" />
      <a-button class="margin-left-sm" icon="search" type="primary" @click="search">筛选</a-button>
      <a-button class="margin-left-sm" icon="plus" @click="toAdd">模板消息</a-button>
    </div>
    <a-table
      :loading="loading"
      :dataSource="list"
      :columns="columns"
      rowKey="tid"
      @change="tableChange"
      :pagination="{total, current: page, pageSize}"
    >
      <div slot="idx" slot-scope="text, record, index" :src="text">{{ (page-1)*pageSize + index+1 }}</div>
      <div slot="action" slot-scope="text, record">
        <a-button type="danger" icon="delete" @click="del(record.tid)">删除</a-button>
      </div>
    </a-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { getMsgList, delMsg } from '@/api/temp'
export default {
  data() {
    const columns = [
      {
        title: '序号',
        scopedSlots: { customRender: 'idx' }
      },
      {
        title: '推送标题',
        dataIndex: 'title'
      },
      {
        title: '推送人群',
        dataIndex: 'obj'
      },
      {
        title: '推送总人数',
        dataIndex: 'total'
      },
      {
        title: '推送成功人数',
        dataIndex: 'success'
      },
      {
        title: '推送时间',
        dataIndex: 'time'
      },
      {
        title: '推送模板ID',
        dataIndex: 'tpid'
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      title: '',
      list: [],
      total: 0,
      columns,
      page: 1,
      pageSize: 10,
      loading: false
    }
  },

  mounted() {
    this.queryTemp()
  },

  methods: {
    search() {
      this.page = 1
      this.pageSize = 10
      this.queryTemp()
    },
    del(tid) {
      this.$confirm({
        title: '操作提示',
        content: '确定要删除这条记录吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            delMsg({tid}).then(res => {
              this.$message.success('删除成功')
              this.queryTemp()
              resolve()
            })
            .catch(() => {
              reject()
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },

    changeStatus(gid) {
      this.$post('backend/goods/setGoodsStatus', { gid }).then(res => {
        if (res) {
          this.$message.success('修改成功')
        }
      })
    },

    toAdd() {
      this.$router.push({ name: 'tmplAdd' })
    },

    tableChange({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.queryTemp()
    },

    queryTemp() {
      this.loading = true
      const { page, pageSize, title } = this
      getMsgList({ page, pageSize, title })
        .then(res => {
          this.list = res.data
          this.total = res.count
        })
        .finally(() => {
          this.loading = false
        })
      // setTimeout(() => {
      //   const {randomString} = this
      //   this.list = new Array(10).fill({}).map((item, index) => {
      //     return {
      //       title: `标题${index+1}`,
      //       group: ['商家', 'xx家具', 'xx企业', '所有人'][this.getRandom(0,3)],
      //       total: this.getRandom(200, 300),
      //       success: this.getRandom(100, 200),
      //       date: this.getRandomDate(),
      //       tid: `${randomString(4)}-${randomString(4)}-${randomString(33)}`
      //     }
      //   })
      //   this.loading = false
      // }, 500)
    },

    randomString(len) {
      len = len || 32
      var $chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },

    getRandomDate() {
      var maxdaterandom = new Date().getTime()
      var mindaterandom = new Date(1970, 0, 1, 8).getTime()
      var randomdate = this.getRandom(mindaterandom, maxdaterandom)
      var datestr = moment(randomdate).format('YYYY-MM-DD')
      return datestr
    },

    getRandom(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    edit(id) {
      this.$router.push({ name: 'goodsEdit', params: { id } })
    }
  }
}
</script>
