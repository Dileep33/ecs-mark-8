<template>
    <MainLayout>
        <div class="list-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="tabs">
                            <PratilipiComponent
                                :pratilipiData="pratilipiData"
                                :key="pratilipiData.pratilipiId"
                                v-for="pratilipiData in getPratilipiListData"
                                v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                                :addToLibrary="addToLibrary"
                                :removeFromLibrary="removeFromLibrary"
                                :screenName="'FOR_YOU'"
                                :screenLocation="'FOR_YOU'"
                            ></PratilipiComponent>
                        </div>
                        <DummyLoader v-if="getPratilipiListLoadingState === 'LOADING'" :sectionCount="1"
                                     :className="{list: true}"></DummyLoader>
                    </div>
                </div>
            </div>
        </div>
        <PageNotFound
            v-if="(getPratilipiListLoadingState === 'LOADING_ERROR' || getPratilipiListData.length === 0 ) && getPratilipiListLoadingState !== 'LOADING'"></PageNotFound>
    </MainLayout>
</template>

<script>
    import MainLayout from '@/layout/main-layout.vue';
    import Spinner from '@/components/Spinner.vue';
    import DummyLoader from '@/components/DummyLoader.vue';
    import PratilipiComponent from '@/components/Pratilipi.vue';
    import PageNotFound from '@/components/404.vue';
    import constants from '@/constants'
    import 'vue-awesome/icons/filter'
    import mixins from '@/mixins';
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "ForYou",
        data() {
            return {
                user_id: null,
                scrollPosition: null,
                isCreated: false,
            }
        },
        mixins: [
            mixins
        ],
        computed: {
           ...mapGetters([
                'getUserDetails'
            ]),
            ...mapGetters('listpage', [
                'getPratilipiListLoadingState',
                'getPratilipiListData',
                'getPratilipiListTotalCount',
                'getPratilipiListTitle',
                'getPratilipiListCursor',
                'getPageTitle'
            ])
        },
        methods: {
            ...mapActions('listpage', [
                'fetchInitialListPagePratilipis',
                'fetchMorePratilipisForListPage',
                'fetchForYouListPagePratilipis',
                'addToLibrary',
                'removeFromLibrary'
            ]),
            updateScroll(e) {
                this.scrollPosition = window.scrollY
            },
        },
        created() {
            this.isCreated = true;
        },
        watch : {
            'scrollPosition'(newScrollPosition){
                const sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)
                const nintyPercentOfList = ( 80 / 100 ) * $('.list-page').innerHeight();

                if (newScrollPosition + sbHeight > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                    this.fetchForYouListPagePratilipis({ "userId" : this.getUserDetails.userId, "cursor" : this.getPratilipiListCursor, "language": this.getCurrentLanguage().fullName.toUpperCase()});
                }
            },
            'getUserDetails.userId'() {
                if(this.isCreated) {
                    console.log(this.$route);
                    if (this.getUserDetails.isGuest) {
                        this.setAfterLoginAction({ action: `${this.$route.meta.store}/fetchForYouListPagePratilipis`, data: { "userId" : this.getUserDetails.userId, "cursor" : this.getPratilipiListCursor} });
                        this.openLoginModal(this.$route.meta.store, 'LOGIN', 'FOR_YOU');
                    } else {
                        console.log(this.getUserDetails);
                        this.fetchForYouListPagePratilipis({'userId' : this.getUserDetails.userId, "cursor" : "0-0", "language": this.getCurrentLanguage().fullName.toUpperCase()});
                    }

                } else {
                    this.isCreated=false;
                }
            },
        },
        mounted() {
            this.triggerAnanlyticsEvent(`LANDED_FORYOU_CATEGORY`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
            });
            window.addEventListener('scroll', this.updateScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.updateScroll);
        },
        components: {
            MainLayout,
            PratilipiComponent,
            Spinner,
            PageNotFound,
            DummyLoader
        }
    }
</script>

<style scoped>
    .list-page {
        margin-top: 85px;
        text-align: left;
        @media screen and (max-width: 992px ) {
            margin-top: 65px;
            text-align: center;
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0;
            display: block;
        }
    }
</style>
