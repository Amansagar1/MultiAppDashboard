// import React, { useState, useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';

// const SvgImage = ({
//     svgContent = '',
//     data = {},
//     fillColor = '#4472C4',
//     strokeColor = '#172C51',
//     textContent = 'Demo',
//     textColor = '#000000',
//     textSize = 24,
//     targetedElementId = '1',
//     backgroundColor = '#ffffff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     showDataLabels = false,
//     labelSize = 12,
//     labelColor = '#666666',
//     ...props
// }) => {
//     const [processedSvg, setProcessedSvg] = useState(svgContent);
//     const svgContainerRef = useRef(null);
//     const { isDarkMode } = useTheme();

//     const processData = (data) => {
//         const categories = Object.keys(data);
//         if (!categories.length || !data[categories[0]]) {
//             console.log('No data points found');
//             return [];
//         }

//         // Assuming data structure is similar to AreaChart
//         return categories.map((key) => ({
//             name: key,
//             values: data[key].map((item) => parseFloat(item.value))
//         }));
//     };

//     useEffect(() => {
//         if (svgContent) {
//             applyProperties();
//         }

//         // Setup resize observer
//         const resizeObserver = new ResizeObserver(() => {
//             if (svgContainerRef.current) {
//                 const svgElement = svgContainerRef.current.querySelector('svg');
//                 if (svgElement) {
//                     svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
//                     svgElement.setAttribute('width', '100%');
//                     svgElement.setAttribute('height', '100%');
//                 }
//             }
//         });

//         if (svgContainerRef.current) {
//             resizeObserver.observe(svgContainerRef.current);
//         }

//         return () => {
//             if (svgContainerRef.current) {
//                 resizeObserver.unobserve(svgContainerRef.current);
//             }
//         };
//     }, [svgContent, data, fillColor, strokeColor, textContent, textColor, textSize, targetedElementId, isDarkMode]);

//     const applyProperties = () => {
//         if (!svgContainerRef.current) return;

//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = svgContent;
//         const svgElement = tempDiv.querySelector('svg');

//         if (!svgElement) return;

//         // Apply background color based on theme
//         svgElement.style.backgroundColor = isDarkMode ? '#000000' : backgroundColor;

//         const targetedElements = svgElement.querySelectorAll(`[id="${targetedElementId}"]`);

//         // Process data
//         const processedData = processData(data);

//         targetedElements.forEach((el, index) => {
//             // Only process if it's a text element
//             if (el.tagName.toLowerCase() === 'text') {
//                 // Apply data if available
//                 if (processedData.length > 0) {
//                     const dataEntry = processedData[index % processedData.length];

//                     // Use the first value from the data series
//                     const displayValue = dataEntry.values[0];

//                     // Update text content with data value
//                     el.textContent = displayValue !== undefined
//                         ? displayValue.toFixed(2)
//                         : textContent;

//                     // Apply additional text styling
//                     if (textColor) {
//                         el.setAttribute('fill', textColor);
//                     }
//                     if (textSize) {
//                         el.setAttribute('font-size', textSize);
//                     }

//                     // Handle data labels
//                     if (showDataLabels) {
//                         el.setAttribute('font-size', labelSize);
//                         el.setAttribute('fill', labelColor);
//                     }
//                 } else {
//                     // Fallback to original text content if no data
//                     el.textContent = textContent;
//                 }
//             }
//         });

//         // Ensure SVG is responsive
//         svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
//         svgElement.setAttribute('width', '100%');
//         svgElement.setAttribute('height', '100%');

//         // Update processed SVG
//         setProcessedSvg(new XMLSerializer().serializeToString(svgElement));
//     };

//     return (
//         <div
//             ref={svgContainerRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'relative',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//                 backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//                 overflow: 'auto'
//             }}
//         >
//             {svgContent ? (
//                 <div
//                     dangerouslySetInnerHTML={{ __html: processedSvg }}
//                     className="max-w-full max-h-full flex justify-center items-center"
//                 />
//             ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-500">
//                     No SVG uploaded
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SvgImage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';

