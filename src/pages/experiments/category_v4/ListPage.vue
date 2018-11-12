<template>
    <MainLayout>
        <div class="list-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h1>{{ getPratilipiListTitle }}</h1>
                        <div class="list-tabs">
                            <a href="#" @click="listchange" :class="{'active': !this.isFilterActive }" data-tab="tab-relevant">__("sorting_relevant")</a>
                            <a href="#" @click="listchange" data-tab="tab-recent_published" v-if="this.isFilterActive">__("sorting_latest")</a>
                            <a href="#" @click="listchange" :class="{'active': this.isFilterActive == true}" data-tab="tab-high_rated" v-if="this.isFilterActive">__("sorting_highly_rated")</a>
                            <a href="#" @click.prevent="toggleSortMenu" v-if="list_type != 'relevant'">
                                __('pratilipi_reading_time')
                            </a>
                            <div class="clear"></div>
                            <div class="sorting-menu">
                                <span class="sort-item" @click='sortList($event, null, 119, "< 2 mins")'>< 2 mins</span>
                                <span class="sort-item" @click='sortList($event, 120, 299, "2 - 5 mins")'>2 - 5 mins</span>
                                <span class="sort-item active" @click='sortList($event, 300, 1799, "5 mins - 30 mins")'>5 mins - 30 mins</span>
                                <span class="sort-item" @click='sortList($event, 1800, 3599, "30 mins - 1 hr")'>30 mins - 1 hr</span>
                                <span class="sort-item" @click='sortList($event, 3600, null, "> 1 hr")'>> 1 hr</span>
                                <div class="sort-item link-clear active" @click="clearSortList">
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
                            :redirectToReader="true"
                            ></PratilipiComponent>
                        </div>
                        <DummyLoader v-if="getPratilipiListLoadingState === 'LOADING'" :sectionCount="1" :className="{list: true}"></DummyLoader>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import DummyLoader from '@/components/DummyLoader.vue';
import PratilipiComponent from '@/components/experiments/category_v4/PratilipiRecommendation.vue';
import PageNotFound from '@/components/404.vue';
import constants from '@/constants'
import 'vue-awesome/icons/filter'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'
import metaDesc from '@/constants/categories-metadata.json'
import categoriesWithoutFilter from '@/constants/categories-without-filter.json'

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
            timeText: null,
            metaDesc,
            isFilterActive: true
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
            'removeFromLibrary',
            'updateUserPreference',
            'setPageTitleNull'
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
            this.triggerAnanlyticsEvent('OPENFILTER_CATEGORYM_CATEGORY', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.$route.params.list_page_url
            });
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

            this.triggerAnanlyticsEvent('REMOVEFILTER_CATEGORYM_CATEGORY', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.$route.params.list_page_url
            });

            this.timeText = null;


            this.timeFilter = { fromSec: null, toSec: null }
        }
    },
    created() {
        console.log(this.$route)
        const { list_page_url } = this.$route.params;
        const { uuid, type, value } = this.$route.query;

        const currentLocale = this.getLanguageCode(process.env.LANGUAGE);

        if (currentLocale === 'en' || categoriesWithoutFilter[currentLocale].indexOf(list_page_url) > -1) {
            this.isFilterActive = false;
        }

        if (this.isFilterActive) {
            this.list_type = 'high_rated';
            this.timeFilter.fromSec = 300;
            this.timeFilter.toSec = 1799;
            // this.timeText = "5 mins - 30 mins";

            this.triggerAnanlyticsEvent('GOHIGHRATED_CATEGORYM_CATEGORY', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.$route.params.list_page_url
            });
        }

        if( uuid && type && value) {
            this.updateUserPreference({uuid, type, value});
        }

        if (currentLocale !== 'en') {
            // Replacing meta description from static file
            const metaDescription = this.metaDesc[currentLocale][list_page_url];
            if (metaDescription) {
                document.head.querySelector('meta[name="description"]').content = metaDescription;
                document.head.querySelector('meta[property="og:description"]').content = metaDescription;
            }
        }

        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListPagePratilipis({
                    language: eachLanguage.fullName.toUpperCase(),
                    listName: list_page_url,
                    resultCount: 20,
                    listType: this.list_type,
                    timeFilter: this.timeFilter
                });
            }
        });
    },
    watch: {
        'getPratilipiListLoadingState'(pratilipiLoadingState){
            // if (pratilipiLoadingState === 'LOADING_ERROR') {
            //     this.$router.push('/404');
            // }
        },
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
            document.title = title + " | Pratilipi";
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
        this.setPageTitleNull();
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
        min-height: 28px;
    }
    .list-tabs {
        border-bottom: 1px solid #e9e9e9;
        margin: 5px 0;
        position: relative;
        clear: both;
        min-height: 34px;
        a {
            display: inline-block;
            padding: 5px;
            margin-right: 5px;
            text-decoration: none;
            color: #555;
            font-size: 14px;
            text-align: center;
            border-bottom: 2px solid #fff;
            &.active {
                color: #d0021b;
                border-color: #d0021b;
            }
            &:last-child {
                margin-right: 0;
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
        &.active {
            display: block;
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
