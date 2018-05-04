import $ from 'jquery'

export const postApi = (url, payload) => {
  return postRequest(url, 'post_new_api', handleData, payload);
}

export const getApis = (url) => {
  return postRequest(url, 'get_pressword_apis', handleData);
}

export const deleteApi = (url, payload) => {
  return postRequest(url, 'pressword_rest_delete', handleData, payload);
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
