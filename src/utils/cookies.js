import {
  ENCRYPTED_PASSWORD,
  ENCRYPTED_USERNAME,
  REMEMBER_ME,
} from "@/redux/constants";
import { useRouter } from "next/router";

export const getCookie = (name) => {
  if (typeof window !== "undefined") {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
};

export const setCookie = (name, value, option) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  if (option == "")
    option =
      "; expires=" +
      date.toGMTString() +
      "; path= / ;secure= true; sameSite=None";
  document.cookie = name + "=" + value + option;
};

export const deleteAuthorizationCookies = (name) => {
  if (typeof window !== "undefined") {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
};

export const deleteAllCookies = (type = "") => {
  if (typeof window !== "undefined") {
    let keysNotToDelete = [REMEMBER_ME, ENCRYPTED_PASSWORD, ENCRYPTED_USERNAME];
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      if (!keysNotToDelete.includes(name.trim())) {
        document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  }
};
