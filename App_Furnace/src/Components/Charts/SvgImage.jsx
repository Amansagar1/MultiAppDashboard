// import React from 'react';

// const SvgImage = ({ data }) => {
//     return (
//         <div className="relative bg-white rounded-lg shadow-md p-2">
//             <img
//                 src="/images/Picture1.svg"
//                 alt="Machine Diagram"
//                 className="w-full h-auto"
//             />
//         </div>
//     );
// };

// export default SvgImage;



// import React, { useEffect, useState } from 'react';

// const SvgImage = ({ data }) => {
//     const [svgContent, setSvgContent] = useState('');

//     useEffect(() => {
//         const loadSvg = async () => {
//             try {
//                 const response = await fetch('/images/Picture1.svg');
//                 const svgText = await response.text();

//                 // Get the last value from data array
//                 const lastValue = data[data.length - 1]?.value || 0;

//                 // Create a DOM parser
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(svgText, 'image/svg+xml');

//                 // Find the element with id="pres-1"
//                 const presElement = doc.getElementById('pres-1');
//                 if (presElement) {
//                     // Update the text content with the formatted value
//                     presElement.textContent = lastValue.toFixed(2);
//                 }

//                 // Convert back to string
//                 const serializer = new XMLSerializer();
//                 const modifiedSvg = serializer.serializeToString(doc);

//                 setSvgContent(modifiedSvg);
//             } catch (error) {
//                 console.error('Error loading SVG:', error);
//             }
//         };

//         if (data && data.length > 0) {
//             loadSvg();
//         }
//     }, [data]);

//     return (
//         <div className="relative flex justify-center items-center p-2">
//             {svgContent ? (
//                 <div dangerouslySetInnerHTML={{ __html: svgContent }} className='w-full h-auto' />
//             ) : (
//                 <div className="flex items-center justify-center">
//                     Loading...
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SvgImage;


// import React, { useEffect, useState, useRef } from 'react';

// const SvgImage = ({ data }) => {
//     const [svgContent, setSvgContent] = useState('');
//     const initialSvgRef = useRef(null);

//     useEffect(() => {
//         // Load the initial SVG only once
//         const loadInitialSvg = async () => {
//             try {
//                 const response = await fetch('/images/Picture1.svg');
//                 const svgText = await response.text();
//                 initialSvgRef.current = svgText;
//                 setSvgContent(svgText);
//             } catch (error) {
//                 console.error('Error loading initial SVG:', error);
//             }
//         };

//         if (!initialSvgRef.current) {
//             loadInitialSvg();
//         }
//     }, []);

//     useEffect(() => {
//         // Update SVG when data changes
//         if (data?.length > 0 && initialSvgRef.current) {
//             const updateSvg = () => {
//                 try {
//                     const lastValue = data[data.length - 1]?.value || 0;
//                     const parser = new DOMParser();
//                     const doc = parser.parseFromString(initialSvgRef.current, 'image/svg+xml');
//                     const presElement = doc.getElementById('pres-1');

//                     if (presElement) {
//                         presElement.textContent = lastValue.toFixed(2);
//                     }

//                     const serializer = new XMLSerializer();
//                     const modifiedSvg = serializer.serializeToString(doc);
//                     setSvgContent(modifiedSvg);
//                 } catch (error) {
//                     console.error('Error updating SVG:', error);
//                 }
//             };

//             updateSvg();
//         }
//     }, [data]);

//     return (
//         <div className="relative flex justify-center items-center p-6">
//             <div
//                 dangerouslySetInnerHTML={{ __html: svgContent }}
//                 className='w-full h-auto'
//             />
//         </div>
//     );
// };

// export default SvgImage;



// import React, { useEffect, useState, useRef } from 'react';
// import { getPlant360SVG } from '@/WebServices/ApiControllers';

// const SvgImage = ({ data, svgName }) => {
//     const [svgContent, setSvgContent] = useState('');
//     const initialSvgRef = useRef(null);

//     useEffect(() => {
//         // Load the SVG from API
//         const loadSvg = async () => {
//             try {
//                 const svgResponse = await getPlant360SVG(svgName);
//                 if (svgResponse) {
//                     initialSvgRef.current = svgResponse;
//                     setSvgContent(svgResponse);
//                 }
//             } catch (error) {
//                 console.error('Error loading SVG:', error);
//             }
//         };

//         if (svgName && !initialSvgRef.current) {
//             loadSvg();
//         }
//     }, [svgName]);

//     useEffect(() => {
//         // Update SVG when data changes
//         if (data?.length > 0 && initialSvgRef.current) {
//             const updateSvg = () => {
//                 try {
//                     const lastValue = data[data.length - 1]?.value || 0;
//                     const parser = new DOMParser();
//                     const doc = parser.parseFromString(initialSvgRef.current, 'image/svg+xml');
//                     const presElement = doc.getElementById('2');

//                     if (presElement) {
//                         presElement.textContent = lastValue.toFixed(2);
//                     }

//                     const serializer = new XMLSerializer();
//                     const modifiedSvg = serializer.serializeToString(doc);
//                     setSvgContent(modifiedSvg);
//                 } catch (error) {
//                     console.error('Error updating SVG:', error);
//                 }
//             };

//             updateSvg();
//         }
//     }, [data]);

//     return (
//         <div className="relative flex justify-center items-center p-6">
//             <div
//                 dangerouslySetInnerHTML={{ __html: svgContent }}
//                 className="w-full h-auto"
//             />
//         </div>
//     );
// };

// export default SvgImage;





import React, { useEffect, useState, useRef } from 'react';
import { getPlant360SVG } from '@/WebServices/ApiControllers';
import { SVG_VARIABLE_MAP } from './Constants';

const SvgImage = ({ data, svgName }) => {
    const [svgContent, setSvgContent] = useState('');
    const initialSvgRef = useRef(null);

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const svgResponse = await getPlant360SVG(svgName);
                if (svgResponse) {
                    initialSvgRef.current = svgResponse;
                    setSvgContent(svgResponse);
                }
            } catch (error) {
                console.error('Error loading SVG:', error);
            }
        };

        if (svgName && !initialSvgRef.current) {
            loadSvg();
        }
    }, [svgName]);

    useEffect(() => {
        if (data && initialSvgRef.current) {
            const updateSvg = () => {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(initialSvgRef.current, 'image/svg+xml');

                    // Update each variable's corresponding SVG element
                    Object.entries(data).forEach(([variable, valueData]) => {
                        const svgId = SVG_VARIABLE_MAP[variable];
                        if (svgId && valueData && valueData.length > 0) {
                            const element = doc.getElementById(svgId);
                            if (element) {
                                const lastValue = valueData[valueData.length - 1].value;
                                element.textContent = typeof lastValue === 'number' ?
                                    lastValue.toFixed(2) : lastValue;
                            }
                        }
                    });

                    const serializer = new XMLSerializer();
                    const modifiedSvg = serializer.serializeToString(doc);
                    setSvgContent(modifiedSvg);
                } catch (error) {
                    console.error('Error updating SVG:', error);
                }
            };

            updateSvg();
        }
    }, [data]);

    return (
        <div className="relative flex justify-center items-center p-6">
            <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="w-full h-auto"
            />
        </div>
    );
};

export default SvgImage;