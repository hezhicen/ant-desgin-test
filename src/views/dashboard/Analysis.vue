<template>
  <div class="page-header-index-wide">
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="销售额" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="salesData" title="销售额排行" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="margin-left">
                  <div class="margin-bottom">门店销售排行榜</div>
                  <dv-scroll-board :config="rankConfig" style="width:500px;height:220px;" />
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问量" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="viewsData" title="销售额趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="margin-left">
                  <div class="margin-bottom">门店销售排行榜</div>
                  <dv-scroll-board :config="rankConfig" style="width:500px;height:220px;" />
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="isDesktop() ? 'desktop' : ''">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="网点覆盖" :style="{ height: '100%' }">
            <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">操作一</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">操作二</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <div id="locationPie" ></div>
          </a-card>
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
            <div slot="extra" style="height: inherit;">
              <!-- style="bottom: 12px;display: inline-block;" -->
              <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link" />
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">操作一</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">操作二</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
              <div class="analysis-salesTypeRadio">
                <a-radio-group defaultValue="a">
                  <a-radio-button value="a">全部渠道</a-radio-button>
                  <a-radio-button value="b">线上</a-radio-button>
                  <a-radio-button value="c">门店</a-radio-button>
                </a-radio-group>
              </div>

            </div>
            <div id="goodsPie" ></div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Bar } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import G2 from '@antv/g2'
import { getAnalysisData } from '@/api/dashboard'
export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    Bar
  },
  data () {
    return {
      loading: true,
      rankData: [],
      rankConfig: {
        data: [],
        index: true,
        align: ['center']
      },
      salesData: [],
      viewsData: [],
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  mounted () {
    getAnalysisData().then(res => {
      const { data, code } = res
      if (code === 200) {
        this.loading = !this.loading
        const { salesData, viewsData, rankData, locationData, goodsData } = data
        this.salesData = salesData
        this.viewsData = viewsData
        setTimeout(() => {
          this.renderLocationChart(locationData)
          this.renderGoodsChart(goodsData)
        }, 100)
        this.rankConfig = {
          oddRowBGC: '#FFFFFF',
          evenRowBGC: '#FFFFFF',
          columnWidth: [50, 300],
          data: rankData.map((item, index) => {
            return [
              `<span class='rank-index ${index < 3 ? 'active' : ''}'>${index + 1}</span>`,
              `<span style='color:#000000;'>${item.x}</span>`,
              `<div style='color:#000000;text-align:right;width:100%'>￥${item.value}</div>`
            ]
          })
        }
      }
    })
  },

  methods: {
    renderLocationChart (dataSource) {
      let sum = 0
      dataSource.map(item => {
        sum += item.value
      })
      const data = dataSource.map((item, index) => {
        return {
          index,
          item: item.label,
          count: item.value,
          percent: item.value / sum
        }
      })

      const chart = new G2.Chart({
        container: 'locationPie',
        forceFit: true,
        height: 400
      })
      chart.source(data, {
        percent: {
          formatter: function formatter (val) {
            val *= 100
            return val.toFixed(2) + '%'
          }
        }
      })
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      })
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      })

      chart.guide().html({
        position: ['50%', '50%'],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;" >网点数量<br><span style="color:#8c8c8c;font-size:20px" id="locationLabel">${sum}</span></div>`,
        alignX: 'middle',
        alignY: 'middle'
      })

      const geom = chart.intervalStack().position('percent').color('item').label('percent', {
        formatter: function formatter (val, item) {
          return item.point.item + ': ' + val
        }
      }).tooltip('item*percent', function (item, percent) {
        percent = (percent * 100).toFixed(2) + '%'
        return {
          name: item,
          value: percent
        }
      }).style({
        lineWidth: 1,
        stroke: '#ffffff'
      })
      geom.select(true, {
        cancelable: false
      })
      chart.render()
      chart.on('click', e => {
        if (e.data && e.data.point) {
          const { count } = e.data.point
          // 此处没有选择修改guide的方式，是因为repaint之后会重置动画效果，造成视觉冲突，故直接进行dom操作更新数据
          document.getElementById('locationLabel').innerHTML = count
          // chart.guide().clear()
          // chart.guide().html({
          //   position: ['50%', '50%'],
          //   html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;" ref="pielabel">网点数量<br><span style="color:#8c8c8c;font-size:20px"></span>${count}</div>`,
          //   alignX: 'middle',
          //   alignY: 'middle'
          // })
          // chart.repaint()
        }
      })
    },

    renderGoodsChart (dataSource) {
      var chart = new G2.Chart({
        container: 'goodsPie',
        forceFit: true,
        height: 400
      })

      chart.source(dataSource)
      chart.coord('theta', {
        innerRadius: 0.75
      })
      chart.tooltip({
        showTitle: false
      })
      chart.intervalStack().position('value').color('label').shape('sliceShape')
      chart.render()
    }
  }
}
</script>

<style lang="less">
  .rank-index{
    background: #f5f5f5;
    color: rgba(0,0,0,.65);
    border-radius: 20px;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    margin-right: 24px;
    height: 20px;
    line-height: 20px;
    width: 20px;
    text-align: center;
    box-sizing: border-box;
    &.active{
      background-color: #314659;
      color: #fff;
    }
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;
    .extra-item {
      display: inline-block;
      margin-right: 24px;
      a {
        margin-left: 24px;
      }
    }
  }
  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }
  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }
  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
