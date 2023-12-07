import {
  USER_FULL_NAME,
  USER_LOGISTIC,
  USER_LOGISTIC_MANAGER,
  USER_RESELLER,
  USER_FINANCE,
  USER_TYPE,
  PATH_LOGISTIC_DASHBOARD,
  PATH_RESELLER_DASHBOARD,
  USER_PROFILE_PHOTO,
} from "@/redux/constants";
import { getCookie } from "./cookies";
import dashboard from "../../public/images/navigation/dashboard.png";
import peopleLine from "../../public/images/navigation/peopleLine.png";
import tab from "../../public/images/navigation/tab.png";
import order from "../../public/images/navigation/order.png";
import notification from "../../public/images/navigation/notification.png";
import settings from "../../public/images/navigation/settings.png";
import user from "../../public/images/preLogin/user.png";

export const getUserNavigationMenu = () => {
  let userImage =
    getCookie(USER_PROFILE_PHOTO) && getCookie(USER_PROFILE_PHOTO) != ""
      ? `${getCookie(USER_PROFILE_PHOTO)}`
      : user;
  switch (getCookie(USER_TYPE)) {
    case USER_LOGISTIC:
    case USER_LOGISTIC_MANAGER:
      return [
        {
          title: "Dashboard",
          url: PATH_LOGISTIC_DASHBOARD,
          icon: dashboard,
        },
        {
          title: "Resellers",
          url: "/auth/logistic/partner",
          icon: peopleLine,
        },
        { title: "Schools", url: "/auth/logistic/school", icon: tab },

        { title: "Orders", url: "/auth/logistic/order", icon: order },
        // {
        //   title: "Notification",
        //   url: "/auth/notification",
        //   icon: notification,
        //   move: true,
        // },
        {
          title: "Settings",
          url: "/auth/account-setting",
          move: true,
          icon: settings,
        },
        {
          title: `${getCookie(USER_FULL_NAME)}`,
          url: "logout",
          icon: userImage,
        },
      ];

    case USER_RESELLER:
      return [
        {
          title: "Dashboard",
          url: PATH_RESELLER_DASHBOARD,
          icon: dashboard,
        },

        { title: "Schools", url: "/auth/reseller/school", icon: tab },

        { title: "Orders", url: "/auth/reseller/order", icon: order },
        // {
        //   title: "Notification",
        //   url: "/auth/notification",
        //   icon: notification,
        //   move: true,
        // },
        {
          title: "Settings",
          url: "/auth/account-setting",
          move: true,
          icon: settings,
        },
        {
          title: `${getCookie(USER_FULL_NAME)}`,
          icon: userImage,
          url: "logout",
        },
      ];

    case USER_FINANCE:
      return [
        { title: "Orders", url: "/auth/finance/order", icon: order },
        {
          title: "Settings",
          url: "/auth/account-setting",
          move: true,
          icon: settings,
        },
        {
          title: `${getCookie(USER_FULL_NAME)}`,
          icon: userImage,
          url: "logout",
        },
      ];

    default:
      break;
  }
};
