'use client';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        console.log("Window defined", `${window.location.protocol}//${window.location.host}`);
        return `${window.location.protocol}//${window.location.host}/`;
    }
    console.log("Window not defined");

    return '';
};

const BASE_URL = getBaseUrl();

// const BASE_URL = "https://yunometa.digital-sync.com/"
// 
const EndPoints = {
    // Login Api
    LOGIN_API: (tenantId) =>
        BASE_URL + `adminservice/api/v1/LoginService/Login?tenantId=${tenantId}`,

    Get_All_License: (tenantId) =>
        BASE_URL + `/mgmtportalapi/api/v1/MgmtPortalApi/GetLicenseInformation?tenantId=${tenantId}`,

    //GET API ---------------//
    ACTIVE_ENERGY_CONSUME: (tenantId, instanceId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/ActiveEnergyConsume?tenantId=${tenantId}&instanceId=${instanceId}&from=${from}&to=${to}`,

    REPORT_DATA: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/Report?tenantId=${tenantId}&from=${from}&to=${to}`,

    SQL_QUERY: (tenantId) =>
        `http://yunometa.digital-sync.com:4200/api/v1/RowDataApi/GetData?tenantId=${tenantId}`,

    TOTAL_LOAD_SUMMARY: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/TotalLoadSummary?tenantId=${tenantId}&from=${from}&to=${to}`,

    TOTAL_ENERGY_CONSUMPTION: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/TotalEnergyConsumption?tenantId=${tenantId}&from=${from}&to=${to}`,

    GET_ENERGY_TRENDS: (tenantId, lineNumber, frequency, limit) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetEnergyTrends?tenantId=${tenantId}&LineNumber=${lineNumber}&frequency=${frequency}&Limit=${limit}`,

    GET_LINE_DETAILS: (tenantId, lineNumber, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetLineDetails?tenantId=${tenantId}&LineNumber=${lineNumber}&from=${from}&to=${to}`,

    GET_DASHBOARD_DATA: (tenantId, fromDate, to, instanceId) =>
        BASE_URL + `dataapi/api/v1/DataApi/GetValues?tenantId=${tenantId}&from=${fromDate}&to=${to}&instanceId=${instanceId}&include_dataModel=true&include_instanceId=true&asc=false&limit=20`,

    // Production Data 
    SET_PRODUCTION_DATA: (tenantId, instanceId, year, month) =>
        BASE_URL + `kpiservice/api/v1/SetPoint/SetProductionData?tenantId=${tenantId}&instanceId=${instanceId}&year=${year}&month=${month}`,

    GET_PRODUCTION_DATA: (tenantId, instanceId, year, month) =>
        BASE_URL + `kpiservice/api/v1/SetPoint/GetProductionData?tenantId=${tenantId}&instanceId=${instanceId}&year=${year}&month=${month}`,

    // Get Load Profile 
    LOAD_PROFILE_LINE6_MAIN: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadProfile_Line6_Main?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_PROFILE_LINE6_SHRINK: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadProfile_Line6_Shrink?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_PROFILE_LINE4_MAIN: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadProfile_Line4_Main?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_PROFILE_LINE4_SHRINK: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadProfile_Line4_Shrink?tenantId=${tenantId}&from=${from}&to=${to}`,

    // Get Load Summary 
    LOAD_SUMMARY_LINE4_MAIN: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadSummaryLine4Main?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_SUMMARY_LINE4_SHRINK: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadSummaryLine4Shrink?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_SUMMARY_LINE6_MAIN: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadSummaryLine4Main?tenantId=${tenantId}&from=${from}&to=${to}`,

    LOAD_SUMMARY_LINE6_SHRINK: (tenantId, from, to) =>
        BASE_URL + `kpiservice/api/v1/KpiService/LoadSummaryLine6Shrink?tenantId=${tenantId}&from=${from}&to=${to}`,

    // GetOperatorTrends
    GET_OPERATOR_TREND_MAIN_6: (tenantId) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetOperationalTrend_Main_6?tenantId=${tenantId}`,

    GET_OPERATOR_TREND_SHRINK_6: (tenantId) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetOperationalTrend_Shrink_6?tenantId=${tenantId}`,

    GET_OPERATOR_TREND_MAIN_4: (tenantId) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetOperationalTrend_Main_4?tenantId=${tenantId}`,

    GET_OPERATOR_TREND_SHRINK_4: (tenantId) =>
        BASE_URL + `kpiservice/api/v1/KpiService/GetOperationalTrend_Shrink_4?tenantId=${tenantId}`,

    GET_REGISTERED_DATA_MODELS: (tenantId) =>
        BASE_URL + `mgmtportalapi/api/v1/MgmtPortalApi/GetRegisteredDataModels?tenantId=${tenantId}`,

    GET_ALL_DATA_SOURCES: (tenantId) =>
        BASE_URL + `enggapi/api/v1/DataSourceApi/GetAllDataSources?tenantId=${tenantId}`,

    GET_DATA_SOURCES: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/DataSourceApi/GetDataSourceInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    GET_ALL_DASHBOARD: (tenantId) =>
        BASE_URL + `enggapi/api/v1/DashboardApi/GetAllDashboards?tenantId=${tenantId}`,

    GET_DASHBOARD_INSTANCE: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/DashboardApi/GetDashboardInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    GET_Plant360_ALL_DASHBOARD: (tenantId) =>
        BASE_URL + `enggapi/api/v1/Plant360/GetAllDashboards?tenantId=${tenantId}`,

    GET_Plant360_DASHBOARD_INSTANCE: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/Plant360/GetDashboardInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    GET_ASSETS_GROUP_MODELS: (tenantId) =>
        BASE_URL + `plant360/api/v1/AssetModel/GetAssetGroupModels?tenantId=${tenantId}`,

    GET_ICON_FILES: (tenantId) =>
        BASE_URL + `plant360/api/v1/Image/GetIconfiles?tenantId=${tenantId}`,

    GET_PLANT360_SVG: (tenantId, svgName) =>
        BASE_URL + `plant360/api/v1/Image/GetSVG?tenantId=${tenantId}&svgName=${svgName}`,

    GET_ALARMS_DATA: (tenantId, instanceId, limit) =>
        BASE_URL + `dataapi/api/v1/AlarmApi/GetAlarms?tenantId=${tenantId}&instanceId=${instanceId}&limit=${limit}`,

    GET_HISTORIAL_DATA: (tenantId, instanceId, variable, to, from, frequency, limit) =>
        BASE_URL + `dataapi/api/v1/DataApi/GetHistorialData?tenantId=${tenantId}&instanceId=${instanceId}&variable=${variable}&to=${to}&from=${from}&frequency=${frequency}&limit=${limit}`,

    GET_ALL_DATA_MODELS: (tenantId) =>
        BASE_URL + `mgmtportalapi/api/v1/MgmtPortalApi/GetRegisteredDataModels?tenantId=${tenantId}`,

    GET_VALUES: (tenantId, instanceId, from, to, limit) =>
        BASE_URL + `dataapi/api/v1/DataApi/GetValues?tenantId=${tenantId}&from=${from}&to=${to}&instanceId=${instanceId}&include_dataModel=true&include_instanceName=false&include_instanceId=true&include_edgeId=true&jsonOutput=true&asc=true&limit=${limit}`,

    //POST API ---------------//

    SAVE_PLANT360_SVG: () =>
        BASE_URL + `plant360/api/v1/Image/UploadSVG?tenantId=${tenantId}`,

    SAVE_DATA_SOURCES: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/DataSourceApi/SaveDataSourceInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    SAVE_DASHBOARD: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/DashboardApi/SaveDashboardBuilderInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    SAVE_Plant360_DASHBOARD: (tenantId, instanceName) =>
        BASE_URL + `enggapi/api/v1/Plant360/SaveDashboardBuilderInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    // DELETE API ---------------//
    DELETE_DASHBOARD: (tenantId, instanceName) =>
        BASE_URL + `/enggapi/api/v1/DashboardApi/DeleteInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    DELETE_DATA_SOURCE: (tenantId, instanceName) =>
        BASE_URL + `/enggapi/api/v1/DataSourceApi/DeleteInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    DELETE_Plant360_DASHBOARD: (tenantId, instanceName) =>
        BASE_URL + `/enggapi/api/v1/Plant360/DeleteInstance?tenantId=${tenantId}&instanceName=${instanceName}`,

    SET_PRODUCTION_DATA: (tenantId, instanceId, year, month) =>
        BASE_URL + `kpiservice/api/v1/SetPoint/SetProductionData?tenantId=${tenantId}&instanceId=${instanceId}&year=${year}&month=${month}`,

    GET_PRODUCTION_DATA: (tenantId, instanceId, year, month) =>
        BASE_URL + `kpiservice/api/v1/SetPoint/GetProductionData?tenantId=${tenantId}&instanceId=${instanceId}&year=${year}&month=${month}`,

};

Object.freeze(EndPoints);

export default EndPoints;
