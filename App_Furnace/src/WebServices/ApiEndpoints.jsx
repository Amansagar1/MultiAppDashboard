"use client";

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        console.log(
            "Window defined",
            `${window.location.protocol}//${window.location.host}`
        );
        return `${window.location.protocol}//${window.location.host}/`;
    }
    console.log("Window not defined");

    return "";
};

// const BASE_URL = getBaseUrl();

const BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;

const EndPoints = {
    // Login Api
    LOGIN_API: (tenantId) =>
        BASE_URL + `adminservice/api/v1/LoginService/Login?tenantId=${tenantId}`,

    Get_All_License: (tenantId) =>
        BASE_URL + `/mgmtportalapi/api/v1/MgmtPortalApi/GetLicenseInformation?tenantId=${tenantId}`,

    GET_HISTORIAL_DATA: (tenantId, instanceId, variable, to, from, frequency, limit) =>
        BASE_URL + `/dataapi/api/v1/DataApi/GetHistorialData?tenantId=${tenantId}&instanceId=${instanceId}&variable=${variable}&to=${to}&from=${from}&frequency=${frequency}&limit=${limit}`,

    GET_VARIABLE_LAST_VALUE: (tenantId, instanceId, dataModel, variableName) =>
        BASE_URL + `/dataapi/api/v1/DataApi/GetVariableLastValue?tenantId=${tenantId}&instanceId=${instanceId}&dataModel=${dataModel}&variableName=${variableName}`,

    GET_ALARMS_DATA: (tenantId, instanceId, limit) =>
        BASE_URL + `/dataapi/api/v1/AlarmApi/GetAlarms?tenantId=${tenantId}&instanceId=${instanceId}&limit=${limit}`,

    GET_ALL_DATA_MODELS: (tenantId) =>
        BASE_URL + `/mgmtportalapi/api/v1/MgmtPortalApi/GetRegisteredDataModels?tenantId=${tenantId}`,

    GET_PLANT360_SVG: (tenantId, svgName) =>
        BASE_URL + `plant360/api/v1/Image/GetSVG?tenantId=${tenantId}&svgName=${svgName}`,
};

Object.freeze(EndPoints);

export default EndPoints;
