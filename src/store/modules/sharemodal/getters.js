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
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com/story/${state.share_data.pageUrl.split('-').pop()}?utm_campaign=Shared&utm_source=twitter`);
                console.log(shareUrl);
                return `http://twitter.com/share?text=${state.share_data.title}&url=${shareUrl}`;
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
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=Shared&utm_source=whatsapp`);
                return `https://api.whatsapp.com/send?text=${shareUrl}`
            case 'AUTHOR':
                shareUrl = encodeURIComponent(`https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}?utm_campaign=SharedProfile&utm_source=whatsapp`);
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
