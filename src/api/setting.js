import { axios } from '@/utils/request'

export function editSetting(data) {
    return axios.post('backend/edit/editSetting', data)
}

export function getEditSetting(data) {
    return axios.get('backend/edit/getEditSetting', data)
}