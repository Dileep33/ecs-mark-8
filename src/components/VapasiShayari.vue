<template>
    <div class="shayari-home">
        <router-link :to='"/shayaris"' @click.native="triggerShayariAnanlyticsEvent()">
            <div class="shayari-home-banner">
                <div class="shayari-home-text" >
                    <span>{{shayari}}</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import constants from '@/constants';
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    props: {
        screenName: {
            type: String,
            required: true
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -350
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
    data() {
        return {
            language: constants.LANGUAGES.filter((eachLanguage) => eachLanguage.shortName === process.env.LANGUAGE)[0].fullName.toUpperCase(),
            shayari: "ज़बरदस्त शायरी पढ़िए"
        }
    },
    methods: {
        triggerShayariAnanlyticsEvent() {
            this.triggerAnanlyticsEvent(`CLICK_VAPSISHAYARI_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEW_VAPSISHAYARI_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
            }
        }
    }
}
</script>

<style lang="scss">
.shayari-home {
    padding-top: 10px;
    padding-bottom: 10px;
    .shayari-home-break {
        @media screen and (min-width: 1400px) {
            display: none;
        }
    }
    a, a:hover {
        text-decoration: none;
    }
}

.shayari-home-banner {
    background: #383838;
    color: white;
    display: flex;
    width: 90%;
    height: 100%;
    padding: 3%;
    cursor: pointer;
    display: inline-block;
    @media screen and (min-width: 1400px) {
        padding-left: 500px;
        padding-right: 400px;
        height: 100px;
        padding-top: 13px;
    }
}

.shayari-home-text {
    flex: 2;
    font-size: 22px;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
    span {
        vertical-align: middle;
    }
    i {
        font-size: 26px;
        vertical-align: middle;
        display: block;
        float: right;
        margin: 5px 0 0;
    }
}

.span-image {
    position: absolute;
    right: 18%;
}
</style>
