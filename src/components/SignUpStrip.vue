<template>
    <div class="sign-up-strip" :class="{'newreader': newreader}">
        <p class="sign-up-strip-text" @click="openSignUpPop">
            __("signup_to_read")
        </p>
        <button type="button" class="close-btn" @click="closeStrip">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
import mixins from '@/mixins';
import { mapGetters } from 'vuex'

export default {
    props: {
        pratilipiData: {
            type: Object,
            required: true
        },
        newreader: {
            type: Boolean
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        closeStrip() {
            $(".sign-up-strip").slideUp();
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`SIGNUPDISMISS_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        openSignUpPop() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`SIGNUPREAD_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.openLoginModal(this.$route.meta.store, 'SIGNUPREAD', 'OPENAPP');
        }
    },
    created() {
        setTimeout(() => {
            $(".sign-up-strip").slideDown();
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`SIGNUPVIEWED_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        }, 2000)
        
    }
}
</script>

<style lang="scss" scoped>
.sign-up-strip {
    background: rgba(22,141,233,0.95);
    color: #fff;
    text-align: center;
    padding: 15px;
    position: fixed;
    bottom: 54px;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    z-index: 10;
    display: none;
    &.newreader {
        bottom: 49px;
    }
    p {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
    }
    .close-btn {
        position: absolute;
        right: 0;
        width: 50px;
        height: 50px;
        top: calc(50% - 25px);
        color: #fff;
        opacity: 0.9;
        font-weight: 300;
        z-index: 11;
        cursor: pointer;
        outline: none;
        margin: 0;
        font-size: 25px;
    }
}
</style>
