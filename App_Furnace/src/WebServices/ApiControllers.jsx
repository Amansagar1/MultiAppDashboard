import Cookies from "js-cookie";
import EndPoints from "./ApiEndpoints";
import axios from "axios";

// Create axios instance with interceptors for authentication
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        const tenantId = Cookies.get("tenantId");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (tenantId) {
            config.headers["Tenant-ID"] = tenantId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = (`${process.env.NEXT_PUBLIC_PROD_BASE_URL}/sessionexpierd`);
        }
        return Promise.reject(error);
    }
);

export const getHistorialData = async ({
    instanceId,
    variable,
    to,
    from,
    frequency = 'hour',
    limit = 1000
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_HISTORIAL_DATA(
                tenantId,
                instanceId,
                variable,
                to,
                from,
                frequency,
                limit
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getVariableLastValue = async ({
    instanceId,
    dataModel,
    variableName
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_VARIABLE_LAST_VALUE(
                tenantId,
                instanceId,
                dataModel,
                variableName
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAlarmsData = async ({
    instanceId,
    limit = 1000
}) => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(
            EndPoints.GET_ALARMS_DATA(
                tenantId,
                instanceId,
                limit
            )
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAllDataModels = async () => {
    try {
        const tenantId = Cookies.get("tenantId");
        const response = await axiosInstance.get(EndPoints.GET_ALL_DATA_MODELS(tenantId));
        console.log("API Response for getAllDataModels => ", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error for getAllDataModels => ", error);
        return handleApiError(error);
    }
};

export const getPlant360SVG = async (svgName) => {
    try {
        const tenantId = Cookies.get("tenantId");
      const response = await axiosInstance.get(EndPoints.GET_PLANT360_SVG(tenantId, svgName));
      console.log("API Response for getIconFiles => ", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error for getIconFiles => ", error);
      return handleApiError(error);
    }
};

export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Invalid token', e);
        return null;
    }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
    const errorMessage =
        error.response?.data?.errorCode + " " + error.response?.data?.message ||
        error.message;
    console.log("Error: " + errorMessage);
    throw { statusCode: error.response?.status, errorMessage };
};

const setCookieWithExpiration = (name, value, expiresDays) => {
    Cookies.set(name, value, { expires: expiresDays, secure: true, sameSite: 'strict' });
};

// Login API
export const loginApi = async (username, password, tenantId) => {
    try {
        if (!tenantId) {
            throw { statusCode: 400, message: "Tenant ID is undefined" };
        }

        const loginUrl = EndPoints.LOGIN_API(tenantId);
        console.log('Login API URL:', loginUrl);

        const response = await axiosInstance.post(loginUrl, {
            userName: username,
            password: password,
        });

        if (response?.data?.token) {
            setCookieWithExpiration('token', response.data.token, 7);
            setCookieWithExpiration('tenantId', tenantId, 7);

            // Fetch and store license details after login
            await getAllLicense();
        } else {
            throw { statusCode: 401, message: "Login failed, invalid credentials." };
        }

        return response.data;
    } catch (error) {
        console.error('API Error for loginApi => ', error);
        throw { statusCode: error.response?.status || 500, message: error.message || 'Something went wrong' };
    }
};

// License API with License Type and End Date handling
export const getAllLicense = () => {
    const tenantId = Cookies.get("tenantId");

    return axiosInstance
        .get(EndPoints.Get_All_License(tenantId))
        .then((response) => {
            const { licenseType, endDate } = response.data;
            if (licenseType) {
                setCookieWithExpiration("licenseType", licenseType, 7);
            }
            if (endDate) {
                setCookieWithExpiration("licenseEndDate", endDate, 7);
            }
            return { result: response.data };
        })
        .catch(handleApiError);
};

// Function to Display License Bar if Condition 012
export const displayLicenseBar = () => {
    const licenseType = Cookies.get("licenseType");
    const licenseEndDate = Cookies.get("licenseEndDate");

    if (licenseType === "012") {
        return `License Type: ${licenseType} | Expires on: ${licenseEndDate}`;
    } else {
        return null;
    }
};