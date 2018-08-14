<template>
    <MainLayout>
        <div class="list-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h1>{{ getPratilipiListTitle }}</h1>
                        <div class="list-tabs" v-if="currentLocale === 'hi' && $route.params.list_page_url === 'lovestories'">
                            <a href="#" @click="listchange" class="active" data-tab="tab-relevant">__("sorting_relevant")</a>
                            <a href="#" @click="listchange" data-tab="tab-recent_published">__("sorting_latest")</a>
                            <a href="#" @click="listchange" data-tab="tab-high_rated">__("sorting_highly_rated")</a>
                            <div class="sorting" @click="toggleSortMenu" v-if="list_type != 'relevant'">
                                <icon name="filter"></icon>
                            </div>
                            <div class="clear"></div>
                            <div class="sorting-menu">
                                <span class="sort-item" @click='sortList($event, null, 120, "< 2 mins")'>< 2 mins</span>
                                <span class="sort-item" @click='sortList($event, 120, 300, "2 - 5 mins")'>2 - 5 mins</span>
                                <span class="sort-item" @click='sortList($event, 300, null, "> 5 mins")'>> 5 mins</span>
                                <div class="sort-item link-clear" @click="clearSortList">
                                    <i class="material-icons">close</i>
                                    <span>__("sorting_clear")</span>
                                </div>
                            </div>
                        </div>
                        <div class="filter-helper" v-if="timeText && list_type != 'relevant'">
                            __("sorting_showing_results") <span class="time-text">{{ timeText }}</span>
                        </div>
                        
                        <div class="tabs">
                            <PratilipiComponent
                            :pratilipiData="pratilipiData"
                            :key="pratilipiData.pratilipiId"
                            v-for="pratilipiData in getPratilipiListData"
                            v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                            :addToLibrary="addToLibrary"
                            :removeFromLibrary="removeFromLibrary"
                            :screenName="'CATEGORY'"
                            :screenLocation="'CATEGORYM'"
                            ></PratilipiComponent>
                        </div>
                        <DummyLoader v-if="getPratilipiListLoadingState === 'LOADING'" :sectionCount="1" :className="{list: true}"></DummyLoader>
                    </div>
                </div>
            </div>
        </div>
        <PageNotFound v-if="(getPratilipiListLoadingState === 'LOADING_ERROR' || getPratilipiListData.length === 0 ) && getPratilipiListLoadingState !== 'LOADING'"></PageNotFound>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'List-Page',
    data() {
        return {
            user_id: null,
            scrollPosition: null,
            list_type: 'relevant',
            currentLocale: process.env.LANGUAGE,
            timeFilter: {
                fromSec: null,
                toSec: null
            },
            timeText: null
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('listpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListTitle',
            'getPratilipiListCursor',
            'getPageTitle'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('listpage', [
            'fetchInitialListPagePratilipis',
            'fetchMorePratilipisForListPage',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        updateScroll(e) {
            this.scrollPosition = window.scrollY
        },
        listchange(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".list-tabs a").removeClass("active");
            $(event.currentTarget).addClass("active");
            
            if (tab_id === 'tab-relevant') {
                this.triggerAnanlyticsEvent('GORELEVANT_CATEGORYM_CATEGORY', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.$route.params.list_page_url
                });
            }
            else if (tab_id === 'tab-recent_published') {
                this.triggerAnanlyticsEvent('GOLATEST_CATEGORYM_CATEGORY', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.$route.params.list_page_url
                });
            }
            else if (tab_id === 'tab-high_rated') {
                this.triggerAnanlyticsEvent('GOHIGHRATED_CATEGORYM_CATEGORY', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.$route.params.list_page_url
                });
            }
            
            const list_type = tab_id.split('tab-').pop();
            this.list_type = list_type;
            const { list_page_url } = this.$route.params;
            this.fetchInitialListPagePratilipis({
                language: this.getCurrentLanguage().fullName.toUpperCase(),
                listName: list_page_url,
                resultCount: 20,
                listType: list_type,
                timeFilter: this.timeFilter
            });
        },
        toggleSortMenu() {
            $(".sorting-menu").toggle();
        },
        sortList(event, fromSec, toSec, timeText) {
            $(".sorting-menu span").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".sorting-menu").hide();
            $(".sorting").addClass("active");
            $(".link-clear").show();
            
            this.timeText = timeText;
            
            this.timeFilter = { fromSec, toSec }
            
            this.triggerAnanlyticsEvent('FILTER_CATEGORYM_CATEGORY', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.$route.params.list_page_url,
                'FILTER_TAB': this.list_type,
                'FILTER_ITEM': timeText
            });
        },
        clearSortList() {
            $(".sorting-menu span").removeClass("active");
            $(".link-clear").hide();
            $(".sorting").removeClass("active");
            $(".sorting-menu").hide();
            
            this.timeText = null;
            
            
            this.timeFilter = { fromSec: null, toSec: null }
        }
    },
    created() {
        console.log(this.$route)
	document.head.querySelector('meta[name="description"]').content = "";
        const { list_page_url } = this.$route.params;

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListPagePratilipis({
                    language: eachLanguage.fullName.toUpperCase(),
                    listName: list_page_url,
                    resultCount: 20,
                    timeFilter: this.timeFilter
                });
            }
        });
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)
            const nintyPercentOfList = ( 50 / 100 ) * $('.list-page').innerHeight();
            const { list_page_url } = this.$route.params;

            if (newScrollPosition + sbHeight > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMorePratilipisForListPage({
                            language: eachLanguage.fullName.toUpperCase(),
                            listName: list_page_url,
                            resultCount: 20,
                            listType: this.list_type,
                            timeFilter: this.timeFilter
                        });
                    }
                });
            }
        },
        '$route.params.list_page_url'(list_page_url) {
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialListPagePratilipis({
                        language: eachLanguage.fullName.toUpperCase(),
                        listName: list_page_url,
                        resultCount: 20,
                        timeFilter: this.timeFilter
                    });
                }
            });
        },
        'getPageTitle'(title) {
            document.title = title;
        },
        'timeFilter'(timeFilter) {
            this.fetchInitialListPagePratilipis({
                language: this.getCurrentLanguage().fullName.toUpperCase(),
                listName: this.$route.params.list_page_url,
                resultCount: 20,
                listType: this.list_type,
                timeFilter: this.timeFilter
            });
        }
    },
    mounted() {
        const { list_page_url } = this.$route.params;
        this.triggerAnanlyticsEvent(`LANDED_CATEGORYM_CATEGORY`, 'CONTROL', {
            'USER_ID': this.getUserDetails.userId,
            'PARENT_ID': list_page_url
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

<style lang="scss" scoped>
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
	display:block;
    }
    .list-tabs {
        border-bottom: 1px solid #e9e9e9;
        margin: 5px 0;
        max-width: 90%;
        position: relative;
        clear: both;
        height: 34px;
        a {
            display: block;
            padding: 5px;
            margin-right: 10px;
            text-decoration: none;
            color: #555;
            font-size: 14px;
            text-align: center;
            float: left;
            border-bottom: 2px solid #fff;
            &.active {
                color: #d0021b;
                border-color: #d0021b;
            }
        }
        .sorting {
            float: right;
            margin-right: 0;
            background: #e9e9e9;
            border-radius: 4px;
            padding: 3px 7px 0;
            cursor: pointer;
            .fa-icon {
                vertical-align: text-top;
            }
            &.active .fa-icon {
                color: #d0021b;
            }
        }
    }
    .clear {
        clear: both;
    }
    .sorting-menu {
        position: absolute;
        top: 34px;
        right: 0;
        background: #fff;
        padding: 10px;
        border: 1px solid #e9e9e9;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        border-radius: 4px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        z-index: 10;
        max-width: 180px;
        text-align: right;
        display: none;
        span.sort-item {
            background: #e9e9e9;
            color: #555;
            padding: 5px 10px;
            border-radius: 15px;
            display: inline-block;
            margin: 2px;
            font-size: 12px;
            cursor: pointer;
            &.active {
                color: #d0021b;
            }
        }
    }
    .link-clear {
        background: none;
        color: #2874f0;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        display: none;
        font-size: 12px;
        padding: 5px 5px 0;
        cursor: pointer;
        i {
            vertical-align: middle;
            font-size: 14px;
        }
        span {
            vertical-align: middle;
        }
    }
    .filter-helper {
        font-size: 14px;
        padding: 5px 0 0;
        span.time-text {
            background: #e9e9e9;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            color: #d0021b;
            margin-left: 5px;
            font-size: 13px;
        }
    }
}
</style>
