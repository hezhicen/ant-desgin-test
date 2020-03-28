import { axios } from '@/utils/request'

export function getActiveConfig (parameter) {
  return axios({
    url: 'backend/active/getActiveConfig',
    // url:'testtpy.rongxinh.com',
    method: 'get'
  })
}
