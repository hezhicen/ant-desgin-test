<template>
    <div class="sigup">
        <a-card style="width: 300px;height:150px;background:#F77D6F;color:#fff">
            <p>累计购买人数：</p>
            <p class="Numberofpeople">{{Numberofpeople}}</p>
        </a-card>
        
      <div class='input'>
        <span>电话号码：<a-input placeholder="请输入" /></span>
        <span>福利类型：<a-input placeholder="请输入" /></span>
        <span>销售状态：<a-input placeholder="请输入" /></span>
        <a-button type="primary" icon="search">筛选</a-button>
      </div>

      <div class='list'>
           <a-table :columns="columns" :dataSource="data">
              <span slot="customTitle"> 序号</span>
              <span slot="action" slot-scope="text, record">
                <a @click="del(record.key)">删除</a> 
              </span>
            </a-table>
                      
      </div>
  </div>
      
</template>

<script>
const columns = [
  {
    dataIndex: 'key',
    key: 'key',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'key' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '电话',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand'
  },
  {
    title: '福利类型',
    dataIndex: 'welfare',
    key: 'welfare'
  },
  // state
  {
    title: '核销状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
// brand
const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: 17828020593,
    brand: '耐克',
    welfare: ['福利一 ', '福利二'],
    state:'已核销'
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: 17828020593,
    brand: '安踏',
    welfare: ['福利一 ', '福利二'],
    state:'未核销'
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: 17828020593,
    brand: '李宁',
    welfare: ['福利一 ', '福利二'],
    state:'已核销'
  }
]

export default {
  data() {
    return {
      Numberofpeople: 25608,
      data,
      columns
    }
  },

  methods: {
    del(key){
      console.log(key);
     const data = [...this.data];
     this.data = data.filter(item => item.key !== key);
    }
  }
}
</script>

<style  scoped>
.sigup {
  background: #fff;
  padding: 20px;
}
.Numberofpeople {
  font-size: 28px !important;
}
.input {
  margin-top: 24px;
}
.ant-input {
  width: 180px;
  margin-right: 40px;
}
.list {
  margin-top: 15px;
}

.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>