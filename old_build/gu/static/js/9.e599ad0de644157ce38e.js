webpackJsonp([9],{"8zsw":function(t,a){},EkuZ:function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0});var e=n(i("Dd8w")),s=i("NYxO"),r=n(i("Bme2")),l=n(i("Hqy0")),o=n(i("msXN"));function n(t){return t&&t.__esModule?t:{default:t}}a.default={name:"About-Author",props:{authorId:{type:Number,required:!0},"in-viewport-once":{default:!0},"in-viewport-offset-top":{default:-56},pratilipiData:{type:Object,required:!0}},mixins:[o.default,r.default],data:function(){return{showShowMoreOfSummary:!1}},computed:(0,e.default)({},(0,s.mapGetters)(["getUserDetails"]),(0,s.mapGetters)("pratilipipage",["getAuthorDetails","getAuthorDetailsLoadingState","getRouteToMessageUserState"])),methods:(0,e.default)({},(0,s.mapActions)("pratilipipage",["fetchAuthorDetails","followOrUnfollowAuthor","triggerRouteToMessageUser"]),(0,s.mapActions)(["setAfterLoginAction"]),{detectOverflow:function(){var a=t(".auth-desc.show-more-height"),i=a.prop("offsetHeight"),e=a.prop("scrollHeight");this.showShowMoreOfSummary=i<e},checkUserAndFollowAuthor:function(){var t=this.getPratilipiAnalyticsData(this.pratilipiData),a=this.getAuthorDetails.following?"UNFOLLOW":"FOLLOW";this.triggerAnanlyticsEvent(a+"_AUTHORDETAIL_BOOK","CONTROL",(0,e.default)({},t,{USER_ID:this.getUserDetails.userId,ENTITY_VALUE:this.getAuthorDetails.followCount,AUTHOR_ID:this.getAuthorDetails.authorId})),this.getUserDetails.isGuest?(this.setAfterLoginAction({action:this.$route.meta.store+"/followOrUnfollowAuthor"}),this.openLoginModal(this.$route.meta.store,"FOLLOW","AUTHORDETAILS")):this.followOrUnfollowAuthor()},triggerClickAuthorEvent:function(){var t=this.getPratilipiAnalyticsData(this.pratilipiData);this.triggerAnanlyticsEvent("CLICKUSER_AUTHORDETAIL_BOOK","CONTROL",(0,e.default)({},t,{USER_ID:this.getUserDetails.userId,PARENT_ID:this.getAuthorDetails.user.userId,AUTHOR_ID:this.getAuthorDetails.authorId}))}}),components:{MessageButton:l.default},watch:{getAuthorDetailsLoadingState:function(t){if("LOADING_SUCCESS"===t){var a=this;setTimeout(function(){a.detectOverflow()},0)}},"inViewport.now":function(t){if(t){var a=this.getPratilipiAnalyticsData(this.pratilipiData);this.triggerAnanlyticsEvent("VIEWED_AUTHORDETAIL_BOOK","CONTROL",(0,e.default)({},a,{USER_ID:this.getUserDetails.userId}))}}},created:function(){this.fetchAuthorDetails(this.authorId)}}}).call(a,i("7t+N"))},PemZ:function(t,a,i){"use strict";var e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("MainLayout",[i("div",{staticClass:"pratilipi-page page-wrap"},[i("div",{staticClass:"container"},["LOADING_SUCCESS"===t.getPratilipiLoadingState?i("div",{staticClass:"row"},[i("div",{staticClass:"book-details col-md-12 col-lg-5 p-0"},[i("div",{staticClass:"card"},[i("div",{staticClass:"book-image",style:{backgroundImage:"url("+t.getPratilipiData.coverImageUrl+")"}},[t.getPratilipiData.hasAccessToUpdate?i("button",{staticClass:"update-img",on:{click:function(a){t.uploadImage("pratilipi-image")}}},[i("i",{staticClass:"material-icons"},[t._v("camera_alt")])]):t._e(),t._v(" "),i("input",{attrs:{type:"file",hidden:"",name:"pratilipiimage",accept:"image/*",id:"pratilipiimage-uploader"},on:{change:function(a){t.triggerPratilipiImageUpload(a)}}}),t._v(" "),"LOADING"===t.getImageUploadLoadingState?i("div",{staticClass:"uploading"},[i("Spinner")],1):t._e()]),t._v(" "),i("div",{staticClass:"book-title"},[t._v(t._s(t.getPratilipiData.title)+" "),t.getPratilipiData.hasAccessToUpdate?i("button",{staticClass:"edit",on:{click:t.editPratilipiTitle}},[i("i",{staticClass:"material-icons"},[t._v("mode_edit")])]):t._e()]),t._v(" "),i("router-link",{staticClass:"author-name",attrs:{to:t.getPratilipiData.author.pageUrl},nativeOn:{click:function(a){return t.triggerClickAuthorNameEvent(a)}}},[i("span",[t._v(t._s(t.getPratilipiData.author.name))])]),t._v(" "),t.getAuthorDetails.user&&t.getAuthorDetails.user.userId&&t.getUserDetails.userId!==t.getAuthorDetails.user.userId?i("MessageButton",{attrs:{authorId:t.getAuthorDetails.authorId,getRouteToMessageUserState:t.getRouteToMessageUserState,triggerRouteToMessageUser:t.triggerRouteToMessageUser,authorUserId:t.getAuthorDetails.user.userId,profileImageUrl:t.getAuthorDetails.profileImageUrl,fullName:t.getAuthorDetails.fullName,pageUrl:t.getAuthorDetails.pageUrl,className:"message-icon",hideText:!0,screenName:"BOOK",locationName:"BOOKM"}}):t._e(),t._v(" "),i("div",{staticClass:"book-stats"},[i("span",{staticClass:"avg-rating stars-green"},[i("span",{staticClass:"rating-text"},[t._v(t._s(t._f("round")(t.getPratilipiData.averageRating,1)))]),t._v(" "),i("i",{staticClass:"material-icons"},[t._v("star_rate")])]),t._v(" "),i("span",{staticClass:"review-count"},[t._v(t._s(t.getPratilipiData.ratingCount)+" રેટિંગ")])]),t._v(" "),i("div",{staticClass:"book-stats"},[i("span",{staticClass:"read-time"},[t._v("વાંચન સમય: "+t._s(t._f("showInMinutesOrHours")(t.getPratilipiData.readingTime)))])]),t._v(" "),i("div",{staticClass:"book-stats"},[i("span",{staticClass:"read-count"},[t._v("વાચક સંખ્યા: "+t._s(t.getPratilipiData.readCount))]),t._v(" "),i("span",{staticClass:"date"},[t._v("પ્રકાશનની તારીખ: "+t._s(t._f("convertDate")(t.getPratilipiData.listingDateMillis)))])]),t._v(" "),"LOADING_SUCCESS"===t.getUserPratilipiLoadingState?i("div",{staticClass:"main-actions"},[t.getPratilipiData.hasAccessToUpdate?i("div",{staticClass:"book-edit-actions"},["PUBLISHED"===t.getPratilipiData.state?i("span",[i("button",{on:{click:function(a){t.askConfirmationAndUnpublishOrPublishBook({bookState:"DRAFTED"})}}},[t._v("અપ્રકાશિત કરો")])]):t._e(),t._v(" "),i("span",[t.isMobile()?i("button",{on:{click:t.showAlertToGoToDesktop}},[i("i",{staticClass:"material-icons"},[t._v("mode_edit")]),t._v(" રચનામાં સુધારો કરો")]):i("a",{attrs:{href:t.getPratilipiData.writePageUrl},on:{click:t.triggerEditBookEvent}},[i("button",[i("i",{staticClass:"material-icons"},[t._v("mode_edit")]),t._v(" રચનામાં સુધારો કરો")])])]),t._v(" "),"DRAFTED"===t.getPratilipiData.state?i("span",[i("button",{on:{click:function(a){t.triggerEventAndUnpublishOrPublishBook({bookState:"PUBLISHED"})}}},[t._v("પ્રકાશિત કરો")]),t._v(" "),i("button",{on:{click:t.confirmAndDeletePratilipi}},[i("i",{staticClass:"material-icons"},[t._v("delete")]),t._v(" રદ કરો")])]):t._e()]):t._e(),t._v(" "),t.getPratilipiData.hasAccessToUpdate?t._e():i("span",[t.getUserPratilipiData.addedToLib?t._e():i("button",{staticClass:"library-btn",on:{click:function(a){t.addPratilipiToLibrary(t.getPratilipiData.pratilipiId)}}},[i("span",[i("i",{staticClass:"material-icons"},[t._v("bookmark_border")]),t._v(" "),i("i",{staticClass:"material-icons stacked white"},[t._v("add")])]),t._v("\n                                    લાઈબ્રેરી\n                                ")]),t._v(" "),t.getUserPratilipiData.addedToLib?i("button",{staticClass:"library-btn",on:{click:function(a){t.removeFromLibraryAndTriggerAnalytics(t.getPratilipiData.pratilipiId)}}},[i("span",[i("i",{staticClass:"material-icons added-to-lib"},[t._v("bookmark")]),t._v(" "),i("i",{staticClass:"material-icons stacked grey"},[t._v("check")])]),t._v("\n                                    લાઈબ્રેરી\n                                ")]):t._e()]),t._v(" "),t.getPratilipiData.hasAccessToUpdate&&"DRAFTED"===t.getPratilipiData.state?i("router-link",{staticClass:"read-btn",attrs:{to:t.getPratilipiData.readPageUrl}},[i("span",[t._v("પ્રિવ્યુ")])]):i("router-link",{staticClass:"read-btn",attrs:{to:t.getPratilipiData.readPageUrl},nativeOn:{click:function(a){return t.logReadEvent(a)}}},[i("span",[t._v("વાંચો")])])],1):t._e(),t._v(" "),i("BookShareStrip",{attrs:{data:t.getPratilipiData,type:"PRATILIPI"}})],1),t._v(" "),t.getPratilipiData.hasAccessToUpdate?i("BookTags",{attrs:{selectedPratilipiType:t.selectedPratilipiType,isTagSelected:t.isTagSelected,selectedTags:t.selectedTags,pratilipiData:t.getPratilipiData,changePratilipiType:t.changePratilipiType,getSystemTags:t.getSystemTags,addOrRemoveFromListOfSelectedTag:t.addOrRemoveFromListOfSelectedTag,suggestedTags:t.suggestedTags,removeSuggestedTag:t.removeSuggestedTag,newSuggestedTag:t.newSuggestedTag,updateNewSuggestedTag:t.updateNewSuggestedTag,addToSuggestedTag:t.addToSuggestedTag,saveTypeAndCategories:t.saveTypeAndCategories,fetchSystemTags:t.fetchSystemTags}}):t._e()],1),t._v(" "),i("div",{staticClass:"book-synopsis col-md-12 col-lg-7 p-0"},[i("div",{staticClass:"card"},[t.getPratilipiData.summary.trim()||"DRAFTED"===t.getPratilipiData.state||t.getPratilipiData.hasAccessToUpdate?i("div",[i("div",{staticClass:"head-title"},[t._v("સારાંશ \n                                "),t.getPratilipiData.hasAccessToUpdate?i("button",{staticClass:"edit",on:{click:t.editPratilipiSummary}},[i("i",{staticClass:"material-icons"},[t._v("mode_edit")])]):t._e()]),t._v(" "),i("p",{staticClass:"text show-more-height"},[t._v(t._s(t.getPratilipiData.summary))]),t._v(" "),t.showShowMoreOfSummary?i("button",{staticClass:"show_more",attrs:{type:"button",name:"button","data-toggle":"modal","data-target":"#book_summary_modal"}},[t._v("વધુ જુઓ")]):t._e()]):t._e(),t._v(" "),i("div",{staticClass:"modal fade summary-modal",attrs:{id:"book_summary_modal",tabindex:"-1",role:"dialog","aria-labelledby":"summary-modalLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"modal-header"},[i("h5",{staticClass:"modal-title"},[t._v("સારાંશ")]),t._v(" "),i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),i("div",{staticClass:"modal-body social"},[i("p",[t._v(t._s(t.getPratilipiData.summary))])])])])]),t._v(" "),i("AboutAuthor",{attrs:{authorId:t.getPratilipiData.author.authorId,pratilipiData:t.getPratilipiData}})],1),t._v(" "),i("div",{staticClass:"card"},[i("div",{staticClass:"head-title"},[t._v("ટિપ્પણીઓ")]),t._v(" "),"LOADING_SUCCESS"===t.getPratilipiLoadingState?i("Reviews",{attrs:{pratilipiId:t.getPratilipiData.pratilipiId,authorId:t.getPratilipiData.author.authorId,userPratilipiData:t.getUserPratilipiData,haveInfiniteScroll:!1,screenName:"BOOK",screenLocation:"RATEREV",pratilipiData:t.getPratilipiData}}):t._e(),t._v(" "),i("button",{staticClass:"load_more",attrs:{type:"button",name:"button"},on:{click:t.openReviewModal}},[t._v("વધુ જુઓ")]),t._v(" "),"LOADING_SUCCESS"===t.getPratilipiLoadingState?i("div",{staticClass:"review-popout"},[i("button",{staticClass:"close-review",attrs:{type:"button",name:"button"},on:{click:t.closeReviewModal}},[i("i",{staticClass:"material-icons"},[t._v("close")])]),t._v(" "),i("Reviews",{attrs:{pratilipiId:t.getPratilipiData.pratilipiId,authorId:t.getPratilipiData.author.authorId,haveInfiniteScroll:!0,screenName:"BOOK",screenLocation:"RATEREV",pratilipiData:t.getPratilipiData,userPratilipiData:t.getUserPratilipiData}})],1):t._e(),t._v(" "),i("div",{staticClass:"overlay-1",on:{click:t.closeReviewModal}})],1)]),t._v(" "),i("div",{staticClass:"book-recomendations col-md-12 p-0"},[i("div",{staticClass:"card"},[t.getPratilipiData&&t.getPratilipiData.pratilipiId?i("Recommendation",{attrs:{contextId:t.getPratilipiData.pratilipiId,context:"summaryPage",screenName:"BOOK",screenLocation:"RECOMMENDBOOK"}}):t._e()],1)])]):t._e(),t._v(" "),"LOADING"===t.getPratilipiLoadingState?i("Spinner"):t._e(),t._v(" "),"LOADING_ERROR"===t.getPratilipiLoadingState?i("ServerError",{attrs:{action:"pratilipipage/fetchPratilipiDetailsAndUserPratilipiData",data:t.$route.params.slug_id}}):t._e()],1),t._v(" "),i("ChatBanner")],1)])},staticRenderFns:[]};a.a=e},Xlxn:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i("uT9s"),s=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(a,t,function(){return e[t]})}(r);var l=i("PemZ");var o=function(t){i("8zsw")},n=i("VU/8")(s.a,l.a,!1,o,"data-v-2b515122",null);a.default=n.exports},ZOLx:function(t,a,i){"use strict";var e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"about-author"},[t.getAuthorDetails.pageUrl?i("div",{staticClass:"wrap"},[i("div",{staticClass:"head-title"},[t._v("લેખક વિશે")]),t._v(" "),i("router-link",{staticClass:"author-link",attrs:{to:t.getAuthorDetails.pageUrl},nativeOn:{click:function(a){return t.triggerClickAuthorEvent(a)}}},[i("img",{staticClass:"auth-img",attrs:{src:t.getLowResolutionImage(t.getAuthorDetails.profileImageUrl),alt:"author"}}),t._v(" "),i("div",{staticClass:"auth-name"},[t._v(t._s(t.getAuthorDetails.name))])]),t._v(" "),i("div",{staticClass:"author-actions"},[t.getAuthorDetails.following||t.getUserDetails.authorId===t.getAuthorDetails.authorId?t._e():i("button",{staticClass:"btn btn-light follow-link",on:{click:t.checkUserAndFollowAuthor}},[i("i",{staticClass:"material-icons"},[t._v("person_add")]),t._v(" ફોલો "),i("span",{staticClass:"follow-count"},[t._v("("+t._s(t._f("showThousandsInK")(t.getAuthorDetails.followCount,1))+")")])]),t._v(" "),t.getAuthorDetails.following&&t.getUserDetails.authorId!==t.getAuthorDetails.authorId?i("button",{staticClass:"btn btn-light follow-link following",on:{click:t.checkUserAndFollowAuthor}},[t._v("અનફોલો")]):t._e(),t._v(" "),t.getAuthorDetails.user&&t.getAuthorDetails.user.userId&&t.getUserDetails.userId!==t.getAuthorDetails.user.userId?i("MessageButton",{attrs:{authorId:t.getAuthorDetails.authorId,getRouteToMessageUserState:t.getRouteToMessageUserState,triggerRouteToMessageUser:t.triggerRouteToMessageUser,authorUserId:t.getAuthorDetails.user.userId,profileImageUrl:t.getAuthorDetails.profileImageUrl,fullName:t.getAuthorDetails.fullName,pageUrl:t.getAuthorDetails.pageUrl,screenName:"BOOK",locationName:"AUTHORDETAIL",experimentId:"WGEN021"}}):t._e()],1),t._v(" "),i("p",{staticClass:"auth-desc show-more-height"},[t._v(t._s(t.getAuthorDetails.summary))]),t._v(" "),t.showShowMoreOfSummary?i("button",{staticClass:"show_more_auth_desc",attrs:{type:"button",name:"button","data-toggle":"modal","data-target":"#auth_summary_modal"}},[t._v("વધુ જુઓ")]):t._e(),t._v(" "),i("div",{staticClass:"modal fade summary-modal",attrs:{id:"auth_summary_modal",tabindex:"-1",role:"dialog","aria-labelledby":"summary-modalLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[i("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),i("div",{staticClass:"modal-body social"},[i("p",[t._v(t._s(t.getAuthorDetails.summary))])])])])])],1):t._e()])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title"},[this._v("સારાંશ")]),this._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]};a.a=e},uT9s:function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0});var e=v(i("Gu7T")),s=v(i("Dd8w")),r=v(i("FwFf")),l=v(i("hMKZ")),o=v(i("upBT")),n=v(i("+jyM")),g=v(i("hr/h")),d=v(i("Xl+Z")),u=v(i("JvtL")),c=v(i("Uu6k")),p=v(i("TzjB")),h=v(i("Hqy0")),D=v(i("msXN")),_=(v(i("qI5z")),i("NYxO"));function v(t){return t&&t.__esModule?t:{default:t}}a.default={name:"Pratilipi",data:function(){return{pratilipi_id:null,pratilipiData:null,newReview:null,selectedPratilipiType:null,selectedTags:[],suggestedTags:[],newSuggestedTag:"",showShowMoreOfSummary:!1,hasLandedBeenTriggered:!1}},mixins:[D.default],computed:(0,s.default)({},(0,_.mapGetters)("pratilipipage",["getPratilipiData","getUserPratilipiData","getPratilipiLoadingState","getUserPratilipiLoadingState","getImageUploadLoadingState","getSystemTags","getSystemTagsLoadingState","getAuthorDetails","getRouteToMessageUserState"]),(0,_.mapGetters)(["getUserDetails"])),methods:(0,s.default)({},(0,_.mapActions)("pratilipipage",["fetchPratilipiDetailsAndUserPratilipiData","fetchUserPratilipiData","addToLibrary","removeFromLibrary","uploadPratilipiImage","fetchSystemTags","unpublishOrPublishBook","removeTagsFromPratilipi","addTagsToPratilipi","saveTypeAndCategories","triggerRouteToMessageUser"]),(0,_.mapActions)(["setShareDetails","setAfterLoginAction","setInputModalSaveAction","setConfirmModalAction"]),(0,_.mapActions)("alert",["triggerAlert"]),{logReadEvent:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("READBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId}))},showAlertToGoToDesktop:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("EDITBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId})),this.triggerAlert({message:"પ્રતિલિપિ પર રચનાઓ લખવા માટે એન્ડ્રોઇડ એપ્લિકેશનથી લોગ-ઈન કરો.",timer:3e3})},triggerEditBookEvent:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("EDITBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId}))},triggerEventAndUnpublishOrPublishBook:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("PUBLISHBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId})),this.unpublishOrPublishBook({bookState:"PUBLISHED"})},editPratilipiSummary:function(){this.setInputModalSaveAction({action:this.$route.meta.store+"/saveOrUpdateSummary",heading:"edit_pratilipi_summary",prefilled_value:this.getPratilipiData.summary,initial_value:this.getPratilipiData.summary,pratilipi_data:this.getPratilipiData,data:{pratilipiId:this.getPratilipiData.pratilipiId}}),this.openInputModal()},changePratilipiType:function(t){this.selectedPratilipiType=t.target.value},isTagSelected:function(t){var a=!1;return this.selectedTags.forEach(function(i){i.id===t&&(a=!0)}),a},addToSuggestedTag:function(){if(this.newSuggestedTag&&this.newSuggestedTag.trim().length>0){this.suggestedTags.push(this.newSuggestedTag);var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("ADDTAG_CATTAG_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId,PARENT_ID:this.newSuggestedTag})),this.newSuggestedTag=""}},updateNewSuggestedTag:function(t){this.newSuggestedTag=t},removeSuggestedTag:function(t){var a=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("REMOVETAG_CATTAG_BOOK","CONTROL",(0,s.default)({},a,{USER_ID:this.getUserDetails.userId,PARENT_ID:this.suggestedTags[t]})),this.suggestedTags.splice(t,1)},addOrRemoveFromListOfSelectedTag:function(t,a){if(3!==this.selectedTags.length||a)if(a){var i=this.selectedTags,e=null;i.forEach(function(a,i){a.id===t.id&&(e=i)}),null!=e&&i.splice(e,1);var r=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("REMOVECATEGORY_CATTAG_BOOK","CONTROL",(0,s.default)({},r,{USER_ID:this.getUserDetails.userId,PARENT_ID:t.id}))}else{var l=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("ADDCATEGORY_CATTAG_BOOK","CONTROL",(0,s.default)({},l,{USER_ID:this.getUserDetails.userId,PARENT_ID:t.id})),this.selectedTags.push(t)}else this.triggerAlert({message:"આપ માત્ર ૩ શ્રેણીઓ જોડી શકો છો",timer:3e3})},editPratilipiTitle:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("EDITTITLE_BOOKTITLE_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId})),this.setInputModalSaveAction({action:this.$route.meta.store+"/saveOrUpdateTitle",heading:"edit_pratilipi_title",prefilled_value:this.getPratilipiData.title,prefilled_value_title:this.getPratilipiData.titleEn,data:{pratilipiId:this.getPratilipiData.pratilipiId}}),this.openMultiInputModal()},confirmAndDeletePratilipi:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("DELETEBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId})),this.setConfirmModalAction({action:this.$route.meta.store+"/deletePratilipi",heading:"pratilipi_delete_content",message:"pratilipi_confirm_delete_content",data:{pratilipiId:this.getPratilipiData.pratilipiId}}),this.openConfirmationModal()},askConfirmationAndUnpublishOrPublishBook:function(t){var a=t.bookState,i=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("UNPUBLISHBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},i,{USER_ID:this.getUserDetails.userId})),this.setConfirmModalAction({action:this.$route.meta.store+"/unpublishOrPublishBook",heading:"pratilipi_delete_content",message:"pratilipi_confirm_delete_content",data:{pratilipiId:this.getPratilipiData.pratilipiId,bookState:a}}),this.openConfirmationModal()},addPratilipiToLibrary:function(t){var a=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("LIBRARYADD_BOOKM_BOOK","CONTROL",(0,s.default)({},a,{USER_ID:this.getUserDetails.userId})),this.getUserDetails.isGuest?(this.setAfterLoginAction({action:this.$route.meta.store+"/addToLibrary",data:t}),this.openLoginModal(this.$route.meta.store,"LIBRARYADD","BOOKM")):this.addToLibrary(t)},removeFromLibraryAndTriggerAnalytics:function(t){var a=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("LIBRARYREMOVE_BOOKM_BOOK","CONTROL",(0,s.default)({},a,{USER_ID:this.getUserDetails.userId})),this.removeFromLibrary(t)},openShareModal:function(){var a=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("CLICKSHRBOOK_BOOKM_BOOK","CONTROL",(0,s.default)({},a,{USER_ID:this.getUserDetails.userId})),this.setShareDetails({data:this.getPratilipiData,type:"PRATILIPI",screen_name:"BOOK",screen_location:"BOOKM"}),t("#share_modal").modal("show")},uploadImage:function(a){switch(a){case"pratilipi-image":if(t("#pratilipiimage-uploader").click(),this.getPratilipiData.coverImageUrl.endsWith("/pratilipi/cover")){var i=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("NEWBOOKINFO_BOOKCOVER_BOOK","CONTROL",(0,s.default)({},i,{USER_ID:this.getUserDetails.userId}))}else{var e=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("UPDATEBOOKINFO_BOOKCOVER_BOOK","CONTROL",(0,s.default)({},e,{USER_ID:this.getUserDetails.userId}))}}},triggerPratilipiImageUpload:function(t){var a=new FormData;a.append("ko_unique_6",t.target.files[0],t.target.files[0].name),this.uploadPratilipiImage(a)},triggerClickAuthorNameEvent:function(){var t=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("CLICKUSER_BOOKM_BOOK","CONTROL",(0,s.default)({},t,{USER_ID:this.getUserDetails.userId,PARENT_ID:this.getAuthorDetails.user.userId,AUTHOR_ID:this.getPratilipiData.author.authorId}))},openReviewModal:function(){t(".review-popout").addClass("show"),t(".overlay-1").fadeIn(),t(".rating-popout").removeClass("show"),t("body").addClass("modal-open")},closeReviewModal:function(){t(".review-popout").removeClass("show"),t(".overlay-1").fadeOut(),t("body").removeClass("modal-open")},detectOverflow:function(){var a=t(".show-more-height"),i=a.prop("offsetHeight"),e=a.prop("scrollHeight");this.showShowMoreOfSummary=i<e}}),created:function(){var t=this.$route.params.slug_id;this.$route.params.pratilipiData;this.selectedPratilipiType=this.getPratilipiData.type,this.selectedTags=this.getPratilipiData.tags?[].concat((0,e.default)(this.getPratilipiData.tags)):[],this.suggestedTags=this.getPratilipiData.suggestedTags,document.title=this.getPratilipiData.title,this.fetchPratilipiDetailsAndUserPratilipiData(t)},components:{MainLayout:r.default,Recommendation:l.default,AboutAuthor:o.default,Spinner:n.default,BookTags:c.default,Reviews:g.default,ServerError:u.default,BookShareStrip:d.default,ChatBanner:p.default,MessageButton:h.default},watch:{"$route.params.slug_id":function(t){this.fetchPratilipiDetailsAndUserPratilipiData(t)},"getPratilipiData.state":function(t){"DELETED"===t&&this.$router.push(this.getUserDetails.profilePageUrl)},"getPratilipiData.pratilipiId":function(t){this.selectedPratilipiType=this.getPratilipiData.type,this.selectedTags=this.getPratilipiData.tags?[].concat((0,e.default)(this.getPratilipiData.tags)):[],this.suggestedTags=this.getPratilipiData.suggestedTags,document.title=this.getPratilipiData.title},getPratilipiLoadingState:function(t){if("LOADING_SUCCESS"===t&&!this.hasLandedBeenTriggered){var a=this.getPratilipiAnalyticsData(this.getPratilipiData);this.triggerAnanlyticsEvent("LANDED_BOOKM_BOOK","CONTROL",(0,s.default)({},a,{USER_ID:this.getUserDetails.userId})),this.hasLandedBeenTriggered=!0;var i=this;setTimeout(function(){i.detectOverflow()},0)}},"getUserDetails.userId":function(){this.fetchPratilipiDetailsAndUserPratilipiData(this.$route.params.slug_id)},selectedPratilipiType:function(t){t===this.getPratilipiData.type?this.selectedTags=this.getPratilipiData.tags?[].concat((0,e.default)(this.getPratilipiData.tags)):[]:this.selectedTags=[]}}}}).call(a,i("7t+N"))},upBT:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i("EkuZ"),s=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(a,t,function(){return e[t]})}(r);var l=i("ZOLx");var o=function(t){i("xIKt")},n=i("VU/8")(s.a,l.a,!1,o,"data-v-07d090ad",null);a.default=n.exports},xIKt:function(t,a){}});
//# sourceMappingURL=9.e599ad0de644157ce38e.js.map