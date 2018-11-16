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
            } else if(data.status === 404) {
                commit('setListPageInitialDataLoadingSuccess', {
                    pratilipiList: [],
                    cursor: 0,
                    limit: 0,
                    found: 0,
                    limit: 0,
                    offset: 0
                });
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchInitialListPagePratilipisV2({ commit, state }, { listName, language, resultCount, listType, timeFilter }) {
        commit('setListPageInitialDataLoadingTrue');

        let pratilipiListFunction;
        switch (listType) {
            case 'high_rated':
                pratilipiListFunction = DataAccessor.getHighRatedPratilipiListByListNameV2;
                break;
            case 'recent_published':
                pratilipiListFunction = DataAccessor.getRecentPratilipiListByListNameV2;
                break;
            default:
                pratilipiListFunction = DataAccessor.getPratilipiListByListNameV4;
        }

        pratilipiListFunction(listName, null, null, resultCount, language, timeFilter, function(data) {
            if (data.status === 200) {
                console.log("Response: " , data.response);
                commit('setListPageInitialDataLoadingSuccess', data.response);
            } else if(data.status === 404) {
                commit('setListPageInitialDataLoadingSuccess', {
                    pratilipiList: [],
                    cursor: 0,
                    limit: 0,
                    found: 0,
                    limit: 0,
                    offset: 0
                });
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForListPageV2({ commit, state }, { listName, language, resultCount, listType, timeFilter }) {
        if (state.numberFound <= state.cursor) {
            return;
        }
        commit('setListPageDynamicLoadingTrue');
        let pratilipiListFunction;
        switch (listType) {
            case 'high_rated':
                pratilipiListFunction = DataAccessor.getHighRatedPratilipiListByListNameV2;
                break;
            case 'recent_published':
                pratilipiListFunction = DataAccessor.getRecentPratilipiListByListNameV2;
                break;
            default:
                pratilipiListFunction = DataAccessor.getPratilipiListByListNameV4;
        }

        pratilipiListFunction(listName, state.cursor, null, resultCount, language, timeFilter, function(data) {
            if (data.status === 200) {
                commit('setListPageDynamicLoadingSuccess', data.response);
            } else if(data.status === 400 && data.response.type === 'ERR_LIST_NAME_RESPONSE_EMPTY') {
                commit('setListPageDynamicLoadingSuccess', {});
            } else {
                commit('setListPageDynamicLoadingError');
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
                commit('setForYouLoadingError');
            }
        });
    },

    fetchMorePratilipisForListPage({ commit, state }, { listName, language, resultCount, listType, timeFilter }) {
        if (state.numberFound <= state.cursor) {
            return;
        }
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
            } else if(data.status === 400 && data.response.type === 'ERR_LIST_NAME_RESPONSE_EMPTY') {
                commit('setListPageDynamicLoadingSuccess', {});
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

    fetchNavigationList({ commit, state }, language) {
        commit('setNavigationStatusLoadingTrue');
        DataAccessor.getNavigationList(language, function(data) {
            if (data.status === 200) {
                console.log("Response: " , data.response);
                commit('setNavigationStatusLoadingSuccess', data.response);
            } else {
                commit('setNavigationStatusLoadingError');
            }
        });

    },

    updateUserPreference({ commit, state }, {uuid, type, value}) {
        DataAccessor.postMarketingNewsletterPreference(uuid, type, value, (response) => {
            console.log("success_preference")
        }, (error) => {
            console.log("error_preference")
        });
    },

    setPageTitleNull({ commit, state}) {
        commit('setPageTitleNull');
    }
}
