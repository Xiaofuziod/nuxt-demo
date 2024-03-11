const baseUrl = process.env.NODE_ENV === 'development' ? 'api' : 'https://api-test.taurion.ai'

// 列出监控
export const getMonitorList = baseUrl + '/api/monitoring/source/list'

// 列出用户监控
export const getUserMonitoringList = baseUrl + '/api/monitoring/user/source/list'

//用户添加监控
export const addUserMonitoring = baseUrl + '/api/monitoring/user/source/add'

//用户标记监控
export const markUserMonitoring = baseUrl + '/api/monitoring/user/source/mark'

//用户删除监控
export const deleteUserMonitoring = baseUrl + '/api/monitoring/user/source/delete'

//获取监控详情
export const getMonitoringDetail = baseUrl + '/api/monitoring/source/detail'

//获取监控总结
export const getMonitoringSummary = baseUrl + '/api/monitoring/source/summary'

//获取监控原文
export const getMonitoringSource = baseUrl + '/api/monitoring/source/content'
