<template>
  <div>
    <a-card
      class="data-card-container"
      style="margin-bottom:16px"
      :bodyStyle="{display: 'flex', flexWrap: 'wrap'}"
    >
      <div class="data-card">
        <div class="title">总交易额</div>
        <div class="value">{{ statistic.totalPrice||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">手续费</div>
        <div class="value">{{ statistic.totalFee||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">退款金额</div>
        <div class="value">{{ statistic.refundPrice||"0.00" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">订单数</div>
        <div class="value">{{ statistic.orderTotal||"0" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">成交数</div>
        <div class="value">{{ statistic.dealTotal||"0" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <div class="data-card">
        <div class="title">退款数</div>
        <div class="value">{{ statistic.refundTotal||"0" }}</div>
        <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
    </a-card>
    <a-card>
      <a-form layout="inline" autocomplete="off">
        <a-form-item label="订单号">
          <a-input v-model="orderSn" />
        </a-form-item>
        <a-form-item label="商品名称">
          <a-input v-model="gname" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="nickname" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model="status" style="width: 200px">
            <a-select-option :value="0">全部</a-select-option>
            <a-select-option :value="1">已经取消</a-select-option>
            <a-select-option :value="2">未付款</a-select-option>
            <a-select-option :value="3">已付款</a-select-option>
            <a-select-option :value="4">已核销</a-select-option>
            <a-select-option :value="5">已退款</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="支付时间">
          <a-range-picker
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            v-model="paytime"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="search">筛选</a-button>
          <a-button class="margin-left-sm" icon="redo" @click="reset">重置</a-button>
          <a-button class="margin-left-sm" icon="cloud-download" :loading="btnLoading" @click="exportOrder">导出</a-button>
        </a-form-item>
      </a-form>
      <a-table
        class="margin-top-sm"
        :loading="loading"
        :dataSource="list"
        :columns="columns"
        rowKey="oid"
        @change="tableChange"
        :pagination="{total, current: page, pageSize}"
      >
        <div
          slot="idx"
          slot-scope="text, record, index"
          :src="text"
        >{{ (page-1)*pageSize + index+1 }}</div>
        <a-avatar slot="avatar" slot-scope="text" :src="text" />
        <div slot="status" slot-scope="text">{{ text|orderStatus }}</div>
        <div slot="action" slot-scope="text, record">
          <a-button
            class="margin-right-sm"
            type="primary"
            icon="info-circle"
            @click="toDetail(record.oid)"
          >详情</a-button>
        </div>
      </a-table>
    </a-card>

    <a-modal title="详情" :visible="showDetail" @cancel="showDetail=false" :closable="false">
      <div class="order-detail">
        <div>订单号：{{ orderInfo.orderSn }}</div>
        <div>商品名称：{{ orderInfo.gname }}</div>
        <div>支付时间：{{ orderInfo.paytime }}</div>
        <div>支付额度：{{ orderInfo.dprice }}</div>
        <div>
          用户头像：
          <a-avatar :src="orderInfo.avatar" />
        </div>
        <div>用户名：{{ orderInfo.nickname }}</div>
        <div>订单状态：{{ orderInfo.status| orderStatus }}</div>
      </div>
      <template slot="footer">
        <a-button type="primary" @click="showDetail=false">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    const columns = [
      {
        title: '序号',
        scopedSlots: { customRender: 'idx' }
      },
      {
        title: '订单号',
        dataIndex: 'orderSn'
      },
      {
        title: '商品名称',
        dataIndex: 'gname'
      },
      {
        title: '支付时间',
        dataIndex: 'paytime'
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
        title: '操作状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      btnLoading: false,
      columns,
      list: [],
      total: 0,
      page: 1,
      pageSize: 10,
      orderSn: '',
      gname: '',
      nickname: '',
      beginTime: '',
      status: 0,
      paytime: [],
      statistic: {
        totalPrice: '',
        totalFee: '',
        refundPrice: '',
        orderTotal: '',
        dealTotal: '',
        refundTotal: ''
      },
      loading: false,
      infoLoading: false,
      showDetail: false,
      orderInfo: {
        orderSn: '',
        gname: '',
        paytime: '',
        dprice: '',
        nickname: '',
        avatar: '',
        status: 0
      }
    }
  },

  mounted() {
    this.query()
  },

  methods: {
    moment,
    exportOrder() {
      this.query(true)
    },

    reset() {
      this.page = 1
      this.pageSize = 10
      this.gname = ''
      this.nickname = ''
      this.orderSn = ''
      this.status = 0
      this.paytime = []
      this.query()
    },

    toDetail(oid) {
      this.infoLoading = true
      this.orderInfo = {
        orderSn: '',
        gname: '',
        paytime: '',
        dprice: '',
        nickname: '',
        avatar: '',
        status: 0
      }
      this.showDetail = true
      this.$post('backend/order/getOrderInfo', { oid }).then(res => {
        if (res) {
          this.orderInfo = { ...res }
        }
      })
    },

    search() {
      this.page = 1
      this.pageSize = 10
      this.query()
    },

    query(flag = false) {
      if (flag) {
        this.btnLoading = true
      } else {
        this.loading = true
      }

      const payload = {
        page: this.page,
        pageSize: this.pageSize
      }
      if (this.orderSn) {
        payload.orderSn = this.orderSn
      }
      if (this.gname) {
        payload.gname = this.gname
      }
      if (this.nickname) {
        payload.nickname = this.nickname
      }
      if (this.status) {
        payload.status = this.status
      }
      if (this.paytime.length > 0) {
        payload.beginTime = this.paytime[0].format('YYYY-MM-DD HH:mm:ss')
        payload.endTime = this.paytime[1].format('YYYY-MM-DD HH:mm:ss')
      }
      if (flag) {
        payload.flag = true
      }
      this.$post('backend/order/getOrderStatistic', payload)
        .then(res => {
          if (res) {
            if (flag) {
              var link = document.createElement('a')
              link.download = '订单数据' || ''
              link.href = `https://discount.rongxinh.com/${res}`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            } else {
              this.list = res.orderList
              this.total = res.count
              this.statistic = res.statistic
            }
          }
        })
        .finally(() => {
          this.btnLoading = false
          this.loading = false
        })
    },

    tableChange({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.query()
    }
  },

  filters: {
    orderStatus(status) {
      switch (status) {
        case 1:
          return '已取消'
        case 2:
          return '未付款'
        case 3:
          return '已付款'
        case 4:
          return '已核销'
        case 5:
          return '已退款'
        default:
          return ''
      }
    }
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

.order-detail {
  display: flex;
  flex-wrap: wrap;
  div {
    width: 50%;
    margin: 12px 0;
  }
}
</style>