// const evaluateCondition = (value, operator, threshold) => {
//     switch (operator) {
//         case '<': return value < threshold;
//         case '>': return value > threshold;
//         case '=': return value === threshold;
//         case '>=': return value >= threshold;
//         case '<=': return value <= threshold;
//         default: return false;
//     }
// };

// const SvgImage = ({
//     svgContent = '',
//     data = {},
//     conditions = [],
//     defaultFillColor = '#4472C4',
//     defaultStrokeColor = '#172C51',
//     defaultTextColor = '#000000',
//     defaultTextSize = 24,
//     defaultTextContent = '',
//     backgroundColor = '#ffffff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     defaultTargetElementId = '1'
// }) => {

//     const [processedSvg, setProcessedSvg] = useState(svgContent);
//     const svgContainerRef = useRef(null);
//     const { isDarkMode } = useTheme();

//     const processData = (data) => {
//         const categories = Object.keys(data);
//         if (!categories.length || !data[categories[0]]) {
//             console.log('No data points found');
//             return [];
//         }

//         return categories.map((key) => ({
//             name: key,
//             values: data[key].map((item) => parseFloat(item.value))
//         }));
//     };

//     const applyDefaultStyling = (element) => {
//         if (element.tagName.toLowerCase() === 'text') {
//             element.setAttribute('fill', defaultTextColor);
//             element.setAttribute('font-size', defaultTextSize);
//             if (defaultTextContent) {
//                 element.textContent = defaultTextContent;
//             }
//         } else {
//             element.setAttribute('fill', defaultFillColor);
//             element.setAttribute('stroke', defaultStrokeColor);
//         }
//     };

//     const applyConditionalStyling = (element, value, condition) => {
//         if (element.tagName.toLowerCase() === 'text') {
//             element.setAttribute('fill', condition.textColor);
//             element.setAttribute('font-size', condition.textSize.toString());
//             element.textContent = value?.toFixed(2) || defaultTextContent;
//         } else {
//             element.setAttribute('fill', condition.fillColor);
//             element.setAttribute('stroke', condition.strokeColor || defaultStrokeColor);
//         }
//     };

//     useEffect(() => {
//         if (svgContent) {
//             applyProperties();
//         }

//     }, [
//         svgContent,
//         data,
//         conditions,
//         defaultFillColor,
//         defaultStrokeColor,
//         defaultTextColor,
//         defaultTextSize,
//         defaultTextContent,
//         defaultTargetElementId,
//         isDarkMode
//     ]);

//     const applyProperties = () => {
//         if (!svgContainerRef.current) return;

//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = svgContent;
//         const svgElement = tempDiv.querySelector('svg');

//         if (!svgElement) return;

//         svgElement.style.backgroundColor = isDarkMode ? '#000000' : backgroundColor;

//         // Apply default styling
//         const defaultElements = svgElement.querySelectorAll(`[id="${defaultTargetElementId}"]`);
//         defaultElements.forEach(el => {
//             applyDefaultStyling(el);
//         });

//         // Apply conditional styling
//         const processedData = processData(data);
//         conditions.forEach((condition, conditionIndex) => {
//             if (condition.targetElementId) {
//                 const targetElements = svgElement.querySelectorAll(`[id="${condition.targetElementId}"]`);
//                 targetElements.forEach((el, elementIndex) => {
//                     const dataEntry = processedData[elementIndex % processedData.length];
//                     const value = dataEntry?.values[0];

//                     if (value !== undefined && evaluateCondition(value, condition.operator, condition.value)) {
//                         applyConditionalStyling(el, value, condition);
//                     }
//                 });
//             }
//         });

//         setProcessedSvg(new XMLSerializer().serializeToString(svgElement));
//     };

//     return (
//         <div
//             ref={svgContainerRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'relative',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//                 backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//                 overflow: 'auto'
//             }}
//         >
//             {svgContent ? (
//                 <div
//                     dangerouslySetInnerHTML={{ __html: processedSvg }}
//                     className="w-full h-full flex justify-center items-center"
//                 />
//             ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-500">
//                     No SVG uploaded
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SvgImage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import DataFetcher from '../DataFetcher/DataFetcherComponent/ApiDataFetcher';

