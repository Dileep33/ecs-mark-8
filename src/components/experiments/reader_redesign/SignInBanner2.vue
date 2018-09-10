<template>
    <div class="join-pratilipi-banner-2">
        <div class="title">__("signinbanner_enjoy_reading")</div>
        <div class="desc">__("signinbanner_desc_2")</div>
        <button type="button" class="btn" @click="triggerSignInEvent()">__("user_sign_in")</button>
    </div>
</template>

<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters } from 'vuex'

export default {
    props: {
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -100
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        /* Sign In Banner */
        triggerSignInEvent() {
            this.triggerAnanlyticsEvent(`CLICKED_BANNER2_READER`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            
            this.openLoginModal(this.$route.meta.store, 'CLICKED', 'BANNER2');
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent('VIEWED_BANNER2_READER', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.join-pratilipi-banner-2 {
    text-align: left;
    margin: 15px auto;
    max-width: 750px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    color: #000;
    @media screen and (max-width: 420px ) {
        margin: 15px;
    }
    .title {
        font-size: 20px;
        margin-bottom: 10px;
    }
    .desc {
        font-size: 15px;
        margin-bottom: 10px;
    }
    .btn {
        border: 1px solid #9B9B9B;
        font-size: 14px;
        background: none;
        border-radius: 1px;
    }
}
</style>
