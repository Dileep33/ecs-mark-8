<template>
    <MainLayout>
        <div class="home-page page-wrap">
            <Banners v-if="getHomePageBannersLoadingState === 'LOADING_SUCCESS'"
                :banners="getHomePageBanners"
            ></Banners>
            <DummyLoader></DummyLoader>
            <DummyLoader v-if="getHomePageLoadingState === 'LOADING'"></DummyLoader>
            <div v-if="getHomePageLoadingState === 'LOADING_SUCCESS'" v-for="(eachSection, index) in getHomePageSections" v-bind:key="eachSection.listPageUrl">
                <PratilipiListComponent
                        :pratilipiList="eachSection.pratilipiList"
                        :title="eachSection.title"
                        :listPageUrl="eachSection.listPageUrl"
                        :screenName="'HOME'"
                        :position="index"
                        :screenLocation="'COLLECTIONS'"
                        :partnership="eachSection.partnership"
                        v-bind="{ addToLibrary, removeFromLibrary }"
                ></PratilipiListComponent>
                <div class="card webpush-strip-container" v-if="isWebPushStripEnabled && index === 6 && currentLocale !== 'en'">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-8">
                                <div class="webpush-title">
                                    __("web_push_section_title")
                                </div>
                            </div>
                            <div class="col-4">
                                <button class="close" @click="closeWebPushStrip()">
                                    <i class="material-icons">close</i>
                                </button>
                            </div>
                        </div>
                        <WebPushStrip
                            screenName="HOME"
                            message="__('web_push_message_3')"
                            :includeIcon=true
                            :includeDisableButton=false
                            :includeCloseButton=false
                            v-on:WebPushEnabled="isWebPushStripEnabled=false">
                        </WebPushStrip>
                    </div>
                </div>
            </div>
            <ServerError :action="'homepage/getListOfSections'" :data="getCurrentLanguage().fullName.toUpperCase()" v-if="getHomePageLoadingState === 'LOADING_ERROR'"></ServerError>
            <WebPushModal
                screenName="HOME"
                title="__('web_push_title')"
                message="__('web_push_message_2')"
                :includeDisableButton=true
                v-if="isWebPushModalEnabled && this.currentLocale !== 'en'"></WebPushModal>
        </div>
    </MainLayout>
</template>

<script>
    import Spinner from '@/components/Spinner.vue';
    import DummyLoader from '@/components/experiments/home_v2/DummyLoader.vue';
    import PratilipiListComponent from '@/components/experiments/home_v2/PratilipiList.vue';
    import MainLayout from '@/layout/main-layout.vue';
    import Banners from '@/components/Banners.vue';
    import VapasiShayari from '@/components/VapasiShayari.vue';
    import ServerError from '@/components/ServerError.vue';
    import WebPushStrip from '@/components/WebPushStrip.vue';
    import WebPushModal from '@/components/WebPushModal.vue';
    import constants from '@/constants'
    import mixins from '@/mixins'
    import WebPushUtil from '@/utils/WebPushUtil'


import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Home',
        data() {
            return {
                sectionList: [],
                isWebPushStripEnabled: WebPushUtil.canShowCustomPrompt(),
                isWebPushModalEnabled: false,
                webPushModalTriggered: false,
                scrollPosition: null,
                percentScrolled: null,
                isCreated: false,
                backupCall: true,
                currentLocale: ''
            }
        },
        mixins: [
            mixins
        ],
        computed: {
            ...mapGetters('homepage', [
                'getHomePageSections',
                'getHomePageLoadingState',
                'getHomePageBanners',
                'getHomePageBannersLoadingState',
                'getForYouList',
                'getForYourLoadingState',
            ]),
            ...mapGetters([
                'getUserDetails'
            ])

        },
        methods: {
            ...mapActions('homepage', [
                'getListOfSections',
                'addToLibrary',
                'removeFromLibrary',
                'fetchBanners',
                'fetchForYouListPagePratilipis'
            ]),
            closeWebPushStrip() {
                this.isWebPushStripEnabled = false
                this.triggerAnanlyticsEvent(`CLOSED_WEBPUSHSTRIP_HOME`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
                WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
            },
            updateScroll() {
                this.scrollPosition = window.scrollY
                this.percentScrolled = ($(window).scrollTop()/($(document).height()-$(window).height()))*100
            }
        },
        components: {
            Spinner,
            PratilipiListComponent,
            MainLayout,
            Banners,
            ServerError,
            DummyLoader,
            WebPushStrip,
            WebPushModal,
            VapasiShayari,
        },
        created() {
            this.fetchBanners(this.getCurrentLanguage().fullName.toUpperCase());
            this.getListOfSections(this.getCurrentLanguage().fullName.toUpperCase());
            this.isCreated = true;
            this.backupCall = true;
            if (this.$route.query.utm_image) {
                document.head.querySelector('meta[property="og:image"]').content = this.$route.query.utm_image;
            }


            document.head.querySelector('meta[name="description"]').content = "__('seo_home_page_meta_description')";

            this.currentLocale = this.getLanguageCode(process.env.LANGUAGE);
        },
        mounted() {
            this.triggerAnanlyticsEvent('LANDED_HOMEM_HOME', 'VD1', {
                'USER_ID': this.getUserDetails.userId
            });
            window.addEventListener('scroll', this.updateScroll);
        },
        watch: {
            'percentScrolled'(newPercentScrolled, prevPercentScrolled) {
                if (newPercentScrolled > 90 && !this.webPushModalTriggered && this.isWebPushModalEnabled) {
                    this.webPushModalTriggered = true;
                    this.openWebPushModal()
                }
            },
            'getUserDetails.userId'() {
                if(this.isCreated) {
                    if (!this.getUserDetails.isGuest) {
                        this.fetchForYouListPagePratilipis({'userId' : this.getUserDetails.userId, "cursor" : "0-0", "language": this.getCurrentLanguage().fullName.toUpperCase()});
                    }
                } else {
                    this.isCreated=false;
                }
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.updateScroll);
        }
    }
</script>

<style  lang="scss" scoped>
    .home-page {
        margin-top: 85px;
        min-height: 700px;
        @media screen and (max-width: 992px ) {
            margin-top: 65px;
        }
        .webpush-strip-container {
            background: #fff;
            border-top: 6px solid #e9e9e9;
            margin-left: -10px;
            .container-fluid {
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
                .webpush-title {
                    color: #212121;
                    padding: 5px 0 5px 10px;
                    display: block;
                    font-size: 22px;
                    font-weight: bold;
                    margin: 10px 0 5px 15px;
                    text-align: left;
                    border-left: 3px solid #d0021b;
                    line-height: 24px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    @media screen and (max-width: 576px ) {
                        font-size: 18px;
                        margin-bottom: 0;
                    }
                }
                button.close {
                    margin-top: 10px;
                    margin-right: 10px;
                    i {
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .home-page {
        .webpush-strip-container {
            .webpush-strip {
                .inner-container {
                    padding: 10px !important;
                }
            }
        }
    }
</style>
