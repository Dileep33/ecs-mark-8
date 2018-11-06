import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import SearchPageComponent from '@/pages/Search'
import LoginPageComponent from '@/pages/Login.vue'
import PratilipiPageComponent from '@/pages/Pratilipi.vue'
import AuthorPageComponent from '@/pages/Author.vue'
import DiscoveryPageComponent from '@/pages/Discovery.vue'
import ListPageComponent from '@/pages/ListPage.vue'
import WritePageComponent from '@/pages/Write.vue'
import EventsPageComponent from '@/pages/Events'
import EventPageComponent from '@/pages/Event'
import BlogsPageComponent from '@/pages/Blogs.vue'
import ForYouPageComponent from '@/pages/ForYou.vue'
import BlogPageComponent from '@/pages/Blog.vue'
import NotificationComponent from '@/pages/Notification.vue'
import SettingsPageComponent from '@/pages/Settings.vue'
import ReaderPageComponent from '@/pages/Reader.vue'
import ReaderPageV2Component from '@/pages/ReaderV2.vue'
import InterviewsPageComponent from '@/pages/Interviews.vue'
import InterviewPageComponent from '@/pages/Interview.vue'
import NewsletterUnSubscribePageComponent from '@/pages/NewsletterUnSubscribe.vue'
import LibraryPageComponent from '@/pages/Library.vue'
import StaticComponent from '@/pages/Static.vue'
import MessagesComponent from '@/pages/Messages.vue'
import MessageUserComponent from '@/pages/MessageUser.vue'
import PasswordResetPageComponent from '@/pages/PasswordReset.vue'
import EventParticipatePageComponent from '@/pages/EventParticipate.vue'
import VideoseriesPageComponent from '@/pages/Videoseries.vue'
import VideoPlayListPageComponent from '@/pages/VideoPlayList.vue'
import VideoPlayPageComponent from '@/pages/Videoplay.vue'
import AdminEventSubmissions from '@/pages/AdminEventSubmissions'
import AdminEventSubmission from '@/pages/AdminEventSubmission'
import ShayariPageComponent from '@/pages/Shayari.vue'
import ChatStoryComponent from '@/pages/ChatStory.vue'
import EndChatStoryComponent from '@/pages/EndChatStory.vue'
import AuthorDashboardComponent from '@/pages/AuthorDashboard.vue'
import NotFoundPageComponent from '@/pages/404.vue'

import {
    getCookie,
    getLanguageCode
} from '@/mixins/methods'
import DataAccessor from '@/utils/DataAccessor'
Vue.use(Router)
// todo try using nested Urls
// todo implement SEO
// todo enable nested urls upto /comments
// todo remove router link and replace with a common router push function
// todo checkback button press on every page
// todo use routerBeforeEach to check for logged in or restricted pages
// todo change loading states to router https://router.vuejs.org/en/advanced/data-fetching.html
// todo move all events to a common location or class wise division
// todo scroll is maintained
// todo double scroll bar in reviews modal
// todo writer modal href terms and services
// todo trending search call on every page
// todo bugs in reader decorations
// todo tinymc integration in this app
// todo create page SEO
// todo add login checks in route otherwise it will render login first then actual page

const defaultMetaTags = [{
        property: 'og:type',
        content: 'books.book'
    },
    {
        property: 'og:image',
        content: 'https://www.ptlp.co/resource-all/home-page/pratilipi-banner-compressed-mobile.jpg'
    },
    {
        property: 'og:url',
        content: window.location.href
    },
    {
        name: 'twitter:card',
        content: 'summary'
    },
    {
        name: 'twitter:site',
        content: '@TeamPratilipi'
    }
]

