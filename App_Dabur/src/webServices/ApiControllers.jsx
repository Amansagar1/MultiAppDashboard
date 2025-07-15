import Cookies from "js-cookie";
import EndPoints from "./APIEndpoints";
import axios from "axios";
import { toast } from "../Components/ToasterMessage/ToastService";

const axiosInstance = axios.create();

// Get basePath from the environment or use a default
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.split('/')[1] || 'dabur';
  }
  return 'dabur';
};

// Update request interceptor to use dabur_ prefixed cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("dabur_token");
    const tenantId = Cookies.get("dabur_tenantId");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (tenantId) {
      config.headers["Tenant-ID"] = tenantId;
    }
    return config;
  },
  (error) => {
    toast.error("Request error: " + (error.message || "Unknown error"));
    return Promise.reject(error);
  }
);

// Update response interceptor for handling auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const basePath = getBasePath();

    if (error.response) {
      // Handle authentication errors
      if (error.response.status === 401) {
        Cookies.remove("dabur_token");
        Cookies.remove("dabur_tenantId");

        // Use basePath for redirection
        window.location.href = `/${basePath}/sessionexpired`;

        toast.error("Session expired. Please login again.");
      } else if (error.response.status === 403) {
        toast.error("You don't have permission to perform this action.");
      } else if (error.response.status === 404) {
        toast.error("The requested resource was not found.");
      } else if (error.response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        const errorMsg = error.response.data?.message || "An error occurred";
        toast.error(errorMsg);
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error) => {
  const errorMessage =
    error.response?.data?.errorCode + " " + error.response?.data?.message ||
    error.message;

  toast.error("Error: " + errorMessage);

  console.log("Error: " + errorMessage);
  throw { statusCode: error.response?.status, errorMessage };
};

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
    toast.error("Invalid token format");
    return null;
  }
};

// License API with License Type and End Date handling
export const getAllLicense = () => {
  const tenantId = '16bdaab1-b43e-40a7-b070-60bfeb3611cc';

  return axiosInstance
    .get(EndPoints.Get_All_License(tenantId))
    .then((response) => {
      const { licenseType, endDate } = response.data;
      if (licenseType) {
        setCookieWithExpiration("dabur_licenseType", licenseType, 7);
      }
      if (endDate) {
        setCookieWithExpiration("dabur_licenseEndDate", endDate, 7);
      }
      return { result: response.data };
    })
    .catch((error) => {
      handleApiError(error);
      toast.error("Failed to retrieve license information");
    });
};

const setCookieWithExpiration = (name, value, expiresDays) => {
  try {
    if (window.location.protocol === "https:") {
      Cookies.set(name, value, { expires: expiresDays, secure: true, sameSite: 'strict' });
    }
    else {
      Cookies.set(name, value, { expires: expiresDays, secure: false, sameSite: 'strict' });
    }
  } catch (error) {
    console.error("Error setting cookie:", error);
    toast.error("Failed to set authentication cookies");
  }
};

// Login API
export const loginApi = async (username, password, tenantId) => {
  try {
    const loginUrl = EndPoints.LOGIN_API(tenantId);
    console.log('Login API URL:', loginUrl);

    const response = await axiosInstance.post(loginUrl, {
      userName: username,
      password: password,
    });

    if (response?.data?.token) {
      setCookieWithExpiration('dabur_token', response.data.token, 7);
      setCookieWithExpiration('dabur_tenantId', tenantId, 7);
      // toast.success("Login successful");

      // Fetch and store license details after login
      // await getAllLicense();
    } else {
      toast.warning("Login successful but no token received");
    }

    return response.data;
  } catch (error) {
    console.error('API Error for loginApi => ', error);

    // Show appropriate error message based on status
    if (error.response?.status === 401) {
      toast.error("Invalid username or password");
    } else if (error.response?.status === 404) {
      toast.error("User not found");
    } else {
      toast.error(error.response?.data?.message || "Login failed");
    }

    throw { statusCode: error.response?.status || 500, message: error.message || 'Something went wrong' };
  }
};

// Function to Display License Bar if Condition 012
export const displayLicenseBar = () => {
  const licenseType = Cookies.get("dabur_licenseType");
  const licenseEndDate = Cookies.get("dabur_licenseEndDate");

  if (licenseType === "012") {
    return `License Type: ${licenseType} | Expires on: ${licenseEndDate}`;
  } else {
    return null;
  }
};

