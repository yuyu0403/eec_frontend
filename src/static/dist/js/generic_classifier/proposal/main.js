ai.ProposalGC = {
    setCallback: function () {
        ai.ProposalGC.setPath();
    },
    setPath: function () {
        console.log("setPath proposal");
    
            
    },
};

let url = "http://127.0.0.1:8889/json/proposal.json"; 
axios.get(url).then((res) => {
    const records = res.data.data.records;
    console.log(records);

    const analysis_modality_icon = {
        no_code: "far fa-window-maximize",
        coding: "fas fa-code",
        gan: "fas fa-download",
    };



    $.fn.DataTable.ext.pager.numbers_length = 5;//設定底下頁碼數量
    let my_table = $("#proposal_tb").DataTable({  //copy html
        destroy: true,
        responsive: false,
        autoWidth: false,
        order: [[5, "desc"]],
        lengthChange: true,
        pageLength: 10,
        paging: true,
        pagingType: "full_numbers",
        language: {
            oPaginate: {
                sFirst: "",
                sLast: "",
                sNext: '<i class="fa-solid fa-angle-right"></i>',
                sPrevious: '<i class="fa-solid fa-angle-left"></i>',
            },
            lengthMenu: '<span class="model-list-title">Proposal List</span>_MENU_',
            info: "Page _PAGE_ of _PAGES_",
            infoEmpty: "No data available in table",
            infoFiltered: "(filtered from _MAX_ total entries)",
        },
        columnDefs: [
            {
                targets: "_all",
                orderable: false,
            },
        ],
        searching: false,
        info: true,
    });
    my_table.clear().draw();

    $.each(records, function (idx, val) {
        let proposal_tpl = $(".proposal_list_tbody_tpl").children().clone();
        $(".proposal_name", proposal_tpl).text(val["proposal_name"]);
        console.log(val);
        const analysisEnvMapping = {
            no_code: "No Code",
            coding: "Coding",
            gan: "GAN",
        };
        $(".analysis_environment", proposal_tpl).text(analysisEnvMapping[val["analysis_env"]]);
        const analysis_modality_icon = {
            no_code: "far fa-window-maximize",
            coding: "fas fa-code",
            gan: "fas fa-download",
        };
        $(".modality_icon", proposal_tpl).addClass(analysis_modality_icon[val["analysis_env"]]);
        if (val["analysis_env"] === "coding") {
            $(".modality_icon", proposal_tpl).data("access_url", val["access_url"]);
        } else if (val["analysis_env"] === "gan") {
            $(".modality_icon", proposal_tpl).data("proposal_id", val["proposal_id"]);
        }
        $(".dataset", proposal_tpl).text(val["dataset"]);
        $(".modality", proposal_tpl).text(val["modality"]);
        $(".creator", proposal_tpl).text(val["creator"]);
        let locale_time = ai.Global.ToolKit.TimeStamp.parser(val["updated_time"]);
        $(".last_updated_time", proposal_tpl).text(val["updated_time"]);
        $(".action", proposal_tpl)
            .data("task_id", val["proposal_id"])
            .data("file_name", val["proposal_name"]);
        // .data("description", val["description"])  如果要在編輯時先顯示曾經的訊息需要這個
        // .data("status", val["status"])
        // .data("inference_status", val["is_infer"] ? "on" : "off")
        // .data("error_msg", val["error_msg"]);
        // 有錯誤訊息就顯示
        if (val["error_msg"]) {
            $(".warning_msg", proposal_tpl).removeClass("hide");
        }
        // !全部關閉顯示
        $(".exclamation", proposal_tpl).hide();
        // 訓練中
        if (val["status"] == "in progress") {
            $(".status", proposal_tpl).addClass("status_inprogress").text("In Progress");
            $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
            $(".delete", proposal_tpl).addClass("disabled");
        } else if (val["status"] == "initializing") {
            $(".status", proposal_tpl).addClass("status_training").text("Initializing");
            $(".delete", proposal_tpl).addClass("disabled");
        } else if (val["status"] == "success") {
            $(".status", proposal_tpl).addClass("status_success").text("Success");
            $(".modality_icon", proposal_tpl).addClass("modality_icon_open");
        } else if (val["status"] == "ready") {
            $(".status", proposal_tpl).addClass("status_success").text("Ready");
            $(".delete", proposal_tpl).addClass("disabled");
        } else if (val["status"] == "reviewed") {
            $(".status", proposal_tpl).addClass("status_success").text("Reviewed");
            $(".delete", proposal_tpl).addClass("disabled");
            $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
        } else if (val["status"] == "reviewing") {
            $(".status", proposal_tpl).addClass("status_training").text("Reviewing");
            $(".delete", proposal_tpl).addClass("disabled");
            $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
        } else if (val["status"] == "failure") {
            // 失敗
            $(".status", proposal_tpl).addClass("status_fail").text("Failure");
            $(".exclamation", proposal_tpl).show();
            $(".msg_error", proposal_tpl).text(val["error_msg"] ? val["error_msg"] : "");
            if (!val["error_msg"]) {
                $(".msg_error", proposal_tpl).addClass("none_error_msg");
            }
            $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
        }
        my_table.rows.add(proposal_tpl);
    });

    my_table.draw();
    $("#proposal_tb th").removeClass("sorting_desc");

    $(".dataTables_length").find("select").attr("class", "rows_per_page form-control");


    // 開啟重新編輯description modal  第一步就開畫面而已
    $(document).on("click", ".edit_description", function () {
        let file_id = $(this).closest(".action").data("task_id"); // 改為提取 file_id
        console.log("edit_description:", file_id);
        $(".edit_description_btn").data("file_id", file_id);
        $("#edit_description_modal").modal("show");
    });

    // 確定重新編輯description  這邊功能不用做。但可以看
    $(document).on("click", ".edit_description_btn", function () {
        let url = `/proposal/description`;
        let file_id = $(this).data("file_id");
        console.log("file_id in edit_description_btn:", file_id);
        console.log($("input[name=edit_description]").val());
        url = url + `?proposal_id=${file_id}&description=${$("input[name=edit_description]").val()}`;
        axios_api.put(url).then((res) => {
            if (res) {
                $("#edit_description_modal").modal("hide");
                // reload
                location.reload();
            }
        });
    });


    $(document).on("click", ".delete", function () {
        let file_name = $(this).closest(".action").data("file_name");
        let url = `/proposal/delete`;
        let file_ids = $(this).closest(".action").data("task_id");
        console.log(file_ids);
        let request_body = {
            data: {
                proposal_id: file_ids,
            },
        };
        console.log(request_body);
        let callback_info = {
            url: url,
            request_body: request_body,
        };
        console.log(callback_info);
        ai.Global.ToolKit.Confirm.delete.modalShow(file_name, callback_info);
    });


});



