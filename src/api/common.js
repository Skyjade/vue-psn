import request from '@/utils/request'

export function query(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
    headers:{
        'Content-Type':'application/json'
    }
  })
}

export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
    headers:{
        'Content-Type':'application/json'
    }
  })
}

export function put(url, data) {
  return request({
    url: url,
    method: 'put',
    params: {},
    data: data,
    headers:{
        'Content-Type':'application/json'
    }
  })
}

export function del(url, data) {
  return request({
    url: url,
    method: 'delete',
    data,
    headers:{
        'Content-Type':'application/json'
    }
  })
}


export function get(url) {
  console.log('==%o', url)
  return request({
    url: url,
    method: 'get'
  })
}
