export default {
    setAuthorDashboardDataLoadingTrue(state) {
          state.dashboard.loading_state = 'LOADING';
          state.dashboard.data = {};
    },
    setAuthorDashboardDataLoadingSuccess(state, data) {
        state.dashboard.loading_state = 'LOADING_SUCCESS';
        state.dashboard.data = data;
    },
    setAuthorDashboardDataLoadingError(state) {
        state.dashboard.loading_state = 'LOADING_ERROR';
        state.dashboard.data = {};
    },
    
}
