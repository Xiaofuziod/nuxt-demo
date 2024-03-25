import * as monitorApi from "~/common/monitoring";

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
    loading:false,
    status:''
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
    async fetchMonitorList({commit,}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 20, status: '', searchName: '', ...(payload || {})}

            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                console.log({page, size, ...res.data.data})
                commit('setSearchMonitor', {page, size, ...res.data.data});
            } else {
                commit('setSearchMonitor', {page:0, size, records:[], hasNext: false});
            }
        } catch (e) {
            commit('setSearchMonitor', {page:0, size, records:[], hasNext: false});
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchUnstartMonitorList({commit}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 6, status: 1, searchName: '', ...(payload || {})}
            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                commit('setUnstartMonitors', res.data.data.records);
            }
        } catch (e) {
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchFinishMonitorList({commit}, payload) {
        try {
            const {page, size, status, searchName} = {page: 1, size: 6, status: 3, searchName: '', ...(payload || {})}
            const res = await this.$axios.get(`${monitorApi.getMonitorList}?searchName=${searchName}&page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                commit('setFinishMonitors', res.data.data.records);
            }
        } catch (e) {
            console.error('fetchMonitorList error:', e);
        } finally {
        }
    },
    async fetchUserMonitorList({commit, state}, payload) {
        try {
            const {page, size, status} = {page: 1, size: 30, status: state.status, ...(payload || {})}
            commit('setStatus', status)
            const res = await this.$axios.get(`${monitorApi.getUserMonitoringList}?page=${page}&size=${size}&status=${status}`);
            if (res && res.data && res.data.ok) {
                commit('setUserMonitor', {page, size, ...res.data.data});
            } else {
                commit('setUserMonitor', {page:0, size, records:[], hasNext: false});
            }
            return res.data.data
        } catch (e) {
            commit('setUserMonitor', {page:0, size, records:[], hasNext: false});
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
    async deleteUserMonitor({dispatch,commit}, sourceId) {
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
    async fetchMonitorDetail({commit}, sourceId) {
        try {
            this._vm.$loading.start();
            const res = await this.$axios.get(`${monitorApi.getMonitoringDetail}?sourceId=${sourceId}`);
            if (res && res.data && res.data.ok) {
                console.log(res.data)
                commit('setMonitorDetail', res.data.data);
            }
        } catch (e) {
            console.error('fetchMonitorDetail error:', e);
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
            console.error('fetchMonitorSummary error:', e);
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
