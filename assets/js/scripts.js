!function(e){e('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=e(this.hash);(t=t.length?t:e("[name="+this.hash.slice(1)+"]")).length&&e("html, body").animate({scrollTop:t.offset().top},1e3)}})}(jQuery),function(e){e("a[data-tracking], button[data-tracking], input[data-tracking]").on("click",function(t){var a=e(this).data("tracking");ga("send","event","Internal browsing","click",a)})}(jQuery),function(e){function t(e){return e?e.replace(/^\s+|\s+$/gm,""):""}var a={locdata:{},provinces:{},dictricts:{},cKey:"Hà Nội",cQ:"",loaddata:function(){jQuery.getJSON("./assets/data/location/all-171114.json",function(t){var n=t.RECORDS[0];a.locdata=n,a.getProvince(),a.initSelector(),e("#searchBtn").click(function(t){var n=e("#selector_province option:selected").val(),r=e("#selector_district option:selected").val(),c=e("#searchAddress").val();c&&c.length>0&&a.SearchAddress(c),null!=n&&""==r&&a.SearchProvince(e("#selector_province option:selected").val()),t.preventDefault}),e("#searchAddress").keydown(function(t){13==t.keyCode&&a.SearchAddress(e("#searchAddress").val()),t.preventDefault}),e("#searchAddress").click(function(t){e(this).focusin(),e(this).select(),t.preventDefault()})}),e("#selector_province").find("option").remove().end().append('<option value="">Chọn Tỉnh/Thành phố</option>').val("whatever")},initSelector:function(){jQuery.each(a.provinces,function(t,n){n.name==a.cKey?(jQuery("#selector_province").append(e("<option></option>").attr("value",n.name).text(n.name).attr("selected","selected")),a.getDistrict(),a.SearchProvince(a.cKey)):jQuery("#selector_province").append(e("<option></option>").attr("value",n.name).text(n.name))}),e("#selector_province").on("change",a.getDistrict),e("#selector_district").on("change",a.districOnChange)},getDistrict:function(t){e("#selector_province").blur(),void 0!=t&&t.preventDefault,e("#selector_district").find("option").remove().end().append('<option value="">Chọn Quận/Huyện</option>').val("whatever");var n=[],r=e("#selector_province").val();jQuery.each(a.locdata,function(e,t){var c={};c.name=t.Dist,t.Provice==r&&a.checkDistrict(n,c)&&n.push(c)}),a.currentProvice=r,n.sort(a.SortByName),a.dictricts=n;for(var c=0;c<n.length-1;c++)jQuery("#selector_district").append(e("<option></option>").attr("value",n[c].name).text(n[c].name));e('#selector_district option[value="'+a.cQ+'"]').length>0?e('#selector_district option[value="'+a.cQ+'"]').attr("selected","selected"):e("#selector_district option:first").attr("selected","selected"),e("#selector_district").trigger("change")},checkDistrict:function(e,t){return check=!0,""!=t.name&&(jQuery.each(e,function(e,a){a.name==t.name&&(check=!1)}),!!check)},getProvince:function(){var e=[];jQuery.each(a.locdata,function(t,n){var r={};r.name=n.Provice,a.checkProvince(e,r)&&void 0!=r.name&&e.push(r)}),e.sort(a.SortByName),a.provinces=e},checkProvince:function(e,t){return check=!0,jQuery.each(e,function(e,a){a.name==t.name&&(check=!1)}),!!check},ArrayMove:function(e,t,a){var n=e[t];e.splice(t,1),e.splice(a,0,n)},SortByName:function(e,t){var n=a.BodauTV(e.name).toLowerCase(),r=a.BodauTV(t.name).toLowerCase();return n<r?-1:n>r?1:0},SearchAddress:function(e){var t=[];e=a.BodauTV(e),jQuery.each(a.locdata,function(a,n){null!=n.TV&&n.TV.toLowerCase().search(e)>=0&&t.push(n)}),a.RenderData(t,e)},SearchProvince:function(e){var t=[];jQuery.each(a.locdata,function(a,n){n.Provice==e&&t.push(n)}),a.currentProvice=e,a.RenderData(t,e)},Search:function(e){var t=[];jQuery.each(a.locdata,function(n,r){r.Provice==a.currentProvice&&r.Dist==e&&t.push(r)}),a.RenderData(t,e)},districOnChange:function(t){e("#selector_district").blur(),""!=jQuery(this).val()?a.Search(jQuery(this).val()):a.SearchProvince(a.currentProvice),t.preventDefault},RenderData:function(a,n){jQuery("#hd_Act_Box_02").find("table tbody").html(""),jQuery.each(a,function(e,a){var n="",r="",c="";a.Ward&&"null"!=a.Ward&&null!=a.Ward&&(n=t(a.Ward)+", "),a.Number&&"null"!=a.Number&&null!=a.Number&&(r=t(a.Number)+", "),a.Dist&&"null"!=a.Dist&&null!=a.Dist&&(c=t(a.Dist)+", ");var o=a.Provice,i=t(a.Number);i?i+=" ":i="";var s=t(a.Address);s?s+=", ":s="";var l='<tr class="tRow">';l+='<td class="addname">'+a.Outlet+"</td>",l+='<td style="addprovice"><b>Địa chỉ:</b> '+i+s+n+c+o+"</td>";var d=r+" "+a.Address+", "+n+c+o+", Việt Nam";l+='<td class="addmap"><a class="mapBtn" data-address="'+encodeURIComponent(d)+'"  href="#"></a></td>',l+="</tr>",jQuery("#hd_Act_Box_02").find("table tbody").append(l)}),e(".tRow .mapBtn").on("click",function(t){t.preventDefault(),void 0!=e(this).data("address")&&window.open("https://maps.google.be/maps?&daddr="+e(this).data("address"),"_blank")})},BodauTV:function(e){try{return e=e.toLowerCase(),e=e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"),e=e.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"),e=e.replace(/ì|í|ị|ỉ|ĩ/g,"i"),e=e.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"),e=e.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"),e=e.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"),e=e.replace(/đ/g,"d")}catch(e){return""}}};a.loaddata()}(jQuery),function(e){var t;(t=e(".button-showup .fab-button")).length>0&&t.on("click",function(t){var a=e(this),n=e(".prod-info.active");a.closest(".prod-info").addClass("active animated fadeInUp"),n.removeClass("active animated fadeInUp")}),e(".carusel-container").slick({slidesToShow:3,responsive:[{breakpoint:768,settings:{prevArrow:'<span class="slick-prev"><i class="material-icons">arrow_back</i></span>',nextArrow:'<span class="slick-next"><i class="material-icons">arrow_forward</i></span>',arrows:!0,slidesToShow:1}}]})}(jQuery),function(e){function t(e){a.attr("aria-expanded",e),n.attr("aria-expanded",e)}var a,n,r;(a=e(".space-middle")).length<=0||(n=e("#primary-menu"),r=e("body"),"toggled",t(!1),a.on("click",function(a){e(this);t(r.hasClass("toggled")?!1:!0),r.toggleClass("toggled")}),n.on("click","li",function(){r.hasClass("toggled")&&a.trigger("click")}))}(jQuery),function(e){var t,a,n;null!=(t=document.getElementById("Video1"))&&(a=e(".play-button, .pause-button"),n=a.closest(".background-video"),a.on("click",function(){t.paused?t.play():t.pause()}),t.onplay=function(){n.removeClass("onstop"),n.addClass("onplay")},t.onpause=function(){n.removeClass("onplay"),n.addClass("onstop")})}(jQuery),new WOW({animateClass:"animated"}).init();
//# sourceMappingURL=scripts.js.map
