ai.DashboardGC = {
    setCallback: function () {
        ai.DashboardGC.setPath();
    },
    setPath: function () {
        console.log(" dashboard"); 
            fetch('http://127.0.0.1:8889/json/dashboard.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析 JSON 資料
            })
            .then(data => {
                const records = data.data.stat.records.categories;
                const recordsdata = data.data.stat.records.data;
        
                const maxValue = Math.max(...recordsdata);
                const recordsData = recordsdata.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });

                Highcharts.chart('Total-Records-Across-Modalities', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Total Records Across Modalities',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: records,
                        labels: {
                            style: {color: '#008687'}
                        },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        min: 0, 
                        tickInterval: 100000,
                        title: {text: '總資料數', style: {color: '#008687'}}
                    },
                    legend: {enabled: false},
                    series: [{
                        name: '總資料數',
                        data: recordsData ,
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
                const subjects = data.data.stat.subjects.categories;
                const subjectsdata = data.data.stat.subjects.data;
                const maxValue = Math.max(...subjectsdata);
                const subjectsData = subjectsdata.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
                Highcharts.chart('Total-Subjects-Across-Modalities', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Total Subjects Across Modalities',
                        style: {color: '#008687'}
                    },
                    xAxis: {
                        categories: subjects,
                        labels: {
                            style: {color: '#008687'}
                        },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        min: 0, 
                        tickInterval: 25000,
                        title: {text: '總項目數', style: {color: '#008687'}}
                    },
                    legend: {enabled: false},
                    series: [{
                        name: '總項目數',
                        data: subjectsData ,
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
                const avg_subjects = data.data.stat.avg_subjects.categories;
                const avg_subjectsdata = data.data.stat.avg_subjects.data;
            
                const maxValue = Math.max(...avg_subjectsdata);
                const avgData = avg_subjectsdata.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
            
                Highcharts.chart('Average-Subjects-Across-Modalities', {
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F7F7F7'
                    },
                    title: {
                        text: 'Average Subjects Across Modalities',
                        style: { color: '#008687' }
                    },
                    xAxis: {
                        categories: avg_subjects,
                        labels: { style: { color: '#008687' } },
                        lineColor: '#008687'
                    },
                    yAxis: {
                        min: 0,
                        tickInterval: 2,
                        title: { text: '平均項目數', style: { color: '#008687' } }
                    },
                    legend: { enabled: false },
                    series: [{
                        name: '平均項目數',
                        data: avgData,
                        dataLabels: { enabled: true }
                    }]
                });
            })
            
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
                
                const maxValue = Math.max(...agecounts);
                const ageData = agecounts.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
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
                        data: ageData
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

                const maxValue = Math.max(...seriesData);
                const icdData = seriesData.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
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
                        data: icdData,
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
                const maxValue = Math.max(...labcounts);
                const minValue = Math.min(...labcounts);
                const labData = labcounts.map(val => {
                    const ratio =(val - minValue) / (maxValue - minValue);
                    const color = `hsl(180,55%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
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
                        data: labData,
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

                const maxValue = Math.max(...medicationcounts);
                const medData = medicationcounts.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
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
                        data: medData,
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

                const maxValue = Math.max(...heart_ratecounts);
                const heartData = heart_ratecounts.map(val => {
                    const ratio = val / maxValue;
                    const color = `hsl(180, 50%, ${55 - ratio * 30}%)`; 
                    return {
                        y: val,
                        color: color
                    };
                });
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
                        data: heartData,
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
