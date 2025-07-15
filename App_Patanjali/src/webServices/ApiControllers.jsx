import Cookies from "js-cookie";
import EndPoints from "./APIEndpoints";
import axios from "axios";

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
      window.location.href = (`${BASE_URL}/sessionexpired`);
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error) => {
  const errorMessage =
    error.response?.data?.errorCode + " " + error.response?.data?.message ||
    error.message;
  console.log("Error: " + errorMessage);
  throw { statusCode: error.response?.status, errorMessage };
};

const TENANT_ID = Cookies.get("tenantId");
const token = Cookies.get("token");

export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
};


export const saveDashboard = async (instanceName, dashboardData) => {
  try {
    const jsonString = JSON.stringify(dashboardData);
    const jsonString1 = JSON.stringify(jsonString);
    const response = await axiosInstance.post(
      EndPoints.SAVE_DASHBOARD(TENANT_ID, instanceName),
      jsonString1,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response for addDashboard => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for addDashboard => ", error);
    return handleApiError(error);
  }
};

export const savePlant360Dashboard = async (instanceName, dashboardData) => {
  try {
    const jsonString = JSON.stringify(dashboardData);
    const jsonString1 = JSON.stringify(jsonString);
    const response = await axiosInstance.post(
      EndPoints.SAVE_Plant360_DASHBOARD(TENANT_ID, instanceName),
      jsonString1,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response for addPlant360Dashboard => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for addPlant360Dashboard => ", error);
    return handleApiError(error);
  }
};

export const saveDataSource = async (instanceName, jsonData) => {
  try {
    const jsonString = JSON.stringify(jsonData);
    const response = await axiosInstance.post(
      EndPoints.SAVE_DATA_SOURCES(TENANT_ID, instanceName),
      jsonString,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response for saveDataSource => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for saveDataSource => ", error);
    return handleApiError(error);
  }
};

export const getRegisteredDataModels = async () => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(EndPoints.GET_REGISTERED_DATA_MODELS(tenantId));
    console.log("API Response for getRegisteredDataModels => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getRegisteredDataModels => ", error);
    return handleApiError(error);
  }
};

export const getAllDashboard = async () => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(EndPoints.GET_ALL_DASHBOARD(tenantId));
    console.log("API Response for getAllDashboard => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getAllDashboard => ", error);
    return handleApiError(error);
  }
};

export const getAssetGroupModels = async () => {
  try {
    const response = await axiosInstance.get(EndPoints.GET_ASSETS_GROUP_MODELS(TENANT_ID));
    console.log("API Response for getAssetGroupModels => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getAssetGroupModels => ", error);
    return handleApiError(error);
  }
};

export const getDashboardInstance = async (instanceName) => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_DASHBOARD_INSTANCE(tenantId, instanceName)
    );
    console.log("API Response for getDashboardInstance => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getDashboardInstance => ", error);
    return handleApiError(error);
  }
};

export const getPlant360AllDashboard = async () => {
  try {
    const response = await axiosInstance.get(EndPoints.GET_Plant360_ALL_DASHBOARD(TENANT_ID));
    console.log("API Response for getPlant360AllDashboard => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getPlant360AllDashboard => ", error);
    return handleApiError(error);
  }
};

export const getPlant360DashboardInstance = async (instanceName) => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_Plant360_DASHBOARD_INSTANCE(tenantId, instanceName)
    );
    console.log("API Response for getPlant360DashboardInstance => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getPlant360DashboardInstance => ", error);
    return handleApiError(error);
  }
};

export const getDataSourceInstance = async (instanceName) => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_DATA_SOURCES(tenantId, instanceName)
    );
    console.log("API Response for getDataSourceInstance => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getDataSourceInstance => ", error);
    return handleApiError(error);
  }
};

export const getDataModelSource = async () => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(EndPoints.GET_ALL_DATA_SOURCES(tenantId));
    console.log("API Response for getDataModelSource => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getDataModelSource => ", error);
    return handleApiError(error);
  }
};

// Fetch all data sources
export const getAllDataSource = (instanceName) => {
  return axiosInstance
    .get(EndPoints.GET_ALL_DATA_SOURCES(TENANT_ID, instanceName))
    .then((response) => {
      console.log("API Response for getAllDataSource => ", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("API Error for getAllDataSource => ", error);
      throw error;
    });
};

// Save a data source instance



export const saveDataModelSource = (instanceName, data) => {
  const jsonString = JSON.stringify(data);
  const jsonString1 = JSON.stringify(jsonString);

  return axiosInstance
    .post(EndPoints.SAVE_DATA_SOURCES(TENANT_ID, instanceName), jsonString1, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("API Response for saveDataModelSource => ", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("API Error for saveDataModelSource => ", error);
      throw error;
    });
};

// Delete Api ........
export const deleteDashboard = (instanceName) => {
  return axiosInstance
    .delete(EndPoints.DELETE_DASHBOARD(TENANT_ID, instanceName), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("API Response for deleteDashboard => ", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("API Error for deleteDashboard => ", error);
      throw error;
    });
};

export const deletePlant360Dashboard = (instanceName) => {
  return axiosInstance
    .delete(EndPoints.DELETE_Plant360_DASHBOARD(TENANT_ID, instanceName), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("API Response for DELETE_Plant360_DASHBOARD => ", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("API Error for DELETE_Plant360_DASHBOARD => ", error);
      throw error;
    });
};

export const deleteDataSource = (instanceName) => {
  return axiosInstance
    .delete(EndPoints.DELETE_DATA_SOURCE(TENANT_ID, instanceName), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("API Response for deleteDataSource => ", response.data);
      return { result: response.data };
    })
    .catch((error) => {
      console.error("API Error for deleteDataSource => ", error);
      throw error;
    });
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

export const getIconFiles = async () => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(EndPoints.GET_ICON_FILES(tenantId));
    console.log("API Response for getPlant360SVG => ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for getPlant360SVG => ", error);
    return handleApiError(error);
  }
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


export const GetProductionData = async (instanceId, year, month) => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(EndPoints.GET_PRODUCTION_DATA(tenantId, instanceId, year, month));
    // console.log("API Response for GetProductionData => ", response.data);
    return response.data;
  } catch (error) {
    // console.error("API Error for GetProductionData => ", error);
    return handleApiError(error);
  }
};


export const SetProductionData = async (instanceName, year, month, tableData) => {
  try {
    const tenantId = Cookies.get("tenantId");

    // const payload = JSON.stringify(tableData);
    // console.log("data:", tableData);
    // console.log("data:", payload);

    const response = await axiosInstance.post(
      EndPoints.SET_PRODUCTION_DATA(tenantId, instanceName, year, month),
      tableData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response for SetProductionData:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error for SetProductionData:", error);
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

export const getDataValues = async ({
  instanceId,
  from,
  to,
}) => {
  try {
    const tenantId = Cookies.get("tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_VALUES(
        tenantId,
        instanceId,
        from,
        to,
      )
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};