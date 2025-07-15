// import { getDataSourceInstance, getDataModelSource } from '@/WebServices/ApiControllers';
// import React, { useState, useRef, useEffect } from 'react';

// const DataFetcher = ({ selectedDataSource, refreshInterval, timeRange, children, selectedNode = null, chartType }) => {
//     const [fetchedData, setFetchedData] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const lastFetchedTimestamp = useRef(null);
//     const isFetching = useRef(false);
//     const [lastUpdated, setLastUpdated] = useState(null);

//     console.log("selectedNode of DataFetcher:", selectedNode)

//     const getTokenFromCookies = () => {
//         const cookies = document.cookie.split(';');
//         const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
//         return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1].trim()) : null;
//     };

//     const getTenantIdFromCookies = () => {
//         const cookies = document.cookie.split(';');
//         const tenantCookie = cookies.find(cookie => cookie.trim().startsWith('tenantId='));
//         return tenantCookie ? decodeURIComponent(tenantCookie.split('=')[1].trim()) : null;
//     };

//     const isValidUrl = (url) => {
//         try {
//             new URL(url);
//             return true;
//         } catch {
//             return false;
//         }
//     };

//     useEffect(() => {
//         if (selectedDataSource && timeRange && !isFetching.current) {
//             fetchData(selectedDataSource, timeRange);
//         }
//     }, [selectedDataSource, timeRange]);

//     useEffect(() => {
//         let intervalId;
//         if (refreshInterval && refreshInterval !== 'Off' && refreshInterval !== 'Now') {
//             const intervalMs = getIntervalInMilliseconds(refreshInterval);
//             intervalId = setInterval(() => {
//                 if (selectedDataSource && timeRange && !isFetching.current) {
//                     const now = new Date().toISOString();
//                     const updatedTimeRange = {
//                         from: lastFetchedTimestamp.current || timeRange.from,
//                         to: now,
//                     };
//                     fetchData(selectedDataSource, updatedTimeRange, true);
//                 }
//             }, intervalMs);
//         }
//         return () => clearInterval(intervalId);
//     }, [refreshInterval, selectedDataSource, timeRange]);

//     useEffect(() => {
//         fetchAndStoreDataSources();
//     }, []);

//     const getIntervalInMilliseconds = (interval) => {
//         const intervals = {
//             'now': 0,
//             '5 sec': 5000,
//             '10 sec': 10000,
//             '30 sec': 30000,
//             '1 min': 60000,
//             '5 min': 300000,
//             '10 min': 600000,
//             '15 min': 900000,
//             '30 min': 1800000,
//             '1 hour': 3600000,
//             '2 hour': 7200000,
//             '1 day': 86400000,
//         };
//         return intervals[interval] || null;
//     };

//     const fetchAndStoreDataSources = async () => {
//         try {
//             const storedDataSources = localStorage.getItem('dataSources');
//             if (!storedDataSources) {
//                 const response = await getDataModelSource();
//                 localStorage.setItem('dataSources', JSON.stringify(response));
//                 console.log('Stored data sources in local storage');
//             }
//         } catch (err) {
//             console.error('Error fetching data sources:', err);
//         }
//     };

//     const dataSourceApiUrl = (response, timeRange, selectedNode = null) => {
//         try {
//             console.log('DataSourceApiUrl - Input Parameters:', {
//                 response: JSON.stringify(response),
//                 timeRange: JSON.stringify(timeRange),
//                 selectedNode: JSON.stringify(selectedNode)
//             });

//             const { endPointURL, parameters } = response;
//             if (!isValidUrl(endPointURL)) throw new Error('Invalid endpoint URL');

//             const tenantId = getTenantIdFromCookies();
//             const queryParams = [];

//             console.log('Original Parameters:', JSON.stringify(parameters));

//             const processedParameters = parameters.map((param) => {
//                 // Check if the parameter value starts with '@' and selectedNode is provided
//                 if (param.value.startsWith('@') && selectedNode && selectedNode.refIds) {
//                     const refKey = param.value.slice(1); // Remove '@' 
//                     const replacementValue = selectedNode.refIds[param.value];

