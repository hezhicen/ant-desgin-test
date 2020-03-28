<template>
  <div>
    <div class="card" style="margin-botton:16px">
      <div class="label-title">
        <div>活动运行数据</div>
      </div>
      <div class="data-card-container">
        <div class="data-card">
          <div class="title">累计活动访问人数</div>
          <div class="value">{{ statistics.visitUser||"0" }}人</div>
          <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
        <div class="data-card">
          <div class="title">累计活动访问次数</div>
          <div class="value">{{ statistics.visit||"0" }}</div>
          <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
        <div class="data-card">
          <div class="title">累计分享人数</div>
          <div class="value">{{ statistics.shareUser||"0" }}人</div>
          <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
        <div class="data-card">
          <div class="title">累计分享次数</div>
          <div class="value">{{ statistics.share||"0" }}</div>
          <div class="desc">最近数据更新：{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="label-title">
        <div>活动每日运行趋势</div>
      </div>
      <div id="canvas"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Line } from '@antv/g2plot'
export default {
  data () {
    return {
      beginTime: '',
      statistics: {
        visitUser: '',
        visit: '',
        shareUser: '',
        share: ''
      },
      loading: false,
      dataSource: []
    }
  },

  mounted () {
    this.query()
  },

  methods: {
    moment,
    query () {
      this.loading = true
      this.$post('backend/active/getActiveStatistic', {
        beginTime: '',
        endTime: ''
      })
        .then(res => {
          if (res) {
            const { statistics, trend } = res
            this.statistics = statistics
            const data = []
            Object.keys(trend).forEach(key => {
              const item = trend[key]
              data.push(this.setItem(item.date, '访问人数', item.visituser))
              data.push(this.setItem(item.date, '访问次数', item.visitnum))
              data.push(this.setItem(item.date, '下单人数', item.orderuser))
              data.push(this.setItem(item.date, '下单次数', item.ordernum))
              data.push(this.setItem(item.date, '分享人数', item.shareuser))
              data.push(this.setItem(item.date, '分享次数', item.sharenum))
            })
            this.dataSource = data
            const linePlot = new Line('canvas', {
              title: {
                visible: true,
                text: '每日活动运行趋势',
                style: { fill: '#1890ff' }
              },
              data: this.dataSource,
              xField: 'date',
              yField: 'value',
              seriesField: 'type',
              forceFit: true,
              padding: 'auto',
              legend: {
                position: 'right-top'
              },
              smooth: true
            })
            linePlot.render()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    setItem (date, type, value) {
      return {
        date,
        type,
        value
      }
    },

    tableChange ({ current, pageSize }) {
      this.page = current
      this.pageSize = pageSize
      this.query()
    }
  }
}
</script>

<style lang="less" scoped>
.label-title {
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

.card {
  background-color: #fff;
  padding-bottom: 8px;
  & + & {
    margin-top: 16px;
  }
}

.data-card-container {
  display: flex;
}

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
