<template>
    <div :class="currentLocale">
        <Header :userDetails="getUserDetails" :notificationCount="getNotificationCount" :pendingMessages="messageNotificationList"></Header>
        <AppBannerTwo v-if="$route.meta.store !== 'pratilipipage'"></AppBannerTwo>
        <AppBanner v-else></AppBanner>
        <slot></slot>
        <PratilipiModal></PratilipiModal>
        <LoginModal></LoginModal>
        <ShareModalOne v-if="getCookie('bucket_id') > 70 && getCookie('bucket_id') <= 85 && $route.meta.store !== 'authorpage'"></ShareModalOne>
        <ShareModalTwo v-else-if="getCookie('bucket_id') > 85 && getCookie('bucket_id') <= 100 && $route.meta.store !== 'authorpage'"></ShareModalTwo>
        <ShareModal v-else></ShareModal>
        <InputModal></InputModal>
        <MultiInputModal></MultiInputModal>
        <ConfirmationModal></ConfirmationModal>
        <Footer></Footer>
        <Alert></Alert>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AppBanner from '@/components/AppBanner.vue';
import AppBannerTwo from '@/components/experiments/appbanner_v2/AppBanner.vue';
import PratilipiModal from '@/components/PratilipiModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import ShareModalOne from '@/components/experiments/share_ui/Share_v1.vue';
import ShareModalTwo from '@/components/experiments/share_ui/Share_v2.vue';
import ShareModal from '@/components/Share.vue';
import InputModal from '@/components/InputModal.vue';
import MultiInputModal from '@/components/MultiInputModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

import constants from '@/constants'
import mixins from '@/mixins'

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount',
            'messageNotificationList'
        ])
    },
    data() {
        return {
            currentLocale: ''
        }
    },
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'setAfterLoginAction',
            'fetchInitialNotifications',
            'attachMessageNotificationListener'
        ])
    },
    components: {
        Header,
        AppBanner,
        AppBannerTwo,
        PratilipiModal,
        LoginModal,
        ShareModalOne,
        ShareModalTwo,
        ShareModal,
        InputModal,
        MultiInputModal,
        ConfirmationModal,
        Footer,
        Alert
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
            }
        }
    },
    created() {
        this.currentLocale = 'language-' + process.env.LANGUAGE;
    },
    mounted() {
        const that = this;
        $("body").removeClass("modal-open");
        $(document).on('show.bs.modal', '.modal', function (event) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

        $('div.modal').on('show.bs.modal', function() {
            console.log('modal show');
            const modal = this;
            const hash = modal.id;
            window.location.hash = hash;
            window.onhashchange = function() {
                if (!location.hash){
                    $(modal).modal('hide');
                }
            }
        });

        $('div.modal').on('hide.bs.modal', function() {
            const hash = this.id;
            that.setAfterLoginAction({ action: null, data: null });
            history.pushState('', document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
        });
    }
}
</script>

<style lang="scss">
.modal-body {
    max-height: calc(100vh - 140px);
    overflow-y: auto;
}
</style>
