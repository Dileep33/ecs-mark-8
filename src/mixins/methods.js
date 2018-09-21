import constants from '@/constants';
import controlAnalyticsEvents from '@/static_scripts/analytics_events_control'
import readerV1AnalyticsEvents from '@/static_scripts/experiment_events/reader_v1'
import readerV2AnalyticsEvents from '@/static_scripts/experiment_events/reader_v2'
import recommendationV1AnalyticsEvents from '@/static_scripts/experiment_events/recommendation_v1'
import appLoginV1AnalyticsEvents from '@/static_scripts/experiment_events/applogin_v1'
import ratingStickersV1AnalyticsEvents from '@/static_scripts/experiment_events/rating_stickers_v1'
import readerFooterAnalyticsEvents from '@/static_scripts/experiment_events/reader_footer'
import ratingPanelV1AnalyticsEvents from '@/static_scripts/experiment_events/ratingpanel_v1'
import ratingPanelV2AnalyticsEvents from '@/static_scripts/experiment_events/ratingpanel_v2'
import shareAfterRatingAnalyticsEvents from '@/static_scripts/experiment_events/share_after_rating'

const recommendation_v1 = ['WREC001'];
const applogin_v1 = ['WSU001', 'WSU002'];

let REFERRER_EVENT;
let REFERRER_EXPERIMENTID;
let REFERRER_DATA = {
    REFER_ACTION: 'DIRECT',
    REFER_LOCATION: 'DIRECT',
    REFER_SCREEN: 'DIRECT',
    REFER_EXPID: 'DIRECT'
};

export function translateWord(word, callback) {
    $.ajax({
        url: "https://www.google.com/inputtools/request?ime=transliteration_en_" + process.env.LANGUAGE + "&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi",
        data: {
            text: word
        },
        type: "GET",

        dataType: "json",
    }).done(function(json) {
        callback(json[1][0][1])
    });
}

export function openLoginModal(pageSource, action, location) {

    let experimentId = 'CONTROL';
    if (getCookie('bucket_id') >= 71 && getCookie('bucket_id') < 100) {
        switch (action) {
            case 'LIBRARYADD':
                experimentId = 'WSU001';
                break;
            default:
                experimentId = 'CONTROL';
                break;
        }
    }
    triggerAnanlyticsEvent('LANDED_REGISTERM_GLOBAL', experimentId, {
        REFER_SCREEN: getAnalyticsPageSource(pageSource),
        REFER_ACTION: action,
        REFER_LOCATION: location

    });
    localStorage.setItem('login_modal_refer_details', JSON.stringify({
        REFER_SCREEN: getAnalyticsPageSource(pageSource),
        REFER_ACTION: action,
        REFER_LOCATION: location

    }));
    $('#login_modal').modal('show');
}

export function openPratilipiModal() {
    $('#pratilipi_modal').modal('show');
}

export function getAnalyticsPageSource(pageSource) {
    let analyticsPageSource;
    switch (pageSource) {
        case 'homepage':
            analyticsPageSource = 'HOME';
            break;
        case 'pratilipipage':
            analyticsPageSource = 'BOOK';
            break;
        case 'authorpage':
            analyticsPageSource = 'USER';
            break;
        case 'notification':
            analyticsPageSource = 'NOTIFS';
            break;
        case 'readerpage':
            analyticsPageSource = 'READER';
            break;
        case 'eventspage':
            analyticsPageSource = 'EVENTLIST';
            break;
        case 'eventpage':
            analyticsPageSource = 'EVENT';
            break;
        case 'writepage':
            analyticsPageSource = 'CREATE';
            break;
        case 'librarypage':
            analyticsPageSource = 'LIBRARY';
            break;
        case 'searchpage':
            analyticsPageSource = 'SEARCH';
            break;
        case 'blogspage':
            analyticsPageSource = 'BLOGLIST';
            break;
        case 'blogpage':
            analyticsPageSource = 'BLOG';
            break;
        case 'interviewspage':
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'interviewpage':
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'listpage':
            analyticsPageSource = 'CATEGORY';
            break;
        case 'discover':
            analyticsPageSource = 'DISCOVER';
            break;
        case 'login':
            analyticsPageSource = 'LOGIN';
            break;
        case 'register':
            analyticsPageSource = 'SIGNUP';
            break;
        case 'messages':
            analyticsPageSource = 'MESSAGES';
            break;
    }
    return analyticsPageSource;
}

