import request from '@/utils/request'

export function query(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function put(url, data) {
  return request({
    url: url,
    method: 'put',
    params: {},
    data: data
  })
}

export function del(url, data) {
  return request({
    url: url,
    method: 'delete',
    data
  })
}

export function queryProtocol(url) {
  return request({
    url: url,
    method: 'post'
  })
}

export function getRTURelatedChannel(url) {
  console.log('==%o', url)
  return request({
    url: url,
    method: 'get'
  })
}

export function get(url) {
  console.log('==%o', url)
  return request({
    url: url,
    method: 'get'
  })
}