// const evaluateCondition = (value, operator, threshold) => {
//     switch (operator) {
//         case '<': return value < threshold;
//         case '>': return value > threshold;
//         case '=': return value === threshold;
//         case '>=': return value >= threshold;
//         case '<=': return value <= threshold;
//         default: return false;
//     }
// };

// const SvgImage = ({
//     svgContent = '',
//     data = {},
//     conditions = [],
//     defaultFillColor = '#4472C4',
//     defaultStrokeColor = '#172C51',
//     defaultTextColor = '#000000',
//     defaultTextSize = 24,
//     defaultTextContent = '',
//     backgroundColor = '#ffffff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     defaultTargetElementId = '1',
//     timeRange,
//     refreshInterval
// }) => {
//     const [processedSvg, setProcessedSvg] = useState(svgContent);
//     const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//     const svgContainerRef = useRef(null);
//     const { isDarkMode } = useTheme();

//     const processData = (data) => {
//         const categories = Object.keys(data);
//         if (!categories.length || !data[categories[0]]) {
//             console.log('No data points found');
//             return [];
//         }

//         return categories.map((key) => ({
//             name: key,
//             values: data[key].map((item) => parseFloat(item.value))
//         }));
//     };

//     const applyDefaultStyling = (element) => {
//         if (element.tagName.toLowerCase() === 'text') {
//             element.setAttribute('fill', defaultTextColor);
//             element.setAttribute('font-size', defaultTextSize);
//             if (defaultTextContent) {
//                 element.textContent = defaultTextContent;
//             }
//         } else {
//             element.setAttribute('fill', defaultFillColor);
//             element.setAttribute('stroke', defaultStrokeColor);
//         }
//     };

//     const applyConditionalStyling = (element, value, condition) => {
//         if (element.tagName.toLowerCase() === 'text') {
//             element.setAttribute('fill', condition.textColor);
//             element.setAttribute('font-size', condition.textSize.toString());
//             element.textContent = value?.toFixed(2) || defaultTextContent;
//         } else {
//             element.setAttribute('fill', condition.fillColor);
//             element.setAttribute('stroke', condition.strokeColor || defaultStrokeColor);
//         }
//     };

//     const updateSvgDimensions = () => {
//         if (!svgContainerRef.current) return;

//         const containerRect = svgContainerRef.current.getBoundingClientRect();
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = svgContent;
//         const svgElement = tempDiv.querySelector('svg');

//         if (!svgElement) return;

//         // Get original SVG dimensions
//         const originalWidth = parseFloat(svgElement.getAttribute('width'));
//         const originalHeight = parseFloat(svgElement.getAttribute('height'));
//         const aspectRatio = originalWidth / originalHeight;

//         // Calculate new dimensions to fit container while maintaining aspect ratio
//         let newWidth = containerRect.width;
//         let newHeight = containerRect.width / aspectRatio;

//         if (newHeight > containerRect.height) {
//             newHeight = containerRect.height;
//             newWidth = containerRect.height * aspectRatio;
//         }

//         setDimensions({ width: newWidth, height: newHeight });
//     };

//     useEffect(() => {
//         if (svgContent) {
//             const resizeObserver = new ResizeObserver(() => {
//                 updateSvgDimensions();
//             });

//             if (svgContainerRef.current) {
//                 resizeObserver.observe(svgContainerRef.current);
//             }

//             return () => {
//                 resizeObserver.disconnect();
//             };
//         }
//     }, [svgContent]);

//     useEffect(() => {
//         if (svgContent) {
//             applyProperties();
//         }
//     }, [
//         svgContent,
//         data,
//         conditions,
//         defaultFillColor,
//         defaultStrokeColor,
//         defaultTextColor,
//         defaultTextSize,
//         defaultTextContent,
//         defaultTargetElementId,
//         isDarkMode,
//         dimensions
//     ]);

//     const applyProperties = () => {
//         if (!svgContainerRef.current) return;