export function openInputModal() {
    $('#reportModal').modal('show');
}

export function openMultiInputModal() {
    $('#multiinput').modal('show');
}

export function openForgotPasswordModal() {
    $('#forgotPassModal').modal('show');
}

export function openConfirmationModal() {
    $('#confirmation').modal('show');
}

export function openPrimaryConfirmationModal() {
    $('#confirmation-primary').modal('show');
}

export function openWritePratilipiModal() {
    $('#writermodal').modal('show');
}

export function openWebPushModal() {
    $('#webPushModal').modal('show');
}

export function openPratilipiPublishShareModal() {
    $('#pratilipiPublishShareModal').modal('show');
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

export function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

export function getCurrentLanguage() {
    const currentLocale = process.env.LANGUAGE;
    let language;
    constants.LANGUAGES.forEach((eachLanguage) => {
        if (eachLanguage.shortName === currentLocale) {
            language = eachLanguage;
        }
    });
    return language;
}

export function getLowResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=low&type=${type}&width=50`;
    } else {
        return imageUrl + `&quality=low&type=${type}&width=50`;
    }
}

// For Author Image
export function getMediumResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}&width=120`;
    } else {
        return imageUrl + `&quality=high&type=${type}&width=120`;
    }
}

// For Facebook Og Profile Image
export function getOgResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}&width=220`;
    } else {
        return imageUrl + `&quality=high&type=${type}&width=220`;
    }
}

export function getHighResolutionImage(imageUrl) {
    let type;
    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}`;
    } else {
        return imageUrl + `&quality=high&type=${type}`;
    }
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    } else {
        return false;
    }
}

export function validatePassword(password) {
    if (password && password.length >= 6  ){
        return true;
    } else {
        return false;
    }
}

export function validateUsername(name) {
    if (name && name.length > 0) {
        return true;
    } else {
        return false;
    }
}

export function setAnalyticsUserProperty(propertyName, propertyValue) {

    if (process.env.REALM !== 'PROD') {
        const identify = new amplitude.Identify();
        identify.set(propertyName, propertyValue);
        amplitude.getInstance().identify(identify);
    }

    const propertyObject = {};
    propertyObject[propertyName] = String(propertyValue)

    if (propertyName === 'USER_ID' && propertyValue != "0" ) {

        if (process.env.REALM !== 'PROD') {
            amplitude.getInstance().setUserId(propertyValue);
        }
    }

    if (!window.FB) {
        setTimeout(() => {
            if (propertyName === 'USER_ID') {
                try {
                    FB.AppEvents.setUserID(String(propertyValue));
                } catch (e) {}
            }
            if (window.FB && FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
                return;
            }
            try{
                FB.AppEvents.updateUserProperties(propertyObject, function (res, error) {
                    console.log(res);
                });
            } catch (e) {}
        }, 15000);
    } else {
        if (propertyName === 'USER_ID') {
            try {
                FB.AppEvents.setUserID(String(propertyValue));
            } catch (e) {}
        }
        if (FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
            return;
        }

        try {
            FB.AppEvents.updateUserProperties(propertyObject, function (res) {
                console.log("FACEBOOK USER_PROPS: ", res);
            });
        } catch(e) {}
    }

}


export function setReferrerEvent(eventName) {
    REFERRER_EVENT = eventName;
}

export function getReferrerEvent() {
    return REFERRER_EVENT;
}

export function setReferrerExperimentId(experimentId) {
    REFERRER_EXPERIMENTID = experimentId;
}

export function getReferrerExperimentId() {
    return REFERRER_EXPERIMENTID;
}

export function setReferrerData(referrerScreen, referrerLocation, referrerAction, referrerExpId) {
    REFERRER_DATA = {
        REFER_ACTION: referrerAction,
        REFER_LOCATION: referrerLocation,
        REFER_SCREEN: referrerScreen,
        REFER_EXPID: referrerExpId
    }
}

