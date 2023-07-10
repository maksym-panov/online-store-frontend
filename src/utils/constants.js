// WEBSITE PAGES
export const EMPTY_PAGE = "/";
export const PRODUCTS_PAGE = "/products";
export const CATEGORIES_PAGE = "/categories";
export const DELIVERY_PAGE = "/delivery";
export const ABOUT_PAGE = "/about";
export const CONTACTS_PAGE = "/contacts";
export const REGISTRATION_PAGE = "/register"
export const LOGIN_PAGE = "/login";
export const CART_PAGE = "/cart";
export const CHECKOUT_PAGE = CART_PAGE + "/checkout"
export const PROFILE_PAGE = "/profile";
export const CHANGE_PROFILE_PAGE = PROFILE_PAGE + "/change";

// API ENDPOINTS
export const API_BASE_URL = "http://192.168.0.101:8080/api/v2";
export const PRODUCT_CATEGORIES = "/product_types";
export const DELIVERIES = "/delivery_types";
export const PRODUCTS = "/products";
export const USERS = "/users";
export const UNREGISTERED = "/unregistered_customers";
export const ORDERS = "/orders";
export const SIGN_IN_USER = "/users/login";
export const SIGN_UP_USER = "/users/register";

export const API_OFFSET_PARAM = "offset=";
export const API_ENTITIES_PER_PAGE_PARAM = "quantity=";
export const API_PROD_CATEGORY_PARAM = "category=";

// LITERAL CONSTANTS
export const PRODUCTS_PER_PAGE = 15;
export const BASE64_RESOLVER = "data:image/png;base64,"