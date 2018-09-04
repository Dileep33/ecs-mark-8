<template>
    <nav id="sidebar">
        <div id="dismiss" @click="closeSidebar">
            <i class="material-icons">close</i>
        </div>
        <div class="book-info">
            <div class="book-cover"><img :src="getPratilipiData.coverImageUrl" v-bind:alt="getPratilipiData.displayTitle"></div>
            <div class="book-name">{{ getPratilipiData.title }}</div>
            <router-link :to="getAuthorData.pageUrl" class="author-link">
                <span class="auth-name">{{ getAuthorData.displayName }}</span>
            </router-link>
            <div class="follow-btn-w-count" v-if="!getAuthorData.following">
                <button @click="followPratilipiAuthor" >
                    <i class="material-icons">person_add</i>__("author_follow")
                </button><span><b>{{ getAuthorData.followCount }}</b></span>
            </div>
            <div class="follow-btn-w-count" v-else>
                <button @click="unfollowPratilipiAuthor"><i class="material-icons">check</i> __("author_following")</button><span><b>{{ getAuthorData.followCount }}</b></span>
            </div>
        </div>
        <div class="book-index">
            <ul>
                <li
                    v-for="eachIndex in getIndexData"
                    :key="eachIndex.chapterId"
                    :class="{ isActive: eachIndex.slugId === currentChapterSlugId }">
                        <router-link
                            :to="{path: eachIndex.pageUrl}"
                            @click.native="triggerEventAndCloseSidebar(eachIndex.chapterNo)">
                            {{ eachIndex.title || '__("writer_chapter") '  + eachIndex.chapterNo }}
                        </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import mixins from '@/mixins';

export default {
    props: {
        getAuthorData: {
            type: Object,
            required: true
        },
        getPratilipiData: {
            type: Object,
            required: true
        },
        getIndexData: {
            type: Array,
            required: true
        },
        currentChapterSlugId: {
            type: String,
            required: true
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
        ...mapActions('readerv2page', [
            'followAuthor',
            'unFollowAuthor'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        /* analytics */
        _triggerReaderAnalyticsEvent(eventName, entityValue, parentId) {
            let pratilipiData = this.getPratilipiData
            pratilipiData['author'] = this.getAuthorData
            let options = {
                ...this.getPratilipiAnalyticsData(pratilipiData),
                'USER_ID': this.getUserDetails.userId
            }
            if (entityValue) {
                options['ENTITY_VALUE'] = entityValue
            }
            if (parentId) {
                options['PARENT_ID'] = parentId
            }
            this.triggerAnanlyticsEvent(eventName, 'CONTROL', options)
        },
        closeSidebar() {
            $('#sidebar').removeClass('active')
            $('.overlay').fadeOut()
        },
        triggerEventAndCloseSidebar(chapterNo) {
            this._triggerReaderAnalyticsEvent('CHANGECHAPTER_INDEX_READER', null, chapterNo)
            $('#sidebar').removeClass('active')
            $('.overlay').fadeOut()
        },
        /* follow */
        followPratilipiAuthor() {
            this._triggerReaderAnalyticsEvent('FOLLOW_INDEX_READER', this.getAuthorData.followCount)
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({action: `${this.$route.meta.store}/followAuthor`})
                this.openLoginModal(this.$route.meta.store, 'FOLLOW', 'READERM')
            } else {
                this.followAuthor()
            }
        },
        unfollowPratilipiAuthor() {
            this._triggerReaderAnalyticsEvent('UNFOLLOW_INDEX_READER', this.getAuthorData.followCount)
            this.unFollowAuthor()
        },
    }
}
</script>

<style lang="scss" scoped>
#sidebar {
    width: 300px;
    position: fixed;
    top: 0;
    left: -310px;
    height: 100vh;
    z-index: 999;
    background: #fff;
    color: #fff;
    transition: all 0.3s;
    overflow-y: scroll;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    &.active {
        left: 0;
    }
    #dismiss {
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #2c3e50;
        z-index: 2;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        &:hover {
            opacity: 0.9;
        }
    }
    .book-info {
        position: relative;
        text-align: center;
        color: #2c3e50;
        font-size: 14px;
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .book-cover {
            width: 150px;
            height: 150px;
            margin: 10px auto;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .book-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
        }
        .author-link {
            color: #d0021b;
            margin-bottom: 10px;
            .auth-name {
                text-align: left;
                display: inline-block;
                margin: 0 10px;
                font-size: 14px;
                vertical-align: middle;
            }
            &:hover {
                text-decoration: none;
            }
        }
    }
    .book-index {
        text-align: left;
        font-size: 14px;
        ul {
            padding: 0 0 0 20px;
            li {
                padding: 5px;
                a {
                    color: #212121;
                }
                &.isActive a {
                    font-weight: bold;
                }
            }
        }
    }
    .follow-btn-w-count {
        color: #fff;
        margin: 10px;
        font-size: 14px;
        position: relative;
        text-align: center;
        display: block;
        clear: both;
        overflow: hidden;
        cursor: pointer;
        button {
            background: #d0021b;
            border: 1px solid #d0021b;
            border: 1px solid #d0021b;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            outline: none;
            color: #fff;
            margin: 0;
            padding: 5px 10px;
            display: inline-block;
            clear: both;
            cursor: pointer;
        }
        i {
            vertical-align: middle;
            padding-right: 5px;
            font-size: 18px;
        }
        span {
            background: #fff;
            color: #d0021b;
            display: inline-block;
            border: 1px solid #d0021b;
            padding: 5px 10px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            b {
                font-size: 12px;
            }
        }
    }
}
</style>
