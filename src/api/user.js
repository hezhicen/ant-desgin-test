import { axios } from '@/utils/request'

export function getUserList(data) {
  return axios.post('backend/user/getUserList', data)
}

export function getUserRecommendsList(data) {
  return axios.post('backend/user/getUserRecommendsList', data)
}

export function getSecondUserList(data) {
  return axios.post('backend/user/getSecondUserList',data)
}