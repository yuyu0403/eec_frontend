ai.DashboardGC = {
    setCallback: function () {
        ai.DashboardGC.setPath();
    },
    setPath: function () {
        console.log("setPath dashboard");
            Highcharts.chart('age-distribution', {
                chart: {
                    type: 'column',
                    backgroundColor: '#F9F9F9'
                }, title: {
                    text: 'Age Distribution', style: {
                        color: '#008687',
                        fontWeight: 'bold'
                    }
                }, xAxis: {
                    categories: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61+"], labels: {
                        style: {color: '#008687'}
                    }, lineColor: '#008687'
                }, yAxis: {
                    title: {
                        text: '人數', style: {color: '#008687'}
                    }
                }, legend: {
                    enabled: false,
                }, tooltip: {
                    backgroundColor: '#008687', style: {color: '#ffffff'} 
                }, plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                        }
                    }
                }, series: [{
                    name: '人數', data: [50, 120, 300, 450, 600, 700, 500], color: '#008687'
                }]
            });
            
            
            Highcharts.chart('gender-distribution', {
                chart: {
                    type: 'pie',
                    backgroundColor: '#F9F9F9'
                }, title: {
                    text: 'Gender Distribution', style: {
                        color: '#008687',
                        fontWeight: 'bold'
                    }
                }, series: [{
                    name: '人數', data: [{name: '男性', y: 400, color: '#008687',}, {name: '女性', y: 350, color: '#00b89b'},]
                }]
            });
            
            Highcharts.chart('icd-distribution', {
                chart: {
                    type: 'bar',
                    backgroundColor: '#F9F9F9'
                },
                title: {
                    text: 'ICD Distribution',
                    style: {color: '#008687'}
                },
                xAxis: {
                    categories: ['I10', 'E11', 'J18'],
                    labels: {
                        style: {color: '#008687'}
                    },
                    lineColor: '#008687'
                },
                yAxis: {
                    title: {text: '病例數', style: {color: '#008687'}}
                },
                legend: {enabled: false},
                series: [{
                    name: '病例數',
                    data: [200, 180, 100],
                    color: '#008687'
                }]
            });
            
            Highcharts.chart('lab-tests-boxplot', {
                chart: {
                    type: 'boxplot',
                    backgroundColor: '#F9F9F9'
                },
                title: {
                    text: 'Lab Tests Boxplot',
                    style: {color: '#008687'}
                },
                xAxis: {
                    categories: ['Glucose', 'Creatinine', 'Sodium', 'Potassium', 'Hemoglobin'],
                    labels: {
                        style: {color: '#008687'}
                    },
                    lineColor: '#008687'
                },
                yAxis: {
                    title: {text: '測試值', style: {color: '#008687'}}
                },
                legend: {enabled: false},
                series: [{
                    name: '測試數據',
                    data: [
                        [85, 90, 102, 110, 130],   // Glucose
                        [0.7, 0.8, 1.1, 1.2, 1.3], // Creatinine
                        [135, 136, 138, 140, 145], // Sodium
                        [3.5, 3.8, 4.0, 4.2, 4.8], // Potassium
                        [12.8, 13.5, 14.2, 14.5, 16] // Hemoglobin
                    ],
                    color: '#008687'
                }]
            });
            
            Highcharts.chart('medication-distribution', {
                chart: {
                    type: 'bar',
                    backgroundColor: '#F9F9F9'
                },
                title: {
                    text: 'Medication Distribution',
                    style: {color: '#008687'}
                },
                xAxis: {
                    categories: ["Aspirin", "Metformin", "Atorvastatin", "Lisinopril", "Albuterol"],
                    labels: {
                        style: {color: '#008687'}
                    },
                    lineColor: '#008687'
                },
                yAxis: {
                    title: {text: '人數', style: {color: '#008687'}}
                },
                legend: {enabled: false},
                series: [{
                    name: '人數',
                    data: [150, 200, 250, 180, 90],
                    color: '#008687'
                }]
            });
            
            Highcharts.chart('heart-rate-distribution', {
                chart: {
                    type: 'column',
                    backgroundColor: '#F9F9F9'
                },
                title: {
                    text: 'Heart Rate Distribution',
                    style: {color: '#008687'}
                },
                xAxis: {
                    categories: ["<50", "50-60", "61-70", "71-80", "81-90", "91-100", ">100"],
                    labels: {
                        style: {color: '#008687'}
                    },
                    lineColor: '#008687'
                },
                yAxis: {
                    title: {text: '人數', style: {color: '#008687'}}
                },
                legend: {enabled: false},
                series: [{
                    name: '人數',
                    data: [30, 120, 200, 300, 250, 150, 50],
                    color: '#008687'
                }]
            });
            
            Highcharts.chart('arrhythmia-distribution', {
                chart: {
                    type: 'pie',
                    backgroundColor: '#F9F9F9'},
                title: {
                    text: 'Arrhythmia Distribution',
                    style: {color: '#008687'} // 主色系
                },
                series: [{
                    name: '人數',
                    data: [
                        {name: 'Normal Sinus Rhythm', y: 400, color: '#008687'},
                        {name: 'Atrial Fibrillation', y: 150, color: '#00b89b'},
                        {name: 'Tachycardia', y: 120, color: '#00c5a9'},
                        {name: 'Bradycardia', y: 80, color: '#00d6b6'},
                        {name: 'PVC', y: 50, color: '#00e1c4'},
                        {name: 'Other', y: 100, color: '#00ebd2'}
                    ]
                }]
            });
            
            Highcharts.chart('ecg-intervals', {
                chart: {
                    type: 'column',
                    backgroundColor: '#F9F9F9'},
                title: {
                    text: 'ECG Intervals',
                    style: {color: '#008687'} // 主色系
                },
                xAxis: {
                    categories: ["100-120", "120-140", "140-160", "160-180", "180-200", "200-220"],
                    labels: {
                        style: {color: '#008687'} // 設定 X 軸標籤顏色
                    },
                    lineColor: '#008687' // 設定 X 軸線條顏色
                },
                yAxis: {
                    title: {text: '人數', style: {color: '#008687'}} // 設定 Y 軸顏色
                },
                series: [{
                    name: 'PR Interval',
                    data: [150, 320, 450, 200, 80, 40],
                    color: '#008687' // 主色系
                }, {
                    name: 'QRS Duration',
                    data: [100, 500, 350, 50, 0, 0],
                    color: '#00b89b'
                }, {
                    name: 'QTc Interval',
                    data: [50, 200, 500, 150, 30, 0],
                    color: '#00c5a9'
                }]
            });
        
    },
};

window.onload = function () {
    ai.OverviewGC.setCallback();
};