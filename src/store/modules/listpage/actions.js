import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialListPagePratilipis({ commit, state }, { listName, language, resultCount, listType, timeFilter }) {
        commit('setListPageInitialDataLoadingTrue');

        let pratilipiListFunction;
        switch (listType) {
            case 'high_rated':
                pratilipiListFunction = DataAccessor.getHighRatedPratilipiListByListName;
                break;
            case 'recent_published':
                pratilipiListFunction = DataAccessor.getRecentPratilipiListByListName;
                break;
            default:
                pratilipiListFunction = DataAccessor.getPratilipiListByListName;
        }

        pratilipiListFunction(listName, null, null, resultCount, language, timeFilter, function(data) {
            if (data.status === 200) {
                console.log("Response: " , data.response);
                commit('setListPageInitialDataLoadingSuccess', data.response);
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchForYouListPagePratilipis({commit, state}, {userId, cursor, language}) {
        commit('setListPageDynamicLoadingTrue');
        console.log("uid - ",userId)
        DataAccessor.getForYouPratilipiList(userId, cursor, language, function(data) {
            if (data.status === 200) {
                console.log("Response: " , data.response);
                commit('setForYouDataLoadingSuccess', data.response);
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForListPage({ commit, state }, { listName, language, resultCount, listType, timeFilter }) {
        commit('setListPageDynamicLoadingTrue');
        let pratilipiListFunction;
        switch (listType) {
            case 'high_rated':
                pratilipiListFunction = DataAccessor.getHighRatedPratilipiListByListName;
                break;
            case 'recent_published':
                pratilipiListFunction = DataAccessor.getRecentPratilipiListByListName;
                break;
            default:
                pratilipiListFunction = DataAccessor.getPratilipiListByListName;
        }

        pratilipiListFunction(listName, state.cursor, null, resultCount, language, timeFilter, function(data) {
            if (data.status === 200) {
                commit('setListPageDynamicLoadingSuccess', data.response);
            } else {
                commit('setListPageDynamicLoadingError');
            }
        });
    },

    addToLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
            commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },
}
