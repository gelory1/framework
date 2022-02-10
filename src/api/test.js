import axios from '@/lib/axios'
import config from '../config';
import qs from 'qs';

const test = {
  text1 (params) {
    return axios.get(config.getUrl('text'), { params, 'Content-Type': 'application/json' })
  },
  text2 (params) {
    return axios.post(config.getUrl('text'), qs.stringify(params))
  },
  text3 (params) {
    return axios.post(config.getUrl('text'), params)
  }
}

export default test
