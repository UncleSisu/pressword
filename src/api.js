import $ from 'jquery'

export const postApi = (url, payload) => {
  // console.log('postApi triggered?', url, input)
  return postRequest(url, 'post_new_api', handleData, payload);
}

export const getApis = (url) => {
  // console.log('getApis triggered?', url)
  return postRequest(url, 'get_pressword_apis', handleData);
}

export const deleteApi = (url, payload) => {
  // console.log('deleteApi triggered?', url, input)
  return postRequest(url, 'delete_api', handleData, payload);
}

export const testApi = (url, payload) => {
  // console.log('testApi triggered?', url, input)
  return postRequest(url, 'test_pressword_api', handleData, payload);
}

function handleData(data) {
  // console.log('handleData response return', data.apis);
  return {
    subscribers: data.apis
  }
}

function postRequest(url, action, handler, payload = {}) {
  let data = Object.assign({ action }, payload);
  return $.ajax({
    url,
    type: 'post',
    data,
    dataType: 'json'
  })
    .then(handler)
}