//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = svgContent;
//         const svgElement = tempDiv.querySelector('svg');

//         if (!svgElement) return;

//         // Apply new dimensions while maintaining aspect ratio
//         if (dimensions.width && dimensions.height) {
//             svgElement.setAttribute('width', dimensions.width);
//             svgElement.setAttribute('height', dimensions.height);

//             // Scale the transform group if it exists
//             const transformGroup = svgElement.querySelector('g[transform]');
//             if (transformGroup) {
//                 const originalWidth = parseFloat(svgContent.match(/width="([^"]+)"/)[1]);
//                 const originalHeight = parseFloat(svgContent.match(/height="([^"]+)"/)[1]);

//                 const scaleX = dimensions.width / originalWidth;
//                 const scaleY = dimensions.height / originalHeight;

//                 // Update the transform attribute with the new scale
//                 const currentTransform = transformGroup.getAttribute('transform');
//                 const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
//                 if (translateMatch) {
//                     const [translateX, translateY] = translateMatch[1].split(' ').map(parseFloat);
//                     transformGroup.setAttribute('transform',
//                         `translate(${translateX * scaleX} ${translateY * scaleY}) scale(${scaleX} ${scaleY})`
//                     );
//                 }
//             }
//         }

//         svgElement.style.backgroundColor = isDarkMode ? '#000000' : backgroundColor;

//         // Apply default styling
//         const defaultElements = svgElement.querySelectorAll(`[id="${defaultTargetElementId}"]`);
//         defaultElements.forEach(el => {
//             applyDefaultStyling(el);
//         });

//         // Apply conditional styling
//         const processedData = processData(data);
//         conditions.forEach((condition, conditionIndex) => {
//             if (condition.targetElementId) {
//                 const targetElements = svgElement.querySelectorAll(`[id="${condition.targetElementId}"]`);
//                 targetElements.forEach((el, elementIndex) => {
//                     const dataEntry = processedData[elementIndex % processedData.length];
//                     const value = dataEntry?.values[0];

//                     if (value !== undefined && evaluateCondition(value, condition.operator, condition.value)) {
//                         applyConditionalStyling(el, value, condition);
//                     }
//                 });
//             }
//         });

//         setProcessedSvg(new XMLSerializer().serializeToString(svgElement));
//     };

//     return (
//         <div
//             ref={svgContainerRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'relative',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//                 backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//                 overflow: 'auto',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//             }}
//         >
//             {svgContent && conditions.map((condition) => (
//                 condition.dataSource ? (
//                     <DataFetcher
//                         key={`${condition.targetElementId}-${condition.dataSource}`}
//                         selectedDataSource={condition.dataSource}
//                         timeRange={timeRange}
//                         refreshInterval={refreshInterval}
//                     >
//                         {(fetchedData) => {
//                             updateSvgWithData(fetchedData, condition);
//                             return null;
//                         }}
//                     </DataFetcher>
//                 ) : null
//             ))}
//             {svgContent ? (
//                 <div
//                     dangerouslySetInnerHTML={{ __html: processedSvg }}
//                     style={{
//                         width: dimensions.width,
//                         height: dimensions.height,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}
//                 />
//             ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-500">
//                     No SVG uploaded
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SvgImage;



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import DataFetcher from '../DataFetcher/DataFetcherComponent/ApiDataFetcher';

// const evaluateCondition = (value, operator, threshold) => {
//     switch (operator) {
//         case '<': return value < threshold;
//         case '>': return value > threshold;
//         case '=': return value === threshold;
//         case '>=': return value >= threshold;
//         case '<=': return value <= threshold;
//         default: return false;
//     }
// };

// const SvgImage = ({
//     svgContent = '',
//     conditions = [],
//     defaultFillColor = '#4472C4',
//     defaultStrokeColor = '#172C51',
//     defaultTextColor = '#000000',
//     defaultTextSize = 24,
//     defaultTextContent = '',
//     backgroundColor = '#ffffff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     defaultTargetElementId = '',
//     timeRange,
//     refreshInterval,
//     decimalPlaces = 2
// }) => {
//     const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//     const [elementData, setElementData] = useState({});
//     const svgContainerRef = useRef(null);
//     const svgRef = useRef(null);
//     const { isDarkMode } = useTheme();

