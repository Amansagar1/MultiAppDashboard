import dynamic from 'next/dynamic';

const chartComponents = {
    layout: dynamic(() => import('@/Components/Charts/LayoutArea')),
    list: dynamic(() => import('@/Components/Charts/NodeList')),
    svg: dynamic(() => import('@/Components/Charts/SVGImage')),
    title: dynamic(() => import('@/Components/Charts/TitleCard')),
    logo: dynamic(() => import('@/Components/Charts/LogoIcon')),
    bar: dynamic(() => import('@/Components/Charts/BarChart')),
    pie: dynamic(() => import('@/Components/Charts/PieChart')),
    line: dynamic(() => import('@/Components/Charts/LineChart')),
    scatter: dynamic(() => import('@/Components/Charts/ScatterPlot')),
    area: dynamic(() => import('@/Components/Charts/AreaChart')),
    gauge: dynamic(() => import('@/Components/Charts/GaugeChart')),
    numericCard: dynamic(() => import('@/Components/Charts/NumericCardChart')),
    combo: dynamic(() => import('@/Components/Charts/ComboChart')),
    candle: dynamic(() => import('@/Components/Charts/CandleStick')),
    bubble: dynamic(() => import('@/Components/Charts/BubbleChart')),
    box: dynamic(() => import('@/Components/Charts/BoxPlot')),
    funnel: dynamic(() => import('@/Components/Charts/FunnelChart')),
    histogram: dynamic(() => import('@/Components/Charts/HistoGramChart')),
    doughnut: dynamic(() => import('@/Components/Charts/DoughnutChart')),
    stackedArea: dynamic(() => import('@/Components/Charts/StackedAreaChart')),
    radar: dynamic(() => import('@/Components/Charts/RadarPlot')),
    treeMap: dynamic(() => import('@/Components/Charts/TreeMap')),
    table: dynamic(() => import('@/Components/Charts/TableChart')),
};

export default chartComponents;
