<template>
    <MainLayout>
        <div class="end-of-stories">
            <i class="material-icons">check_circle_outline</i>
            <h3>__("chatstory_finish_1")</h3>
            <p>__("chatstory_finish_2")</p>
            <div class="archive">
                <h4>Read all Stories</h4>
                <div class="filter" @click="toggleFilterMenu">
                    <icon name="filter"></icon>
                </div>
                <div class="clear"></div>
                <div class="filtering-menu">
                    <span class="filter-item" v-for="eachStoryType in storyTypes" @click="filterStories(eachStoryType)">{{ eachStoryType }}</span>
                    <div class="filter-item link-clear" @click="clearFilterList">
                        <i class="material-icons">close</i>
                        <span>__("sorting_clear")</span>
                    </div>
                </div>
                <div class="stories-list">
                    <div class="filter-helper" v-if="selectedFilter">
                        __("sorting_showing_results"): <span class="filter-text">{{ this.selectedFilter }}</span>
                        <i class="material-icons" @click="clearFilterList">close</i>
                    </div>
                    <ul>
                        <li :class="eachStory.storyType" v-for="(eachStory, index) in allStories" v-if="eachStory.storyType === selectedFilter || selectedFilter === null">
                            <router-link :to="'/chat-story/' + eachStory['url-slug']" @click.native="triggerArchiveAnalytics(eachStory['url-slug'])">
                                <div class="story-name">{{ eachStory.title }}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
<script>
import MainLayout from '@/layout/main-layout.vue';
import mixins from '@/mixins';
import chatStories from '@/constants/chat-stories.json';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout
    },
    data() {
        return {
            allStories: [],
            storyTypes: [],
            selectedFilter: null
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
        toggleFilterMenu() {
            $(".filtering-menu").toggle();
        },
        filterStories(storyType) {
            this.selectedFilter = storyType;
            $('.filtering-menu').hide();
            $('.filter').addClass("active");
            $(".link-clear").show();
            this.triggerAnanlyticsEvent('FILTER_CHATSTORY_ARCHIVE', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'FILTER': storyType
            });
        },
        clearFilterList() {
            this.selectedFilter = null;
            $('.filter').removeClass("active");
            $('.filtering-menu').hide();
            $(".link-clear").hide();
        },
        triggerArchiveAnalytics(url) {
            this.triggerAnanlyticsEvent('CLICKED_CHATSTORY_ARCHIVE', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': url
            });
        }
    },
    created() {
        this.allStories = chatStories;
        Object.keys(this.allStories).forEach((eachStory) => {
            if (this.storyTypes.indexOf(this.allStories[eachStory]['storyType']) === -1) {
                this.storyTypes.push(this.allStories[eachStory]['storyType']);
            }
        })
    },
    mounted() {
        this.triggerAnanlyticsEvent('LANDED_FINISHED_CHATSTORY', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    }
}
</script>

<style lang="scss">
.end-of-stories {
    background: #fff;
    padding: 30px 10px;
    margin: 65px auto 0;
    max-width: 768px;
    min-height: 500px;
    i {
        font-size: 50px;
        color: #4CAF50;
    }
    h3 {
        font-size: 20px;
        padding: 0;
        font-weight: normal;
        color: #4CAF50;
    }
    p {
        font-size: 14px;
    }
    h4 {
        font-size: 16px;
        text-align: left;
        float: left;
        margin-left: 5px;
    }
    .clear {
        clear: both;
    }
    .archive {
        position: relative;
    }
    .stories-list {
        position: relative;
        margin: 5px 0;
        ul {
            padding: 0;
            margin: 0;
            text-align: left;
            li {
                text-align: left;
                display: inline-block;
                background: #f8f9fa;
                margin: 5px;
                border-radius: 4px;
                width: 150px;
                position: relative;
                a {
                    color: #555;
                    padding: 15px 10px;
                    display: block;
                }
            }
        }
    }
    .filter {
        float: right;
        margin-right: 0;
        background: #e9e9e9;
        border-radius: 4px;
        padding: 3px 7px 0;
        cursor: pointer;
        .fa-icon {
            vertical-align: text-top;
        }
        &.active .fa-icon {
            color: #d0021b;
        }
    }
    .filtering-menu {
        position: absolute;
        top: 34px;
        right: 0;
        background: #fff;
        padding: 10px;
        border: 1px solid #e9e9e9;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        border-radius: 4px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        z-index: 10;
        max-width: 180px;
        text-align: right;
        display: none;
        span.filter-item {
            background: #e9e9e9;
            color: #555;
            padding: 5px 10px;
            border-radius: 15px;
            display: inline-block;
            margin: 2px;
            font-size: 12px;
            cursor: pointer;
            &.active {
                color: #d0021b;
            }
        }
    }
    .filter-helper {
        font-size: 14px;
        padding: 5px 0;
        span.filter-text {
            background: #e9e9e9;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            color: #d0021b;
            margin-left: 5px;
            font-size: 13px;
        }
        i {
            vertical-align: middle;
            font-size: 20px;
            color: #2874f0;
            padding: 0 5px;
            cursor: pointer;
        }
    }
    .link-clear {
        background: none;
        color: #2874f0;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        display: none;
        font-size: 12px;
        padding: 5px 5px 0;
        cursor: pointer;
        i {
            vertical-align: middle;
            font-size: 14px;
            color: #2874f0;
        }
        span {
            vertical-align: middle;
        }
    }
}
</style>
