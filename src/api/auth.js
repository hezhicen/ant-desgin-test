import { axios } from '@/utils/request';

export function getQiniuToken (parameter) {
  return axios({
    url: 'api/getToken',
    method: 'post'
  })
}
