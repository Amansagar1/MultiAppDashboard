// import { nanoid } from 'nanoid';

// export const NewCharts = (chartType) => {

//     return {
//         i: nanoid(9),
//         x: 0,
//         y: Infinity,
//         w: 3,
//         h: 2,
//         type: chartType,
//         props: {
//             // ------ General Properties ------
//             backgroundColor: '#ffffff',
//             showAnimation: false,
//             enableZoom: false,
//             showBorder: false,
//             borderSize: 1,
//             borderColor: '#e0e0e0',
//             maxDataPoints: 100, // Maximum number of data points to display at once
//             updateInterval: 1000,
//             colorScheme: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],

//             // ------ Title Properties ------
//             name: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
//             nameSize: 12,
//             nameColor: '#333333',
//             nameBold: false,
//             nameItalic: false,
//             titlePosition: 'center',

//             // ------ Legends Properties ------
//             showLegend: false,
//             legendPosition: 'right',

//             // ------ Axes Properties ------
//             showGridLines: true,
//             gridLineColor: '#e0e0e0',
//             xAxisLabel: 'X Axis',
//             xAxisLabelSize: 12,
//             xAxisLabelColor: '#666666',
//             yAxisLabel: 'Y Axis',
//             yAxisLabelSize: 12,
//             yAxisLabelColor: '#666666',

//             // ------ Data Labels Properties ------
//             showDataLabels: false,
//             showDataPoints: true,
//             labelSize: 12,
//             labelColor: '#666666',
//             dataLabelPosition: 'inside',

//             // ------------------- Specific Charts Properties --------------------------------

//             // ------ Line & Multiple charts ------
//             lineStyles: ['solid', 'dashed', 'dotted'],
//             lineWidth: 2,


//             // ------ Bar Chart specific properties ------
//             barGap: '30%',
//             barCategoryGap: '20%',
//             barOrientation: 'vertical',

//             // ------ Area charts ------
//             showArea: true,
//             curveType: 'curveLinear',
//             areaOpacity: 0.1,
//             showLine: true,
//             baselineValue: 0,
//             stackAreas: false,
//             fillGradientStart: '#ffffff',
//             fillGradientEnd: '#000000',

//             // ------ Pie & Doughnut charts ------
//             innerRadius: 50,
//             outerRadius: 70,
//             padAngle: 0,
//             cornerRadius: 2,
//             sortData: true,

//             // ------ Funnel Chart specific properties ------
//             funnelAlign: 'center',
//             funnelWidth: '80%',
//             funnelGap: 2,
//             funnelSort: 'descending',

//             // ------ Scatter Chart specific properties ------
//             symbolSize: 10,
//             symbolType: 'circle',
//             showTrendLine: false,
//             trendLineType: 'linear',

//             // ------ Stacked Area Chart specific properties ------
//             // areaOpacity: 0.7,
//             smooth: false,
//             showSymbol: true,

//             // ------ Histogram Chart specific properties ------
//             barGap: '30%',
//             barCategoryGap: '20%',
//             stack: true,

//             // Box Plot specific properties
//             boxColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
//             showOutliers: true,
//             outlierColor: '#ee6666',
//             boxWidth: 50,
//             boxBorderWidth: 1,
//             boxBorderColor: '#000',
//             whiskerWidth: 2,
//             whiskerColor: '#000',
//             medianColor: '#fff',
//             medianWidth: 2,
//             capWidth: 20,
//             capColor: '#000',
//             outlierSymbol: 'circle',
//             outlierSize: 6,

//             // Bubble Chart specific properties
//             bubbleMinSize: 10,
//             bubbleMaxSize: 50,
//             bubbleOpacity: 0.7,
//             showBubbleBorder: false,
//             bubbleBorderColor: '#000000',
//             bubbleBorderWidth: 1,

//             // Radar Chart specific properties
//             shapeType: 'polygon',
//             radius: '60%',
//             splitNumber: 5,
//             axisLineColor: '#999',
//             splitLineColor: '#ccc',
//             splitAreaColors: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
//             areaOpacity: 0.7,
//             showSymbol: true,
//             symbolSize: 4,
//             lineWidth: 2,

//             // TreeMap Chart specific properties
//             leafDepth: 2,
//             visibleMin: 20,
//             childrenVisibleMin: 2,
//             upperLabelHeight: 40,
//             upperLabelFontSize: 12,
//             upperLabelColor: '#ffffff',
//             itemBorderWidth: 2,
//             itemBorderColor: '#f0f0f0',
//             hoverColor: '#FF6F61',
//             roam: false,
//             zoomToNodeRatio: 0.1,

