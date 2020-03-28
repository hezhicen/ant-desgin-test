import { setColProp } from '../../../../src/utils/table.js'

const mockData = [
  { title: '编号', dataIndex: 'goods_sn' },
  { title: '名称', dataIndex: 'goods_name' },
  { title: '分类', dataIndex: 'category_name' },
  { title: '封面', dataIndex: 'goods_img' },
  { title: '批发价', dataIndex: 'shop_price' },
  { title: '零售价', dataIndex: 'market_price' },
  { title: '销量', dataIndex: 'sales_sum' },
  { title: '库存', dataIndex: 'store_count' },
  { title: '上架时间', dataIndex: 'on_time' },
  { title: '状态', dataIndex: 'on_sale' }
]

test('setColProp with align center', () => {
  expect(setColProp(mockData, 'align', 'center')).toEqual([
    { title: '编号', dataIndex: 'goods_sn', align: 'center' },
    { title: '名称', dataIndex: 'goods_name', align: 'center' },
    { title: '分类', dataIndex: 'category_name', align: 'center' },
    { title: '封面', dataIndex: 'goods_img', align: 'center' },
    { title: '批发价', dataIndex: 'shop_price', align: 'center' },
    { title: '零售价', dataIndex: 'market_price', align: 'center' },
    { title: '销量', dataIndex: 'sales_sum', align: 'center' },
    { title: '库存', dataIndex: 'store_count', align: 'center' },
    { title: '上架时间', dataIndex: 'on_time', align: 'center' },
    { title: '状态', dataIndex: 'on_sale', align: 'center' }
  ])
})

test('setColProp with black array and align center', () => {
  expect(setColProp([], 'align', 'center')).toEqual([])
})

test('setColProp without colKey', () => {
  expect(setColProp(mockData, 'align')).toEqual(mockData)
})

test('setColProp when colKey is null', () => {
  expect(setColProp(mockData, null, 'left')).toEqual(mockData)
})
