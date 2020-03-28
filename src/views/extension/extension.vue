<template>
    <div class="extension">
           <div class='input'>
                <span>组长姓名：<a-input placeholder="请输入" /></span>
                <a-button type="primary" icon="search" @click="serch()">筛选</a-button>
                <a-button icon="plus" @click="showModal">新增</a-button>
                <div>
                  <a-modal title="新增组长" v-model="visible" @ok="handleOk">
                   <span>组长姓名：<a-input placeholder="请输入" v-model="newname"/></span>
                  </a-modal>
                </div>
           </div>
           <div class="list">
               <a-table :columns="columns" :dataSource="data" @change="onChange" >
                      
                      <span slot="action" slot-scope="text, record">
                        <a-button type="primary" @click="datas(record.key)">数据概况</a-button>
                        <a-button type="primary" @click="zhuyuan(record.key)">组员管理</a-button>
                        <a-button type="danger" @click="del(record.key)">删除</a-button>
                      </span>
                      
               </a-table>
           </div>
    </div>
</template>

<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '组长姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '组员人数',
    dataIndex: 'sum',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.sum - b.sum
  },
  {
    title: '前一天推广量',
    dataIndex: 'yestodayamount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.yestodayamount - b.yestodayamount
  },
  {
    title: '当天推广量',
    dataIndex: 'todayamount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.todayamount - b.todayamount
  },
  {
    title: '累计推广量',
    dataIndex: 'allamount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.allamount - b.allamount
  },
  {
    title: '推广码',
    dataIndex: 'codenum',
    key: 'codenum'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: '赵六',
    sum: 20,
    yestodayamount: 500,
    todayamount: 400,
    allamount: 95926,
    codenum: 656
  },
  {
    key: '2',
    name: '张三',
    sum: 30,
    yestodayamount: 600,
    todayamount: 500,
    allamount: 99926,
    codenum: 956
  },
  {
    key: '3',
    name: '李四',
    sum: 40,
    yestodayamount: 700,
    todayamount: 600,
    allamount: 26266,
    codenum: 8895
  },
  {
    key: '4',
    name: '王五',
    sum: 50,
    yestodayamount: 300,
    todayamount: 700,
    allamount: 59494,
    codenum: 5956
  }
]

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter)
}
export default {
  data() {
    return {
      data,
      columns,
      visible: false,
      newname: ''
    }
  },
  methods: {
    //排序
    onChange,
    //删除
    del(key) {
      console.log(key)
      const data = [...this.data]
      this.data = data.filter(item => item.key !== key)
    },
    //数据
    datas(x) {
      console.log(x)
    },
    //组员
    zhuyuan(x) {
      console.log(x)
    },
    //弹出框
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.data.push({
        key: this.data.length+1,
        name: this.newname,
        sum: 1,
        yestodayamount: 0,
        todayamount: 0,
        allamount: 0,
        codenum: 0
      })
      this.newname='';
      this.visible = false
    },
    // 筛选
    serch(){
      
        
    }
  }
}
</script>

<style lang="less" scoped>
.extension {
  background: #fff;
  padding: 18px;
}
.input {
  margin-top: 24px;
}
.ant-input {
  width: 180px;
  margin-right: 40px;
}
.ant-btn {
  margin-right: 15px;
}
.list {
  margin-top: 20px;
}
</style>