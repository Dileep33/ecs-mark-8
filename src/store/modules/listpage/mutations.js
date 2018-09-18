export default {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // }

    setListPageInitialDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
        state.numberFound = 0;
    },

    setListPageInitialDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data.pratilipiList;
        state.cursor = data.cursor ? data.cursor : data.limit + data.offset;
        state.numberFound = data.numberFound ? data.numberFound : data.found;

        if (data.title) {
            state.title = data.title;
            state.titleEn = data.titleEn;
        }
    },

    setForYouDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = state.data.concat(data.for_you);
        state.cursor = data.cursor;
    },

    setListPageInitialDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = [];
        state.cursor = null;
        state.numberFound = 0;
        state.title = '';
        state.titleEn = '';
    },

    setListPageDynamicLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    setListPageDynamicLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';

        if (!data.pratilipiList || data.pratilipiList.length === 0) {
            state.cursor = null;
        } else {
            state.data = state.data.concat(data.pratilipiList);
            state.cursor = data.cursor ? data.cursor : data.limit + data.offset;
        }
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false
        }
    },

    removePratilipiFromLibraryError(state) {

    }
}
