<template>
    <div>
        <slot></slot>
        <LoginModal></LoginModal>
        <ShareModal></ShareModal>
        <Alert :isReader="true"></Alert>
    </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import ShareModal from '@/components/experiments/share_after_rating/Share.vue';
import Alert from '@/components/Alert.vue';
import constants from '@/constants';
import mixins from '@/mixins';

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        LoginModal,
        ShareModal,
        Alert
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount'
        ])
    },
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'setAfterLoginAction',
            'fetchInitialNotifications'
        ])
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
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
            }
        }
    }
}
</script>

<style lang="scss">

</style>
