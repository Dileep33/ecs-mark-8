<template>
    <div class="sign-up-strip" :class="{'newreader': newreader, 'desktop': !isMobile()}" >
        <p class="sign-up-strip-text" @click="openSignUpPop">
            __("read_later")
        </p>
        <button type="button" class="close-btn" @click="closeStrip">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
import mixins from '@/mixins';
import { mapActions, mapGetters } from 'vuex'

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
    data() {
        return {
            showLibraryStrip: this.getCookie( "VIEWED_LIBRARY_SIGNUP_STRIP" ) == null || this.getCookie( "VIEWED_LIBRARY_SIGNUP_STRIP" ) == "true",
            click_count: this.getCookie( "LIBRARY_SIGNUP_STRIP_CLICKED" ) == null ? 0 : parseInt( this.getCookie( "LIBRARY_SIGNUP_STRIP_CLICKED" ) || 0 ),
            cross_count: this.getCookie( "LIBRARY_SIGNUP_STRIP_CROSSED" ) == null ? 0 : parseInt( this.getCookie( "LIBRARY_SIGNUP_STRIP_CROSSED" ) || 0 )
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
        ...mapActions([
            'setAfterLoginAction'
        ]),
        closeStrip() {
            this.hideStripFromView();
            this.cross_count++;
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`SIGNUPDISMISS_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        hideStripFromView() {
            $(".sign-up-strip").slideUp();
        },
        openSignUpPop() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`SIGNUPREAD_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: this.pratilipiData.pratilipiId });
            this.openLoginModal(this.$route.meta.store, 'SIGNUPREAD', 'OPENAPP');
        },
        execCookieLogic() {
            if( this.click_count >= 3 ) {
                this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 365, "/" );
                return;
            }
            if( this.click_count > 0 && this.click_count < 3 ) {
                if( this.cross_count > 2 )
                    this.cross_count = 0;
                if( this.cross_count == 0 )
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 3, "/" );
                if( this.cross_count == 1 )
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 7, "/" );
                if( this.cross_count == 2 )
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 30, "/" );
            }
            else {
                if( this.cross_count < 3 ){
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', null, "/" );
                }
                if( this.cross_count >= 3 && this.cross_count < 6)
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 2, "/" );
                if( this.cross_count >= 6 )
                    this.setCookie( "VIEWED_LIBRARY_SIGNUP_STRIP", 'false', 7, "/" );
            }

            this.setCookie( "LIBRARY_SIGNUP_STRIP_CLICKED", this.click_count, 365, "/" );
            this.setCookie( "LIBRARY_SIGNUP_STRIP_CROSSED", this.cross_count, 365, "/" );
        }
    },
    created() {
        if (!this.pratilipiData.addedToLib && this.showLibraryStrip) {
            setTimeout(() => {
                $(".sign-up-strip").slideDown();
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                this.triggerAnanlyticsEvent(`SIGNUPVIEWED_OPENAPP_READER`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId
                });
            }, 2000)
        }
    },
    watch: {
        'showLibraryStrip': function(shouldShow) {
            if (!shouldShow) {
                this.hideStripFromView();
            }
            this.execCookieLogic();
        },
        'click_count': function() {
            this.execCookieLogic();
        },
        'cross_count': function() {
            this.execCookieLogic();
        }
    },
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
    &.desktop {
        bottom: 46px;
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
        background: none;
        border: 0;
    }
}
</style>
