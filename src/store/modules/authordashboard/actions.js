import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchAuthorDashboardData({ commit, state }, authorId) {
        commit('setAuthorDashboardDataLoadingTrue');
        DataAccessor.getAuthorDashboardByAuthorId(authorId, (data) => {
            if (data.status === 200) {
                commit('setAuthorDashboardDataLoadingSuccess', data.response);
            } else {
                commit('setAuthorDashboardDataLoadingError');
            }
        })
    }
}
