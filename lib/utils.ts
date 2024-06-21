import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RemoveUrlQueryParams, UrlQueryParams } from "../types/types";
import qs from 'query-string'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





interface TokenPayload {
  userId: string;
  isStaff: boolean;
}

const getUserInfoFromToken = (token: string | undefined): { userId: string; isStaff: boolean } | null => {
  if (!token) {
    console.error('Failed to decode token or token is null');
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    const payload: TokenPayload = JSON.parse(jsonPayload);
    return { userId: payload.userId, isStaff: payload.isStaff };
  } catch (error) {
    console.error('>>?? Failed to decode token:', error);
    return null;
  }
};

export default getUserInfoFromToken;

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const formatDateTime = (dateString: string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', 
    month: 'short',
    year: 'numeric', 
    day: 'numeric', 
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true, 
  };

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return {
      dateTime: 'Invalid Date',
      dateOnly: 'Invalid Date',
      timeOnly: 'Invalid Time',
    };
  }

  const formattedDateTime: string = date.toLocaleString('en-US', dateTimeOptions);
  const formattedDate: string = date.toLocaleString('en-US', dateOptions);
  const formattedTime: string = date.toLocaleString('en-US', timeOptions);

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}



export const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
