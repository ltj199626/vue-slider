
/**
 * 接口请求
 */

const api = '/api';

import request from '../common/js/request'

// 代销基金
export function findFundListPortfolio(query) {
  return request({
    url: api + '/asseFund/findFundList',
    method: 'get',
    params: query
  })
}
