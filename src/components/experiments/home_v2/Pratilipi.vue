<template>
    <div class="pratilipi-wrap">
        <div class="pratilipi" itemscope itemtype="http://schema.org/Book">

            <div class="book-type" :class="pratilipiData.type">
                {{ pratilipiData.type | getPratilipiTypeInNativeLanguage }}  <span></span>
            </div>
	    <meta itemprop="inLanguage" v-bind:content="pratilipiData.language" />
            <router-link :to="redirectToReader ? (pratilipiData.newReadPageUrl ? pratilipiData.newReadPageUrl : pratilipiData.readPageUrl) : pratilipiData.pageUrl" @click.native="triggerReadPratilipiEvent" :title="pratilipiData.title">
                <PratilipiImage :coverImageUrl="pratilipiData.coverImageUrl" :displayTitle="pratilipiData.displayTitle"></PratilipiImage>
            </router-link>
            <router-link :to="redirectToReader ? (pratilipiData.newReadPageUrl ? pratilipiData.newReadPageUrl : pratilipiData.readPageUrl) : pratilipiData.pageUrl" @click.native="triggerReadPratilipiEvent" :title="pratilipiData.displayTitle">
                <div class="pratilipi-details">
                    <span class="title" itemprop="name">{{ pratilipiData.displayTitle }}</span>
                    <span v-if="!hideAuthorName" class="author" itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ pratilipiData.author.name ||  pratilipiData.author.displayName }}</span></span>
                    <p v-if="pratilipiData.cardSummary" class="summary">{{ pratilipiData.cardSummary }}</p>
		    <meta itemprop="text" v-bind:content="pratilipiData.summary" />
		    <meta itemprop="datePublished" v-bind:datetime="pratilipiData.listingDateMillis | listingDateSchemaOrgFormat" />
		    <meta itemprop="image" v-bind:content="pratilipiData.coverImageUrl" />
                    <meta itemprop="url" v-bind:content="this.websiteUrl+pratilipiData.pageUrl" />
                </div>
                <div class="read-time">
                    <span><time itemprop="timeRequired" v-bind:datetime="pratilipiData.readingTime | readingTimeSchemaOrgFormat">
                        {{ pratilipiData.readingTime | showInMinutesOrHours }}
            </time>
                    </span>
                </div>
                <div class="stats">
                    <div class="read-count">
                        <i class="material-icons">remove_red_eye</i>
                        <span>
                            {{ pratilipiData.readCount | showThousandsInCommas() }}
                        </span>
                    </div>
                    <div class="rating">
                        <i class="material-icons">star</i>
                        <span itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
			    <span itemprop="ratingValue">
                            {{ pratilipiData.averageRating | round(1) }}
			    </span>
                        </span>
                        <meta itemprop="ratingCount" v-bind:content="pratilipiData.ratingCount" />
                        <meta itemprop="bestRating" v-bind:content="5"/>
                        <meta itemprop="worstRating" v-bind:content="1"/>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import PratilipiImage from '@/components/PratilipiImage';
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Pratilipi',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        },
        index: {
            type: Number
        },
        position: {
            type: Number
        },
        addToLibrary: {
            type: Function
        },
        removeFromLibrary: {
            type: Function
        },
        hideAddToLibrary: {
            type: Boolean
        },
        hideAuthorName: {
            type: Boolean
        },
        redirectToReader: {
            type: Boolean,
            required: false,
            default: false
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    data() {
        return {
	    websiteUrl:null,
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        ...mapActions('pratilipimodal', [
            'setPratilipiModalData',
            'fetchPratilipiData'
        ]),
        triggerReadPratilipiEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = this.redirectToReader && this.screenLocation === 'LIBRARY' ? 'READBOOK' : 'CLICKBOOK';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'INDEX': this.index,
                'POSITION': this.position
            });
        }
    },
    created() {
        this.websiteUrl = window.location.origin;
    },
    components: {
        PratilipiImage
    }
}
</script>

<style lang="scss" scoped>
    a:hover, a:focus {
        text-decoration: none;
        outline: none;
    }
    .list-page .pratilipi-wrap, .event-list .pratilipi-wrap, .event-list .pratilipi-wrap .pratilipi, .author-page .pratilipi-wrap, .search-page .pratilipi-wrap {
        display: inline-block;
    }
    .pratilipi {
        width: 150px;
        margin: 10px;
        background: #fff;
        border: 1px solid #e9e9e9;
        position: relative;
        border-radius: 3px;
        @media screen and (max-width: 768px ) {
            width: 150px;
            margin: 6px 6px 10px;
        }
        .book-type {
            font-size: 11px;
            line-height: 20px;
            font-weight: 700;
            color: #fff;
            padding: 0 20px 3px;
            background: #4CAF50;
            position: absolute;
            top: 15px;
            left: -10px;
            z-index: 1;
            height: 21px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            &:after {
                content: '';
                position: absolute;
                border-top: 0 solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid #4CAF50;
                top: 100%;
                left: -10px;
                left: 0;
            }
            span {
                content: '';
                position: absolute;
                border-top: 0 solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid rgba(0, 0, 0, 0.2);
                top: 100%;
                left: -10px;
                left: 0;
                z-index: 9;
            }
            &.ARTICLE {
                background: #42bab0;
            }
            &.ARTICLE:before {
                border-top: 21px solid #42bab0;
            }
            &.ARTICLE:after {
                border-right: 10px solid #42bab0;
            }
            &.POEM {
                background: #FF9800;
            }
            &.POEM:before {
                border-top: 21px solid #FF9800;
            }
            &.POEM:after {
                border-right: 10px solid #FF9800;
            }
        }
        .pratilipi-image {
            margin: 0;
            height: 220px;
            background-size: cover;
            background-position: center;
            position: relative;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            border-bottom: 1px solid #e9e9e9;
        }

        .pratilipi-details {
            text-align: left;
            padding: 0 10px;
            position: relative;
            span {
                display: block;
                color: #676767;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &.title {
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 18px;
                  max-height: 47px;
                  margin: 10px 0 2px;
                  color: #555;
                }
                &.author {
                    font-size: 11px;
                }
            }
            .summary {
                color: #212121;
                font-size: 12px;
                height: 55px;
                overflow: hidden;
                margin: 5px 0 10px;
            }
        }
        .read-time {
            font-size: 11px;
            color: #676767;
            text-align: left;
            margin: 2px 0 0 10px;
        }
        .stats {
            overflow: hidden;
            text-align: left;
            margin-left: 10px;
            .rating, .read-count, .read-time {
                padding: 2px 2px;
                font-size: 11px;
                color: #676767;
                display: block;
                float: left;
                margin-right: 7px;
                i {
                    font-size: 13px;
                    display: block;
                    float: left;
                    padding-right: 4px;
                    line-height: 20px;
                }
                span {
                    float: left;
                    display: block;
                    line-height: 20px;
                }
            }
            .read-count, .read-time {
                padding: 2px 0;
            }
        }
    }
    .language-ta .pratilipi .stats .read-time, .language-te .pratilipi .stats .read-time, .language-ml .pratilipi .stats .read-time, .language-kn .pratilipi .stats .read-time {
        font-size: 10px;
        @media screen and (max-width: 768px ) {
            font-size: 8.5px;
        }
    }
</style>
