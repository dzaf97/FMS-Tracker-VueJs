export let tripStatus = {
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: "right",
        labels: {
            usePointStyle: true,
            pointStyle: {
                margin: "10px"
            },
            boxWidth: 10,
            fontColor: "white",
        },
    },
    elements: {
        center: {
            text: '',
            color: '#FFFFF', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 30 // Default is 25 (in px), used for when text wraps
        }
    },
    responsive: true,
    cutoutPercentage: 80,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
    },
    animation: {
        duration: 500,
        onProgress: function (chart) {
            if (chart.chart.config.options.elements.center) {
                // Get ctx from string
                var ctx = chart.chart.ctx;

                // Get options from the center object in options
                var centerConfig = chart.chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var maxFontSize = centerConfig.maxFontSize || 75;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                // Start with a base font of 30px
                ctx.font = "20px " + fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                var minFontSize = centerConfig.minFontSize;
                var lineHeight = centerConfig.lineHeight || 25;
                var wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chart.chartArea.left + chart.chart.chartArea.right) / 2);
                var centerY = ((chart.chart.chartArea.top + chart.chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;


                //Draw text in center
                ctx.fillText("Trip", centerX, centerY - 15);
                ctx.fillText("Status", centerX, centerY + 15);
            }
        },
    },

    scales: {
        yAxes: [
            {
                display: 0,
                ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: 'transparent',
                    color: 'rgba(255,255,255,0.05)'
                }
            }
        ],

        xAxes: [
            {
                display: 0,
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(255,255,255,0.1)',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    display: false
                }
            }
        ]
    }
};


export let ladenUnladen = {
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: "right",
        labels: {
            usePointStyle: true,
            pointStyle: {
                margin: "10px"
            },
            boxWidth: 10,
            fontColor: "white",
        },
    },
    elements: {
        center: {
            text: '',
            color: '#FFFFF', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 30 // Default is 25 (in px), used for when text wraps
        }
    },
    responsive: true,
    cutoutPercentage: 80,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
    },
    animation: {
        duration: 500,
        onProgress: function (chart) {
            if (chart.chart.config.options.elements.center) {
                // Get ctx from string
                var ctx = chart.chart.ctx;

                // Get options from the center object in options
                var centerConfig = chart.chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var maxFontSize = centerConfig.maxFontSize || 75;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                // Start with a base font of 30px
                ctx.font = "18px " + fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                var minFontSize = centerConfig.minFontSize;
                var lineHeight = centerConfig.lineHeight || 25;
                var wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chart.chartArea.left + chart.chart.chartArea.right) / 2);
                var centerY = ((chart.chart.chartArea.top + chart.chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;


                //Draw text in center
                ctx.fillText("Laden", centerX, centerY - 25);
                ctx.fillText("VS", centerX, centerY);
                ctx.fillText("Unladen", centerX, centerY + 25);
            }
        },
    },

    scales: {
        yAxes: [
            {
                display: 0,
                ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: 'transparent',
                    color: 'rgba(255,255,255,0.05)'
                }
            }
        ],

        xAxes: [
            {
                display: 0,
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(255,255,255,0.1)',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    display: false
                }
            }
        ]
    }
};


export let returningLaden = {
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: "right",
        labels: {
            usePointStyle: true,
            pointStyle: {
                margin: "10px"
            },
            boxWidth: 10,
            fontColor: "white",
        },
    },
    elements: {
        center: {
            text: '',
            color: '#FFFFF', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 30 // Default is 25 (in px), used for when text wraps
        }
    },
    responsive: true,
    cutoutPercentage: 80,
    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
    },
    animation: {
        duration: 500,
        onProgress: function (chart) {
            if (chart.chart.config.options.elements.center) {
                // Get ctx from string
                var ctx = chart.chart.ctx;

                // Get options from the center object in options
                var centerConfig = chart.chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var maxFontSize = centerConfig.maxFontSize || 75;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                // Start with a base font of 30px
                ctx.font = "20px " + fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                var minFontSize = centerConfig.minFontSize;
                var lineHeight = centerConfig.lineHeight || 25;
                var wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chart.chartArea.left + chart.chart.chartArea.right) / 2);
                var centerY = ((chart.chart.chartArea.top + chart.chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;


                //Draw text in center
                ctx.fillText("Returning", centerX, centerY - 15);
                ctx.fillText("Unladen", centerX, centerY + 15);
            }
        },
    },

    scales: {
        yAxes: [
            {
                display: 0,
                ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: 'transparent',
                    color: 'rgba(255,255,255,0.05)'
                }
            }
        ],

        xAxes: [
            {
                display: 0,
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(255,255,255,0.1)',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    display: false
                }
            }
        ]
    }
};
