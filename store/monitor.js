import * as monitorApi from "~/common/monitoring";
import {formatTimeBasedOnRule} from "@/utils/formatTimeBasedOnRule";

export const state = () => ({
    // monitorList: [],
    searchMonitor: null,
    userMonitor: null,
    unstartMonitors: [],
    finishMonitors: [],
    monitorDetail: null,
    monitorSummary: null,
    monitorContent: null,
    addMonitorShow: false,
    loading: false,
    status: ''
});

export const mutations = {
    setSearchMonitor(state, data) {
        state.searchMonitor = data;
    },
    setStatus(state, status) {
        state.status = status
    },
    setUnstartMonitors(state, list) {
        state.unstartMonitors = list;
    },
    setLoading(state, bool) {
        state.loading = bool
    },
    setFinishMonitors(state, list) {
        state.finishMonitors = list;
    },
    setAddMonitorShow(state, bool) {
        state.addMonitorShow = bool
    },
    setUserMonitor(state, data) {
        console.log(data)
        state.userMonitor = data;
    },
    setMonitorDetail(state, detail) {
        state.monitorDetail = detail;
    },
    setMonitorSummary(state, summary) {
        state.monitorSummary = summary;
    },
    setMonitorContent(state, content) {
        state.monitorContent = content;
    },
};

export const actions = {
    async fetchMonitorList({commit, rootState}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 20, status: '', searchName: '', ...(payload || {})}

            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                res.data.data.records = res.data.data?.records.map(item => {
                    return {
                        ...item,
                        time: formatTimeBasedOnRule(item.time, rootState.lang.t['today'])
                    }
                })
                commit('setSearchMonitor', {page, size, ...res.data.data});
                return res.data.data
            } else if (page === 1) {
                commit('setSearchMonitor', {page: 0, size, records: [], has_next: false});
            } else {
                return {records: [], has_next: false}
            }
        } catch (e) {
            commit('setSearchMonitor', {page: 0, size, records: [], hasNext: false});
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchUnstartMonitorList({commit, rootState}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 4, status: 1, searchName: '', ...(payload || {})}
            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                res.data.data.records = res.data.data?.records.map(item => {
                    return {
                        ...item,
                        time: formatTimeBasedOnRule(item.time, rootState.lang.t['today'])
                    }
                })
                commit('setUnstartMonitors', res.data.data.records);
            }
        } catch (e) {
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchFinishMonitorList({commit, rootState}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 6, status: 3, searchName: '', ...(payload || {})}
            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                res.data.data.records = res.data.data?.records.map(item => {
                    return {
                        ...item,
                        time: formatTimeBasedOnRule(item.time, rootState.lang.t['today'])
                    }
                })
                commit('setFinishMonitors', res.data.data.records);
            }
        } catch (e) {
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchUserMonitorList({commit, state, rootState}, payload) {
        const {page, size, status} = {page: 1, size: 30, status: state.status, ...(payload || {})}
        try {
            commit('setStatus', status)
            const res = await this.$axios.get(`${monitorApi.getUserMonitoringList}?page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                res.data.data.records = res.data.data?.records.map(item => {
                    return {
                        ...item,
                        time: formatTimeBasedOnRule(item.time, rootState.lang.t['today'])
                    }
                })
                commit('setUserMonitor', {page, size, ...res.data.data});
                return res.data.data
            } else if (page === 1) {
                commit('setUserMonitor', {page: 0, size, records: [], hasNext: false});
                return res.data.data
            } else {
                return {records: [], hasNext: false}
            }
        } catch (e) {
            commit('setUserMonitor', {page: 0, size, records: [], hasNext: false});
            console.error('fetchUserMonitorList error:', e);
        } finally {
        }
    },
    async addUserMonitor({dispatch, commit, rootState}, sourceIds) {
        try {
            this._vm.$loading.start();
            const res = await this.$axios.get(`${monitorApi.addUserMonitoring}?sourceIds=${sourceIds.join(',')}`);
            if (res && res.data && res.data.ok) {
                commit('setLoading', true)
                await dispatch('fetchUserMonitorList'); // Optionally refresh the user monitor list
                commit('setLoading', false)
                this._vm.$toast.success(rootState.lang.t['AddSuccess'])
            }
        } catch (e) {
            console.error('addUserMonitor error:', e);
        } finally {
            commit('setAddMonitorShow', false)
            this._vm.$loading.finish();
        }
    },
    async markUserMonitor({}, sourceId) {
        try {
            const res = await this.$axios.get(`${monitorApi.markUserMonitoring}?sourceId=${sourceId}`);
            return res && res.data && res.data.ok;
        } catch (e) {
            console.error('markUserMonitor error:', e);
            return false;
        }
    },
    async deleteUserMonitor({dispatch, commit}, sourceId) {
        try {
            this._vm.$loading.start();
            const res = await this.$axios.get(`${monitorApi.deleteUserMonitoring}?sourceId=${sourceId}`);
            if (res && res.data && res.data.ok) {
                commit('setLoading', true)
                await dispatch('fetchUserMonitorList'); // Optionally refresh the user monitor list
                commit('setLoading', false)
            }
        } catch (e) {
            console.error('deleteUserMonitor error:', e);
        } finally {
            this._vm.$loading.finish();
        }
    },
    async fetchMonitorDetail({commit,rootState}, sourceId) {
        try {
            this._vm.$loading.start();
            const res = await this.$axios.get(`${monitorApi.getMonitoringDetail}?sourceId=${sourceId}`);
            if (res && res.data && res.data.ok) {
                res.data.data.time = formatTimeBasedOnRule(res.data.data.time, rootState.lang.t['today'])
                commit('setMonitorDetail', res.data.data)
                return {
                    state: 'success',
                    data: res.data.data,
                }
            } else {
                throw res.data.msg
            }
        } catch (e) {
            console.log('fetchMonitorDetail error:', e)
            return {
                state: 'error',
                data: e,
            }
        } finally {
            this._vm.$loading.finish();
        }
    },
    async fetchMonitorSummary({commit}, sourceId) {
        try {
            const res = await this.$axios.get(`${monitorApi.getMonitoringSummary}?sourceId=${sourceId}`);
            if (res && res.data && res.data.ok) {
                commit('setMonitorSummary', res.data.data);
            }
        } catch (e) {
            console.log('fetchMonitorSummary error:', e);
        }
    },
    async fetchMonitorContent({commit}, payload) {
        try {
            const {page, size, sourceId} = {page: 1, size: 20, ...(payload || {})}
            const res = await this.$axios.get(`${monitorApi.getMonitoringSource}?sourceId=${sourceId}&page=${page}&size=${size}`);
            if (res && res.data && res.data.ok) {
                commit('setMonitorContent', {page, size, ...res.data.data});
            }
            return res.data.data
        } catch (e) {
            console.error('fetchMonitorContent error:', e);
        }
    },
};
