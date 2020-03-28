import { axios } from '@/utils/request'

export function getCashSetting (data) {
  return axios.get('backend/cash/getCashSetting', data)
}

export function cashSetting (data) {
  return axios.post('backend/cash/cashSetting', data)
}

export function getCashApplyList(data) {
  return axios.post('backend/cash/getCashApplyList', data)
}

export function auditApply(data) {
  return axios.post('backend/cash/auditApply', data)
}

export function manualCash(data) {
  return axios.post('backend/cash/manualCash', data)
}