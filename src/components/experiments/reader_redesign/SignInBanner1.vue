<template>
    <div class="join-pratilipi-banner">
        <div class="container">
            <div class="title">__("join_pratilipi")</div>
            <div class="desc">__("signinbanner_desc_1")</div>
            <button type="button" class="btn" @click="triggerSignInEvent()">__("user_sign_in")</button>
        </div>
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
            this.triggerAnanlyticsEvent(`CLICKED_BANNER1_READER`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            
            this.openLoginModal(this.$route.meta.store, 'CLICKED', 'BANNER1');
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent('VIEWED_BANNER1_READER', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.join-pratilipi-banner {
    background: #191C2C;
    color: #9B9B9B;
    text-align: left;
    padding: 15px;
    margin-bottom: 50px;
    .title {
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    .desc {
        font-size: 15px;
        margin-bottom: 15px;
    }
    .btn {
        border: 2px solid #fff;
        background: none;
        color: #fff;
        border-radius: 1px;
        font-size: 14px;
    }
}
</style>
