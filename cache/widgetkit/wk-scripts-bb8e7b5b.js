angular.module("Fields",[]).directive("fieldMedia",["mediaPicker","mediaInfo",function(e,t){function i(i){var a=this;a.selectMedia=function(){e.select().then(function(e){i.media=e.url,i.height=e.height,i.width=e.width,i.title||(i.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}))})},a.selectPoster=function(){e.select().then(function(e){i.options||(i.options={}),i.options.poster=e.url})},a.isVideo=function(e){return!(!e||!(e.match(/\.(mp4|ogv|webm)$/)||e.match(/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i)||e.match(/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i)||e.match(/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i)))},i.$watch("media",function(){return(!i.options||angular.isArray(i.options))&&(i.options={}),n[i.media]?(i.options.width=n[i.media].width,void(i.options.height=n[i.media].height)):void t(i.media,!0).then(function(e){i.height="",i.width="",e.type&&(i.options.width=e.width,i.options.height=e.height,n[i.media]=e)})},!0)}var n={};return{scope:{media:"=",options:"=?",title:"=?"},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                              <div class="uk-flex">                                  <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                    <i class="uk-icon-photo"></i><input class="uk-width-1-1" ng-model="media">                                  </div>                                  <button class="uk-button" ng-click="vm.selectMedia()">Select</button>                              </div>                              <div class="uk-grid uk-margin-top">                                  <div class="uk-width-small-1-2">                                        <media-preview src="{{ media }}"></media-preview>                                  </div>                                  <div class="uk-width-small-1-2" ng-show="vm.isVideo(media)">                                    <div class="uk-margin-small-bottom" ng-show="options.poster"><media-preview src="{{ options.poster }}"></media-preview></div>                                    <a ng-click="vm.selectPoster()">Select Poster</button>                                    <a class="uk-margin-small-left" ng-show="options.poster" ng-click="(options.poster = \'\')">Reset</a>                                  </div>                              </div>                           </div>'}}]).directive("fieldLocation",["$timeout","$q",function(e,t){var i=0,n=function(){var e,i=function(){if(!e){e=t.defer();var i=document.createElement("script");i.async=!0,i.onload=function(){google.load("maps","3",{other_params:"sensor=false&libraries=places",callback:function(){google&&google.maps.places&&e.resolve()}})},i.onerror=function(){alert("Failed loading google maps api.")},i.src="https://www.google.com/jsapi",document.getElementsByTagName("head")[0].appendChild(i)}return e.promise};return i}();return{restrict:"EA",require:"?ngModel",scope:{latlng:"@"},replace:!0,template:'<div>                                <div class="uk-form uk-form-icon uk-margin-small-bottom uk-width-1-1">                                    <i class="uk-icon-search"></i><input class="uk-width-1-1">                                </div>                                <div class="js-map" style="min-height:300px;">                                 Loading map...                                 </div>                                 <div class="uk-text-small uk-margin-small-top">LAT: <span class="uk-text-muted">{{ latlng.lat }}</span> LNG: <span class="uk-text-muted">{{ latlng.lng }}</span></div>                            </div>',link:function(t,a,o,l){function s(e){l.$setViewValue(e),t.latlng=e,t.$root.$$phase||t.$apply()}n().then(function(){e(function(){var e,n,o,r,c="wk-location-"+ ++i,u=new google.maps.LatLng(53.55909862554551,9.998652343749995);t.latlng=l.$viewValue||{lat:u.lat(),lng:u.lng()},a.find(".js-map").attr("id",c),e=new google.maps.Map(document.getElementById(c),{zoom:6,center:u}),n=new google.maps.Marker({position:u,map:e,draggable:!0}),google.maps.event.addListener(n,"dragend",function(){var e=n.getPosition();s({lat:e.lat(),lng:e.lng()}),o.value=""}),jQuery.UIkit.$win.on("resize",function(){google.maps.event.trigger(e,"resize"),e.setCenter(n.getPosition())}),o=a.find("input")[0],r=new google.maps.places.Autocomplete(o),r.bindTo("bounds",e),google.maps.event.addListener(r,"place_changed",function(){var t=r.getPlace();if(t.geometry){t.geometry.viewport?e.fitBounds(t.geometry.viewport):e.setCenter(t.geometry.location),n.setPosition(t.geometry.location),o.value="";var i=n.getPosition();s({lat:i.lat(),lng:i.lng()})}}),google.maps.event.addDomListener(o,"keydown",function(e){13==e.keyCode&&e.preventDefault()}),l.$render=function(){try{if(l.$viewValue&&l.$viewValue.lat&&l.$viewValue.lng){var t=new google.maps.LatLng(l.$viewValue.lat,l.$viewValue.lng);n.setPosition(t),e.setCenter(t)}else s({lat:n.getPosition().lat(),lng:n.getPosition().lng()})}catch(i){}},l.$render()})})}}}]).factory("Fields",function(){var e={text:{label:"Text",template:function(e,t){var i=angular.element('<input class="uk-width-1-1" type="text"  ng-model="'+e+'">').attr(t.attributes||{});return t&&t.icon&&(i=i.wrap('<div class="uk-form-icon uk-width-1-1"></div>').before('<i class="uk-icon-'+t.icon+'"></i>').parent()),i}},textarea:{label:"Textarea",template:function(e,t){return angular.element('<textarea id="wk-content" class="uk-width-1-1" ng-model="'+e+'" rows="10"></textarea>').attr(t.attributes||{})}},tags:{label:"Tags",template:function(e,t){return angular.element('<div class="uk-form-icon uk-width-1-1"><i class="uk-icon-tags"></i><input class="uk-width-1-1" type="text" ng-list ng-model="'+e+'" placeholder="tag, tag, ..."></div><div>').find("input").attr(t.attributes||{}).parent()}},"boolean":{label:"Boolean",template:function(e,t){return angular.element('<input type="checkbox" ng-model="'+e+'">').attr(t.attributes||{})}},media:{label:"Media",template:function(e){return'<field-media media="'+e+'"></field-media>'}},location:{label:"Location",template:function(e){return'<field-location  ng-model="'+e+'"></field-location>'}}};return{register:function(t,i){e[t]=angular.extend({label:t,assets:[],template:function(){}},i)},exists:function(t){return e[t]?!0:!1},get:function(t){return e[t]},fields:function(){var t=[];return Object.keys(e).forEach(function(i){t.push({name:i,label:e[i].label})}),t}}}).directive("field",["$timeout","$compile","Fields",function(e,t,i){return{require:"?ngModel",restrict:"E",link:function(n,a,o){var l=function(){var e=angular.extend({},JSON.parse(o.options||"{}")),l=o.type||"text";if(i.exists(l)){var s,r=i.get(l);s=r.template(o.ngModel,e),s.then?s.then(function(e){t(a.html(e).contents())(n)}):t(a.html(s).contents())(n)}else t(a.html(i.get("text").template(o.ngModel)).contents())(n)};e(l)}}}]);

angular.module("widgetkit",["Application","ngResource","Fields"]).value("name","widgetkit").value("UIkit",jQuery.UIkit).factory("Content",["$resource","Application",function(e,t){return e(t.url("/content/:id"),{},{query:{method:"GET",responseType:"json"},save:{method:"POST",responseType:"json"}})}]).filter("supported",["Application",function(e){return function(t,i){return i?t.filter(function(t){var r=e.config.types[t.type],o=i.item.filter(function(e){return-1!==r.item.indexOf(e)?!0:void 0}).length;return o==i.item.length}):t}}]).filter("ucwords",["Application",function(){return function(e){return e.replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()})}}]).service("mediaInfo",["Application","$q",function(e,t){return function(i,r){i=i||"";var o,n,a={url:i,type:"",src:i&&!i.match(/^(https?:)?\//)?e.baseUrl()+"/"+i:i,provider:null,image:e.config.images.placeholder,width:null,height:null};if(i.match(/\.(jpe?g|png|gif|svg)$/)?(a.type="image",a.image=a.src):i.match(/\.(mp3|ogg|wav)$/)?(a.type="audio",a.image=e.config.images.audio):i.match(/\.(mp4|ogv|webm)$/)?(a.type="video",a.image=e.config.images.video):(o=/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i.exec(i))?(a.provider="vimeo",a.type="iframe",a.src="//player.vimeo.com/video/"+o[2],a.image=e.config.images.iframe):((o=/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i.exec(i))||(o=/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i.exec(i)))&&(a.provider="youtube",a.type="iframe",a.src="//www.youtube.com/embed/"+o[2]+o[3].replace(/^&/,"?"),a.image="//img.youtube.com/vi/"+o[2]+"/hqdefault.jpg"),r)switch(n=t.defer(),a.type){case"image":var u=new Image;u.onerror=function(){n.resolve(a)},u.onload=function(){a.width=u.width,a.height=u.height,n.resolve(a)},u.src=a.src;break;case"video":var c=angular.element('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src",a.src).appendTo("body"),s=setInterval(function(){c[0].videoWidth&&(clearInterval(s),a.width=c[0].videoWidth,a.height=c[0].videoHeight,c.remove(),n.resolve(a))},20);break;case"iframe":"vimeo"==a.provider&&jQuery.ajax({type:"GET",url:"http://vimeo.com/api/oembed.json?url="+encodeURI(a.url),jsonp:"callback",dataType:"jsonp",success:function(e){a.width=e.width,a.height=e.height,n.resolve(a)}}).fail(function(){n.resolve(a)}),"youtube"==a.provider&&jQuery.ajax({type:"GET",url:"http://query.yahooapis.com/v1/public/yql",data:{q:"select * from json where url ='http://www.youtube.com/oembed?url="+encodeURI(a.url)+"'",format:"json"},dataType:"jsonp",success:function(e){if(e&&e.query&&e.query.results&&e.query.results.json){var t=jQuery(e.query.results.json.html);a.width=t.attr("width"),a.height=t.attr("height")}n.resolve(a)}}).fail(function(){n.resolve(a)});break;default:n.resolve(a)}return r?n.promise:a}}]).factory("httpInterceptor",["$q","UIkit",function(e,t){return{responseError:function(i){return t.notify(i.statusText,"danger"),e.reject(i)}}}]).config(["$httpProvider","$sceProvider",function(e,t){e.interceptors.push("httpInterceptor"),t.enabled(!1)}]);

!function(t,n){angular.module("widgetkit").run(["$rootScope","$rootElement","$timeout","$filter",function(e,o,a,i){function s(){r.find("#toolbar-apply button, #toolbar-save button").prop("disabled",o.find("form.ng-invalid").length)}n.parent.document.updateUploader=n.parent.document.updateUploader||function(){};var c=t("body.com_widgetkit"),l=c.find(".header .container-title").append('<h1 class="page-title"><span class="icon-widgetkit"></span>Widgetkit: <span></span></h1>').find(".page-title span").eq(1),r=c.find(".subhead .btn-toolbar"),p='<div class="btn-wrapper" id="toolbar-create"><button class="btn btn-small btn-success"></span>'+i("trans")("New")+"</button></div>",d='<div class="btn-wrapper" id="toolbar-apply"><button class="btn btn-small btn-success"><span class="icon-apply icon-white"></span> '+i("trans")("Save")+'</button></div>                           <div class="btn-wrapper" id="toolbar-save"><button class="btn btn-small"><span class="icon-save"></span> '+i("trans")("Save & Close")+'</button></div>                           <div class="btn-wrapper" id="toolbar-cancel"><button class="btn btn-small"><span class="icon-cancel"></span> '+i("trans")("Close")+"</button></div>",u='<div class="btn-wrapper" id="toolbar-options"><button class="btn btn-small"><span class="icon-options"></span> '+i("trans")("Options")+"</button></div>";r.on("click","#toolbar-create button",function(){o.scope().vm.createContent()}).on("click","#toolbar-apply",function(){o.scope().vm.saveContent()}).on("click","#toolbar-save",function(){var t=o.scope();t.vm.saveContent().$promise.then(function(){t.vm.setView("content")})}).on("click","#toolbar-cancel",function(){var t=o.scope();t.vm.setView("content"),t.$apply()}).on("click","#toolbar-options",function(){location.href="index.php?option=com_config&view=component&component=com_widgetkit"}),c.on("keyup",'[ng-model="content.name"]',s),e.$on("wk.change.view",function(t,n){a(function(){l.text(o.find("h2.js-header").text()),r.empty().html("content"==n?p:"contentEdit"==n?d:"").append(u),s()})})}]),t(function(){t(".btn-toolbar").on("click",'[rel="widgetkit"]',function(e){e.preventDefault(),e.stopPropagation();for(var o=t(this);o.length&&!o.has("textarea").length;)o=o.parent();n.widgetkit.env.editor(o.find("textarea:first"))});var e=t("body.view-module .widgetkit-widget"),o=e.nextAll("input"),a={value:function(){try{return JSON.parse(o.val())}catch(t){return{}}},update:function(){var t=this.value().name;e.text(t?Translator.trans("Widget: %widget%",{widget:t}):Translator.trans("Select Widget"))}};e.on("click",function(t){t.preventDefault(),n.widgetkit.env.init("widget",a.value(),function(t){o.val(JSON.stringify(t)),a.update()})}),a.update()})}(jQuery,window);

!function(e){function t(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}angular.module("widgetkit").service("mediaPicker",["$templateCache","$compile","$q","$rootScope","filterFilter","UIkit","mediaRequest","Application",function(i,n,o,r,l,a,d,s){var c,p,u,f,m,g,h={init:function(l){return this.options=angular.extend({multiple:!1},l),m=o.defer(),p=e(i.get("media")),u=p.data("media-path"),f=n(p)(r).scope(),f.vm=this,f.selectItem=function(i,n){if(n.shiftKey&&g){t();for(var o,r=e(n.target).closest("li"),l=r.parent().children(),a=r.index()>g.index()?1:-1,d=1===a?g.index():r.index(),s=1===a?r.index():g.index(),c=d;s>=c;c++)o=l.eq(c).scope(),o[o.folder?"folder":"file"].selected=!0}else i.selected=!i.selected;g=e(n.target).closest("li")},this.open("").then(function(){if(window.widgetkit.env.modal){var t=window.widgetkit.env.modal.element.children(":first").hide();h.close=function(){t.show(),p.remove()},t.parent().append(p)}else h.modal=e.UIkit.modal(e('<div class="uk-modal">').append(p).appendTo("body")).show(),h.close=function(){h.modal.hide()},e.UIkit.domObserve(h.modal.element);h.initUpload()}),m.promise},initUpload:function(){var t=e("#wk-upload-progressbar"),i=t.find(".uk-progress-bar"),n={param:"Filedata[]",params:{"Content-Type":"multipart/form-data"},allow:"*.(jpeg|jpg|gif|png|svg|mp3|ogg|wav|mp4|ogv|webm)",before:function(e){e.action=d.url({task:"file.upload",tmpl:"component",format:"html",folder:c},!0)},loadstart:function(){i.css("width","0%").text("0%"),t.removeClass("uk-hidden")},progress:function(e){e=Math.ceil(e)+"%",i.css("width",e).text(e)},allcomplete:function(n){i.css("width","100%").text("100%"),e(n).find(".alert-error, .alert-info")[0]&&a.notify(e(n).find(".alert-error p, .alert-info p").html(),"danger"),setTimeout(function(){t.addClass("uk-hidden")},250),h.open(c)}};a.uploadSelect(e("#wk-upload-select"),n),a.uploadDrop(p,n)},open:function(t){return d.get({view:"mediaList",tmpl:"component",folder:t,layout:"details"}).success(function(i){g=null,f.media=[],f.breadcrumbs=[];var n=e(i).find("tbody tr");".."==n.first().find(".description").text().trim()&&(n=n.not(n[0])),n.each(function(){var i=e(this),n=i.find("td:first a"),o=i.find("td :checkbox").val(),r=i.find("td.dimensions").text().trim().split(" x "),l=(t?t+"/":"")+o;f.media.push({title:o,path:l,url:(u?u+"/":"")+l,href:s.baseUrl()+"/"+(u?u+"/":"")+l,type:n.is("[target]")?"folder":"file",image:Boolean(l.match(/\.(jpe?g|png|gif|svg)$/)),width:r[0],height:r[1],size:i.find("td.filesize").text().trim()})}),c=t;var o=(c?"/"+c:"").split("/");do f.breadcrumbs.unshift({path:o.join("/").substr(1),title:o.pop()});while(o.length);f.breadcrumbs[0].title="home"})},select:function(){var e=h.getSelected();e.forEach(function(e){e.title=e.title.replace(/[_-]/g," ").replace(/\.[^\.]+$/,"").replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1)})}),m.resolve(this.options.multiple||!e.length?e:e[0]),h.close()},addFolder:function(){var e=prompt("Folder Name");e&&d.post({task:"folder.create",foldername:e,folderbase:c}).success(function(){h.open(c)})},remove:function(){window.confirm("Are you sure?")&&d.post({task:"folder.delete",folder:c,rm:h.getSelected().map(function(e){return e.title})}).success(function(){h.open(c)})},getSelected:function(){return l(f.media,{selected:!0})}};return{select:function(e){return h.init(e)}}}]).service("mediaRequest",["$q","$http","Application",function(t,i,n){var o="index.php?option=com_media";return{get:function(e){return i.get(this.url(e))},post:function(t){return t[n.config.token]=1,i.post(o,e.param(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},url:function(t,i){return i&&(t[n.config.token]=1),o+"&"+e.param(t)}}}])}(jQuery);

!function(){var t=function(t,e,n,a){var i=this,d=window.localStorage||{};i.viewmode=d["wk.content.viewmode"]||"list",i.include="",i.previewContent=function(e){return t.$emit("wk.preview.content",e).preview||t.data.types[e.type].icon},i.createContent=function(e){t.content=e||{name:"",type:"",data:{_widget:{}}},t.widget=null,i.setView("contentConfig")},i.editContent=function(e,n){var a,d=null,o=t.data.widgets;return e=angular.copy(e),a=e.data._widget,e.id||(angular.extend(e.data,t.data.types[e.type].data),e.id="new"),o[a.name]?(d=angular.copy(o[a.name]),d.data=a.data=angular.extend({},d.settings,a.data),t.content=e,t.widget=d,void i.setView("contentEdit",n)):void i.createContent(e)},i.saveContent=function(){return"new"==t.content.id&&delete t.content.id,a.save({id:t.content.id},{content:t.content},function(e){i.editContent(t.data.content[e.id]=e),n.notify(e.name+" saved.","success")})},i.copyContent=function(e){return e=angular.copy(e),e.id="",e.name+=" (copy)",a.save({id:e.id},{content:e},function(e){t.data.content[e.id]=e,e.data._widget=angular.isArray(e.data._widget)?{}:e.data._widget,n.notify(e.name+" copied.","success")})},i.deleteContent=function(e){confirm("Are you sure?")&&a["delete"]({id:e.id},function(){delete t.data.content[e.id]})},i.getWidget=function(e){return t.data.widgets[e.data._widget.name]},i.selectWidget=function(e){var n=t.content.data;n._widget.name!=e.name&&(n._widget.name=e.name,n._widget.data={})},i.setView=function(e,n){i.view=e,n&&(i.include=n),t.$emit("wk.change.view",e)},i.setViewMode=function(t){i.viewmode=d["wk.content.viewmode"]=t},i.setView("content")};angular.module("widgetkit").controller("contentCtrl",["$scope","Application","UIkit","Content",function(e,n,a,i){var d=this;e.data=angular.extend({content:i.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)})})},n.config),d.name="contentCtrl",t.call(this,e,n,a,i)}]).controller("pickerCtrl",["$scope","Application","Content","UIkit",function(e,n,a,i){var d=this;e.data=angular.extend({},n.config),e.data.content=a.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)});var a=e.data.content[n.env.attrs.id];a&&"editor"==d.mode&&(d.editContent(a,"content"),d.mode="edit"),n.env.modal.show()}),d.name="pickerCtrl",d.mode=n.env.mode,d.active=function(t){return t.id==n.env.attrs.id},d.update=function(t){n.env.update({id:t.id,name:t.name})},d.cancel=function(){n.env.cancel()},t.call(this,e,n,i,a)}])}();

