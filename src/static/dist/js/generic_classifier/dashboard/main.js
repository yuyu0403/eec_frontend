ai.DashboardGC = {
    setCallback: function () {
        ai.DashboardGC.setPath();
    },
    setPath: function () {
        console.log(" dashboard");
            const categories = ['ECG', 'XRAY', 'MRI', 'CT'];
            const ecgRecords = 800035;
            const xrayRecords = 4999;
            const mriRecords = 1425;
        
            Highcharts.chart('Total-Records-Across-Modalities', {
                chart: {
                    type: 'bar',
                    backgroundColor:'#F7F7F7'
                  },
                  title: {
                    text: 'Total Records Across Modalities'
                  },
                  xAxis: {
                    categories: categories,
                    labels: {
                      style: { color: '#008687' }
                    },
                    lineColor: '#008687'
                  },
                  yAxis: {
                    min: 0,
                    title: {
                      text: 'Total Records',
                      align: 'high',
                      style: { color: '#008687' }
                    },
                    labels: {
                      overflow: 'justify'
                    }
                  },
                  tooltip: {
                    valueSuffix: 'Records'
                  },
                  plotOptions: {
                    bar: {
                      dataLabels: {
                        enabled: true
                      }
                    }
                  },
                  series: [{
                    name: '總資料數',
                    data: [ecgRecords, xrayRecords, mriRecords],
                    color: '#008687'
                  }]
                });
                
            const totalSubjects = [161352, 2149, 108, 32];
            const avgSubjects = [4.958320938073281, 2.326198231735691, 13.194444444444445, 2.1875];
            Highcharts.chart('Total-Subjects-Across-Modalities', {
                chart: {
                    type: 'bar',
                    backgroundColor: '#F7F7F7'
                },
                title: {
                    text: 'Total Subjects Across Modalities'
                },
                xAxis: {
                    categories: categories,
                    title: null,
                    labels: { style: { color: '#008687' } },
                    lineColor: '#008687'
                },
                yAxis: {
                    min: 0,
                    title: {
                    text: '總項目數',
                    align: 'high',
                    style: { color: '#008687' }
                    },
                    labels: { overflow: 'justify' }
                },
                tooltip: {
                    valueSuffix: ' 人'
                },
                plotOptions: {
                    bar: {
                    dataLabels: {
                        enabled: true
                    }
                    }
                },
                series: [{
                    name: 'Subjects',
                    data: totalSubjects,
                    color: '#008687'
                }]
                });
            
                // 平均項目數
                Highcharts.chart('Average-Subjects-Across-Modalities', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Average Subjects Across Modalities'
                    },
                    xAxis: {
                        categories: categories,
                        title: null,
                        labels: { style: { color: '#008687' } },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        min: 0,
                        title: {
                        text: '平均項目數',
                        align: 'high',
                        style: { color: '#008687' }
                        },
                        labels: { overflow: 'justify' }
                    },
                    tooltip: {
                        valueSuffix: ' 項目'
                    },
                    plotOptions: {
                        bar: {
                        dataLabels: {
                            enabled: true
                        }
                        }
                    },
                    series: [{
                        name: 'Average',
                        data: avgSubjects,
                        colorByPoint: true,
                        colors: ['#004D4D','#00C9A7', '#00C9D3','#00C2A0']
                    }]
                    });
            // fetch('http://127.0.0.1:8889/json/dashboard.json')
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return response.json(); // 解析 JSON 資料
            // })
            // .then(data => {
            //     const ecgRecords = data.data.ecg_stats.total_ecg_records;
            //     const xrayRecords = data.data.xray_stats.total_xray_files;
            //     const mriRecords = data.data.mri_stats.total_mri_files;
            
            //     Highcharts.chart('Total-Records-Across-Modalities', {
            //         chart: {
            //         type: 'column',
            //         backgroundColor:'#F7F7F7'
            //         },
            //         title: {
            //         text: 'Total Records Across Modalities',
            //         style: { color: '#008687' }
            //         },
            //         xAxis: {
            //         categories: ['ECG', 'X-ray', 'MRI'],
            //         title: {
            //             text: 'Modality'
            //         },
            //         labels: {
            //             style: { color: '#008687' }
            //         }
            //         },
            //         yAxis: {
            //         title: {
            //             text: 'Record Count',
            //             style: { color: '#008687' }
            //         },
            //         labels: {
            //             formatter: function () {
            //             return this.value.toLocaleString(); // 加上千分位
            //             }
            //         }
            //         },
            //         tooltip: {
            //         pointFormat: '<b>{point.y:,.0f} records</b>'
            //         },
            //         series: [{
            //         name: 'Total Records',
            //         data: [ecgRecords, xrayRecords, mriRecords],
            //         colorByPoint: true,
            //         colors: ['#008687', '#00b89b', '#00c5a9']
            //         }]
            //     });
            // })
        

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let bins = data.data.age_distribution.bins;
                let agecounts = data.data.age_distribution.counts;

                Highcharts.chart('age-distribution', {
                    chart: {
                        type: 'column',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'age distribution',
                        style: {
                            color: '#008687',
                            fontWeight: 'bold'
                        }
                    },
                    xAxis: {
                        categories: bins, 
                        labels: {
                            style: { color: '#008687' }
                        },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        title: {
                            text: '人數',
                            style: { color: '#008687' }
                        }
                    },
                    legend: {
                        enabled: false,
                    },
                    tooltip: {
                        backgroundColor: '#008687',
                        style: { color: '#ffffff' }
                    },
                    plotOptions: {
                        column: {
                            borderRadius: 5,
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },
                    series: [{
                        name: '人數',
                        data: agecounts, // 使用 JSON 提供的數據
                        color: '#008687'
                    }]
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let female = data.data.gender_distribution.female;
                let male = data.data.gender_distribution.male;

                Highcharts.chart('gender-distribution', {
                    chart: {
                        type: 'pie',
                        backgroundColor:'#F7F7F7'
                    }, 
                    title: {
                        text: 'Gender Distribution', 
                        style: {
                            color: '#008687',
                            fontWeight: 'bold'
                        }
                    }, 
                    series: [{
                        name: '人數', 
                        data: [{name: '男性', y:female, color: '#008687',}, 
                            {name: '女性', y:male, color: '#00b89b'},],
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}人<br>{point.percentage:.1f}%'
                        }
                    }]
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let icddata = data.data.icd_distribution;
                let categories = Object.keys(icddata);
                let seriesData = Object.values(icddata); 
                Highcharts.chart('icd-distribution', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'ICD Distribution',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: categories,
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
                        data: seriesData,
                        color: '#008687',
                        dataLabels: {
                            enabled: true,
                        }
                    }]
                });

            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let lab_test_names = data.data.lab_tests_distribution.lab_test_names;
                let labcounts = data.data.lab_tests_distribution.counts; 
                Highcharts.chart('lab-tests-distribution', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'},
                    title: {
                        text: 'Lab Tests Distribution',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: lab_test_names,
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
                        data: labcounts,
                        color: '#008687',
                        dataLabels: {
                            enabled: true,
                        }
                    }]
                });

            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let medications = data.data.medication_distribution.medications;
                let medicationcounts = data.data.medication_distribution.counts;

                Highcharts.chart('medication-distribution', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Medication Distribution',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: medications,
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
                        data: medicationcounts,
                        color: '#008687'
                    }]
                });

            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let arrhythmiadata = data.data.arrhythmia_distribution;
                let arrhythmiakey = Object.keys(arrhythmiadata);
                let arrhythmiavalue =  Object.values(arrhythmiadata);
                let colors = ['#008687', '#00b89b', '#00c5a9', '#00d6b6', '#00e1c4', '#00ebd2','#00f5e0'];
                let pieData = arrhythmiakey.map((key, index) => {
                    return {
                        name: `${key}: ${arrhythmiavalue[index]}人`,
                        y: arrhythmiavalue[index],
                        color: index < colors.length ? colors[index] : '#000000'
                    };
                });
                Highcharts.chart('arrhythmia-distribution', {
                    chart: {
                        type: 'pie',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Arrhythmia Distribution',
                        style: {color: '#008687'} // 主色系
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.name} <br> {point.percentage:.1f} %',
                                style: {
                                    color: '#000000',
                                    fontSize: '11px'
                                },
                                connectorColor: '#000000'
                            }
                        }
                    },
                    series: [{
                        name: '人數',
                        data: pieData
                    }]
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                let heart_rate = data.data.heart_rate_distribution.bins;
                let heart_ratecounts = data.data.heart_rate_distribution.counts;

                Highcharts.chart('heart-rate-distribution', {
                    chart: {
                        type: 'column',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Heart Rate Distribution',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: heart_rate,
                        labels: {
                            style: {color: '#008687'}
                        },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        title: {
                            text: '人數', 
                            style: {color: '#008687'}
                        }
                    },
                    legend: {enabled: false},
                    series: [{
                        name: '人數',
                        data: heart_ratecounts,
                        color: '#008687'
                    }]
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                const ecg = data.data.ecg_intervals;
                const allBins = [
                "0-100", "101-120", "121-140", "141-160",
                "161-180", "181-200", "201-220", ">220"
                ];

                const mapCounts = (bins, counts) => {
                const binMap = {};
                bins.forEach((bin, i) => {
                    binMap[bin] = counts[i];
                });
                return allBins.map(bin => binMap[bin] || 0);
                };

                const prCounts = mapCounts(ecg.PR_interval.bins, ecg.PR_interval.counts);
                const qrsCounts = mapCounts(ecg.QRS_duration.bins, ecg.QRS_duration.counts);
                const qtcCounts = mapCounts(ecg.QTc_interval.bins, ecg.QTc_interval.counts);

                Highcharts.chart('ecg-intervals', {
                chart: { 
                    type: 'column',
                    backgroundColor: '#F7F7F7'
                 },
                title: {
                    text: 'ECG Intervals',
                    style: { color: '#008687' }
                },
                xAxis: {
                    categories: allBins,
                    labels: { style: { color: '#008687' } },
                    lineColor: '#008687'
                },
                yAxis: {
                    title: { text: '人數', style: { color: '#008687' } }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' 人'
                },
                plotOptions: {
                    column: {
                    grouping: true,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:,.0f}'
                    }
                    }
                },
                series: [{
                    name: 'PR Interval',
                    data: prCounts,
                    color: '#008687'
                }, {
                    name: 'QRS Duration',
                    data: qrsCounts,
                    color: '#00b89b'
                }, {
                    name: 'QTc Interval',
                    data: qtcCounts,
                    color: '#00c5a9'
                }]
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
           
    }
};
