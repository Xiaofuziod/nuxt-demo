
const baseUrl = process.env.NODE_ENV === 'development' ? 'api' : 'http://54.207.113.59'
export const sendEmail = baseUrl + '/api/auth/base/sendMessage'
export const userLogin = baseUrl + '/api/auth/login/dologin'
export const userRegister = baseUrl + '/api/auth/login/register'
export const changePassword = baseUrl + '/api/auth/login/changePassword'
export const googleLogin = baseUrl + '/api/auth/login/google'
export const twitterRedirectUrl = baseUrl + '/api/auth/login/twitterRedirectUrl'
export const twitterLogin = baseUrl + '/api/auth/login/twitter'
export const getAssetList = baseUrl + '/api/asset/list'
export const addFollow = baseUrl + '/api/follow/add'
export const deleteFollow = baseUrl + '/api/follow/delete'
export const getFollowList = baseUrl + '/api/follow/list'
export const getUserInfo = baseUrl + '/api/user'

export const analysisCoin = baseUrl + '/api/analysis/coin'
export const getCoinPrice = baseUrl + '/api/coin/price'

export const getChatMessageList= baseUrl + '/api/chat/list'

export const updateUserInfo = baseUrl + "/api/system/user/modify"

export const analysisRead = baseUrl + "/api/analysis/read"
export const chatClean = baseUrl + "/api/chat/clean"

