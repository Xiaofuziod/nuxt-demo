export default function ({$axios, redirect}) {
  $axios.onRequest(config => {
    const defaultParams = {}
    if (config.method === 'post') {
      config.data = config.data ? Object.assign(config.data, defaultParams) : defaultParams
    }
    if (config.method === 'get') {
      config.params = config.params ? Object.assign(config.params, defaultParams) : defaultParams
    }
    const token = localStorage.getItem('token') || "085877aea9fd4f9e90e8c0f692542676"
    $axios.setHeader('Authorization', 'Bearer 085877aea9fd4f9e90e8c0f692542676')
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
