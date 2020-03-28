<template>
    <div class="activedata">
        <div>
            <a-card style="width: 300px;height:150px;background:#F77D6F;color:#fff">
                <p>累计购买人数：</p>
                <p class="Numberofpeople">{{Numberofpeople}}</p>
            </a-card>
        </div>

            <!-- echarts -->
		<div class="box" style="margin:20px 0; padding:20px 0;">
			<div ref="mychart" style="width:90%; height:450px;"></div>
		</div>
    </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      Numberofpeople: 25608,
      
    }
  },
    mounted() {
    var mychart = echarts.init(this.$refs.mychart); //初始化画布
    mychart.setOption({
     title: {
        text: '活动每日运行趋势',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['甲', '乙', '丙', '丁', '戊']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '甲',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '乙',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '丙',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '丁',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '戊',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    
      
    });
  },

}
</script>

<style  scoped>
.activedata {
  background: #fff;
  padding: 20px;
}
.Numberofpeople {
  font-size: 28px !important;
}
</style>