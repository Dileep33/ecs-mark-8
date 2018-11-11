<template>
    <div class="social-share">
        <span class="text">__("seo_share_page"): </span>
        <a :href="getFacebookShareUrl" @click="triggerFbEndShareEvent" class="fb" target="_blank" rel="noopener" aria-label="whatsapp">
            <span class="social-icon"><icon name="facebook-f"></icon></span>
        </a>
        <a :href="getWhatsAppUri" @click="triggerWaEndShareEvent" class="whatsapp" target="_blank" rel="noopener" aria-label="google">
            <span class="social-icon"><icon name="whatsapp"></icon></span>
        </a>
        <input type="text" id="inlineShareUri" hidden>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Social-Share-Strip',
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getFacebookShareUrl',
            'getTwitterUrl',
            'getGooglePlusUrl',
            'getWhatsAppUri',
            'getContentUri',
            'getUserDetails',
            'getPratilipiData'
        ]),
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        experimentId: {
            type: String,
            required: false,
            default: 'CONTROL'
        }
    },
    methods: {
        ...mapActions([
            'setShareDetails'
        ]),
        triggerFbEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKFB_${this.screenLocation}_${this.screenName}`, this.experimentId, {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'FACEBOOK'
            });
        },
        triggerWaEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKWA_${this.screenLocation}_${this.screenName}`, this.experimentId, {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'WHATSAPP'
            });
        },
        openShareModal() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKSHRBOOK_${this.screenLocation}_${this.screenName}`, this.experimentId, {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
            });
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: this.screenName, screen_location: this.screenLocation })
            $('#share_modal').modal('show')
        },
    },
    components: {

    },
    created() {
        this.setShareDetails({ data: this.data, type: this.type })
    }
}
</script>

<style  lang="scss" scoped>
.social-share {
    margin: 10px auto;
    text-align: center;
    span.text {
        font-size: 14px;
        color: #555;
        margin-right: 20px;
    }
    a {
        vertical-align: middle;
        color: #2c3e50;
        display: inline-block;
        text-align: left;
        margin: 0 0 5px;
        font-size: 14px;
        .social-icon {
            display: inline-block;
            width: 45px;
            height: 45px;
            background: #3b5998;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 45px;
            margin-right: 5px;
        }
        .fa-icon {
            vertical-align: middle;
        }
        &:hover {
            text-decoration: none;
        }
    }
}
.social-share a.twitter .social-icon  {
    background: #00aced;
}
.social-share a.google .social-icon {
    background: #dd4b39;
}
.social-share a.whatsapp .social-icon {
    background: #48C631;
}
.social-share a.link .social-icon {
    background: #2c3e50;
}
</style>
