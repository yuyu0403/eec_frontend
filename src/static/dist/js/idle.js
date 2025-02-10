// TimeInterval = {
//     /**
//      * 參數說明
//      * callback: 要執行的function
//      * wait: 每個多久(單位：毫秒)再次執行
//      * **/
//     setTimerInterval: function (callback, wait) {
//         // 自定義setInterval方法(用setTimeout實作)，確保能如期重複執行。
//         let timer = null;

//         function custom_interval(func, wait) {
//             let inter_func = function () {
//                 func.call(null);
//                 timer = setTimeout(inter_func, wait);
//             };
//             timer = setTimeout(inter_func, wait);
//         }

//         function stopTimerInterval() {
//             clearTimeout(timer);
//             timer = null;
//         }

//         function startTimerInterval() {
//             custom_interval(callback, wait);
//         }

//         startTimerInterval();
//         // 自定義setInterval方法相關程式結束-----------------------------------

//         // 判斷使用者狀態的套件 (https://github.com/henriqueboaventura/jquery.idle)
//         $(document).idle({
//             // user掛機
//             onIdle: function () {
//                 if (timer) {
//                     stopTimerInterval();
//                 }
//             },
//             // user從掛機狀態清醒
//             onActive: function () {
//                 if (!timer) {
//                     startTimerInterval();
//                 }
//             },
//             // user縮小視窗
//             onHide: function () {
//                 if (timer) {
//                     stopTimerInterval();
//                 }
//             },
//             // user重新顯示視窗
//             onShow: function () {
//                 if (!timer) {
//                     startTimerInterval();
//                 }
//             },
//             // 多久要檢查掛機一次
//             idle: ai.Global.Param.checkIdle,
//             // 是否持續檢查
//             keepTracking: true
//         });
//     }
// }

// // 每60秒判斷一次cookie是否過期
// TimeInterval.setTimerInterval(function () {
//     if (ai._oauth2_proxy) {
//         axios({
//             method: 'POST',
//             url: `${ai.api_base}/account/userinfo`,
//             headers: {
//                 '-oauth2-proxy': ai._oauth2_proxy
//             }
//         }).then((res) => {
//             // 將從 response header 拿到的新憑證更新至 cookie
//             if ("-oauth2-proxy" in res["headers"]) {
//                 ai.Global.ToolKit.Cookie.set("_oauth2_proxy", res["headers"]["-oauth2-proxy"]);
//             }
//         }).catch((error) => {
//             ai.Global.Loading.ErrorRaise.show();
//             // 401: cookie過期，登出，重新登入
//             if (error.response.status === 401) { // Unauthorized
//                 axios_api.post(`/account/logout`).then(res => {
//                     location.reload();
//                 });
//             } else if (error.response.status === 403) { // Forbidden
//                 location.reload();
//             } else if (error.response.status >= 400 && error.response.status <= 500) { // other error status
//                 $(".axios_warning_msg_content").empty().html(error.response.data.message);
//                 $("#axios_warning_modal").modal("show");
//                 ai.Global.Loading.Common.hide();
//             }

//             // 關閉 Axios Warning modal，也須關閉對應的 Loading
//             $(document).on("click", ".close_axios_warning_modal", function () {
//                 ai.Global.Loading.ErrorRaise.hide();
//                 $("#axios_warning_modal").modal("hide");
//             });

//             // 點選 確認刪除 btn
//             $(document).on("click", ".confirm_to_delete", function () {
//                 ai.Global.Loading.Common.show();
//                 let url = $(this).data("callback_info")["url"];
//                 let request_body = $(this).data("callback_info")["request_body"];
//                 axios_api.delete(url, request_body).then(res => {
//                     if (res) {
//                         $("#delete_confirm_modal").modal("hide");
//                         // reload
//                         location.reload();
//                     }
//                 });
//             });
//         });
//     } else { // no cookie
//         // reload to login page
//         location.reload();
//     }
// }, ai.Global.Param.checkIdle)