angular.module("widgetkit").directive("mediaPreview",["mediaInfo",function(e){function i(i){var r=this;r.type=function(){return i.media=e(i.src),i.media.type},r.cleanUrl=function(e){return"string"==typeof e&&(e=e.replace("autoplay=1","autoplay=0")),e}}return{restrict:"E",scope:{src:"@"},controller:["$scope",i],controllerAs:"vm",template:'<div ng-switch="vm.type()">                           <audio ng-switch-when="audio" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></audio>                           <video ng-switch-when="video" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></video>                           <iframe ng-switch-when="iframe" ng-src="{{ vm.cleanUrl(media.src) }}" frameborder="0" allowfullscreen="true" class="uk-responsive-width" width="800" height="600"></iframe>                           <img ng-switch-default ng-src="{{ media.src }}">                       </div>'}}]).directive("autofocus",["$timeout",function(e){var i=[];return{restrict:"A",link:function(r,t){i.push(t),e(function(){i[0][0].focus()})}}}]);

!function(t,e){function n(t){var n=e.tinymce.editors[t.attr("id")];return{getContent:function(){return n.getContent()},insertContent:function(t){n.execCommand("mceInsertContent",!1,t)},updateContent:function(t,e,o){var i=this.getContent();i=i.substring(0,e)+t+'<span id="tmp-wkid"></span>'+i.substring(o),n.setContent(i),n.selection.select(n.dom.select("#tmp-wkid")[0],!0),n.selection.collapse(!1),n.dom.remove("tmp-wkid",!1),n.focus()},getCursorPosition:function(){var t=n.selection.getBookmark(0),e="[data-mce-type=bookmark]",o=n.dom.select(e);n.selection.select(o[0]),n.selection.collapse();var i="######cursor######",r='<span id="'+i+'"></span>';n.selection.setContent(r);var s=n.getContent({format:"html"}),a=s.indexOf(r);return n.dom.remove(i,!1),n.selection.moveToBookmark(t),a}}}function o(t){return{getContent:function(){return t.val()},insertContent:function(e){this.updateContent(e,t.prop("selectionStart"),t.prop("selectionEnd"))},updateContent:function(e,n,o){var i=t.val(),r=n+e.length;i=i.substring(0,n)+e+i.substring(o),t.val(i),t[0].setSelectionRange(r,r),t.focus().trigger("change")},getCursorPosition:function(){return t.prop("selectionStart")}}}function i(t){var e=t.next()[0].CodeMirror;return{getContent:function(){return e.getValue()},insertContent:function(t){e.replaceRange(t,e.getCursor()),e.focus()},updateContent:function(t,n,o){e.replaceRange(t,this.translateOffset(n),this.translateOffset(o)),e.focus()},getCursorPosition:function(){return this.translatePosition(e.getCursor())},translatePosition:function(t){return e.getValue().split("\n",t.line).join("").length+t.line+t.ch},translateOffset:function(t){var n=e.getValue().substring(0,t).split("\n");return{line:n.length-1,ch:n[n.length-1].length}}}}function r(t){var n=e.ace.edit(t.parent().attr("id"));return{getContent:function(){return n.getValue()},insertContent:function(t){n.insert(t),n.focus()},updateContent:function(t,e,o){e=this.translateOffset(e),o=this.translateOffset(o);var i=n.getSelectionRange();i.setStart(e.row,e.column),i.setEnd(o.row,o.column),n.getSession().getDocument().replace(i,t),n.focus()},getCursorPosition:function(){return this.translatePosition(n.getSelection().getCursor())},translatePosition:function(t){return this.getContent().split("\n",t.row).join("").length+t.row+t.column},translateOffset:function(t){var e=this.getContent().substring(0,t).split("\n");return{row:e.length-1,column:e[e.length-1].length}}}}function s(e){var n=CKEDITOR.instances[e.attr("id")];return{getContent:function(){return n.getData()},insertContent:function(t){this.updateContent(t,this.getCursorPosition(),this.getCursorPosition())},updateContent:function(t,e,o){var i=n.getData();i=i.substring(0,e)+t+i.substring(o),n.setData(i)},getCursorPosition:function(){return"source"==n.mode?t(n.textarea.$).prop("selectionStart"):this.getCursorPositionInWYSIWYG()},getCursorPositionInWYSIWYG:function(){var t=n.getSelection().createBookmarks(),e="######cursor######",o='<span id="'+e+'">&nbsp;</span>',i=CKEDITOR.dom.element.createFromHtml(o);i.insertBefore(t[0].startNode);var r=this.getContent(),s=r.indexOf(o);return i.remove(),n.getSelection().selectBookmarks(t),s}}}var a={init:function(e,n,o){var i=t(this.tmpl).appendTo("body");this.mode=e,this.attrs=n,this.cb=o,this.modal=t.UIkit.modal(i),this.modal.on("hide.uk.modal",function(){i.remove()}),t.UIkit.domObserve(i,function(){var e=this;t.UIkit.domObservers.forEach(function(t){t(e)})}),angular.bootstrap(i,["widgetkit"])},editor:function(t){var a;a=(e.WFEditor||e.JContentEditor||e.tinyMCE)&&!t.is(":visible")?new n(t):e.CodeMirror?new i(t):e.ace?new r(t):e.CKEDITOR?new s(t):new o(t);for(var c,l,g=a.getContent(),d=a.getCursorPosition(),f=/\[widgetkit([^\]]*)\]/gi;l=f.exec(g);)if(l.index<=d&&f.lastIndex>d){c=l[0];break}this.init("editor",u.parse("widgetkit",c).attrs,function(t){var e=new u({tag:"widgetkit",attrs:t}).string();c?a.updateContent(e,l.index,f.lastIndex):a.insertContent(e)})},update:function(t){this.cb(t),this.modal.hide()},cancel:function(){this.modal.hide()},tmpl:'<div class="uk-modal"><div style="width: 800px;" class="uk-modal-dialog" ng-include="\'picker\'"></div></div>'},u=function(e){t.extend(this,{tag:"",attrs:{},type:"single",content:""},e)};t.extend(u,{parse:function(t,e){var n,o=this.regexp(t).exec(e),i={tag:t};return o&&(n=o[4]?"self-closing":o[6]?"closed":"single",i={tag:o[2],attrs:this.attrs(o[3]),type:n,content:o[5]}),new u(i)},attrs:function(t){var e,n=/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/g,o={};for(t=t.replace(/[\u00a0\u200b]/g," ");e=n.exec(t);)e[1]?o[e[1].toLowerCase()]=e[2]:e[3]?o[e[3].toLowerCase()]=e[4]:!e[5]||"true"!==e[6]&&"1"!==e[6]?!e[5]||"false"!==e[6]&&"0"!==e[6]?e[5]?o[e[5].toLowerCase()]=e[6]:e[7]?o[e[7]]=!0:e[8]&&(o[e[8]]=!0):o[e[5].toLowerCase()]=!1:o[e[5].toLowerCase()]=!0;return o},regexp:function(t){return new RegExp("\\[(\\[?)("+t+")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)","g")}}),t.extend(u.prototype,{string:function(){var e="["+this.tag;return t.each(this.attrs,function(t,n){"boolean"==typeof n?e+=" "+t+"="+(n?1:0):""!==n&&(e+=" "+t+'="'+n+'"')}),"single"===this.type?e+"]":"self-closing"===this.type?e+" /]":(e+="]",this.content&&(e+=this.content),e+"[/"+this.tag+"]")}}),t(function(){t.extend(e.widgetkit,{env:a,shortcode:u})})}(jQuery,window);