//     // Process incoming data from DataFetcher
//     const handleDataUpdate = useCallback((data, targetElementId) => {
//         if (!data || !Object.keys(data).length) return;

//         const categories = Object.keys(data);
//         const latestValue = data[categories[0]]?.[0]?.value;

//         setElementData(prev => {
//             const newValue = parseFloat(latestValue);
//             if (prev[targetElementId] === newValue) return prev;
//             return { ...prev, [targetElementId]: newValue };
//         });
//     }, []);

//     const updateSvgDimensions = useCallback(() => {
//         if (!svgContainerRef.current || !svgContent) return;

//         const containerRect = svgContainerRef.current.getBoundingClientRect();
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = svgContent;
//         const svgElement = tempDiv.querySelector('svg');

//         if (!svgElement) return;

//         const originalWidth = parseFloat(svgElement.getAttribute('width'));
//         const originalHeight = parseFloat(svgElement.getAttribute('height'));
//         const aspectRatio = originalWidth / originalHeight;

//         let newWidth = containerRect.width;
//         let newHeight = containerRect.width / aspectRatio;

//         if (newHeight > containerRect.height) {
//             newHeight = containerRect.height;
//             newWidth = containerRect.height * aspectRatio;
//         }

//         setDimensions(prev => {
//             if (prev.width === newWidth && prev.height === newHeight) return prev;
//             return { width: newWidth, height: newHeight };
//         });
//     }, [svgContent]);

//     // Set up resize observer
//     useEffect(() => {
//         if (!svgContent) return;

//         const resizeObserver = new ResizeObserver(updateSvgDimensions);
//         if (svgContainerRef.current) {
//             resizeObserver.observe(svgContainerRef.current);
//         }

//         return () => resizeObserver.disconnect();
//     }, [svgContent, updateSvgDimensions]);

//     // Update SVG element directly without state
//     const updateSvgElement = useCallback(() => {
//         if (!svgRef.current || !svgContent) return;

//         const applyDefaultStyling = (element) => {
//             if (element.tagName.toLowerCase() === 'text') {
//                 element.setAttribute('fill', defaultTextColor);
//                 element.setAttribute('font-size', defaultTextSize);
//                 element.textContent = defaultTextContent;
//             } else {
//                 element.setAttribute('fill', defaultFillColor);
//                 element.setAttribute('stroke', defaultStrokeColor);
//             }
//         };

//         const applyConditionalStyling = (element, value, condition) => {
//             const formattedValue = value?.toFixed(decimalPlaces);

//             if (element.tagName.toLowerCase() === 'text') {
//                 element.setAttribute('fill', condition.textColor || defaultTextColor);
//                 element.setAttribute('font-size', (condition.textSize || defaultTextSize).toString());
//                 if (formattedValue !== undefined) {
//                     element.textContent = formattedValue;
//                 }
//             } else {
//                 element.setAttribute('fill', condition.fillColor || defaultFillColor);
//                 element.setAttribute('stroke', condition.strokeColor || defaultStrokeColor);
//             }
//         };

//         const svgElement = svgRef.current.querySelector('svg');
//         if (!svgElement) return;

//         // Apply dimensions
//         if (dimensions.width && dimensions.height) {
//             svgElement.setAttribute('width', dimensions.width);
//             svgElement.setAttribute('height', dimensions.height);
//         }

//         // Set background color
//         svgElement.style.backgroundColor = isDarkMode ? '#000000' : backgroundColor;

//         // Apply default styling to default target element
//         const defaultElements = svgElement.querySelectorAll(`[id="${defaultTargetElementId}"]`);
//         defaultElements.forEach(applyDefaultStyling);

//         // Apply conditional styling based on data
//         conditions.forEach(condition => {
//             if (!condition.targetElementId) return;

