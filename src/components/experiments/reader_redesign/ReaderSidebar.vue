<template>
    <nav id="sidebar">
        <div id="dismiss" @click="closeSidebar">
            <i class="material-icons">close</i>
        </div>
        <div class="book-info">
            <div class="book-cover"><img :src="getPratilipiData.coverImageUrl" v-bind:alt="getPratilipiData.displayTitle"></div>
            <div class="book-name">{{ getPratilipiData.title }}</div>
            <div class="author-section">
                <router-link :to="getAuthorData.pageUrl" class="author-link">
                    <span class="auth-image"><img :src="getMediumResolutionImage(getAuthorData.profileImageUrl)" alt=""></span>
                    <span class="auth-name">{{ getAuthorData.displayName }}</span>
                </router-link>
                <div class="follow-btn" v-if="!getAuthorData.following">
                    <button @click="followPratilipiAuthor" >
                        <i class="material-icons">person_add</i>__("author_follow")
                    </button>
                </div>
                <div class="follow-btn" v-else>
                    <button @click="unfollowPratilipiAuthor"><i class="material-icons">check</i> __("author_following")</button>
                </div>
            </div>
        </div>
        <div class="book-index" v-if="getIndexData.length > 1">
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
        <div class="rate-widget">
            <div class="widget-name" v-if="(userPratilipiData.reviewDateMillis) && (userPratilipiData.reviewState === 'PUBLISHED')">__("rating_your_rating")</div>
            <div class="widget-name" v-else>__("rating_rating")</div>
            <Reviews
                :pratilipiId="getPratilipiData.pratilipiId"
                :authorId="getAuthorData.authorId"
                :haveInfiniteScroll="false"
                screenName="INDEX"
                screenLocation="READERM"
                :pratilipiData="Object.assign({}, getPratilipiData, {author: getAuthorData})"
                v-if="openReaderSidebar"
                :userPratilipiData='userPratilipiData'>
            </Reviews>
        </div>
        <div class="share-widget">
            <div class="widget-name">__("share")</div>
            <ShareStrip
                :data="getPratilipiData"
                :type="'PRATILIPI'"
                :className="'reader-sidebar'">
            </ShareStrip>
        </div>
        <div @click="hideStripAndRedirect" class="next-strip-container">
            <NextPratilipiStrip
                :pratilipi='getPratilipiData.nextPratilipi'
                :showImage='false'
                v-if="isNextPratilipiEnabled"
            ></NextPratilipiStrip>
        </div>
    </nav>
</template>

<script>
import ShareStrip from '@/components/experiments/reader_redesign/ShareStrip.vue';
import NextPratilipiStrip from '@/components/experiments/reader_redesign/NextPratilipiStrip.vue'

import Reviews from '@/components/experiments/reader_redesign/Reviews.vue';
import { mapGetters, mapActions } from 'vuex';
import mixins from '@/mixins';

export default {
    components: {
        ShareStrip,
        Reviews,
        NextPratilipiStrip
    },
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
        },
        userPratilipiData: {
            type: Object,
            required: true
        },
        closeSidebar: {
            type: Function,
            required: true
        },
        openReaderSidebar: {
            type: Boolean,
            required: true
        },
        hideStripAndRedirect: {
            type: Function,
            required: true
        },
        isNextPratilipiEnabled: {
            type: Boolean,
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
        padding: 10px 0 10px 10px;
        margin-bottom: 10px;
        text-align: left;
        .book-cover {
            width: 130px;
            height: 170px;
            margin: 5px 0 10px;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        .book-name {
            font-size: 18px;
            margin: 0 10px 0 0;
        }
        .author-section {
            margin: 10px 0;
            .author-link {
                color: #000;
                margin-bottom: 10px;
                .auth-image {
                    width: 40px;
                    height: 40px;
                    display: inline-block;
                    margin: 0 5px 0 0;
                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .auth-name {
                    text-align: left;
                    display: inline-block;
                    font-size: 15px;
                    vertical-align: middle;
                    max-width: 105px;
                    min-width: 60px;
                    overflow: hidden;
                    max-height: 44px;
                }
                &:hover {
                    text-decoration: none;
                }
            }
            .follow-btn {
                margin: 10px 5px;
                font-size: 12px;
                position: relative;
                text-align: center;
                display: inline-block;
                vertical-align: middle;
                clear: both;
                overflow: hidden;
                cursor: pointer;
                button {
                    background: #fff;
                    border: 1px solid #979797;
                    border-radius: 3px;
                    outline: none;
                    color: #000;
                    margin: 0;
                    padding: 5px 10px;
                    display: inline-block;
                    clear: both;
                    cursor: pointer;
                }
                i {
                    vertical-align: middle;
                    padding-right: 5px;
                    font-size: 16px;
                }
            }
        }
    }
    .book-index {
        text-align: left;
        font-size: 14px;
        border-bottom: 1px solid #e9e9e9;
        ul {
            padding: 0 10px;
            max-height: 200px;
            overflow-y: auto;
            li {
                a {
                    color: #212121;
                    padding: 5px;
                    display: block;
                    text-decoration: none;
                }
                &.isActive {
                    background: #e9e9e9;
                }
            }
        }
    }
    .rate-widget, .share-widget {
        padding: 10px 10px 0;
        .widget-name {
            color: #000;
            font-size: 15px;
            text-align: left;
        }
    }
}
</style>
