ai.ProposalGC = {
    setCallback: function () {
        ai.ProposalGC.setPath();

        $(".new_proposal_btn").on("click", function () {
            window.location.href = "/generic_classifier/new_proposal";
        });

    },
    setPath: function () {
        console.log("setPath proposal");
        
    },
};

let url = "http://127.0.0.1:8889/json/proposal.json"; 
axios.get(url).then((res) => {
    const records = res.data.data.records;
    console.log(records);


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
            .data("file_name", val["proposal_name"])
            .data("description", val["description"])  //如果要在編輯時先顯示曾經的訊息需要這個
            .data("status", val["status"])
            .data("inference_status", val["is_infer"] ? "on" : "off")
            .data("error_msg", val["error_msg"]);
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
        let description = $(this).closest(".action").data("description"); //jiade
        console.log("edit_description:", file_id);
        $(".edit_description_btn").data("file_id", file_id);
        $("input[name=edit_description]").val(description);
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

//view
$(document).on('click', '.file_view', function () {
    fetchProposalData();
});
function fetchProposalData() {
    fetch('http://127.0.0.1:8889/json/proposal_view.json') 
        .then(response => response.json())
        .then(data => {
            showProposalDetail(data);
        })
        .catch(error => {
            console.error('Error fetching proposal data:', error);
        });
}
function showProposalDetail(data) {
    $('.right_content').hide();
    let html = `
       <div class="proposal-info-box">
            <h3>Proposal List Info</h3>
            <hr>
            <div class="info-item">
                <h6>Proposal Name</h6>
                <p>${data.proposal_name}</p>
            </div>
            <div class="info-item">
                <h6>Description</h6>
                <p>${data.description}</p>
            </div>
            <div class="info-item">
                <h6>Analysis Environment</h6>
                <p>${data.analysis_env}</p>
            </div>
            <div class="info-item">
                <h6>Dataset</h6>
                <p class="dataset_view">${data.dataset}</p>
            </div>
            <div class="info-item">
                <h6>Modality</h6>
                <p>${data.modality}</p>
            </div>
            <div class="info-item">
                <h6>Gender</h6>
                <p>${data.gender.join(', ')}</p>
            </div>
            <div class="info-item">
                <h6>Age</h6>
                <p>${data.age}</p>
            </div>
            <div class="info-item">
                <h6>Date</h6>
                <p>${data.date}</p>
            </div>
            <div class="info-item">
                <h6>Data</h6>
                <p>${data.date}</p>
            </div>
            <div class="info-item">
                <h6>Status</h6>
                <p>${data.status}</p>
            </div>
            <div class="info-item">
                <h6>Updated Time</h6>
                <p>${data.updated_time}</p>
            </div>
            
            
        </div>
    `;

    $('.view_detail').html(html).show();
}