//                     console.log('Parameter Replacement Check:', {
//                         originalParam: param,
//                         refKey: refKey,
//                         replacementValue: replacementValue
//                     });

//                     // If a replacement is found, use it; otherwise, use original value
//                     return {
//                         ...param,
//                         value: replacementValue || param.value
//                     };
//                 }
//                 return param;
//             });

//             console.log('Processed Parameters:', JSON.stringify(processedParameters));

//             // Build query parameters
//             processedParameters.forEach((param) => {
//                 if (param.isActive) {
//                     const encodedName = encodeURIComponent(param.name);
//                     const encodedValue = encodeURIComponent(param.value);

//                     console.log('Adding Query Parameter:', {
//                         name: encodedName,
//                         value: encodedValue
//                     });

//                     queryParams.push(`${encodedName}=${encodedValue}`);
//                 }
//             });

//             // Add time range parameters
//             queryParams.push(
//                 `from=${encodeURIComponent(timeRange.from)}`,
//                 `to=${encodeURIComponent(timeRange.to)}`
//             );

//             console.log('Time Range Parameters:', {
//                 from: timeRange.from,
//                 to: timeRange.to
//             });

//             // Add tenantId to query params if available
//             if (tenantId) {
//                 console.log('Adding Tenant ID:', tenantId);
//                 queryParams.push(`tenantId=${encodeURIComponent(tenantId)}`);
//             }

//             const finalUrl = `${endPointURL}?${queryParams.join('&')}`;

//             console.log('Final constructed URL:', finalUrl);

//             return finalUrl;
//         } catch (error) {
//             console.error('Error creating API URL:', error);
//             throw error;
//         }
//     };

//     const fetchData = async (instanceName, timeRange, isUpdate = false) => {
//         if (isFetching.current) return;

//         if (chartType === 'svg') {
//             setIsLoading(true);
//         }
//         setError(null);
//         isFetching.current = true;

//         try {
//             const response = await getDataSourceInstance(instanceName);
//             const apiUrl = dataSourceApiUrl(response, timeRange, selectedNode);
//             console.log("apiUrl of dataSource:", apiUrl);
//             const token = getTokenFromCookies();

//             console.log('Attempting to fetch data from:', apiUrl);

//             const requestOptions = {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//             };

//             // Add authentication headers if token is available
//             if (token) {
//                 requestOptions.headers['Authorization'] = `Bearer ${token}`;
//                 requestOptions.headers['Access-Control-Request-Method'] = 'GET';
//                 requestOptions.headers['Access-Control-Request-Headers'] = 'authorization,content-type';
//                 requestOptions.headers['Origin'] = window.location.origin;
//                 requestOptions.mode = 'cors';
//                 requestOptions.credentials = 'include';
//                 requestOptions.referrerPolicy = 'no-referrer';
//                 requestOptions.redirect = 'follow';
//             }

//             const dataResponse = await fetch(apiUrl, requestOptions);
//             if (!dataResponse.ok) {
//                 throw new Error(`HTTP error! Status: ${dataResponse.status}`);
//             }

//             const data = await dataResponse.json();
//             console.log('Successfully fetched data:', data);

//             const processedData = processApiData(data);
//             setFetchedData((prevData) => (isUpdate ? mergeData(prevData, processedData) : processedData));

//             setLastUpdated(new Date().toISOString());
//             lastFetchedTimestamp.current = timeRange.to;
//         } catch (err) {
//             console.error('Error details:', err);
//             let errorMessage = 'Failed to fetch data. ';

//             if (err.message.includes('Authentication token not found')) {
//                 errorMessage = 'Authentication failed. Please log in again.';
//             } else if (err.message.includes('Method not allowed')) {
//                 errorMessage = 'API configuration error. Please contact support.';
//             } else if (err.message.includes('TenantId not found')) {
//                 errorMessage = 'TenantId not found. Please log in again.';
//             } else if (err.message.includes('Invalid endpoint URL')) {
//                 errorMessage = 'Invalid API endpoint configuration.';
//             } else {
//                 errorMessage += err.message;
//             }

