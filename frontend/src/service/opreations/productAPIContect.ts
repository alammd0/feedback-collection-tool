import { apiConnecter } from "../apicontecter";
import { ProductEndpoints } from "../apiEndPoints";

const {
  CREATE_PRODUCT_API,
  DELETE_PRODUCT_ID_API,
  GET_ALL_PRODUCT_API,
  DETAILS_PRODUCT_ID_API,
} = ProductEndpoints;

export const createProduct = async (
  name: string,
  token: string,
  adminId: string
) => {
  try {
    const response = await apiConnecter({
      method: "POST",
      url: CREATE_PRODUCT_API,
      data: { name, adminId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Product failed",
    };
  }
};

export const deleteProduct = async (productId: string, token: string) => {
  try {
    const response = await apiConnecter({
      method: "DELETE",
      url: `${DELETE_PRODUCT_ID_API}/${productId}`,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Delete Product failed",
    };
  }
};

export const getAllProduct = async () => {
  try {
    const response = await apiConnecter({
      method: "GET",
      url: GET_ALL_PRODUCT_API,
      data: {},
      headers: {},
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const productDetail = async (productId: string) => {
  try {
    const response = await apiConnecter({
      method: "GET",
      url: `${DETAILS_PRODUCT_ID_API}/${productId}`,
      data: {},
      headers: {},
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};
