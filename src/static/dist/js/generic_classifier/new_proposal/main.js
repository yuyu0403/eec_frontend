ai.ProposalGC = {
    setCallback: function () {
        ai.ProposalGC.setPath();
    },
    setPath: function () {
        console.log("setPath proposal");
        
    },
};


window.addEventListener('DOMContentLoaded', function () {
fetch('/static/dist/json/option.json') // 替換為你的 API 路徑
    .then(response => response.json())
    .then(data => {
    console.log(data.data.dataset);
    const datasetSelect = document.getElementById('dataset');
    datasetSelect.innerHTML = ''; // 清空原有選項（如果有）

    const datasetArray = data.data.dataset || [];
    datasetArray.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.name;
        option.classList.add('option');
        datasetSelect.appendChild(option);
    });

    const modalitySelect = document.getElementById('modality');
    modalitySelect.innerHTML = ''; // 清空原有選項（如果有）

    const modalityArray = data.data.modality || [];
    modalityArray.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.name;
        option.classList.add('option');
        modalitySelect.appendChild(option);
    });

    })
    .catch(error => {
    console.error('載入 Dataset 失敗:', error);
    });
});
