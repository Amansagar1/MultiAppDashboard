import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';

const TableChart = ({
    data,
    backgroundColor = '#ffffff',
    name = 'Energy Meter Data',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = false,
    nameItalic = false,
    titlePosition = 'center',
    showBorder = true,
    borderSize = 1,
    borderColor = '#e0e0e0',
    showAnimation = false,
    columnWidth = [],
    alternateRowColor = '#f9fafb',
    headerBackgroundColor = '#f3f4f6',
    showTableLines = false,
    tableLineColor = '#e0e0e0',
    columnHeaderColor = '#333333',
    showData = true,
    dataLabelColor = '#666666',
    decimalPlaces = 2,
}) => {
    const { isDarkMode } = useTheme();
    const [chartData, setChartData] = useState(null);
    const tableRef = useRef(null);
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (data) {
            const processedData = processData(data);
            setChartData(processedData);
        }
    }, [data]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const processData = (inputData) => {
        if (typeof inputData !== 'object' || inputData === null) {
            console.error("Invalid input data");
            return null;
        }

        const processedData = {};
        Object.entries(inputData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                processedData[key] = value.map(item => ({
                    timestamp: new Date(item.timestamp).toLocaleString(),
                    value: item.value
                }));
            }
        });

        return processedData;
    };

    if (!chartData) {
        return <div className="text-center p-4">Loading or no data available...</div>;
    }

    const variables = Object.keys(chartData);
    const timestamps = [...new Set(Object.values(chartData).flatMap(arr => arr.map(item => item.timestamp)))].sort();

    const getTitleStyle = () => ({
        fontSize: `${nameSize}px`,
        color: isDarkMode ? '#ffffff' : nameColor,
        fontWeight: nameBold ? 'bold' : 'normal',
        fontStyle: nameItalic ? 'italic' : 'normal',
        textAlign: titlePosition,
    });

    const getColumnStyle = (index) => ({
        ...(columnWidth[index] ? { width: `${columnWidth[index]}px` } : {}),
        ...(showTableLines ? { border: `1px solid ${tableLineColor}` } : {}),
    });

    const getResponsiveStyles = () => {
        const baseFontSize = Math.max(10, Math.min(16, containerSize.width / 50));
        return {
            table: {
                fontSize: `${baseFontSize}px`,
            },
            header: {
                fontSize: `${baseFontSize * 1.2}px`,
            },
            cell: {
                fontSize: `${baseFontSize}px`,
                padding: `${baseFontSize / 3}px`,
            },
        };
    };

    const responsiveStyles = getResponsiveStyles();

    const getTruncatedColumnName = (columnName) => {
        if (columnName.length > 6) {
            return `${columnName.slice(0, 6)}...`;
        }
        return columnName;
    };

    return (
        <div
            ref={containerRef}
            className={`w-full h-full overflow-auto ${showAnimation ? 'animate-fade-in' : ''}`}
            style={{ backgroundColor: isDarkMode ? '#000000' : backgroundColor }}
        >
            <h2 className="mb-4" style={getTitleStyle()}>{name}</h2>
            <div ref={tableRef} className="overflow-x-auto">
                <table
                    className={`w-full ${showBorder ? 'border-collapse' : ''}`}
                    style={{
                        ...responsiveStyles.table,
                        ...(showBorder ? { border: `${borderSize}px solid ${borderColor}` } : {}),
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: headerBackgroundColor }}>
                            <th className="text-left" style={{
                                ...getColumnStyle(0),
                                ...responsiveStyles.header,
                                color: columnHeaderColor
                            }}>Timestamp</th>
                            {variables.map((variable, index) => (
                                <th key={variable} className="text-left" style={{
                                    ...getColumnStyle(index + 1),
                                    ...responsiveStyles.header,
                                    color: columnHeaderColor
                                }}>{getTruncatedColumnName(variable)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timestamps.map((timestamp, rowIndex) => (
                            <tr
                                key={timestamp}
                                style={{
                                    backgroundColor: rowIndex % 2 === 1 ? alternateRowColor : 'transparent'
                                }}
                            >
                                <td style={{
                                    ...getColumnStyle(0),
                                    ...responsiveStyles.cell,
                                    color: dataLabelColor
                                }}>{timestamp}</td>
                                {variables.map((variable, colIndex) => {
                                    const dataPoint = chartData[variable].find(item => item.timestamp === timestamp);
                                    return (
                                        <td key={`${variable}-${timestamp}`} style={{
                                            ...getColumnStyle(colIndex + 1),
                                            ...responsiveStyles.cell,
                                            color: dataLabelColor
                                        }}>
                                            {dataPoint && showData ? dataPoint.value.toFixed(decimalPlaces) : '-'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableChart;