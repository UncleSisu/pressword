export const postApi = (url, input) => {
  console.log('postApi triggered?', url, input)

  return fetch(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    body: `action=set_new_api&name=${input.name}&endpoint=${input.endpoint}`,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      console.log('postApis return', json);
      return {
        subscribers: json.apis
      }
    })
    .catch(err => console.log('set apis error', err))
}

export const getApis = (url) => {
  return fetch(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    body: `action=get_pressword_apis&_wpnonce=${window.custom_nonce}`,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      console.log('getApis return', json.apis);
      return {
        subscribers: json.apis
      }
    })
    .catch(err => console.log('get apis error', err))
}

export const deleteApi = (url, input) => {
  console.log('deleteApi triggered?', url, input)

  return fetch(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    body: `action=delete_api&name=${input.name}`,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      console.log('deleteApis return', json);
      return {
        subscribers: json.apis
      }
    })
    .catch(err => console.log('delete apis error', err))
}

export const testApi = (url) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: `action=test_pressword_api&name=${input.name}`,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      console.log('testApis return', json.apis);
      return {
        subscriber: json.apis
      }
    })
    .catch(err => console.log('test apis error', err))
}