//             setError(errorMessage);
//         } finally {
//             setIsLoading(false);
//             isFetching.current = false;
//         }
//     };


//     const processApiData = (data) => {
//         if (!Array.isArray(data) || data.length === 0) {
//             console.warn('Invalid data format in processApiData');
//             return [];
//         }

//         return data.reduce((acc, item) => {
//             const { variable, value, timestamp } = item;
//             if (!acc[variable]) acc[variable] = [];
//             const parsedTimestamp = new Date(timestamp);
//             if (!isNaN(parsedTimestamp.getTime())) {
//                 acc[variable].push({ timestamp: parsedTimestamp, value: parseFloat(value) });
//             } else {
//                 console.warn(`Invalid timestamp for ${variable}: ${timestamp}`);
//             }
//             return acc;
//         }, {});
//     };

//     const mergeData = (prevData, newData) => {
//         const mergedData = { ...prevData };
//         Object.keys(newData).forEach((variable) => {
//             mergedData[variable] = [...(mergedData[variable] || []), ...newData[variable]];
//         });
//         return mergedData;
//     };

//     const handleNowRefresh = () => {
//         if (selectedDataSource && timeRange && !isFetching.current) {
//             const now = new Date().toISOString();
//             const updatedTimeRange = { from: timeRange.from, to: now };
//             fetchData(selectedDataSource, updatedTimeRange, false);
//         }
//     };

//     // if (isLoading && Object.keys(fetchedData).length === 0) {
//     //     return (
//     //         <div className="flex items-center justify-center h-full">
//     //             <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
//     //         </div>
//     //     );
//     // }

//     if (isLoading && Object.keys(fetchedData).length === 0 && chartType !== 'svg') {
//         return (
//             <div className="flex items-center justify-center h-full">
//                 <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-sm text-red-500 text-center p-4">
//                 <p>{error}</p>
//                 <button
//                     onClick={() => fetchData(selectedDataSource, timeRange)}
//                     className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
//                 >
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     console.log('data', fetchedData)

//     return children(fetchedData, handleNowRefresh, lastUpdated);
// };

// export default DataFetcher;



// // import { getDataSourceInstance, getDataModelSource } from '@/WebServices/ApiControllers';
// // import React, { useState, useRef, useEffect } from 'react';

// // const DataFetcher = ({ selectedDataSource, refreshInterval, timeRange, children, selectedNode = null }) => {
// //     const [fetchedData, setFetchedData] = useState({});
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const lastFetchedTimestamp = useRef(null);
// //     const isFetching = useRef(false);
// //     const [lastUpdated, setLastUpdated] = useState(null);

// //     const getTokenFromCookies = () => {
// //         const cookies = document.cookie.split(';');
// //         const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
// //         return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1].trim()) : null;
// //     };

// //     const getTenantIdFromCookies = () => {
// //         const cookies = document.cookie.split(';');
// //         const tenantCookie = cookies.find(cookie => cookie.trim().startsWith('tenantId='));
// //         return tenantCookie ? decodeURIComponent(tenantCookie.split('=')[1].trim()) : null;
// //     };

// //     const isValidUrl = (url) => {
// //         try {
// //             new URL(url);
// //             return true;
// //         } catch {
// //             return false;
// //         }
// //     };

// //     useEffect(() => {
// //         if (selectedDataSource && timeRange && !isFetching.current) {
// //             fetchData(selectedDataSource, timeRange);
// //         }
// //     }, [selectedDataSource, timeRange]);

// //     useEffect(() => {
// //         let intervalId;
// //         if (refreshInterval && refreshInterval !== 'Off' && refreshInterval !== 'Now') {
// //             const intervalMs = getIntervalInMilliseconds(refreshInterval);
// //             intervalId = setInterval(() => {
// //                 if (selectedDataSource && timeRange && !isFetching.current) {
// //                     const now = new Date().toISOString();
// //                     const updatedTimeRange = {
// //                         from: lastFetchedTimestamp.current || timeRange.from,
// //                         to: now,
// //                     };
// //                     fetchData(selectedDataSource, updatedTimeRange, true);
// //                 }
// //             }, intervalMs);
// //         }
// //         return () => clearInterval(intervalId);
// //     }, [refreshInterval, selectedDataSource, timeRange]);

