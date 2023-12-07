import { combineReducers } from "redux";
import getResellerByUtiReducer from "./getResellerDataReducer";
import getOrganizationDataReducer from "./getOrganizationDataReducer";
import globalDataReducer from "./globalDataReducer";
import getUserInfoReducer from "./getUserInfoReducer";
import setPasswordReducer from "./setPasswordReducer";
import changePasswordReducer from "./changePasswordReducer";
import uploadImageReducer from "./uploadImageReducer";
import removeImageReducer from "./removeImageReducer";
import updateUserDetailsReducer from './updateUserDetailsReducer';
import skuDetailReducer from "./skuDetailReducer";
import getOrderDataReducer from "./getOrderDataReducer"
import dashboardReducer from "./dashboardReducer"

const appReducer = combineReducers({
  globalData: globalDataReducer,
  resellerData: getResellerByUtiReducer,
  organizationData: getOrganizationDataReducer,
  userAttributeData: getUserInfoReducer,
  setPassword: setPasswordReducer,
  changePassword: changePasswordReducer, 
  imageData: uploadImageReducer,
  removeImageData: removeImageReducer,
  updatedDetails: updateUserDetailsReducer,
  sku:skuDetailReducer,
  orderData:getOrderDataReducer,
  dashboard:dashboardReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