angular.module("widgetkit").controller("customCtrl",["$scope","$timeout","UIkit","mediaInfo","mediaPicker","Fields","Application","Translator",function(e,t,i,n,o,a,d,l){e.content.data._fields||(e.content.data._fields=[]);var s,c=this,m=e.content.data._fields;e.content.data.items&&e.content.data.items.length||(e.content.data.items=[{media:""}]),s=e.content.data.items,e.item=s[0],e.extrafields=m,c.corefields=d.config.types.custom.fields,c.fields=a.fields(),c.previewItem=function(e){var t=e.options&&e.options.media&&e.options.media.poster;return n(t||e.media).image},c.addItem=function(t){e.item=t||{media:""},s.push(e.item)},c.importItems=function(){o.select({multiple:!0}).then(function(t){!t.length||1!=s.length||e.item.title&&e.item.media&&e.item.content||(s.length=0),angular.forEach(t,function(e){e.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}),c.addItem({title:e.title,media:e.url,width:e.width,height:e.height})})})},c.editItem=function(t){e.item=t},c.deleteItem=function(t){s.splice(s.indexOf(t),1),e.item=s[0]},c.addField=function(e){return e=e||{type:"text",name:"field-x",label:"Field X"},c.corefields[e.name]&&(e.type=c.corefields[e.name].type,e.label=c.corefields[e.name].label),c.hasField(e.name)?void alert('Field name "'+e.name+'" is already in use.'):(s.forEach(function(t){t[e.name]||(t[e.name]="")}),void m.push(angular.copy(e)))},c.deleteField=function(e){confirm(l.trans("Are you sure you want to delete this field?"))&&(s.forEach(function(t){t[e.name]&&delete t[e.name]}),m.splice(m.indexOf(e),1))},c.hasField=function(e){if(["title","media","link"].indexOf(e)>-1)return!0;for(var t=0;t<m.length;t++)if(m[t].name==e)return!0;return!1},c.toggleEditFields=function(){c.editfields=!c.editfields,c.editfields||setTimeout(function(){window.dispatchEvent(new Event("resize"))},150),c.custom={field:{}},c.addCustomField=!1},c.getFieldOptions=function(e){var t={},i=c.corefields[e.name];return i&&i.options&&(t=angular.extend(t,i.options)),JSON.stringify(t)},e.$watch("content",function(t){var i=s.indexOf(e.item);s=t.data.items,e.item=s[i]}),i.$doc.trigger("ready.uk.dom"),i.$doc.on("change.uk.sortable",function(e,i,n){n&&void 0!==n&&(n=angular.element(n),t(function(){"js-content-items"==i.element[0].id&&s.splice(n.index(),0,s.splice(s.indexOf(n.scope().item),1)[0]),"js-fields-items"==i.element[0].id&&m.splice(n.index(),0,m.splice(m.indexOf(n.scope().field),1)[0])}))})}]).run(["$rootScope","mediaInfo",function(e,t){e.$on("wk.preview.content",function(e,i){if("custom"==i.type&&i.data.items.length){var n=i.data.items[0],o=n.options&&n.options.media&&n.options.media.poster;e.preview=t(o||n.media).image.replace(/preview(-.+\.svg)$/g,"content$1")}})}]);

