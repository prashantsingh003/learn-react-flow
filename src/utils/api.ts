const BASE_URL="http://127.0.0.1:8000";

export const getLogin=BASE_URL+"/login/";

export const userApi=BASE_URL+"/user/";
export const createUserApi=BASE_URL+"/user/";
export const updateUserApi=BASE_URL+"/user/update/"
export const updateUserPasswordApi=BASE_URL+"/user/change-password/"

export const flowApi=BASE_URL+"/flow/";
export const getUserFlowsApi=BASE_URL+"/flow/user/";
export const renameFlowApi=BASE_URL+"/flow/rename/";