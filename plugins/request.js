export default function ({$axios, redirect}) {
  $axios.onRequest(config => {
    const defaultParams = {}
    if (config.method === 'post') {
      config.data = config.data ? Object.assign(config.data, defaultParams) : defaultParams
    }
    if (config.method === 'get') {
      config.params = config.params ? Object.assign(config.params, defaultParams) : defaultParams
    }
    const token = localStorage.getItem('token')
    $axios.setHeader('Token', 'Bearer ' + token)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  $axios.onResponse(response => {
    if (response.data.code === 401) {
      localStorage.removeItem('token')
    }
  })
}