function _getDefaultPageOGTags(pageStoreName) {
    switch (pageStoreName) {
        case 'homepage':
            return [{
                    name: 'title',
                    content: '__("seo_home_page_meta_title")'
                },
                {
                    property: 'og:title',
                    content: '__("seo_home_page")'
                },
                {
                    property: 'og:description',
                    content: '__("seo_home_page_meta_description")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'listpage':
            return [
                {
                    property: 'og:description',
                    content: '__("seo_home_page_meta_description")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'searchpage':
            return [{
                    property: 'og:title',
                    content: '__("seo_search_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'login':
            return [{
                    property: 'og:title',
                    content: '__("seo_login_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'authorpage':
            return [{
                    name: 'robots',
                    content: 'INDEX'
                },
                {
                    property: 'og:title',
                    content: '__("seo_login_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                {
                    property: 'og:image:width',
                    content: '220'
                },
                {
                    property: 'og:image:height',
                    content: '220'
                },
                ...defaultMetaTags
            ];
            break;
        case 'login':
            return [{
                    property: 'og:title',
                    content: '__("seo_register_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'discover':
            return [{
                    property: 'og:title',
                    content: '__("seo_navigation_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'writepage':
            return [{
                    property: 'og:title',
                    content: '__("write") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                ...defaultMetaTags
            ];
            break;
        case 'pratilipipage':
            return [{
                    property: 'og:title',
                    content: '__("seo_home_page") | __("pratilipi")'
                },
                {
                    property: 'og:description',
                    content: '__("home_page_title")'
                },
                {
                    property: 'al:android:url',
                    content: ''
                },
                {
                    property: 'al:android:package',
                    content: 'com.pratilipi.mobile.android'
                },
                {
                    property: 'al:android:app_name',
                    content: 'Pratilipi'
                },
                {
                    property: 'og:image:width',
                    content: '220'
                },
                {
                    property: 'og:image:height',
                    content: '220'
                },
                ...defaultMetaTags
            ];
            break;
        default:

    }
}

var router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: () => {
                let bucketId = getCookie('bucket_id') ? getCookie('bucket_id') : 5;
                console.log("bucket id ", bucketId);
                if ((bucketId >= 75 && bucketId <= 86) || getLanguageCode(process.env.LANGUAGE) === 'en') {
                    return import ('@/pages/experiments/home_v2/Home.vue');
                } else if (bucketId >= 87 && bucketId <= 99) {
                    return import ('@/pages/experiments/home_v2/HomeWithoutType.vue');
                } else {
                    return new Promise((resolve, reject) => resolve(Home));
                }
            },
            meta: {
                'store': 'homepage',
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('homepage')
            },
            beforeEnter: (to, from, next) => {
                if (to.query.email && to.query.token && to.query.passwordReset) {
                    next({
                        path: '/reset-password',
                        query: {
                            email: to.query.email,
                            token: to.query.token
                        }
                    });
                } else {
                    next();
                }
            }
        }, {
            path: '/search',
            name: 'Search_Page',
            component: SearchPageComponent,
            meta: {
                'store': 'searchpage',
                'title': '__("seo_search_page") | __("pratilipi")',
                metaTags: _getDefaultPageOGTags('searchpage')
            }
        }, {
            path: '/404',
            name: 'Notfound_Page',
            component: NotFoundPageComponent,
            meta: {
                'title': '__("page_not_found_heading")'
            }
        }, {
            path: '/videoseries',
            name: 'Videoseries_Page',
            component: VideoseriesPageComponent,
            meta: {
                'store': 'videoseries',
                'title': '__("seo_search_page") | __("pratilipi")'
            }
        },
        {
            path: '/login',
            name: 'Login_Page',
            component: LoginPageComponent,
            meta: {
                'title': '__("seo_login_page") | __("pratilipi")',
                'store': 'login',
                metaTags: _getDefaultPageOGTags('login')
            }
        }, {
            path: '/signup',
            name: 'Signup_Page',
            component: LoginPageComponent,
            meta: {
                'title': '__("seo_register_page") | __("pratilipi")',
                'store': 'register',
                metaTags: _getDefaultPageOGTags('register')
            }
        }, {
            path: '/story/:slug_id',
            name: 'Pratilipi',
            component: () => {
                if (process.env.REALM === 'PROD') {
                    return new Promise((resolve) => {
                        resolve(PratilipiPageComponent)
                    });
                }
            },
            // component: PratilipiPageComponent,
            meta: {
                'store': 'pratilipipage',
                'id_prop': 'slug_id',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/user/:user_slug',
            name: 'User',
            component: AuthorPageComponent,
            meta: {
                'store': 'authorpage',
                'title': '__("seo_home_page")',
                'id_prop': 'user_slug',
                metaTags: _getDefaultPageOGTags('authorpage')

            }
        }, {
            path: '/user/:user_slug/dashboard',
            name: 'AuthorDashboard_Page',
            component: AuthorDashboardComponent,
            meta: {
                'store': 'authorpage',
                'title': '__("seo_home_page")',
                'id_prop': 'user_slug'
            }
        }, {
            path: '/discover',
            name: 'Discovery_Page',
            component: DiscoveryPageComponent,
            meta: {
                'title': '__("seo_navigation_page") | __("pratilipi")',
                'store': 'discover',
                metaTags: _getDefaultPageOGTags('discover')
            }
        }, {
            path: '/create',
            name: 'Write_Page',
            component: WritePageComponent,
            meta: {
                'store': 'writepage',
                'title': '__("write") | __("pratilipi")',
                metaTags: _getDefaultPageOGTags('writepage')
            }
        }, {
            path: '/event',
            name: 'Events_Page',
            component: EventsPageComponent,
            meta: {
                'store': 'eventspage',
                'title': '__("seo_events_page") | __("pratilipi")'
            }
        }, {
            path: '/event/:event_slug',
            name: 'Event_Page',
            component: EventPageComponent,
            meta: {
                'store': 'eventpage',
                'title': '__("seo_home_page")',
                'id_prop': 'event_slug'
            }
        }, {
            path: '/videoseries/:videoseries_slug',
            name: 'VideoPlayList_Page',
            component: VideoPlayListPageComponent,
            meta: {
                'store': 'videoseries',
                'title': '__("seo_home_page")',
                'id_prop': 'videoseries_slug'
            }
        },
        {
            path: '/videos/:videos_slug',
            name: 'Videos_Page',
            component: VideoPlayPageComponent,
            meta: {
                'store': 'videoseries',
                'title': '__("seo_home_page")',
                'id_prop': 'videos_slug'
            }
        },
        {
            path: '/for-you',
            name: 'For_You',
            component: ForYouPageComponent,
            meta: {
                'store': 'blogpage',
                'title': '__("seo_home_page")',
            }
        },
        {
            path: '/blog',
            name: 'Blogs_Page',
            component: BlogsPageComponent,
            meta: {
                'store': 'blogspage',
                'title': '__("seo_blog_page") | __("pratilipi")'
            }
        }, {
            path: '/blog/:slug',
            name: 'Blog_Page',
            component: BlogPageComponent,
            meta: {
                'store': 'blogpage',
                'title': '__("seo_home_page")',
                'id_prop': 'blog_id'
            }
        }, {
            path: '/blogpost/:blog_id',
            name: 'Blog_Page_2',
            component: BlogPageComponent,
            meta: {
                'store': 'blogpage',
                'title': '__("seo_home_page")',
                'id_prop': 'blog_id'
            }
        }, {
            path: '/read',
            name: 'Reader_Page',
            component: () => {
                return new Promise((resolve, reject) => resolve(ReaderPageComponent));

            },
            meta: {
                'store': 'readerpage',
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/read/:slug',
            name: 'Reader_Page_V2',
            component: () => {
                let bucketId = getCookie('bucket_id') ? getCookie('bucket_id') : 5;
                console.log("bucket id ", bucketId);
                if (bucketId >= 25 && bucketId < 50) {
                    return import ('@/pages/experiments/test_A/ReaderV2.vue');
                } else if (bucketId >= 50 && bucketId < 75) {
                    return import ('@/pages/experiments/reader_redesign/ReaderV2.vue');
                } else if (bucketId > 75 && bucketId <= 85) {
                    return import ('@/pages/experiments/reader_redesign/ReaderV2-1.vue');
                } else if (bucketId > 85 && bucketId <= 99) {
                    return import ('@/pages/experiments/reader_redesign/ReaderV2-2.vue');
                } else {
                    return new Promise((resolve, reject) => resolve(ReaderPageV2Component));
                }
            },
            meta: {
                'store': 'readerv2page',
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/followers',
            beforeEnter: (to, from, next) => {
                next('/login');
            }
        }, {
            path: '/notifications',
            beforeEnter: (to, from, next) => {
                if (to.query.action && to.query.action === "settings") {
                    next('/settings?action=notification');
                } else {
                    next();
                }
            },
            name: 'Notification',
            component: NotificationComponent,
            meta: {
                'store': 'notification',
                'title': '__("seo_notifications_page") | __("pratilipi")'
            }
        }, {
            path: '/settings',
            name: 'Settings_Page',
            component: SettingsPageComponent,
            meta: {
                'title': '__("seo_home_page") | __("pratilipi")'
            }
        }, {
            path: '/author-interviews',
            name: 'Interviews_Page',
            component: InterviewsPageComponent,
            meta: {
                'store': 'interviewspage',
                'title': '__("seo_author_interview") | __("pratilipi")'
            }
        }, {
            path: '/author-interviews/:slug',
            name: 'Interview_Page',
            component: InterviewPageComponent,
            meta: {
                'store': 'interviewpage',
                'title': '__("seo_home_page")',
                'id_prop': 'interview_id'
            }
        }, {
            path: '/newsletter/unsubscribe',
            name: 'Newsletter',
            component: NewsletterUnSubscribePageComponent,
            meta: {
                'title': '__("seo_home_page")'
            }
        }, {
            path: '/settings/notifications/newsletter/unsubscribe',
            name: 'Newsletter_Hack',
            component: NewsletterUnSubscribePageComponent,
            meta: {
                'title': '__("seo_home_page")'
            }
        }, {
            path: '/library',
            name: 'Library_Page',
            component: LibraryPageComponent,
            meta: {
                'store': 'librarypage',
                'title': '__("seo_library_page")'
            }
        }, {
            path: '/work-with-us',
            name: 'Career_Page',
            component: StaticComponent,
            meta: {
                'title': 'Career | __("pratilipi")'
            }
        }, {
            path: '/careers',
            name: 'Career_Page_2',
            component: StaticComponent,
            meta: {
                'title': 'Career | __("pratilipi")'
            }
        }, {
            path: '/about/pratilipi',
            name: 'About_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_about_us") | __("pratilipi")'
            }
        }, {
            path: '/about',
            name: 'About_Page_2',
            component: StaticComponent,
            meta: {
                'title': '__("footer_about_us") | __("pratilipi")'
            }
        }, {
            path: '/terms-of-service',
            name: 'Terms_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_terms_of_service") | __("pratilipi")'
            }
        }, {
            path: '/privacy-policy',
            name: 'Privacy_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_privacy_policy") | __("pratilipi")'
            }
        }, {
            path: '/reset-password',
            name: 'Password_Reset',
            component: PasswordResetPageComponent,
            meta: {
                'title': '__("seo_reset_password_page") | __("pratilipi")'
            }
        }, {
            path: '/forgot-password',
            name: 'Forgot_Password',
            beforeEnter: (to, from, next) => {
                next('login#forgot-pass')
            }
        }, {
            path: '/messages',
            name: 'Messages_Page',
            component: MessagesComponent,
            meta: {
                'title': '__("chat_messages") | __("pratilipi")',
                'store': 'messages'
            }
        }, {
            path: '/messages/:channel_id',
            name: 'MessageUser_Page',
            component: () => {
                return import ('@/pages/MessageUser.vue');
            },
            meta: {
                'title': 'Messages | __("pratilipi")',
                'store': 'messageuser'
            }
        }, {
            path: '/event/:eventSlug/participate',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/event/:eventSlug/participate/:eventPratilipiId/submit',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/event/:eventSlug/participate/:eventPratilipiId/edit',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/event/:eventSlug/participate/:eventPratilipiId',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/submissions',
            meta: {
                'title': '__("seo_home_page")',
                'store': 'admineventsubmissions'
            },
            component: AdminEventSubmissions
        }, {
            path: '/submissions/:eventPratilipiId',
            meta: {
                'title': '__("seo_home_page")',
                'store': 'admineventsubmissions'
            },
            component: AdminEventSubmission
        }, {
            path: '/shayaris',
            name: 'Shayaris',
            component: ShayariPageComponent,
            meta: {
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/chat-story/:chatSlug',
            name: 'ChatStory',
            component: ChatStoryComponent,
            meta: {
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/end-chat-stories',
            name: 'EndChatStory',
            component: EndChatStoryComponent,
            meta: {
                'title': '__("seo_home_page")',
                metaTags: _getDefaultPageOGTags('pratilipipage')
            }
        }, {
            path: '/:list_page_url',
            name: 'List_Page',
            component: () => {
                let bucketId = getCookie('bucket_id') ? getCookie('bucket_id') : 5;
                console.log("bucket id ", bucketId);
                if ((bucketId >= 75 && bucketId <= 86) || getLanguageCode(process.env.LANGUAGE) === 'en') {
                    return import ('@/pages/experiments/home_v2/ListPage.vue');
                } else if (bucketId >= 87 && bucketId <= 99) {
                    return import ('@/pages/experiments/home_v2/ListPageWithoutType.vue');
                } else {
                    return new Promise((resolve, reject) => resolve(ListPageComponent));
                }
            },
            meta: {
                'store': 'listpage',
                'title': '__("seo_navigation_page") | __("pratilipi")',
                'id_prop': 'list_page_url',
                metaTags: _getDefaultPageOGTags('listpage')
            }
        }, {
            path: '*',
            beforeEnter: (to, from, next) => {
                next('/404');
            },
            meta: {
                'title': '__("seo_home_page") | __("pratilipi")'
            }
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');
            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });
            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');
            return tag;
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));
    next();
});
router.afterEach((to, from) => {
    ga('set', 'page', to.path + window.location.search);
    // ga( 'set', 'dimension1', appViewModel.user.userId() == null ? 0 : appViewModel.user.userId() );
    console.log(process.env.GA_WEBSITE + " - " + process.env.GA_WEBSITE_MODE + " - " + process.env.GA_WEBSITE_VERSION + " + " + (to.path + window.location.search));
    ga('set', 'dimension2', process.env.GA_WEBSITE);
    ga('set', 'dimension3', process.env.GA_WEBSITE_MODE);
    ga('set', 'dimension4', process.env.GA_WEBSITE_VERSION);
    ga('send', 'pageview');
});
export default router;
