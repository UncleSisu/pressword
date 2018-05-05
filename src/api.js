import $ from 'jquery'

export const postApi = (url, payload) => {
  return postRequest(url, 'pressword_rest_post', handleData, payload);
}

export const getApis = (url) => {
  return postRequest(url, 'pressword_rest_get', handleData);
}

export const deleteApi = (url, payload) => {
  return postRequest(url, 'pressword_rest_delete', handleData, payload);
}

export const bulkApi = (url, payload) => {
  return postRequest(url, 'pressword_rest_bulk', handleData, payload);
}

function handleData(data) {
  console.log('handleData response return', data.apis);
  return data.apis;
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
