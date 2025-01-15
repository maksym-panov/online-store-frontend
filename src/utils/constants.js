// API ENDPOINTS
export const API_BASE_URL = "http://api.store.mpanov.com/api/v2";
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
export const API_NAME_PARAM = "name=";
export const API_PHONE_PARAM = "phone=";
export const API_STATUS_PARAM = "status=";
export const API_ORDER_BY_PARAM = "order=";

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
export const CHECKOUT_PAGE = CART_PAGE + "/checkout";
export const ORDER_POSTED_PAGE = "/success";
export const PROFILE_PAGE = "/profile";
export const CHANGE_PROFILE_PAGE = PROFILE_PAGE + "/change";
export const ERROR_PAGE = "/something-went-wrong";
export const ACCESS_DENIED_PAGE = "/access-denied";
// MANAGER ENDPOINTS
export const MANAGER_PAGE = "/manager";
export const MANAGE_ORDERS_PAGE = MANAGER_PAGE + "/orders";
export const MANAGE_PRODUCTS_PAGE = MANAGER_PAGE + "/products";
export const MANAGE_NEW_PRODUCT_PAGE = MANAGE_PRODUCTS_PAGE + "/new";
export const MANAGE_DELIVERIES = MANAGER_PAGE + "/deliveries";
export const MANAGE_CATEGORIES = MANAGER_PAGE + "/categories";
export const MANAGE_USERS = MANAGER_PAGE + "/users";
// LITERAL CONSTANTS
export const PRODUCTS_PER_PAGE = 15;
export const ORDERS_PER_PAGE = 10;
export const USERS_PER_PAGE = 5;
export const BASE64_RESOLVER = "data:image/png;base64,"