// //     useEffect(() => {
// //         fetchAndStoreDataSources();
// //     }, []);

// //     const getIntervalInMilliseconds = (interval) => {
// //         const intervals = {
// //             'now': 0,
// //             '5 sec': 5000,
// //             '10 sec': 10000,
// //             '30 sec': 30000,
// //             '1 min': 60000,
// //             '5 min': 300000,
// //             '10 min': 600000,
// //             '15 min': 900000,
// //             '30 min': 1800000,
// //             '1 hour': 3600000,
// //             '2 hour': 7200000,
// //             '1 day': 86400000,
// //         };
// //         return intervals[interval] || null;
// //     };

// //     const fetchAndStoreDataSources = async () => {
// //         try {
// //             const storedDataSources = localStorage.getItem('dataSources');
// //             if (!storedDataSources) {
// //                 const response = await getDataModelSource();
// //                 localStorage.setItem('dataSources', JSON.stringify(response));
// //             }
// //         } catch (err) {
// //             console.error('Error fetching data sources:', err);
// //         }
// //     };

// //     const dataSourceApiUrl = (response, timeRange, selectedNode = null) => {
// //         try {
// //             const { endPointURL, parameters } = response;
// //             const baseUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL;
// //             const fullEndpointUrl = endPointURL.startsWith('https')
// //                 ? endPointURL
// //                 : `${baseUrl}${endPointURL}`;

// //             console.log("fullEndpoint", fullEndpointUrl)

// //             if (!isValidUrl(fullEndpointUrl)) {
// //                 throw new Error('Invalid endpoint URL');
// //             }

// //             const tenantId = getTenantIdFromCookies();
// //             const queryParams = [];

// //             // Build query parameters
// //             for (const param of Object.values(parameters)) {
// //                 if (param.isActive) {
// //                     const encodedName = encodeURIComponent(param.name);
// //                     let encodedValue = encodeURIComponent(param.value);

// //                     if (param.ref_value) {
// //                         encodedValue = encodeURIComponent(param.ref_value);
// //                     }

// //                     queryParams.push(`${encodedName}=${encodedValue}`);
// //                 }
// //             }

// //             queryParams.push(
// //                 `from=${encodeURIComponent(timeRange.from)}`,
// //                 `to=${encodeURIComponent(timeRange.to)}`
// //             );

// //             if (tenantId) {
// //                 queryParams.push(`tenantId=${encodeURIComponent(tenantId)}`);
// //             }

// //             const finalUrl = `${fullEndpointUrl}?${queryParams.join('&')}`;
// //             return finalUrl;
// //         } catch (error) {
// //             console.error('Error creating API URL:', error);
// //             throw error;
// //         }
// //     };

// //     const fetchData = async (instanceName, timeRange, isUpdate = false) => {
// //         if (isFetching.current) return;

// //         setIsLoading(true);
// //         setError(null);
// //         isFetching.current = true;

// //         try {
// //             const response = await getDataSourceInstance(instanceName);
// //             const apiUrl = dataSourceApiUrl(response, timeRange, selectedNode);
// //             const token = getTokenFromCookies();

// //             const requestOptions = {
// //                 method: 'GET',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     'Accept': 'application/json',
// //                 },
// //             };

// //             if (token) {
// //                 requestOptions.headers['Authorization'] = `Bearer ${token}`;
// //                 requestOptions.headers['Access-Control-Request-Method'] = 'GET';
// //                 requestOptions.headers['Access-Control-Request-Headers'] = 'authorization,content-type';
// //                 requestOptions.headers['Origin'] = window.location.origin;
// //                 requestOptions.mode = 'cors';
// //                 requestOptions.credentials = 'include';
// //                 requestOptions.referrerPolicy = 'no-referrer';
// //                 requestOptions.redirect = 'follow';
// //             }