//             // Table-specific Properties
//             columnWidth: [],
//             alternateRowColor: '#f5f5f5',
//             headerBackgroundColor: '#e6e6e6',
//             showData: true,
//             // columnWidth: [100, 150, 200],
//             showTableLines: true,
//             tableLineColor: "#cccccc",
//             columnHeaderSize: 16,
//             columnHeaderColor: "#000000",
//             dataLabelSize: 14,
//             dataLabelColor: "#333333",
//             decimalPlaces: 3,

//             // Numeric Card Specific Properties
//             valueSize: 24,
//             valueColor: '#0000ff',
//             numericNameSize: 16,
//             numericNameColor: '#333333',
//             decimalPlaces: 2,
//             showTrend: false,
//             trendConditions: [{ operator: '>', value: 0, color: '#00FF00' }], // New property
//             additionalText: "",

//             // Gauge Specific Properties
//             gaugeMin: 0,
//             gaugeMax: 100,
//             gaugeStartAngle: 180,
//             gaugeEndAngle: 0,
//             showGaugeAxis: true,
//             showGaugeSplitLine: true,
//             showGaugePointer: true,
//             gaugePointerColor: '#000000',
//             gaugePointerWidth: 2,
//             gaugeAxisLineColor: '#E6EBF8',
//             gaugeSplitLineColor: '#E6EBF8',
//             gaugeProgressColor: '#3B82F6',
//             valuePrefix: '',
//             valueSuffix: '',
//             decimalPlaces: 2,

//             // LogoIcon specific properties
//             imageUrl: '',
//             imageAlt: 'Logo',
//             imageWidth: 100,
//             imageHeight: 100,
//             imageFit: 'contain',
//             localImage: null,

//         },
//     };
// };






import { nanoid } from 'nanoid';

const baseProps = {
    backgroundColor: '#ffffff',
    showAnimation: false,
    enableZoom: false,
    showBorder: false,
    borderSize: 1,
    borderColor: '#e0e0e0',
    maxDataPoints: 100,
    updateInterval: 1000,
    colorScheme: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    name: '',
    nameSize: 12,
    nameColor: '#333333',
    nameBold: false,
    nameItalic: false,
    titlePosition: 'center',
    showLegend: false,
    legendPosition: 'right',
    showGridLines: true,
    gridLineColor: '#e0e0e0',
    xAxisLabel: 'X Axis',
    xAxisLabelSize: 12,
    xAxisLabelColor: '#666666',
    yAxisLabel: 'Y Axis',
    yAxisLabelSize: 12,
    yAxisLabelColor: '#666666',
    showDataLabels: false,
    showDataPoints: true,
    labelSize: 12,
    labelColor: '#666666',
    dataLabelPosition: 'inside'
};

