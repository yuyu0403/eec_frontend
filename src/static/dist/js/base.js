ai = {
    Global: {
        /**
         * 未讀資訊
         * **/
        Notify: {
            /**
             * 取得所有頁面的未讀資訊
             * param: 依照不同專案類型，需打不同API
             * **/
            get: function (project_type) {
                let url = "";
                if (project_type == "frequency") {
                    // multi frequency time series
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/mfts/progress/get_notify`;
                } else if (project_type == "image") {
                    // image
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/image/progress/get_notify`;
                } else if (project_type == "od") {
                    // object detection
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/od/progress/get_notify`;
                } else if (project_type == "gc") {
                    // generic classifier
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/gc/progress/get_notify`;
                } else if (project_type == "sdl") {
                    // small data learning
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/sdl/progress/get_notify`;
                } else if (project_type == "al") {
                    // active learning
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/al/progress/get_notify`;
                } else if (project_type == "time") {
                    // time series
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/time_series/progress/get_notify`;
                }
                $(".split_list .notify_block").empty();
                $(".feature_list .notify_block").empty();
                $(".data_augment_list .notify_block").empty();
                $(".model_list .notify_block").empty();
                axios_api.get(url).then((res) => {
                    if (res) {
                        res = res["data"];
                        if (res["split_list"] != 0) {
                            $(".split_list .notify_block").append(`<div class="notify_number">${res["split_list"]}</div>`);
                        }
                        if (res["feature_list"] != 0) {
                            $(".feature_list .notify_block").append(`<div class="notify_number">${res["feature_list"]}</div>`);
                        }
                        if (res["data_augment_list"] != 0) {
                            $(".data_augment_list .notify_block").append(`<div class="notify_number">${res["data_augment_list"]}</div>`);
                        }
                        if (res["model_list"] != 0) {
                            $(".model_list .notify_block").append(`<div class="notify_number">${res["model_list"]}</div>`);
                        }
                    }
                });
            },
            /**
             * 將特定頁面的未讀清空
             * **/
            clear: function (project_type, this_page) {
                let url = "";
                if (project_type == "frequency") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/mfts/progress/get_notify_viewed`;
                } else if (project_type == "image") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/image/progress/get_notify_viewed`;
                } else if (project_type == "od") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/od/progress/get_notify_viewed`;
                } else if (project_type == "gc") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/gc/progress/get_notify_viewed`;
                } else if (project_type == "sdl") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/sdl/progress/get_notify_viewed`;
                } else if (project_type == "al") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/al/progress/get_notify_viewed`;
                } else if (project_type == "time") {
                    url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/time_series/progress/get_notify_viewed`;
                }
                let request_body = {
                    source: this_page,
                };
                ai.Global.Loading.Common.show();
                axios_api.put(url, request_body).then((res) => {
                    if (res) {
                        ai.Global.Loading.Common.hide();
                    }
                });
            },
        },
        /**
         * Loading spinner
         * **/
        Loading: {
            /**
             * call API、User 操作畫面觸發的 Loading
             * **/
            Common: {
                /**
                 * 覆蓋整個畫面，並顯示處理中
                 */
                show: function () {
                    $("body").prepend('<div class="loading-bg"></div>');
                    $("body").prepend('<span class="loader loading"></span>');
                    $(".loading").css("top", $(window).height() / 2);
                    $(".loading").css("left", ($(window).width() - $(".loading").width()) / 2);
                },
                /**
                 * 將載入中的覆蓋畫面關閉
                 * @function
                 */
                hide: function () {
                    $(".loading-bg").remove();
                    $(".loading").remove();
                },
            },
            /**
             * API return 的錯誤訊息
             * 比 Common 的 z-index 更高
             * **/
            ErrorRaise: {
                /**
                 * 覆蓋整個畫面，並顯示處理中
                 */
                show: function () {
                    $("body").prepend('<div class="loading-bg-axios-errorraise"></div>');
                },
                /**
                 * 將載入中的覆蓋畫面關閉
                 * @function
                 */
                hide: function () {
                    $(".loading-bg-axios-errorraise").remove();
                },
            },
        },
        /**
         * 小工具
         * **/
        ToolKit: {
            /**
             * 加密
             * **/
            Encode: {
                /**
                 * Encode string base on base-64
                 * **/
                fromString: function (obj) {
                    return btoa(obj);
                },
                /**
                 * Encode javascript Obj base on base-64
                 * **/
                fromObject: function (obj) {
                    return btoa(JSON.stringify(obj));
                },
            },
            /**
             * 解密
             * **/
            Decode: {
                /**
                 * Decode string base on base-64
                 * **/
                toString: function (str) {
                    return atob(str);
                },
                /**
                 * Decode string to javascript Obj base on base-64
                 * **/
                toObject: function (str) {
                    return JSON.parse(atob(str));
                },
            },
            /**
             * 驗證
             * **/
            Validation: {
                /**
                 * 自行命名的檔案名稱只能是由數字、26個英文字母或者下劃線組成的字符串
                 * **/
                FileNameRegex: function (str) {
                    let regex = /^([a-zA-Z0-9_])+$/;
                    return regex.test(str);
                },
                /**
                 * 檢查表格必填欄位是否都已填寫
                 * **/
                formRequired: async function (target_form) {
                    let err = 0;
                    // 普通輸入框及下拉選單
                    $(target_form)
                        .find("input[required], select[required]")
                        .each(function (idx, val) {
                            if (!$(val).val()) {
                                err += 1;
                                $(val).addClass("form_err");
                            } else {
                                $(val).removeClass("form_err");
                            }
                        });

                    $(target_form)
                        .find(".select2-selection.required")
                        .each(function (idx, val) {
                            // select2套件 單選 || 多選
                            if (!$(val).closest("div").find("select").val() || $(val).closest("div").find("select").val().length == 0) {
                                err += 1;
                                $(val).addClass("form_err");
                            } else {
                                $(val).removeClass("form_err");
                            }
                        });

                    // 檔案上傳欄位 (drop-zone)
                    $(target_form)
                        .find("input[type=file][required]")
                        .each(function (idx, val) {
                            if (!$(val).val()) {
                                err += 1;
                                $(val).closest(".drop_zone").addClass("form_err");
                            } else {
                                $(val).closest(".drop_zone").removeClass("form_err");
                            }
                        });
                    return err;
                },
                /**
                 * 將已知的特定element標示為醒目色
                 * 用於標示出錯誤欄位
                 * **/
                formErrorHighlight: function (target_list) {
                    $.each(target_list, function (idx, val) {
                        val.addClass("form_err");
                    });
                },
                /**
                 * 回復表格必填欄位的highlight
                 * **/
                formErrorInit: function (target_form, callback = null) {
                    $(target_form).find(".form_err").removeClass("form_err");

                    if (callback) {
                        callback();
                    }
                },
                /**
                 * 檢查所選時間區間是否互相有重疊
                 * true: 區間重疊 or 邊界值重疊
                 * false: 無任何重疊
                 * **/
                timeIntervalOverlap: function (timeA, timeB) {
                    if (!Array.isArray(timeA) || !Array.isArray(timeB)) return false;

                    const maxA = new Date(timeA[0]).getTime();
                    const maxB = new Date(timeB[0]).getTime();
                    const minA = new Date(timeA[1]).getTime();
                    const minB = new Date(timeB[1]).getTime();
                    const max = [maxA, maxB];
                    const min = [minA, minB];

                    // return true if overlap
                    return Math.max.apply(null, max) <= Math.min.apply(null, min);
                },
            },
            /**
             * 時戳、流水號、server time
             * **/
            TimeStamp: {
                /**
                 * 分、秒若為個位數則補 0
                 * **/
                check: function (i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                },
                /**
                 * 取得目前的時間戳記作為預設命名的流水號
                 * 回傳 YYMMDDhhmmss
                 * **/
                get: function () {
                    let today = new Date();
                    let YY = today.getFullYear();
                    let MM = today.getMonth() + 1;
                    let DD = today.getDate();
                    let hh = today.getHours();
                    let mm = today.getMinutes();
                    let ss = today.getSeconds();

                    // add a zero in front of numbers<10
                    MM = ai.Global.ToolKit.TimeStamp.check(MM);
                    DD = ai.Global.ToolKit.TimeStamp.check(DD);
                    mm = ai.Global.ToolKit.TimeStamp.check(mm);
                    ss = ai.Global.ToolKit.TimeStamp.check(ss);

                    return `${YY}${MM}${DD}${hh}${mm}${ss}`;
                },
                /**
                 * 將server時間(格林威治時間)轉換成瀏覽器所在位置之時區時間
                 * **/
                parser: function (server_time) {
                    if (!server_time || server_time.length == 0) {
                        return "-";
                    }

                    let ISO_str = server_time.split(" ").join("T") + "Z";
                    ISO_str = new Date(ISO_str);
                    let YYYY = ISO_str.getFullYear();
                    let MM = ISO_str.getMonth() + 1;
                    let DD = ISO_str.getDate();
                    let hh = ISO_str.getHours();
                    let mm = ISO_str.getMinutes();
                    let ss = ISO_str.getSeconds();

                    // add a zero in front of numbers<10
                    MM = ai.Global.ToolKit.TimeStamp.check(MM);
                    DD = ai.Global.ToolKit.TimeStamp.check(DD);
                    mm = ai.Global.ToolKit.TimeStamp.check(mm);
                    ss = ai.Global.ToolKit.TimeStamp.check(ss);

                    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
                },
            },
            Cookie: {
                get: function (name) {
                    let value = `; ${document.cookie}`;
                    let parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(";").shift();
                },
                set: function (name, value) {
                    document.cookie = name + "=" + (value || "") + "; path=/";
                },
            },
            Confirm: {
                delete: {
                    /**
                     * 刪除需先有提示才真正刪除
                     * **/
                    modalShow: function (target_name, callback_info) {
                        $(".confirm_to_delete_target").empty().text(target_name);
                        $(".confirm_to_delete").data("callback_info", callback_info);
                        $("#delete_confirm_modal").modal("show");
                    },
                },
            },
        },
        /**
         * 參數
         * **/
        Param: {
            // 60秒檢查一次是否掛機
            checkIdle: 60000,
            // 30分鐘檢查一次飄移偵測燈號狀態 (30*60 = 1800 秒)
            checkDriftDetection: 1800000,
        },
    },
    /**
     * DataRefine 的開關狀態處理
     * **/
    AppStatus: {
        DR_interval: null,
        setCallback: function () {
            ai.AppStatus.clickBOX();
            ai.AppStatus.detectDR();
        },

        // （監聽）點擊 BOX icon
        clickBOX: function () {
            $("#rightNAV").on("show.bs.dropdown", ".EH", function () {
                // 判斷 DR 是否為“緩衝中”
                if (localStorage.getItem(`${ai.userinfo.project_id}_DR_buffer`) != "null") {
                    // DR正在緩衝中
                    if (ai.AppStatus.DR_interval != null) {
                        // 代表沒有更新頁面，停留在原本頁面
                        // not thing to do ............
                    } else {
                        // 代表有更新頁面
                        let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
                        axios_api.get(url).then((res) => {
                            if (res) {
                                res = res["status"];
                                // 緩衝中且狀態為Running
                                if (res === "Running") {
                                    // 代表實際已經on了，但是剛好整理頁面沒跑完重整變數的code
                                    if (localStorage.getItem(`${ai.userinfo.project_id}_DR_status_buffer`) == "Inactive") {
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);

                                        // 完成開啟DR pod，可以點選DR btn
                                        $(".data_refine").removeClass("disabled");

                                        ai.AppStatus.callGET();
                                    } else if (localStorage.getItem(`${ai.userinfo.project_id}_DR_status_buffer`) == "Running") {
                                        // 代表正在『 on -> off 』
                                        $("#DR_div").hide();
                                        $("#DR_load").prop("hidden", false);
                                        // 針對『 on -> off 』這個緩衝階段，啟動 Interval 不斷去 run checkDELETE()
                                        ai.AppStatus.DR_interval = setInterval(function () {
                                            ai.AppStatus.checkDELETE();
                                        }, 5000);
                                    } else {
                                        //status_buffer 為 null，代表沒有做任何開啟或關閉動作
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);

                                        $(".data_refine").removeClass("disabled");

                                        ai.AppStatus.callGET();
                                    }
                                } else {
                                    // 緩衝中且狀態為Inactive
                                    // 代表實際已經off了，但變數還沒改變，會不停迴圈
                                    if (localStorage.getItem(`${ai.userinfo.project_id}_DR_status_buffer`) == "Running") {
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);

                                        // 完成關閉DR pod，可以點選DR btn
                                        $(".data_refine").removeClass("disabled");

                                        ai.AppStatus.callGET();
                                    } else if (localStorage.getItem(`${ai.userinfo.project_id}_DR_status_buffer`) == "Inactive") {
                                        // 代表正在『 off -> on 』
                                        $("#DR_div").hide();
                                        $("#DR_load").prop("hidden", false);
                                        // 針對『 off -> on 』這個緩衝階段，啟動 Interval 不斷去run checkPOST()
                                        ai.AppStatus.DR_interval = setInterval(function () {
                                            ai.AppStatus.checkPOST();
                                        }, 5000);
                                    } else {
                                        //status_buffer 為 null，代表沒有做任何開啟或關閉動作
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);

                                        $(".data_refine").removeClass("disabled");

                                        ai.AppStatus.callGET();
                                    }
                                }
                            }
                        });
                    }
                } else if (localStorage.getItem(`${ai.userinfo.project_id}_DR_buffer`) == "null") {
                    // DR 沒有緩衝中
                    localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                    $(".data_refine").removeClass("disabled");
                    ai.AppStatus.callGET();
                }
            });
        },
        // (API)取得 POD 狀態
        callGET: function () {
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
            axios_api
                .get(url)
                .then((res) => {
                    if (res) {
                        res = res["status"];
                        if (res === "Running") {
                            $("#DR_status").prop("checked", true);
                            // app成功啟動，可以點選DR按鈕
                            $(".data_refine").removeClass("disabled");
                        } else {
                            $("#DR_status").prop("checked", false);
                        }
                    }
                })
                .catch((error) => {
                    $("#DR_status").prop("checked", false);
                });
        },
        // (API)開啟 POD
        callPOST: function () {
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
            axios_api
                .post(url)
                .then((res) => {
                    if (res) {
                        // 正在啟動app，不可點選DR按鈕
                        $(".data_refine").addClass("disabled");

                        $("#DR_div").hide();
                        $("#DR_load").prop("hidden", false);
                        // 儲存目前的狀態
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_status_buffer`, "Inactive");
                        // 進入interval先給值，以防馬上重新整理
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_buffer`, 1);
                        // 緩衝中不斷去get狀態（關--->開）
                        ai.AppStatus.DR_interval = setInterval(function () {
                            ai.AppStatus.checkPOST();
                        }, 5000);
                    }
                })
                .catch((error) => {
                    $("#DR_status").prop("checked", false);
                });
        },
        // (API)關閉 POD
        callDELETE: function () {
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
            axios_api
                .delete(url)
                .then((res) => {
                    if (res) {
                        // 正在關閉app時不可再點選DR按鈕
                        $(".data_refine").addClass("disabled");
                        $("#DR_status").prop("checked", false);
                        $("#DR_div").hide();
                        $("#DR_load").prop("hidden", false);
                        // 儲存目前的狀態
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_status_buffer`, "Running");
                        // 進入interval先給值，以防馬上重新整理
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_buffer`, 1);
                        // 緩衝中不斷去get狀態（開--->關）
                        ai.AppStatus.DR_interval = setInterval(function () {
                            ai.AppStatus.checkDELETE();
                        }, 5000);
                    }
                })
                .catch((error) => {
                    $("#DR_status").prop("checked", true);
                });
        },
        // (LISTENER)開啟關閉 OpenRefined Pod
        detectDR: function () {
            $(document).on("change", "#DR_status", function () {
                if ($(this).is(":checked")) {
                    ai.AppStatus.callPOST();
                } else {
                    ai.AppStatus.callDELETE();
                }
            });
        },
        // (for Interval) “關閉 --> 開啟” Pod 的判斷
        checkPOST: function () {
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
            axios_api.get(url).then((res) => {
                if (res) {
                    res = res["status"];
                    if (res == "Running") {
                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);
                        $("#DR_status").prop("checked", true);
                        $("#DR_load").prop("hidden", true);
                        $("#DR_div").show();
                        clearInterval(ai.AppStatus.DR_interval);

                        // 完成開啟DR pod，可以點選DR btn
                        $(".data_refine").removeClass("disabled");
                    } else {
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_buffer`, ai.AppStatus.DR_interval);
                    }
                }
            });
        },
        // (for Interval) “開啟 --> 關閉” Pod 的判斷
        checkDELETE: function () {
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/DataRefine`;
            axios_api.get(url).then((res) => {
                if (res) {
                    res = res["status"];
                    if (res == "Inactive") {
                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_buffer`);
                        localStorage.removeItem(`${ai.userinfo.project_id}_DR_status_buffer`);
                        $("#DR_status").prop("checked", false);
                        $("#DR_load").prop("hidden", true);
                        $("#DR_div").show();
                        clearInterval(ai.AppStatus.DR_interval);

                        // 完成關閉DR pod，可以點選DR btn
                        $(".data_refine").removeClass("disabled");
                    } else {
                        localStorage.setItem(`${ai.userinfo.project_id}_DR_buffer`, ai.AppStatus.DR_interval);
                    }
                }
            });
        },
    },
    /**
     * app 的使用狀態
     * Jupyter啟動的情況下需隱藏FeatureGen和AutoML
     * output(正在使用的app): "AI Pipeline"、 "Jupyter"、null
     * **/
    JupyterCheck: {
        getStatus: function (callback) {
            ai.Global.Loading.Common.show();
            let url = `/companys/${ai.userinfo.company_id}/projects/${ai.userinfo.project_id}/apps/Status`;
            axios_api.get(url).then((res) => {
                if (res) {
                    res = res["data"]["app"];

                    ai.Global.Loading.Common.hide();
                    callback(res);
                }
            });
        },
    },
};

$(function () {
    // i18n下拉選單須選在當前語系
    let now_locale = ai.Global.ToolKit.Cookie.get("locale");
    $("#language_switch").val(now_locale);

    /**
     * 切換語系
     * **/
    $(document).on("change", "#language_switch", function () {
        axios({
            method: "GET",
            url: `${ai.static_base}/set_locale?language=${$(this).val()}`,
            headers: {
                "-oauth2-proxy": ai._oauth2_proxy,
            },
        }).then((response) => {
            location.reload();
        });
    });

    /**
     * 登出
     * **/
    $(document).on("click", ".logout", function () {
        let url = `/account/logout`;
        axios_api.post(url).then((res) => {
            if (res) {
                location.reload();
            }
        });
    });
    $(document).ready(function () {
        // 取得當前頁面的路徑
        const path = window.location.pathname;

        // 定義要顯示的條件
        if (path.includes("/generic_classifier/overview")) {
            $("#overview").show();
            $("#machine_learning_frame").hide();
        } else if (path.includes("generic_classifier/machine_learning")) {
            $("#machine_learning_frame").show().css("display", "flex");
        } else if (path.includes("generic_classifier/statistical_analysis")) {
            $("#statistical_analysis_frame").show().css("display", "flex");
        }
    });
});
//input日期style
$("body").on("input", "input[type='date']", function () {
    toggleBeforeClass($(this)); // 動態檢查
});

function toggleBeforeClass(input) {
    if (input.val()) {
        input.removeClass("no-before").removeClass("no-before-write"); // 如果有值，移除 before
    } else {
        input.addClass("no-before-write"); // 如果沒有值，顯示 before
    }
}
