import { axios } from '@/utils/request'

export function getMsgList (parameter) {
  return axios({
    url: 'backend/tpmsg/getMsgList',
    method: 'post',
    data: parameter
  })
}

export function getGroups () {
  return axios({
    url: 'backend/tpmsg/getGroups',
    method: 'get'
  })
}

export function getTpList () {
  return axios({
    url: 'backend/tpmsg/getTpList',
    method: 'get'
  })
}

export function addTpMsg (parameter) {
  return axios({
    url: 'backend/tpmsg/addTpMsg',
    method: 'post',
    data: parameter
  })
}

export function delMsg (parameter) {
  return axios({
    url: 'backend/tpmsg/delMsg',
    method: 'post',
    data: parameter
  })
}
