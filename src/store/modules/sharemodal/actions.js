export default {
    setShareDetails({ commit }, { data, type, screen_name, screen_location }) {
        commit('setShareDetails', { data, type, screen_name, screen_location })
    }
}
