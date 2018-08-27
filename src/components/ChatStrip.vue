<template>
    <div class="chat-stories">
        <router-link :to="'/chat-story/' + ChatStorySlugToday" @click.native="triggerChatStripAnalytics()">
            <span>__("chatstory_strip")</span>
            <i class="material-icons">keyboard_arrow_right</i>
        </router-link>
    </div>
</template>
<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import chatStories from '@/constants/chat-stories.json';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            firstChatStorySlug: null
        }
    },
    props: {
        screenName: {
            type: String,
            required: true
        },
        stripPosition: {
            type: String,
            required: true
        },
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
        triggerChatStripAnalytics() {
            this.triggerAnanlyticsEvent(`CLICKED_CHATSTRIP_${this.screenName}`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'POSITION': this.stripPosition
            });
        }
    },
    created() {
        // change the story key everyday
        const ChatStoryToday = chatStories[Object.keys(chatStories)[15]];
        this.ChatStorySlugToday = ChatStoryToday['url-slug'];
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEWED_CHATSTRIP_${this.screenName}`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'POSITION': this.stripPosition
                });
            }
        }
    }
}
</script>

<style lang="scss">
.chat-stories {
    background: #d0021b;
    max-width: 100%;
    margin: 10px 10px 0;
    clear: both;
    a {
        margin: 0;
        padding: 10px 0;
        text-decoration: none;
        font-size: 16px;
        color: #fff;
        width: 100%;
        display: block;
        font-weight: bold;
        text-align: center;
    }
    i {
        vertical-align: middle;
    }
}
</style>