//             const elements = svgElement.querySelectorAll(`[id="${condition.targetElementId}"]`);
//             const value = elementData[condition.targetElementId];

//             elements.forEach(element => {
//                 if (value !== undefined) {
//                     if (!condition.operator || !condition.value ||
//                         evaluateCondition(value, condition.operator, condition.value)) {
//                         applyConditionalStyling(element, value, condition);
//                     }
//                 }
//             });
//         });
//     }, [
//         svgContent,
//         dimensions,
//         elementData,
//         conditions,
//         defaultFillColor,
//         defaultStrokeColor,
//         defaultTextColor,
//         defaultTextSize,
//         defaultTextContent,
//         defaultTargetElementId,
//         isDarkMode,
//         backgroundColor,
//         decimalPlaces
//     ]);

//     // Initial SVG setup
//     useEffect(() => {
//         if (!svgContent) return;
//         const parser = new DOMParser();
//         const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
//         if (svgRef.current) {
//             svgRef.current.innerHTML = '';
//             svgRef.current.appendChild(svgDoc.documentElement);
//             updateSvgElement();
//         }
//     }, [svgContent]);

//     // Update SVG when dependencies change
//     useEffect(() => {
//         updateSvgElement();
//     }, [updateSvgElement]);

//     return (
//         <div
//             ref={svgContainerRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'relative',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//                 backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//                 overflow: 'auto',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//             }}
//         >
//             {/* Data Fetchers for each condition with a data source */}
//             {conditions.map((condition) => (
//                 condition.dataSource && condition.targetElementId ? (
//                     <DataFetcher
//                         key={`${condition.targetElementId}-${condition.dataSource}`}
//                         selectedDataSource={condition.dataSource}
//                         timeRange={timeRange}
//                         refreshInterval={refreshInterval}
//                     >
//                         {(fetchedData) => {
//                             handleDataUpdate(fetchedData, condition.targetElementId);
//                             return null;
//                         }}
//                     </DataFetcher>
//                 ) : null
//             ))}

//             {/* SVG Container */}
//             {svgContent ? (
//                 <div
//                     ref={svgRef}
//                     style={{
//                         width: dimensions.width,
//                         height: dimensions.height,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}
//                 />
//             ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-500">
//                     No SVG uploaded
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SvgImage;




import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import DataFetcher from '../DataFetcher/DataFetcher';

const evaluateCondition = (value, operator, threshold) => {
    switch (operator) {
        case '<': return value < threshold;
        case '>': return value > threshold;
        case '=': return value === threshold;
        case '>=': return value >= threshold;
        case '<=': return value <= threshold;
        default: return false;
    }
};

