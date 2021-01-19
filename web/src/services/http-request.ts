interface RequestParams {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  customHeaders?: HeadersInit
  body?: object | string
}

async function request({ method, url, customHeaders, body }: RequestParams) {
  try {
    const options = {
      headers: customHeaders || {
        'Content-Type': 'application/json'
      },
      method: method.toUpperCase(),
      body: JSON.stringify(body),
      mode: 'cors'
    } as RequestInit

    const response = await fetch(url, options)
    const data = await response.json()

    return {
      ok: response.ok,
      status: response.status,
      data
    }
  } catch(catchedError) {
    console.dir(catchedError)
    return {
      ok: false,
      data: catchedError.message
    }
  }
}

let prefix = ''

const api = {
  config(urlPrefix: string) {
    prefix = urlPrefix
  },

  get(url: string, headers?: HeadersInit) {
    return request({
      method: 'get',
      url: prefix + url,
      customHeaders: headers
    })
  },

  post(url: string, body: object | string, headers?: HeadersInit) {
    return request({
      method: 'post',
      url: prefix + url,
      body,
      customHeaders: headers
    })
  },
  
  put(url: string, body: object | string, headers?: HeadersInit) {
    return request({
      method: 'put',
      url: prefix + url,
      body,
      customHeaders: headers
    })
  },

  delete(url: string, headers?: HeadersInit) {
    return request({
      method: 'delete',
      url: prefix + url,
      customHeaders: headers
    })
  }
}

export function HttpRequest(urlPrefix?: string) {
  prefix = urlPrefix || ''

  return api
}