const chartSpecificProps = {
    line: {
        lineStyles: ['solid', 'dashed', 'dotted'],
        lineWidth: 2
    },
    bar: {
        barGap: '30%',
        barCategoryGap: '20%',
        barOrientation: 'vertical'
    },
    area: {
        showArea: true,
        curveType: 'curveLinear',
        areaOpacity: 0.1,
        showLine: true,
        baselineValue: 0,
        stackAreas: false,
        fillGradientStart: '#ffffff',
        fillGradientEnd: '#000000'
    },
    pie: {
        innerRadius: 0,
        outerRadius: 70,
        padAngle: 0,
        cornerRadius: 2,
        sortData: true
    },
    doughnut: {
        innerRadius: 50,
        outerRadius: 70,
        padAngle: 0,
        cornerRadius: 2,
        sortData: true
    },
    funnel: {
        funnelAlign: 'center',
        funnelWidth: '80%',
        funnelGap: 2,
        funnelSort: 'descending'
    },
    scatter: {
        symbolSize: 10,
        symbolType: 'circle',
        showTrendLine: false,
        trendLineType: 'linear'
    },
    stackedArea: {
        areaOpacity: 0.7,
        smooth: false,
        showSymbol: true
    },
    histogram: {
        barGap: '30%',
        barCategoryGap: '20%',
        stack: true
    },
    box: {
        boxColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
        showOutliers: true,
        outlierColor: '#ee6666',
        boxWidth: 50,
        boxBorderWidth: 1,
        boxBorderColor: '#000',
        whiskerWidth: 2,
        whiskerColor: '#000',
        medianColor: '#fff',
        medianWidth: 2,
        capWidth: 20,
        capColor: '#000',
        outlierSymbol: 'circle',
        outlierSize: 6
    },
    bubble: {
        bubbleMinSize: 10,
        bubbleMaxSize: 50,
        bubbleOpacity: 0.7,
        showBubbleBorder: false,
        bubbleBorderColor: '#000000',
        bubbleBorderWidth: 1
    },
    radar: {
        shapeType: 'polygon',
        radius: '60%',
        splitNumber: 5,
        axisLineColor: '#999',
        splitLineColor: '#ccc',
        splitAreaColors: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        areaOpacity: 0.7,
        showSymbol: true,
        symbolSize: 4,
        lineWidth: 2
    },
    treeMap: {
        leafDepth: 2,
        visibleMin: 20,
        childrenVisibleMin: 2,
        upperLabelHeight: 40,
        upperLabelFontSize: 12,
        upperLabelColor: '#ffffff',
        itemBorderWidth: 2,
        itemBorderColor: '#f0f0f0',
        hoverColor: '#FF6F61',
        roam: false,
        zoomToNodeRatio: 0.1
    },
    table: {
        columnWidth: [],
        alternateRowColor: '#f5f5f5',
        headerBackgroundColor: '#e6e6e6',
        showData: true,
        showTableLines: true,
        tableLineColor: "#cccccc",
        columnHeaderSize: 16,
        columnHeaderColor: "#000000",
        dataLabelSize: 14,
        dataLabelColor: "#333333",
        decimalPlaces: 3
    },
    numericCard: {
        valueSize: 24,
        valueColor: '#0000ff',
        numericNameSize: 16,
        numericNameColor: '#333333',
        decimalPlaces: 2,
        showTrend: false,
        trendConditions: [{ operator: '>', value: 0, color: '#00FF00' }],
        additionalText: ""
    },
    gauge: {
        gaugeMin: 0,
        gaugeMax: 100,
        gaugeStartAngle: 180,
        gaugeEndAngle: 0,
        showGaugeAxis: true,
        showGaugeSplitLine: true,
        showGaugePointer: true,
        gaugePointerColor: '#000000',
        gaugePointerWidth: 2,
        gaugeAxisLineColor: '#E6EBF8',
        gaugeSplitLineColor: '#E6EBF8',
        gaugeProgressColor: '#3B82F6',
        valuePrefix: '',
        valueSuffix: '',
        decimalPlaces: 2
    },
    logo: {
        imageUrl: '',
        imageAlt: 'Logo',
        imageWidth: 100,
        imageHeight: 100,
        imageFit: 'contain',
        localImage: null
    },
    list: {
        nodes: [],
        supportHierarchicalNodes: true,
        textColor: '#333333',
        fontSize: '14px',
        activeNodeColor: '#e6f7ff'
    },
    layout: {
        selectedNode: [],
        layoutId: "",
        layoutName: "",
    },
    svg: {
        svgContent: '',
        defaultFillColor: '#4472C4',
        defaultStrokeColor: '#172C51',
        defaultTextColor: '#000000',
        defaultTextSize: 24,
        conditions: [{
            targetElementId: '',
            dataSource: '',
            operator: '>',
            value: 0,
            fillColor: '#4472C4',
            strokeColor: '#172C51',
            textColor: '#4472C4',
            textSize: 24
        }],
        showAnimation: false,
        decimalPlaces: 2
    }
};

export const NewCharts = (chartType) => {

    // Get type-specific props or empty object if type doesn't exist
    const typeSpecificProps = chartSpecificProps[chartType] || {};

    // Determine which base props to include based on chart type
    const finalBaseProps = { ...baseProps };

    // Special case for title cards - they only need name-related properties
    if (chartType === 'title') {
        const { name, nameSize, nameColor, nameBold, nameItalic, titlePosition } = baseProps;
        return {
            i: nanoid(9),
            x: 0,
            y: Infinity,
            w: 1,
            h: 1,
            type: chartType,
            props: { name, nameSize, nameColor, nameBold, nameItalic, titlePosition, titleOrientation: 'horizontal' }
        };
    }

    if (chartType === 'list') {
        return {
            i: nanoid(9),
            x: 0,
            y: Infinity,
            w: 3,
            h: 2,
            type: chartType,
            props: {
                nodes: [],
                supportHierarchicalNodes: true,
                layoutId: "",
                ...typeSpecificProps
            }
        };
    }

    if (chartType === 'layout') {
        return {
            i: nanoid(9),
            x: 0,
            y: Infinity,
            w: 3,
            h: 2,
            type: chartType,
            props: {
                layoutId: "",
                layoutName: "New Layout Area",
                selectedNode: [],
                ...typeSpecificProps
            }
        };
    }

    if (chartType === 'svg') {
        return {
            i: nanoid(9),
            x: 0,
            y: Infinity,
            w: 3,
            h: 2,
            type: chartType,
            props: {
                ...finalBaseProps,
                ...typeSpecificProps
            }
        };
    }

    // Set the name property
    finalBaseProps.name = `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`;

    return {
        i: nanoid(9),
        x: 0,
        y: Infinity,
        w: 3,
        h: 2,
        type: chartType,
        props: {
            ...finalBaseProps,
            ...typeSpecificProps
        }
    };
};