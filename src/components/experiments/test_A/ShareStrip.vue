<template>
    <div class="social-share">
        <span class="text">__("seo_share_page"): </span>
        <a :href="getWhatsAppUri" @click="triggerWaEndShareEvent" class="whatsapp" target="_blank" rel="noopener" aria-label="google">
            <span class="social-icon"><icon name="whatsapp"></icon>__("whatsapp")</span>
        </a>
        <a :href="getFacebookShareUrl" @click="triggerFbEndShareEvent" class="fb" target="_blank" rel="noopener" aria-label="whatsapp">
            <span class="social-icon"><icon name="facebook-f"></icon>__("facebook")</span>
        </a>
        <div class="share-btn" @click="openShareModal">
            <span class="social-icon"><i class="material-icons">share</i></span>
        </div>
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
            this.triggerAnanlyticsEvent(`SHAREBOOKFB_BOOKEND_READER`, 'CONTROL', {
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
            this.triggerAnanlyticsEvent(`SHAREBOOKWA_BOOKEND_READER`, 'CONTROL', {
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
            this.triggerAnanlyticsEvent(`CLICKSHRBOOK_BOOKEND_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
            });
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: 'READER', screen_location: 'BOOKEND' })
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
    width: 280px;
    margin: 0 auto;
    text-align: center;
    span.text {
        font-size: 14px;
        color: #555;
        display: block;
        margin-bottom: 5px;
    }
    a, .share-btn {
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
            font-size: 12px;
            i {
                vertical-align: middle;
            }
        }
        .fa-icon {
            vertical-align: middle;
            margin-right: 5px;
        }
        &:hover {
            text-decoration: none;
        }
    }
}
.social-share a.whatsapp .social-icon, .social-share a.fb .social-icon {
    width: 100px;
    height: 35px;
    line-height: 35px;
    border-radius: 3px;
}
.social-share a.whatsapp .social-icon {
    background: #48C631;
}
.social-share .share-btn .social-icon {
    background: none;
    height: 35px;
    width: 35px;
    line-height: 35px;
    color: #555;
    
}
</style>