// let url = "http://127.0.0.1:8889/json/proposal.json"; 
// axios.get(url).then((res) => {
//     const records = res.data.data.records;

//     const tbody = $(".proposal_tbody");
//     tbody.empty(); // 清空 tbody

//     records.forEach((item) => {
//     // 狀態樣式處理
//     let status_label = "";
//     const status = item.status.toLowerCase();

//     if (status === "success") {
//         status_label = `<label class="status status_success">Success</label>`;
//     } else if (status === "failure") {
//         status_label = `
//         <label class="status status_fail">Failure</label>
//         <label class="exclamation">
//             <i class="fa-solid fa-exclamation"></i>
//             <span class="msg_error">${item.error_msg || "Unknown Error"}</span>
//         </label>
//         `;
//     } else {
//         // 其他狀態通通顯示 Reviewing 樣式
//         status_label = `<label class="status status_reviewing">${item.status}</label>`;
//     }

//     // 產生一列
//     const tr = `
//         <tr>
//         <td class="proposal_name">${item.proposal_name}</td>
//         <td class="analysis_environment">${item.analysis_env}</td>
//         <td class="dataset">${item.dataset}</td>
//         <td class="modality">${item.modality}</td>
//         <td class="creator">${item.creator}</td>
//         <td class="last_updated_time">${item.updated_time}</td>
//         <td>${status_label}</td>
//         <td class="text-center">
//             <i class="modality_icon"></i>
//         </td>
//         <td class="action">
//             <a href="#" class="btn btn-lg btn-clean btn-icon pr-0" data-toggle="dropdown">
//             <i class="fas fa-ellipsis-v"></i>
//             </a>
//             <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
//             <ul class="nav nav-hoverable flex-column">
//                 <li class="nav-item action-item border-item">
//                 <a class="nav-link file_view status_open" title="file_view" href="javascript:void(0);">
//                     <i class="fa-regular fa-eye text-center"></i>
//                     <span class="nav-text ml-2">View</span>
//                 </a>
//                 </li>
//                 <li class="nav-item action-item border-item">
//                 <a class="nav-link edit_description status_open" href="javascript:void(0);">
//                     <span class="icon_edit"></span>
//                     <span class="nav-text ml-2">Description</span>
//                 </a>
//                 </li>
//                 <li class="nav-item action-item border-item">
//                 <a class="nav-link data_exploratory status_open" title="Exploratory" href="javascript:void(0);">
//                     <span class="icon_exploratory"></span>
//                     <span class="nav-text ml-2">Exploratory</span>
//                 </a>
//                 </li>
//                 <li class="nav-item action-item">
//                 <a class="nav-link delete status_open" title="Delete" href="javascript:void(0);">
//                     <i class="fas fa-trash-can text-center"></i>
//                     <span class="nav-text ml-2">Delete</span>
//                 </a>
//                 </li>
//             </ul>
//             </div>
//         </td>
//         </tr>
//     `;