// //             const dataResponse = await fetch(apiUrl, requestOptions);
// //             if (!dataResponse.ok) {
// //                 throw new Error(`HTTP error! Status: ${dataResponse.status}`);
// //             }

// //             const data = await dataResponse.json();
// //             const processedData = processApiData(data);
// //             setFetchedData((prevData) => (isUpdate ? mergeData(prevData, processedData) : processedData));

// //             setLastUpdated(new Date().toISOString());
// //             lastFetchedTimestamp.current = timeRange.to;
// //         } catch (err) {
// //             let errorMessage = 'Failed to fetch data.';

// //             if (err.message.includes('Authentication token not found')) {
// //                 errorMessage = 'Authentication failed. Please log in again.';
// //             } else if (err.message.includes('Method not allowed')) {
// //                 errorMessage = 'API configuration error. Please contact support.';
// //             } else if (err.message.includes('TenantId not found')) {
// //                 errorMessage = 'TenantId not found. Please log in again.';
// //             } else if (err.message.includes('Invalid endpoint URL')) {
// //                 errorMessage = 'Invalid API endpoint configuration.';
// //             } else {
// //                 errorMessage += ` ${err.message}`;
// //             }

// //             setError(errorMessage);
// //         } finally {
// //             setIsLoading(false);
// //             isFetching.current = false;
// //         }
// //     };

// //     const processApiData = (data) => {
// //         if (!Array.isArray(data) || data.length === 0) {
// //             console.warn('Invalid data format in processApiData');
// //             return [];
// //         }

// //         return data.reduce((acc, item) => {
// //             const { variable, value, timestamp } = item;
// //             if (!acc[variable]) acc[variable] = [];
// //             const parsedTimestamp = new Date(timestamp);
// //             if (!isNaN(parsedTimestamp.getTime())) {
// //                 acc[variable].push({ timestamp: parsedTimestamp, value: parseFloat(value) });
// //             } else {
// //                 console.warn(`Invalid timestamp for ${variable}: ${timestamp}`);
// //             }
// //             return acc;
// //         }, {});
// //     };

// //     const mergeData = (prevData, newData) => {
// //         const mergedData = { ...prevData };
// //         Object.keys(newData).forEach((variable) => {
// //             mergedData[variable] = [...(mergedData[variable] || []), ...newData[variable]];
// //         });
// //         return mergedData;
// //     };

// //     const handleNowRefresh = () => {
// //         if (selectedDataSource && timeRange && !isFetching.current) {
// //             const now = new Date().toISOString();
// //             const updatedTimeRange = { from: timeRange.from, to: now };
// //             fetchData(selectedDataSource, updatedTimeRange, false);
// //         }
// //     };

// //     if (error) {
// //         return (
// //             <div className="text-sm text-red-500 text-center p-4">
// //                 <p>{error}</p>
// //                 <button
// //                     onClick={() => fetchData(selectedDataSource, timeRange)}
// //                     className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
// //                 >
// //                     Retry
// //                 </button>
// //             </div>
// //         );
// //     }

// //     console.log("data", fetchedData);

// //     return children(fetchedData, handleNowRefresh, lastUpdated);
// // };

// // export default DataFetcher;



import { getDataSourceInstance, getDataModelSource } from '@/WebServices/ApiControllers';
import React, { useState, useRef, useEffect } from 'react';

