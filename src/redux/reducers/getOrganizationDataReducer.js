import {
  GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_BY_RESELLER_ID_SUCCESS,
  GET_ORGANIZATION_BY_RESELLER_ID_ERROR,
  ADD_ORGANIZATION_SUCCESS,
  ADD_ORGANIZATION_ERROR,
  ADD_UPLOAD_ORGANIZATION_DOC_SUCCESS,
  ADD_UPLOAD_ORGANIZATION_DOC_ERROR,
  GET_ORGANIZATION_DETAIL_SUCCESS,
  GET_ORGANIZATION_DETAIL_ERROR,
  ADD_LICENSE_SUCCESS,
  ADD_LICENSE_ERROR,
  GET_SCHOOL_LICENSE_SUCCESS,
  GET_SCHOOL_LICENSE_ERROR,
  RESET_ADD_LICENSE,
  RESET_ADD_ORGANIZATION,
  SCHOOL_ADMIN_LISTING_SUCCESS,
  SCHOOL_ADMIN_LISTING_ERROR,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_ERROR,
  RESET_SCHOOL_PIN_SUCCESS,
  RESET_SCHOOL_PIN_ERROR,
  RESET_ADD_ADMIN,
  GET_SCHOOL_DEVICE_LISTING_SUCCESS,
  GET_SCHOOL_DEVICE_LISTING_ERROR,
} from "../constants";

const initialState = {
  organization: {
    data: [],
    success: false,
  },
};
const getOrganizationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATION_SUCCESS:
    case GET_ORGANIZATION_ERROR:
      return {
        ...state,
        organizationList: action.payload,
      };
    case GET_ORGANIZATION_BY_RESELLER_ID_SUCCESS:
    case GET_ORGANIZATION_BY_RESELLER_ID_ERROR:
      return {
        ...state,
        organizationByResellerId: action.payload,
      };

    case ADD_ORGANIZATION_SUCCESS:
    case ADD_ORGANIZATION_ERROR:
      return {
        ...state,
        addedOrganization: action.payload,
      };

    case GET_ORGANIZATION_DETAIL_SUCCESS:
    case GET_ORGANIZATION_DETAIL_ERROR:
      return {
        ...state,
        organizationDetailById: action.payload,
      };

    case ADD_UPLOAD_ORGANIZATION_DOC_SUCCESS:
    case ADD_UPLOAD_ORGANIZATION_DOC_ERROR:
      return {
        ...state,
        uploadOrganizationDoc: action.payload,
      };

    case ADD_LICENSE_SUCCESS:
    case ADD_LICENSE_ERROR:
      return {
        ...state,
        addLicense: action.payload,
      };

    case GET_SCHOOL_LICENSE_SUCCESS:
    case GET_SCHOOL_LICENSE_ERROR:
      return {
        ...state,
        schoolLicense: action.payload,
      };

    case SCHOOL_ADMIN_LISTING_SUCCESS:
    case SCHOOL_ADMIN_LISTING_ERROR:
      return {
        ...state,
        adminListing: action.payload,
      };

    case ADD_ADMIN_USER_SUCCESS:
    case ADD_ADMIN_USER_ERROR:
      return {
        ...state,
        addAdmin: action.payload,
      };

    case RESET_SCHOOL_PIN_SUCCESS:
    case RESET_SCHOOL_PIN_ERROR:
      return {
        ...state,
        resetPin: action.payload,
      };

    case GET_SCHOOL_DEVICE_LISTING_SUCCESS:
    case GET_SCHOOL_DEVICE_LISTING_ERROR:
      return {
        ...state,
        schoolDevices: action.payload,
      };

    case RESET_ADD_LICENSE:
      return {
        ...state,
        addLicense: {},
      };

    case RESET_ADD_ADMIN:
      return {
        ...state,
        addAdmin: {},
      };
    case RESET_ADD_ORGANIZATION:
      return {
        ...state,
        addedOrganization: {},
        organizationByResellerId: [],
        organizationList: [],
      };

    default:
      return state;
  }
};

export default getOrganizationDataReducer;
