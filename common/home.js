
const baseUrl = process.env.NODE_ENV === 'development' ? 'api' : 'https://api-test.taurion.ai'
export const sendEmail = baseUrl + '/apiv1/auth/base/sendMessage'
export const userLogin = baseUrl + '/apiv1/auth/login/dologin'
export const userRegister = baseUrl + '/apiv1/auth/login/register'
export const changePassword = baseUrl + '/apiv1/auth/login/changePassword'
export const googleLogin = baseUrl + '/apiv1/auth/login/google'
export const twitterRedirectUrl = baseUrl + '/apiv1/auth/login/twitterRedirectUrl'
export const twitterLogin = baseUrl + '/apiv1/auth/login/twitter'
export const getAssetList = baseUrl + '/apiv1/asset/list'
export const addFollow = baseUrl + '/apiv1/follow/add'
export const deleteFollow = baseUrl + '/apiv1/follow/delete'
export const getFollowList = baseUrl + '/apiv1/follow/list'
export const getUserInfo = baseUrl + '/apiv1/user'

export const analysisCoin = baseUrl + '/apiv1/analysis/coin'
export const getCoinPrice = baseUrl + '/apiv1/coin/price'

