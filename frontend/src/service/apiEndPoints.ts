import { BACKEND_URL } from "./backendURL";

export const AdminEndPoints = {
  LOGIN_API: `${BACKEND_URL}/api/v1/admin/login`,
  FORGET_PASSWORD_API: `${BACKEND_URL}/api/v1/admin/forget-password`,
};

export const ProductEndpoints = {
  CREATE_PRODUCT_API: `${BACKEND_URL}/api/v1/product/create-Product`,
  DELETE_PRODUCT_ID_API: `${BACKEND_URL}/api/v1/product/delete-product`,
  GET_ALL_PRODUCT_API: `${BACKEND_URL}/api/v1/product/get-all-product`,
  DETAILS_PRODUCT_ID_API: `${BACKEND_URL}/api/v1/product/details-product`,
};

export const FeedBackEndPoints = {
  SUBMIT_FEEDBACK_API: `${BACKEND_URL}/api/v1/feedback/submit-feedback`,
  GET_ALL_FEEDBACK_API: `${BACKEND_URL}/api/v1/feedback/get-all-feedback`,
  GET_FEEDBACK_STATS_API: `${BACKEND_URL}/api/v1/feedback/get-feedback-stat`,
  GET_PAPULAR_FEEDBACK_API: `${BACKEND_URL}/api/v1/feedback/get-feedback-papular`,
};