export function getReferrerData() {
    return REFERRER_DATA;
}

export function triggerAnanlyticsEvent(eventName, experimentType, eventProperty) {

    let eventProps;
    switch(true) {
        case (experimentType === 'CONTROL'):
            eventProps = { ...controlAnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WREC001'):
            eventProps = { ...recommendationV1AnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WSU001'):
            eventProps = { ...appLoginV1AnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WRAT001'):
            eventProps = { ...ratingStickersV1AnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WBB001'):
            eventProps = { ...readerFooterAnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WRA001'):
            eventProps = { ...ratingPanelV1AnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WRA002'):
            eventProps = { ...ratingPanelV2AnalyticsEvents[eventName] };
            break;
        case (experimentType === 'WSH001'):
            eventProps = { ...shareAfterRatingAnalyticsEvents[eventName] };
            break;
        default:
            eventProps = { ...controlAnalyticsEvents[eventName] };
            break;
    }

    if (!eventProps.SCREEN_NAME) {
        eventProps.SCREEN_NAME = eventProperty['SCREEN_NAME'];
        delete eventProperty.SCREEN_NAME;
    }

    if (eventName.indexOf('LANDED') > -1) {
        eventProps = {
            ...eventProps,
            ...getReferrerData()
        }
    }

    if (eventProps && eventProps.ACTION) {
        if (eventName !== 'VIEWED_APPBANNER_GLOBAL') {
            setReferrerData(eventProps.SCREEN_NAME, eventProps.LOCATION, eventProps.ACTION, experimentType);
        }

        if (eventProps.ACTION === 'LOGOUT') {
            if (process.env.REALM !== 'PROD') {
                amplitude.getInstance().setUserId(null);
                amplitude.getInstance().regenerateDeviceId();
            }
        }

        eventProps = {
            ...eventProps,
            ...eventProperty,
            'DEVICE_TYPE': isMobile() ? 'MOBILE':'DESKTOP',
            'WEBSITE_TYPE': 'MARK8',
            'EXPERIMENT_ID': experimentType,
            'ENVIRONMENT': process.env.REALM,
            'CONTENT_LANGUAGE': getCurrentLanguage().fullName.toUpperCase(),
            'SCREEN_LOCATION': eventProps.SCREEN_NAME + '_' + eventProps.LOCATION
        }
        console.info(eventName, eventProperty, eventProps);
        if (eventName !== 'VIEWED_APPBANNER_GLOBAL' &&
            eventName !== 'VIEWED_AUTHORDETAIL_BOOK' &&
            eventName !== 'VIEWANDROID_OPENAPP_READER' &&
            eventName !== 'VIEWED_RATEREV_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_READER' &&
            eventName !== 'SENDMESSAGE_USERCHAT_P2PCHAT' &&
            eventName !== 'CLICKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'BLOCKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'UNBLOCKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'DELETECHAT_USERCHAT_P2PCHAT' &&
            eventName !== 'VIEWALLCHATS_USERCHAT_P2PCHAT' &&
            eventName !== 'DELETECHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'UNBLOCKUSER_ALLCHATS_P2PCHAT' &&
            eventName !== 'BLOCKUSER_ALLCHATS_P2PCHAT' &&
            eventName !== 'STARTCHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'DELETECHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'STARTCHAT_NEWCHATS_NOTIFS' &&
            eventName !== 'VIEWALLCHATS_NEWCHATS_NOTIFS') {
                if (process.env.REALM !== 'PROD') {
                    amplitude.getInstance().logEvent(eventName, eventProps);
                }
        } else {
            console.info('SKIPPING EVENT');
        }

        switch (eventName) {
            case 'GOCREATE_HEADER_GLOBAL':
            case 'GOHOME_HEADER_GLOBAL':
            case 'GODISCOVER_HEADER_GLOBAL':
            case 'GOLOGIN_HEADER_GLOBAL':
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'BOTTOMBAR',
                    eventAction: eventProps.ACTION,
                    eventLabel: eventProps.SCREEN_NAME,
                    'dimension7':  eventProps.EXPERIMENT_ID
                });
                break;
            case 'GOLANGUAGE_HEADER_GLOBAL':
            case 'GOHOME_HEADER_GLOBAL':
            case 'LANDED_SEARCHM_SEARCH':
            case 'GONOTIFPAGE_HEADER_GLOBAL':
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'TOPBAR',
                    eventAction: eventProps.ACTION,
                    eventLabel: eventProps.SCREEN_NAME,
                    'dimension7':  eventProps.EXPERIMENT_ID
                });
                break;
            default:
                ga('send', {
                    hitType: 'event',
                    eventCategory: eventProps.LOCATION,
                    eventAction: eventProps.ACTION,
                    eventLabel: eventProps.SCREEN_NAME,
                    'dimension7':  eventProps.EXPERIMENT_ID
                });
        }

        eventProperty['EXPERIMENT_ID'] = eventProps.EXPERIMENT_ID;

        if (!window.fbApiInit) {
            setTimeout(() => {
                try {
                    FB.AppEvents.logEvent(eventName, null, eventProperty)
                } catch (e) {}
            }, 15000);
        } else {
            try {
                FB.AppEvents.logEvent(eventName, null, eventProperty)
            } catch (e) {}
        }

    } else {
        console.info('NON REGISTERED EVENT: ', eventName);
    }
}

export function getPratilipiAnalyticsData(pratilipiData) {
    return {
        'PRATILIPI_TYPE': pratilipiData.type,
        'CONTENT_ID': pratilipiData.pratilipiId,
        'AUTHOR_ID': pratilipiData.author.authorId,
        'CONTENT_LANGUAGE': pratilipiData.language
    }
}

export function getAndroidIntentUri( utmParameters ) {``
    const SCHEME = 'http';
    const PACKAGE_NAME = 'com.pratilipi.mobile.android';
    const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=' + PACKAGE_NAME;
    const UTM_PARAMETER = utmParameters ? encodeURIComponent( Object.keys(utmParameters).map(function(key){ return key + "=" + utmParameters[key] }).join("&") ) : "";
    const uri = window.location.host + window.location.pathname + ( window.location.search || '' );
    return isChrome() ?
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + PLAYSTORE_URL + '&referrer=' + UTM_PARAMETER + ';end' :
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + 'market://search?q=pname:' + PACKAGE_NAME + '&referrer=' + UTM_PARAMETER + ';end' ;
}

export function getCookie( cname ) {
    const name = cname + "=";
    const ca = document.cookie.split( ';' );
    for( let i = 0; i < ca.length; i++ ) {
        let c = ca[i];
        while( c.charAt(0) == ' ' ) c = c.substring( 1 );
        if( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return null;
}

export function getLanguageCode( languageEnv) {
    return languageEnv;
}

export function setCookie( name, value, days, path ) {
    var expires = "";
    if( days ) {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = "expires=" + date.toGMTString() + ";";
    }
    document.cookie = name + "=" + ( value ? value : "" ) + ";" + expires + "path=" + ( path ? path : '/' );
}

export function isCurrentEvent( eventId ) {

    let isItCurrentEvent = false;


    if(!eventId) {
        return isItCurrentEvent;
    }

    if (eventId == 6900000000000079 ||
        eventId == 6900000000000083 ||
        eventId == 6900000000000075 ||
        eventId == 6900000000000074 ||
        eventId == 6900000000000077 ||
        eventId == 6900000000000084 ||
        eventId == 6900000000000110 ||
        eventId == 6900000000000078) {
        isItCurrentEvent = true;
    }
    //
    // constants.CATEGORY_DATA.sections.forEach((eachSection) => {
    //     eachSection.categories.forEach((eachCategory) => {
    //         if (eachCategory && eachCategory.pratilipiListData && eachCategory.pratilipiListData.eventId == eventId) {
    //             isItCurrentEvent = true;
    //         }
    //     });
    // });

    return isItCurrentEvent;
}

export function validateFirstAndSecondPassword(firstPassword, secondPassword) {

    if(firstPassword == secondPassword)
    {
        return true;
    } else {
        return false
    }
}

export function isTestEnvironment() {
    return (!window.location.host.endsWith('.pratilipi.com')) || window.location.host.split('.')[0].includes('-gamma')
}
