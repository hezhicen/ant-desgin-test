import { renderPrice } from '../../../../src/utils/table.js'

test('renderPrice with price is integer', () => {
  expect(renderPrice(2)).toBe('￥2.00')
})

test('renderPrice with price is float', () => {
  expect(renderPrice(19.98)).toBe('￥19.98')
})

test('renderPrice with price is negative', () => {
  expect(renderPrice(-19.98)).toBe('-￥19.98')
})

test('renderPrice with price is zero', () => {
  expect(renderPrice(0)).toBe('￥0.00')
})

test('renderPrice with price is null', () => {
  expect(renderPrice(null)).toBe('￥0.00')
})

test('renderPrice without params', () => {
  expect(renderPrice()).toBe('￥0.00')
})