const DataFetcher = ({ selectedDataSource, refreshInterval, timeRange, children }) => {
    const [fetchedData, setFetchedData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const lastFetchedTimestamp = useRef(null);
    const isFetching = useRef(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const getTokenFromCookies = () => {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1].trim()) : null;
    };

    const getTenantIdFromCookies = () => {
        const cookies = document.cookie.split(';');
        const tenantCookie = cookies.find(cookie => cookie.trim().startsWith('tenantId='));
        return tenantCookie ? decodeURIComponent(tenantCookie.split('=')[1].trim()) : null;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        if (selectedDataSource && timeRange && !isFetching.current) {
            fetchData(selectedDataSource, timeRange);
        }
    }, [selectedDataSource, timeRange]);

    useEffect(() => {
        let intervalId;
        if (refreshInterval && refreshInterval !== 'Off' && refreshInterval !== 'Now') {
            const intervalMs = getIntervalInMilliseconds(refreshInterval);
            intervalId = setInterval(() => {
                if (selectedDataSource && timeRange && !isFetching.current) {
                    const now = new Date().toISOString();
                    const updatedTimeRange = {
                        from: lastFetchedTimestamp.current || timeRange.from,
                        to: now,
                    };
                    fetchData(selectedDataSource, updatedTimeRange, true);
                }
            }, intervalMs);
        }
        return () => clearInterval(intervalId);
    }, [refreshInterval, selectedDataSource, timeRange]);

    useEffect(() => {
        fetchAndStoreDataSources();
    }, []);

    const getIntervalInMilliseconds = (interval) => {
        const intervals = {
            'now': 0,
            '5 sec': 5000,
            '10 sec': 10000,
            '30 sec': 30000,
            '1 min': 60000,
            '5 min': 300000,
            '10 min': 600000,
            '15 min': 900000,
            '30 min': 1800000,
            '1 hour': 3600000,
            '2 hour': 7200000,
            '1 day': 86400000,
        };
        return intervals[interval] || null;
    };

    const fetchAndStoreDataSources = async () => {
        try {
            const storedDataSources = localStorage.getItem('dataSources');
            if (!storedDataSources) {
                const response = await getDataModelSource();
                localStorage.setItem('dataSources', JSON.stringify(response));
                console.log('Stored data sources in local storage');
            }
        } catch (err) {
            console.error('Error fetching data sources:', err);
        }
    };

    // const dataSourceApiUrl = (response, timeRange) => {
    //     try {
    //         const { endPointURL, parameters } = response;
    //         if (!isValidUrl(endPointURL)) throw new Error('Invalid endpoint URL');

    //         const tenantId = getTenantIdFromCookies();
    //         const queryParams = [
    //             ...parameters.map((param) => `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`),
    //             `from=${encodeURIComponent(timeRange.from)}`,
    //             `to=${encodeURIComponent(timeRange.to)}`,
    //         ];

    //         // Add tenantId to query params if available
    //         if (tenantId) {
    //             queryParams.push(`tenantId=${encodeURIComponent(tenantId)}`);
    //         }

    //         return `${endPointURL}?${queryParams.join('&')}`;
    //     } catch (error) {
    //         console.error('Error creating API URL:', error);
    //         throw error;
    //     }
    // };

    const getBaseUrl = () => {
        if (typeof window !== 'undefined') {
            console.log("Window defined", `${window.location.protocol}//${window.location.host}`);
            return `${window.location.protocol}//${window.location.host}/`;
        }
        console.log("Window not defined");
        return '';
    };

    const replaceUrlWithBaseUrl = (endPointURL) => {
        try {
            // Find the position of 'http' and '.com' in the URL ///

            const startIndex = endPointURL.indexOf('http');
            const endIndex = endPointURL.indexOf('.com') + 4; // +4 to include '.com'

            if (startIndex === -1 || endIndex === -1) {
                throw new Error('URL does not contain required components');
            }

            // Replace the portion from http to .com with BASE_URL
            const BASE_URL = getBaseUrl();
            // const BASE_URL = "https://yunometa.digital-sync.com/"
            const remainingPath = endPointURL.substring(endIndex);
            return `${BASE_URL}${remainingPath}`;
        } catch (error) {
            console.error('Error replacing URL with BASE_URL:', error);
            throw error;
        }
    };

    const dataSourceApiUrl = (response, timeRange) => {
        try {
            const { endPointURL, parameters } = response;
            if (!isValidUrl(endPointURL)) throw new Error('Invalid endpoint URL');

            // Replace the URL portion with BASE_URL
            const modifiedEndpointURL = replaceUrlWithBaseUrl(endPointURL);

            const tenantId = getTenantIdFromCookies();
            const queryParams = [
                ...parameters.map((param) => `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`),
                `from=${encodeURIComponent(timeRange.from)}`,
                `to=${encodeURIComponent(timeRange.to)}`,
            ];

            if (tenantId) {
                queryParams.push(`tenantId=${encodeURIComponent(tenantId)}`);
            }

            const finalUrl = `${modifiedEndpointURL}?${queryParams.join('&')}`;
            console.log("url:", finalUrl);
            return finalUrl;
        } catch (error) {
            console.error('Error creating API URL:', error);
            throw error;
        }
    };

    const fetchData = async (instanceName, timeRange, isUpdate = false) => {
        if (isFetching.current) return;

        setIsLoading(true);
        setError(null);
        isFetching.current = true;

        try {
            const response = await getDataSourceInstance(instanceName);
            const apiUrl = dataSourceApiUrl(response, timeRange);
            console.log("data source api url", apiUrl);
            const token = getTokenFromCookies();

            console.log('Attempting to fetch data from:', apiUrl);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };

            // Add authentication headers if token is available
            if (token) {
                requestOptions.headers['Authorization'] = `Bearer ${token}`;
                requestOptions.headers['Access-Control-Request-Method'] = 'GET';
                requestOptions.headers['Access-Control-Request-Headers'] = 'authorization,content-type';
                requestOptions.headers['Origin'] = window.location.origin;
                requestOptions.mode = 'cors';
                requestOptions.credentials = 'include';
                requestOptions.referrerPolicy = 'no-referrer';
                requestOptions.redirect = 'follow';
            }

            const dataResponse = await fetch(apiUrl, requestOptions);
            if (!dataResponse.ok) {
                throw new Error(`HTTP error! Status: ${dataResponse.status}`);
            }

            const data = await dataResponse.json();
            console.log('Successfully fetched data:', data);

            const processedData = processApiData(data);
            setFetchedData((prevData) => (isUpdate ? mergeData(prevData, processedData) : processedData));

            setLastUpdated(new Date().toISOString());
            lastFetchedTimestamp.current = timeRange.to;
        } catch (err) {
            console.error('Error details:', err);
            let errorMessage = 'Failed to fetch data. ';

            if (err.message.includes('Authentication token not found')) {
                errorMessage = 'Authentication failed. Please log in again.';
            } else if (err.message.includes('Method not allowed')) {
                errorMessage = 'API configuration error. Please contact support.';
            } else if (err.message.includes('TenantId not found')) {
                errorMessage = 'TenantId not found. Please log in again.';
            } else if (err.message.includes('Invalid endpoint URL')) {
                errorMessage = 'Invalid API endpoint configuration.';
            } else {
                errorMessage += err.message;
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
            isFetching.current = false;
        }
    };


    const processApiData = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('Invalid data format in processApiData');
            return [];
        }

        return data.reduce((acc, item) => {
            const { variable, value, timestamp } = item;
            if (!acc[variable]) acc[variable] = [];
            const parsedTimestamp = new Date(timestamp);
            if (!isNaN(parsedTimestamp.getTime())) {
                acc[variable].push({ timestamp: parsedTimestamp, value: parseFloat(value) });
            } else {
                console.warn(`Invalid timestamp for ${variable}: ${timestamp}`);
            }
            return acc;
        }, {});
    };

    const mergeData = (prevData, newData) => {
        const mergedData = { ...prevData };
        Object.keys(newData).forEach((variable) => {
            mergedData[variable] = [...(mergedData[variable] || []), ...newData[variable]];
        });
        return mergedData;
    };

    const handleNowRefresh = () => {
        if (selectedDataSource && timeRange && !isFetching.current) {
            const now = new Date().toISOString();
            const updatedTimeRange = { from: timeRange.from, to: now };
            fetchData(selectedDataSource, updatedTimeRange, false);
        }
    };

    if (isLoading && Object.keys(fetchedData).length === 0) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                {/* <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div> */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-xs text-red-500 text-center p-4">
                <p>{error}</p>
                <button
                    onClick={() => fetchData(selectedDataSource, timeRange)}
                    className="mt-2 px-4 py-2 bg-sky-500 text-xs text-white rounded hover:bg-sky-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return children(fetchedData, handleNowRefresh, lastUpdated);
};

export default DataFetcher;