//     tbody.append(tr);
//     });

//     // 如果有使用 DataTable 的話要重新 draw
//     if (typeof my_table !== "undefined") {
//     my_table.draw();
//     }
// })
// .catch((error) => {
//     console.error("載入 proposal 資料失敗：", error);
// });


// const analysis_modality_icon = {
//     no_code: "far fa-window-maximize",
//     coding: "fas fa-code",
//     gan: "fas fa-download",
// };

// $.fn.DataTable.ext.pager.numbers_length = 5;//設定底下頁碼數量
// let my_table = $("#proposal_tb").DataTable({  //copy html
//     destroy: true,
//     responsive: false,
//     autoWidth: false,
//     order: [[5, "desc"]],
//     lengthChange: true,
//     pageLength: 10,
//     paging: true,
//     pagingType: "full_numbers",
//     language: {
//         oPaginate: {
//             sFirst: "",
//             sLast: "",
//             sNext: '<i class="fa-solid fa-angle-right"></i>',
//             sPrevious: '<i class="fa-solid fa-angle-left"></i>',
//         },
//         lengthMenu: '<span class="model-list-title">Proposal List</span>_MENU_',
//         info: "Page _PAGE_ of _PAGES_",
//         infoEmpty: "No data available in table",
//         infoFiltered: "(filtered from _MAX_ total entries)",
//     },
//     columnDefs: [
//         {
//             targets: "_all",
//             orderable: false,
//         },
//     ],
//     searching: false,
//     info: true,
// });
// my_table.clear().draw();

