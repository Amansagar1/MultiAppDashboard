import React, { useState, useCallback, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useTheme } from '@/Components/Context/ThemeContext';
import chartComponents from '@/utils/ChartComponents';
import DataFetcher from '@/Components/DataFetcher/DataFetcher';
import { getDashboardInstance } from '@/WebServices/ApiControllers';

const ResponsiveGridLayout = WidthProvider(Responsive);

const USE_LOCAL_DATA = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true';

const LayoutArea = ({
    selectedNode,
    layoutId,
    layoutName = 'Layout Area',
    showBorder = true,
    borderColor = '#e0e0e0',
    timeRange, // New prop
    refreshInterval, // New prop
    lastUpdated: parentLastUpdated,
    onNodeSelect // Optional callback prop
}) => {
    console.log("selectNode", selectedNode);
    const { isDarkMode } = useTheme();
    const [layouts, setLayouts] = useState({ lg: [] });
    const [charts, setCharts] = useState([]);
    const [selectedDashboard, setSelectedDashboard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [timeRange, setTimeRange] = useState({
    //     from: new Date(new Date().getTime() - 5 * 60 * 1000).toISOString(),
    //     to: new Date().toISOString()
    // });
    // const [refreshInterval, setRefreshInterval] = useState("Off");
    const [dashboardName, setDashboardName] = useState('');
    const [localLastUpdated, setLocalLastUpdated] = useState(null);

    // Combine parentLastUpdated with localLastUpdated for rendering
    const displayLastUpdated = localLastUpdated || parentLastUpdated;

    // Check if the layoutId matches the selectedNode's layoutId
    const isLayoutMatch = selectedNode
        ? selectedNode.layoutId === layoutId
        : false;

    useEffect(() => {
        if (isLayoutMatch && selectedNode && selectedNode.onClick) {
            fetchDashboardData(selectedNode.onClick);
        } else {
            // resetDashboard();
        }
    }, [selectedNode, layoutId]);

    const resetDashboard = () => {
        setLayouts({ lg: [] });
        setCharts([]);
        setSelectedDashboard(null);
        setError(null);
        setDashboardName('');
    };

    const fetchDashboardData = async (instanceName) => {
        setIsLoading(true);
        setError(null);
        try {
            let dashboardData;

            const response = await getDashboardInstance(instanceName);
            dashboardData = response[instanceName];

            if (dashboardData && dashboardData.layouts && dashboardData.charts) {
                setLayouts({
                    lg: dashboardData.layouts
                });

                const updatedCharts = dashboardData.charts.map(chart => ({
                    ...chart,
                    isStatic: true,
                    activeLegend: chart.activeLegend || [],
                    layoutId: chart.layoutId || (chart.type === 'layout' ? chart.props.layoutId : undefined)
                }));
                setCharts(updatedCharts);
                setSelectedDashboard(instanceName);
                setDashboardName(dashboardData.dashboardName || instanceName);
            } else {
                throw new Error("Invalid dashboard data structure");
            }
        } catch (err) {
            console.error("LayoutArea: Error fetching dashboard", err);
            setError(`Failed to load dashboard: ${err.message}`);
            // resetDashboard();
        } finally {
            setIsLoading(false);
        }
    };

    // Render logic
    return (
        <div className="flex h-full">
            <div
                className={`flex-1 relative rounded-lg ${isDarkMode ? 'bg-dark-light' : 'bg-white'}`}
                style={{
                    border: showBorder ? `1px solid ${borderColor}` : 'none',
                    overflow: 'hidden'
                }}
            >
                <div className="relative mb-2 top-2 text-center text-sm font-semibold z-10">
                    {selectedDashboard
                        ? `${dashboardName} (${layoutId || 'Default'})`
                        : (selectedNode
                            ? ` ${selectedNode.layoutName} (${layoutId || 'Default'})`
                            : ` (${layoutId || 'Default'})`)
                    }
                </div>

                <ResponsiveGridLayout
                    className="layout-area-grid"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 800, sm: 600, xs: 400, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={50}
                    isDraggable={false}
                    isResizable={false}
                    compactType="vertical"
                    preventCollision={false}
                    margin={[4, 4]}
                >
                    {charts.map((chart) => {
                        const ChartComponent = chartComponents[chart.type];

                        return (
                            <div key={chart.i} className="relative">
                                <DataFetcher
                                    selectedDataSource={chart.datasetKey}
                                    refreshInterval={refreshInterval}
                                    timeRange={timeRange}
                                    selectedNode={selectedNode}
                                >
                                    {/* {(fetchedData, handleNowRefresh, lastUpdated) => (
                                        <ChartComponent
                                            {...chart.props}
                                            chartId={chart.i}
                                            data={fetchedData}
                                            timeRange={timeRange}
                                            activeLegend={chart.activeLegend}
                                        />
                                    )} */}
                                    {/* {(fetchedData, handleNowRefresh, lastUpdated) => (
                                        <ChartComponent
                                            {...chart.props}
                                            chartId={chart.i}
                                            data={fetchedData}
                                            timeRange={timeRange}
                                            activeLegend={chart.activeLegend}
                                            selectedNode={selectedNode}
                                            onNodeSelect={(newSelectedNode) => {
                                                if (onNodeSelect) {
                                                    onNodeSelect(newSelectedNode);
                                                }
                                            }}
                                        />
                                    )} */}
                                    {(fetchedData, handleNowRefresh, fetcherLastUpdated) => {
                                        // Update local last updated time when fetcher provides a new timestamp
                                        if (fetcherLastUpdated) {
                                            setLocalLastUpdated(fetcherLastUpdated);
                                        }

                                        return (
                                            <ChartComponent
                                                {...chart.props}
                                                chartId={chart.i}
                                                data={fetchedData}
                                                timeRange={timeRange}
                                                activeLegend={chart.activeLegend}
                                                selectedNode={selectedNode}
                                                lastUpdated={displayLastUpdated} // Pass combined last updated time
                                            />
                                        );
                                    }}
                                </DataFetcher>
                            </div>
                        );
                    })}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default LayoutArea;