const SvgImage = ({
    svgContent = '',
    conditions = [],
    defaultFillColor = '#4472C4',
    defaultStrokeColor = '#172C51',
    defaultTextColor = '#000000',
    defaultTextSize = 24,
    defaultTextContent = '',
    backgroundColor = '#ffffff',
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    defaultTargetElementId = '',
    timeRange,
    refreshInterval,
    decimalPlaces = 2
}) => {
    const [elementData, setElementData] = useState({});
    const svgContainerRef = useRef(null);
    const svgRef = useRef(null);
    const dataFetcherRef = useRef({});
    const { isDarkMode } = useTheme();
    const [viewBox, setViewBox] = useState(null);
    const [svgInitialized, setSvgInitialized] = useState(false);

    // Process incoming data from DataFetcher
    const handleDataUpdate = useCallback((data, targetElementId) => {
        if (!data || !Object.keys(data).length) return;

        const categories = Object.keys(data);
        const latestDataPoint = data[categories[0]]?.[data[categories[0]].length - 1];

        if (!latestDataPoint) return;

        const { value, timestamp } = latestDataPoint;

        setElementData(prev => {
            const newValue = parseFloat(value);
            if (prev[targetElementId]?.value === newValue) return prev;
            return {
                ...prev,
                [targetElementId]: {
                    value: newValue,
                    timestamp: timestamp || Date.now()
                }
            };
        });
    }, []);

    // Setup data refresh interval
    useEffect(() => {
        const intervalIds = {};

        conditions.forEach(condition => {
            if (condition.dataSource && condition.targetElementId && refreshInterval !== "Off") {
                const interval = parseInt(refreshInterval) * 1000;
                intervalIds[condition.targetElementId] = setInterval(() => {
                    if (dataFetcherRef.current[condition.targetElementId]) {
                        dataFetcherRef.current[condition.targetElementId].refetch();
                    }
                }, interval);
            }
        });

        return () => {
            Object.values(intervalIds).forEach(clearInterval);
        };
    }, [conditions, refreshInterval]);

    // Initial SVG setup - only runs once
    useEffect(() => {
        if (!svgContent || svgInitialized) return;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');

        if (!svgElement) return;

        // Set up viewBox
        const width = parseFloat(svgElement.getAttribute('width') || 0);
        const height = parseFloat(svgElement.getAttribute('height') || 0);
        let viewBox = svgElement.getAttribute('viewBox');
        if (!viewBox && width && height) {
            viewBox = `0 0 ${width} ${height}`;
        }

        // Configure SVG for responsive behavior
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        if (viewBox) {
            svgElement.setAttribute('viewBox', viewBox);
            setViewBox(viewBox);
        }

        // Apply initial styling
        const defaultElements = svgElement.querySelectorAll(`[id="${defaultTargetElementId}"]`);
        defaultElements.forEach(element => {
            if (element.tagName.toLowerCase() === 'text') {
                element.setAttribute('fill', defaultTextColor);
                element.setAttribute('font-size', defaultTextSize);
                element.textContent = defaultTextContent;
            } else {
                element.setAttribute('fill', defaultFillColor);
                element.setAttribute('stroke', defaultStrokeColor);
            }
        });

        if (svgRef.current) {
            svgRef.current.innerHTML = svgElement.outerHTML;
            setSvgInitialized(true);
        }
    }, [svgContent]);

    // Update only text elements when data changes
    useEffect(() => {
        if (!svgRef.current || !svgInitialized) return;

        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement) return;

        // Update only text elements based on conditions
        conditions.forEach(condition => {
            if (!condition.targetElementId) return;

            const elements = svgElement.querySelectorAll(`[id="${condition.targetElementId}"]`);
            const data = elementData[condition.targetElementId];

            elements.forEach(element => {
                if (element.tagName.toLowerCase() === 'text' && data?.value !== undefined) {
                    if (!condition.operator || !condition.value ||
                        evaluateCondition(data.value, condition.operator, condition.value)) {
                        // Update only text content and color
                        element.textContent = data.value.toFixed(decimalPlaces);
                        element.setAttribute('fill', condition.textColor || defaultTextColor);
                    }
                }
            });
        });
    }, [elementData, conditions, decimalPlaces]);

    // Update background color when theme changes
    useEffect(() => {
        if (!svgRef.current) return;
        const svgElement = svgRef.current.querySelector('svg');
        if (svgElement) {
            svgElement.style.backgroundColor = isDarkMode ? '#000000' : backgroundColor;
        }
    }, [isDarkMode, backgroundColor]);

    return (
        <div
            ref={svgContainerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
                backgroundColor: isDarkMode ? '#000000' : backgroundColor,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {/* Data Fetchers */}
            {conditions.map((condition) => (
                condition.dataSource && condition.targetElementId ? (
                    <DataFetcher
                        key={`${condition.targetElementId}-${condition.dataSource}`}
                        selectedDataSource={condition.dataSource}
                        chartType="svg"
                        timeRange={timeRange}
                        refreshInterval={refreshInterval}
                        ref={ref => {
                            dataFetcherRef.current[condition.targetElementId] = ref;
                        }}
                    >
                        {(fetchedData) => {
                            handleDataUpdate(fetchedData, condition.targetElementId);
                            return null;
                        }}
                    </DataFetcher>
                ) : null
            ))}

            {/* SVG Container */}
            {svgContent ? (
                <div
                    ref={svgRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                    No SVG uploaded
                </div>
            )}
        </div>
    );
};

export default SvgImage;