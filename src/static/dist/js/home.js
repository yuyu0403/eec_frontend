ai.Home = {
    joinProjectList: [],
    setCallback: function () {
        ai.Home.init();
        ai.Home.listener();
    },
    init: function () {
        localStorage.removeItem("userinfo");
        ai._oauth2_proxy = ai.Global.ToolKit.Cookie.get("_oauth2_proxy");
        axios({
            method: 'POST',
            url: `${ai.api_base}/account/userinfo`,
            headers: {
                '-oauth2-proxy': ai._oauth2_proxy
            }
        }).then((res) => {
            // 將從 response header 拿到的新憑證更新至 cookie
            if ("-oauth2-proxy" in res["headers"]) {
                ai.Global.ToolKit.Cookie.set("_oauth2_proxy", res["headers"]["-oauth2-proxy"]);
            }

            if ("company_id" in res["data"] && res["data"]["company_id"].length > 0) {
                // init
                let userinfo = {
                    company_id: res["data"]["company_id"],
                    company_name: res["data"]["company_name"],
                    username: res["data"]["username"],
                    email: res["data"]["email"]
                };
                ai.userinfo = userinfo;
                localStorage.setItem("userinfo", JSON.stringify(userinfo));
                localStorage.removeItem("selected_model_name");

                $(".dropdown_company_name").text(res["data"]["company_name"]);
                $(".dropdown_user_name").text(res["data"]["username"]);
                $(".dropdown_user_email").text(res["data"]["email"]);
                ai.Home.renderUI.getProjectList();
            } else {
                // 由 redirect 頁面判斷應前往哪一個 URL
                location.href = `${ai.static_base}/`;
            }
        }).catch((error) => {
            ai.Global.Loading.ErrorRaise.show();
            // 401: cookie過期，登出，重新登入
            if (error.response.status === 401) { // Unauthorized
                axios_api.post(`/account/logout`).then(res => {
                    location.reload();
                });
            } else if (error.response.status === 403) { // Forbidden
                location.reload();
            } else if (error.response.status >= 400 && error.response.status <= 500) { // other error status
                $(".axios_warning_msg_content").empty().html(error.response.data.message);
                $("#axios_warning_modal").modal("show");
                ai.Global.Loading.Common.hide();
            }

            // 關閉 Axios Warning modal，也須關閉對應的 Loading
            $(document).on("click", ".close_axios_warning_modal", function () {
                ai.Global.Loading.ErrorRaise.hide();
                $("#axios_warning_modal").modal("hide");
            });

            // 點選 確認刪除 btn
            $(document).on("click", ".confirm_to_delete", function () {
                ai.Global.Loading.Common.show();
                let url = $(this).data("callback_info")["url"];
                let request_body = $(this).data("callback_info")["request_body"];
                axios_api.delete(url, request_body).then(res => {
                    if (res) {
                        $("#delete_confirm_modal").modal("hide");
                        // reload
                        location.reload();
                    }
                });
            });
        });
    },
    renderUI: {
        getProjectList: function () {
            let url = `/companys/${ai.userinfo.company_id}/get_project_list`;
            axios_api.get(url).then(res => {
                if (res) {
                    res = res["data"]["records"];
                    $.each(res, function (idx, val) {
                        ai.Home.renderUI.renderCard(idx, val);
                    });
                }
            });
        },
        renderCard: function (index, res) {
            // 專案狀態是開啟的才render
            if (res['project_status']) {
                let element_idx = 0;
                let project_card;

                // 奇數排
                if ((Math.floor(index / 3)) % 2 == 0) {
                    element_idx = index % 3;
                    project_card = $(".row_odd").find(".project_card_tpl").eq(element_idx).clone().removeClass('project_card_tpl').removeClass('hide');
                } else {
                    element_idx = index % 3;
                    project_card = $(".row_even").find(".project_card_tpl").eq(element_idx).clone().removeClass('project_card_tpl').removeClass('hide');
                }

                project_card.css("display", "flex");
                project_card.find(".task-type").text(res["task_type"]);
                project_card.find(".project-name").text(res["project_name"]);
                project_card.find(".my-role").text(res["role"]);

                let url = "";
                if (res["task_type"].toLowerCase().indexOf("frequency") > -1) { // Multi Frequency Time Series project href to dataset
                    url = `${ai.static_base}/multi_time_series/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("image") > -1) { // image project href to dataset
                    url = `${ai.static_base}/image/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("object") > -1) { // Object Detection project href to dataset
                    url = `${ai.static_base}/object_detection/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("generic") > -1) { // Generic Classifier project href to dataset
                    url = `${ai.static_base}/generic_classifier/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("small") > -1) { // Small Data Learning project href to dataset
                    url = `${ai.static_base}/pretrained_model/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("active") > -1) { // Active Learning project href to dataset
                    url = `${ai.static_base}/active_learning/data_list`;
                    project_card.find(".project-link").data("href", url);
                } else if (res["task_type"].toLowerCase().indexOf("time")> -1){ // Time Series project href to dataset
                    url = `${ai.static_base}/time_series/data_list`;
                    project_card.find(".project-link").data("href", url);
                }

                project_card.find(".project-link").data("pName", res["project_name"]);
                project_card.find(".project-link").data("pID", res["project_id"]);
                project_card.find(".project-link").data("pType", res["task_type"]);
                project_card.find(".project-link").data("pRole", res["role"]);
                $(".project_card_block").append(project_card);
            }
        },
    },
    listener: function () {
        $(document).on("click", ".project-link", function () {
            let project_name = $(this).data("pName");
            let project_id = $(this).data("pID");
            let project_type = $(this).data("pType");
            let role = $(this).data("pRole");
            let url = $(this).data("href");

            let userinfo = JSON.parse(localStorage.getItem("userinfo"));
            userinfo["project_name"] = project_name;
            userinfo["project_id"] = project_id;
            userinfo["project_type"] = project_type;
            userinfo["role"] = role;

            localStorage.setItem("userinfo", JSON.stringify(userinfo));
            ai.userinfo = userinfo;
            location.href = url;
        });
    }
}