// $.each(res, function (idx, val) {
//     let proposal_tpl = $(".proposal_list_tbody_tpl").children().clone();
//     $(".proposal_name", proposal_tpl).text(val["proposal_name"]);
//     const analysisEnvMapping = {
//         no_code: "No Code",
//         coding: "Coding",
//         gan: "GAN",
//     };
//     $(".analysis_environment", proposal_tpl).text(analysisEnvMapping[val["analysis_env"]]);
//     const analysis_modality_icon = {
//         no_code: "far fa-window-maximize",
//         coding: "fas fa-code",
//         gan: "fas fa-download",
//     };
//     $(".modality_icon", proposal_tpl).addClass(analysis_modality_icon[val["analysis_env"]]);
//     if (val["analysis_env"] === "coding") {
//         $(".modality_icon", proposal_tpl).data("access_url", val["access_url"]);
//     } else if (val["analysis_env"] === "gan") {
//         $(".modality_icon", proposal_tpl).data("proposal_id", val["proposal_id"]);
//     }
//     $(".dataset", proposal_tpl).text(val["dataset"]);
//     $(".modality", proposal_tpl).text(val["modality"]);
//     $(".creator", proposal_tpl).text(val["creator"]);
//     let locale_time = ai.Global.ToolKit.TimeStamp.parser(val["updated_time"]);
//     $(".last_updated_time", proposal_tpl).text(val["updated_time"]);
//     $(".action", proposal_tpl)
//         .data("task_id", val["proposal_id"])
//         .data("file_name", val["proposal_name"]);
//     // .data("description", val["description"])  如果要在編輯時先顯示曾經的訊息需要這個
//     // .data("status", val["status"])
//     // .data("inference_status", val["is_infer"] ? "on" : "off")
//     // .data("error_msg", val["error_msg"]);
//     // 有錯誤訊息就顯示
//     if (val["error_msg"]) {
//         $(".warning_msg", proposal_tpl).removeClass("hide");
//     }
//     // !全部關閉顯示
//     $(".exclamation", proposal_tpl).hide();
//     // 訓練中
//     if (val["status"] == "in progress") {
//         $(".status", proposal_tpl).addClass("status_inprogress").text("In Progress");
//         $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
//         $(".delete", proposal_tpl).addClass("disabled");
//     } else if (val["status"] == "initializing") {
//         $(".status", proposal_tpl).addClass("status_training").text("Initializing");
//         $(".delete", proposal_tpl).addClass("disabled");
//     } else if (val["status"] == "success") {
//         $(".status", proposal_tpl).addClass("status_success").text("Success");
//         $(".modality_icon", proposal_tpl).addClass("modality_icon_open");
//     } else if (val["status"] == "ready") {
//         $(".status", proposal_tpl).addClass("status_success").text("Ready");
//         $(".delete", proposal_tpl).addClass("disabled");
//     } else if (val["status"] == "reviewed") {
//         $(".status", proposal_tpl).addClass("status_success").text("Reviewed");
//         $(".delete", proposal_tpl).addClass("disabled");
//         $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
//     } else if (val["status"] == "reviewing") {
//         $(".status", proposal_tpl).addClass("status_training").text("Reviewing");
//         $(".delete", proposal_tpl).addClass("disabled");
//         $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
//     } else if (val["status"] == "failure") {
//         // 失敗
//         $(".status", proposal_tpl).addClass("status_fail").text("Failure");
//         $(".exclamation", proposal_tpl).show();
//         $(".msg_error", proposal_tpl).text(val["error_msg"] ? val["error_msg"] : "");
//         if (!val["error_msg"]) {
//             $(".msg_error", proposal_tpl).addClass("none_error_msg");
//         }
//         $(".data_exploratory", proposal_tpl).addClass("disabled icon_gray");
//     }
//     my_table.rows.add(proposal_tpl);
// });

// my_table.draw();
// $("#proposal_tb th").removeClass("sorting_desc");

// $(".dataTables_length").find("select").attr("class", "rows_per_page form-control");

// // 開啟重新編輯description modal  第一步就開畫面而已
// $(document).on("click", ".edit_description", function () {
//     let file_id = $(this).closest(".action").data("task_id"); // 改為提取 file_id
//     console.log("edit_description:", file_id);
//     $(".edit_description_btn").data("file_id", file_id);
//     $("#edit_description_modal").modal("show");
// });

// // 確定重新編輯description  這邊功能不用做。但可以看
// $(document).on("click", ".edit_description_btn", function () {
//     let url = `/proposal/description`;
//     let file_id = $(this).data("file_id");
//     console.log("file_id in edit_description_btn:", file_id);
//     console.log($("input[name=edit_description]").val());
//     url = url + `?proposal_id=${file_id}&description=${$("input[name=edit_description]").val()}`;
//     axios_api.put(url).then((res) => {
//         if (res) {
//             $("#edit_description_modal").modal("hide");
//             // reload
//             location.reload();
//         }
//     });
// });


// $(document).on("click", ".delete", function () {
//     let file_name = $(this).closest(".action").data("file_name");
//     let url = `/proposal/delete`;
//     let file_ids = $(this).closest(".action").data("task_id");
//     console.log(file_ids);
//     let request_body = {
//         data: {
//             proposal_id: file_ids,
//         },
//     };
//     console.log(request_body);
//     let callback_info = {
//         url: url,
//         request_body: request_body,
//     };
//     console.log(callback_info);
//     ai.Global.ToolKit.Confirm.delete.modalShow(file_name, callback_info);
// });



