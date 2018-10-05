import {
    getCookie
} from '@/mixins/methods'

export default {
    getShareDetails: state => state.share_data,
    getShareType: state => state.share_type,

    getFacebookShareUrl: (state) => {
        let shareUrl;
        switch(state.share_type) {
            case 'PRATILIPI':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=Shared&utm_source=facebook`);
                return `https://www.facebook.com/dialog/share?app_id=${process.env.FACEBOOK_APP_ID}&display=popup&href=${shareUrl}&redirect_uri=${shareUrl}&p[title]=${state.share_data.title}`;
                break;
            case 'AUTHOR':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=SharedProfile&utm_source=facebook`)
                return `https://www.facebook.com/dialog/share?app_id=${process.env.FACEBOOK_APP_ID}&display=popup&href=${shareUrl}&redirect_uri=${shareUrl}&p[title]=${state.share_data.displayName}`;
                break;
        }
    },
    getTwitterUrl: (state) => {
        let shareUrl;
        switch(state.share_type) {
            case 'PRATILIPI':
                let share_text = state.share_data.title
                let shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=twitter`);
                if (getCookie('bucket_id') > 70 && getCookie('bucket_id') <= 85) {
                    share_text = '__("share_ui_title_3")- ' + state.share_data.title
                    shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=twitter&utm_medium=WSH002`);
                }
                else if (getCookie('bucket_id') > 85 && getCookie('bucket_id') <= 99) {
                    share_text = '__("share_ui_title_4_1")' + state.share_data.title + '__("share_ui_title_4_2")'
                    shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=twitter&utm_medium=WSH003`);
                }
                console.log(shareUrl);
                return `http://twitter.com/share?text=${share_text}&url=${shareUrl}`;
            case 'AUTHOR':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/user/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=SharedProfile&utm_source=twitter`)
                return `http://twitter.com/share?text=${state.share_data.title}&url=${shareUrl}`;
        }
    },

    getGooglePlusUrl: (state) => {
        let shareUrl;
        switch(state.share_type) {
            case 'PRATILIPI':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=Shared&utm_source=googlep`);
                return `https://plus.google.com/share?url=${shareUrl}`;
            case 'AUTHOR':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=SharedProfile&utm_source=googlep`)
                return `https://plus.google.com/share?url=${shareUrl}`;
        }
    },

    getWhatsAppUri: (state) => {
        let shareUrl;
        switch(state.share_type) {
            case 'PRATILIPI':
                let share_text = state.share_data.title
                let shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=whatsapp`);
                if (getCookie('bucket_id') > 70 && getCookie('bucket_id') <= 85) {
                    share_text = '__("share_ui_title_3")- ' + state.share_data.title
                    shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=whatsapp&utm_medium=WSH002`);
                }
                else if (getCookie('bucket_id') > 85 && getCookie('bucket_id') <= 99) {
                    share_text = '__("share_ui_title_4_1")' + state.share_data.title + '__("share_ui_title_4_2")'
                    shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=whatsapp&utm_medium=WSH003`);
                }
                return `https://api.whatsapp.com/send?text=${share_text} ${shareUrl}`
            case 'AUTHOR':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/user/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=SharedProfile&utm_source=whatsapp`);
                return `https://api.whatsapp.com/send?text=${shareUrl}`
        }
    },

    getContentUri: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                return `https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`;
            case 'AUTHOR':
                return `https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`;
        }
    },

    getScreenDetails: (state) => {
        return {
            screen_location: state.screen_location,
            screen_name: state.screen_name
        }
    },

    getPratilipiData: (state) => {
        if (state.share_type === 'PRATILIPI') {
            return state.share_data;
        } else {
            return false
        }
    }

}