angular.module("widgetkit").controller("folderCtrl",["$scope",function(){}]).run(["$rootScope","mediaInfo",function(e,r){e.$on("wk.preview.content",function(e,o){if("folder"==o.type&&o.data.prepared){var n,t=JSON.parse(o.data.prepared);t.length>0&&(n=t[0].media,e.preview=r(n).image)}})}]);

angular.module("widgetkit").controller("k2Ctrl",["$scope","Application","$http","$filter",function(e){var i=this,n=e.content.data;default_fields=[{id:"content",name:"content",def:"full",core:!0},{id:"media",name:"media",def:"image",core:!0},{id:"date",name:"date",def:"publish_up",core:!0},{id:"author",name:"author",def:"author",core:!0},{id:"categories",name:"categories",def:"categories",core:!0}],n.mapping=n.mapping?n.mapping:{},n.fields=n.fields?default_fields.concat(n.fields):default_fields;var a=[];n.fields=n.fields.filter(function(e){return-1==a.indexOf(e.id)?(a.push(e.id),!0):!1});try{e.k2=JSON.parse(angular.element('script[type="k2/config"]')[0].innerHTML)}catch(t){e.k2={}}e.$watch("content.data.fields",function(){angular.forEach(e.k2.fields,function(e,i){angular.forEach(n.fields,function(a){if(n.mapping[i]=n.mapping[i]?n.mapping[i]:{},void 0==n.mapping[i][a.id]){var t=e.filter(function(e){return e.id==a.def});n.mapping[i][a.id]=t.length?t[0].id:"none"}})})}),i.addField=function(){var e=angular.element("#k2-field-new")[0];e.value.length&&(n.fields.push({id:e.value,name:e.value}),e.value="")},i.deleteField=function(e){n.fields.splice(n.fields.indexOf(e),1)}}]);