export const getAlarmsData = async ({
  instanceId,
  limit = 100000
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_ALARMS_DATA(
        tenantId,
        instanceId,
        limit
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve alarm data");
    return handleApiError(error);
  }
};

export const getHistorialData = async ({
  instanceId,
  variable,
  to,
  from,
  frequency = 'hour',
  limit = 100000
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
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
    toast.error("Failed to retrieve data");
    return handleApiError(error);
  }
};

export const getDataValues = async ({
  instanceId,
  from,
  to,
  limit
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_VALUES(
        tenantId,
        instanceId,
        from,
        to,
        limit
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve data");
    return handleApiError(error);
  }
};

export const TotalEnergyConsumption = async ({
  from,
  to,
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.TOTAL_ENERGY_CONSUMPTION(
        tenantId,
        from,
        to,
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve energy data");
    return handleApiError(error);
  }
};

export const TotalLoadSummary = async ({
  from,
  to,
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.TOTAL_LOAD_SUMMARY(
        tenantId,
        from,
        to,
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve summary data");
    return handleApiError(error);
  }
};

export const reportData = async (from, to, parameterData) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.post(
      EndPoints.REPORT_DATA(tenantId, from, to),
      parameterData,
    );
    // console.log("API Response for REPORT_DATA => ", response.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve report data");
    return handleApiError(error);
  }
};


export const GetProductionData = async (instanceId, year, month) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(EndPoints.GET_PRODUCTION_DATA(tenantId, instanceId, year, month));
    // console.log("API Response for GetProductionData => ", response.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve production data");
    return handleApiError(error);
  }
};

export const SetProductionData = async (instanceName, year, month, tableData) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    console.log("Sending data to API:", {
      instanceName,
      year,
      month,
      tableData: JSON.stringify(tableData)
    });

    const response = await axiosInstance.post(
      EndPoints.SET_PRODUCTION_DATA(tenantId, instanceName, year, month),
      tableData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    toast.error("Failed to save production data");
    return handleApiError(error);
  }
};

export const getEnergyTrends = async ({
  lineNumber,
  frequency,
  limit
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_ENERGY_TRENDS(
        tenantId, lineNumber, frequency, limit
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve energy trends data");
    return handleApiError(error);
  }
};

export const GetLineDetails = async ({
  lineNumber,
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.GET_LINE_DETAILS(
        tenantId, lineNumber, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve line details data");
    return handleApiError(error);
  }
};

export const loadProfileLine6Main = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_PROFILE_LINE6_MAIN(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve profile main line_6 data");
    return handleApiError(error);
  }
};

export const loadProfileLine6Shrink = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_PROFILE_LINE6_SHRINK(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve profile shrink line_6 data");
    return handleApiError(error);
  }
};

export const loadProfileLine4Main = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_PROFILE_LINE4_MAIN(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve profile main line_4 data");
    return handleApiError(error);
  }
};

export const loadProfileLine4Shrink = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_PROFILE_LINE4_SHRINK(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve profile shrink line_4 data");
    return handleApiError(error);
  }
};

export const loadSummaryLine4Main = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_SUMMARY_LINE4_MAIN(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve summary main line_4 data");
    return handleApiError(error);
  }
};

export const loadSummaryLine4Shrink = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_SUMMARY_LINE4_SHRINK(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve summary shrink line_4 data");
    return handleApiError(error);
  }
};

export const loadSummaryLine6Main = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_SUMMARY_LINE6_MAIN(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve summary main line_6 data");
    return handleApiError(error);
  }
};

export const loadSummaryLine6Shrink = async ({
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.LOAD_SUMMARY_LINE6_SHRINK(
        tenantId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve summary shrink line_6 data");
    return handleApiError(error);
  }
};

export const activeEnergyConsume = async ({
  instanceId,
  from,
  to
}) => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(
      EndPoints.ACTIVE_ENERGY_CONSUME(
        tenantId, instanceId, from, to
      )
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve active_energy consume data");
    return handleApiError(error);
  }
};

export const getOperatorMain6 = async () => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(EndPoints.GET_OPERATOR_TREND_MAIN_6(tenantId));
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve getOperatorMain6 data");
    return handleApiError(error);
  }
};

export const getOperatorShrink6 = async () => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(EndPoints.GET_OPERATOR_TREND_SHRINK_6(tenantId));
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve getOperatorShrink6 data");
    return handleApiError(error);
  }
};

export const getOperatorMain4 = async () => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(EndPoints.GET_OPERATOR_TREND_MAIN_4(tenantId));
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve getOperatorMain4 data");
    return handleApiError(error);
  }
};

export const getOperatorShrink4 = async () => {
  try {
    const tenantId = Cookies.get("dabur_tenantId");
    const response = await axiosInstance.get(EndPoints.GET_OPERATOR_TREND_SHRINK_4(tenantId));
    return response.data;
  } catch (error) {
    toast.error("Failed to retrieve getOperatorShrink4 data");
    return handleApiError(error);
  }
};