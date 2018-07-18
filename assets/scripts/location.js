(function ($) {

    function myTrim(x) {
        if (x){
            return x.replace(/^\s+|\s+$/gm,'');
        }else{
            return '';
        }
    }

    var locact = {
        locdata: {},
        provinces: {},
        dictricts: {},
        cKey: "Hà Nội",
        cQ: "",
        loaddata: function () {

            // jQuery.getJSON('./assets/data/location/miennam.json', function (data) {
            //
            //         jQuery.getJSON('./assets/data/location/mienbac.json', function (datamienbac) {
            //
            //
            //             var listlocate = data.RECORDS.RECORD.concat(datamienbac.RECORDS.RECORD);
            //
            //             locact.locdata = listlocate;
            //
            //             locact.getProvince();
            //
            //             locact.initSelector();
            //
            //             $("#searchBtn").click(function (e) {
            //                 var proviceVal = $("#selector_province option:selected").val();
            //                 var districtVal = $("#selector_district option:selected").val();
            //                 var addressVal = $("#searchAddress").val();
            //                 if (addressVal && addressVal != "Tên đường" && addressVal.length > 0)
            //                     locact.SearchAddress(addressVal);
            //                 if (proviceVal != null && districtVal == '') {
            //                     locact.SearchProvince($("#selector_province option:selected").val());
            //                 }
            //                 e.preventDefault;
            //
            //             });
            //             $("#searchAddress").keydown(function (e) {
            //                 if (e.keyCode == 13) {
            //                     locact.SearchAddress($("#searchAddress").attr("value"));
            //                 }
            //                 e.preventDefault;
            //             });
            //             $("#searchAddress").click(function (e) {
            //                 $(this).focusin()
            //                 $(this).select();
            //                 e.preventDefault();
            //             })
            //         });
            // });

            jQuery.getJSON('./assets/data/location/all-171114.json', function (data) {

                var listlocate = data.RECORDS[0];

                locact.locdata = listlocate;

                locact.getProvince();

                locact.initSelector();

                $("#searchBtn").click(function (e) {
                    var proviceVal = $("#selector_province option:selected").val();
                    var districtVal = $("#selector_district option:selected").val();
                    var addressVal = $("#searchAddress").val();
                    if (addressVal && addressVal.length > 0){
                        locact.SearchAddress(addressVal);
                    }
                    if (proviceVal != null && districtVal == '') {
                        locact.SearchProvince($("#selector_province option:selected").val());
                    }
                    e.preventDefault;

                });
                $("#searchAddress").keydown(function (e) {
                    if (e.keyCode == 13) {
                        locact.SearchAddress($("#searchAddress").val());
                    }
                    e.preventDefault;
                });

                // $('#searchBtn').click(function () {
                //     locact.SearchAddress($("#searchAddress").val());
                // });

                $("#searchAddress").click(function (e) {
                    $(this).focusin()
                    $(this).select();
                    e.preventDefault();
                })

            });

            $('#selector_province')
            .find('option')
            .remove()
            .end()
            .append('<option value="">Chọn Tỉnh/Thành phố</option>')
            .val('whatever');
        },
        initSelector: function () {

            jQuery.each(locact.provinces, function (k, v) {
                if (v.name == locact.cKey) {
                    jQuery("#selector_province").append($("<option></option>").attr("value", v.name).text(v.name).attr("selected", "selected"));
                    locact.getDistrict();

                    locact.SearchProvince(locact.cKey);
                } else
                    jQuery("#selector_province").append($("<option></option>").attr("value", v.name).text(v.name));

            });

            $("#selector_province").on("change", locact.getDistrict);

            $("#selector_district").on("change", locact.districOnChange);
        },
        getDistrict: function (e) {
            //console.log("onChangeDistrict");
            $('#selector_province').blur();
            if (e != undefined)
                e.preventDefault;
            $('#selector_district')
            .find('option')
            .remove()
            .end()
            .append('<option value="">Chọn Quận/Huyện</option>')
            .val('whatever');

            var districts = [];
            var kk = 0;
            //console.log($("#selector_province option:selected").text());
            var province = $("#selector_province").val();
            jQuery.each(locact.locdata, function (k, v) {
                var val = {};
                val.name = v.Dist;
                if (v.Provice == province) {
                    if (locact.checkDistrict(districts, val)) {
                        districts.push(val);
                    }
                }

            });

            locact.currentProvice = province;

            districts.sort(locact.SortByName);
            locact.dictricts = districts;
            for (var i = 0; i < districts.length - 1; i++) {
                jQuery("#selector_district").append($("<option></option>").attr("value", districts[i].name).text(districts[i].name));
            }

            if ($('#selector_district option[value="'+ locact.cQ +'"]').length > 0){
                $('#selector_district option[value="'+ locact.cQ +'"]').attr('selected', 'selected');
            }else{
                $('#selector_district option:first').attr('selected', 'selected');
            }

            $("#selector_district").trigger('change');
        },
        checkDistrict: function (l, s) {
            check = true;

            if (s.name == '') return false;

            jQuery.each(l, function (k, v) {
                if (v.name == s.name) {
                    check = false;
                }
            });
            if (!check) return false;

            return true;
        },
        getProvince: function () {
            var provinces = [];

            var kk = 0;

            jQuery.each(locact.locdata, function (k, v) {
                var val = {};

                val.name = v.Provice;
                if (locact.checkProvince(provinces, val)) {
                    if (val.name != undefined)
                        provinces.push(val);
                }
            });

            provinces.sort(locact.SortByName);
            locact.provinces = provinces;
        },
        checkProvince: function (l, s) {
            check = true;

            jQuery.each(l, function (k, v) {
                if (v.name == s.name) {
                    check = false;
                }
            });
            if (!check) return false;

            return true;
        },
        ArrayMove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        },
        SortByName: function (a, b) {
            var aName = locact.BodauTV(a.name).toLowerCase();
            var bName = locact.BodauTV(b.name).toLowerCase();
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        },
        SearchAddress: function (keyword) {
            var Result = [];
            keyword = locact.BodauTV(keyword);
            jQuery.each(locact.locdata, function (key, val) {
                if (val.TV != null) {
                    // var address = locact.BodauTV(val.Address);
                    var address = val.TV.toLowerCase();
                    if (address.search(keyword) >= 0) {
                        Result.push(val);
                    }
                }
            });
            locact.RenderData(Result, keyword);
        },
        SearchProvince: function (keyword) {
            var Result = [];
            jQuery.each(locact.locdata, function (key, val) {

                //console.log("provice: " + val.Provice + "--key:" + keyword);
                if (val.Provice == keyword) {
                    //console.log("push");
                    Result.push(val);
                }
            });

            locact.currentProvice = keyword;

            locact.RenderData(Result, keyword);
        },
        Search: function (keyword) {
            var Result = [];
            jQuery.each(locact.locdata, function (key, val) {

                if (val.Provice == locact.currentProvice){
                    if (val.Dist == keyword) {
                        Result.push(val);
                    }
                }
            });

            locact.RenderData(Result, keyword);
        },
        districOnChange: function (e) {
            $("#selector_district").blur();
            if (jQuery(this).val() != ""){
                locact.Search(jQuery(this).val());
            }else{
                locact.SearchProvince(locact.currentProvice);
            }

            e.preventDefault;
        },
        RenderData: function (Data, keyword) {
            //hd_Act_Box_02

            jQuery("#hd_Act_Box_02").find("table tbody").html("");
            jQuery.each(Data, function (key, val) {
                var ward = "";
                var adNumber = "";
                var dist = "";

                //console.log(val.Ward);
                if (val.Ward && val.Ward != 'null' && val.Ward != null) {
                    ward = myTrim(val.Ward) + ", ";
                }
                if (val.Number && val.Number != "null" && val.Number != null) {
                    adNumber = myTrim(val.Number) + ", ";
                }
                if (val.Dist && val.Dist != 'null' && val.Dist != null){
                    dist = myTrim(val.Dist) + ", ";
                }

                var mProvince = val.Provice;



                var addressNumber = myTrim(val.Number);
                if(!addressNumber){
                    addressNumber = '';
                }else{
                    addressNumber += ' ';
                }

                var stringAddress = myTrim(val.Address);
                if (!stringAddress){
                    stringAddress = '';
                }else{
                    stringAddress +=', ';
                }

                var obj = '<tr class="tRow">';
                obj += '<td class="addname">' + val.Outlet + '</td>';
                obj += '<td style="addprovice">' + "<b>Địa chỉ:</b> " + addressNumber + stringAddress + ward + dist + mProvince+ '</td>';
                // val.Work

                var address =
                    adNumber + " " + val.Address + ", " + ward + dist + mProvince + ", Việt Nam";

                obj+= '<td class="addmap"><a class="mapBtn" data-address="' + encodeURIComponent(address) + '"  href="#"></a></td>';
                obj += '</tr>';
                jQuery("#hd_Act_Box_02").find("table tbody").append(obj);
            });

            $(".tRow .mapBtn").on('click', function (e) {
                e.preventDefault();

                //https://maps.google.be/maps?&daddr=135 phan bội châu Quảng nam đà nẵng
                if ($(this).data("address") != undefined) {
                    window.open("https://maps.google.be/maps?&daddr=" + $(this).data("address"), "_blank");
                }
            });
        },
        BodauTV: function (str) {
            try {
                str = str.toLowerCase();
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                str = str.replace(/đ/g, "d");
                return str;
            }catch(e) {
                return '';
            }

        }
    }

    locact.loaddata();
})(jQuery);