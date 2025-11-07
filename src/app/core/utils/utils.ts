/* eslint-disable no-prototype-builtins */
import { type ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { AccountTypes, CategoryCount, Transaction } from '../models';

// Adapte ces imports selon ton alias/chemin:


/** Merge de classes Tailwind façon Next.js (clsx + tailwind-merge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** FORMAT DATE/TIME (identique à ta version, mais accepte string | Date) */
export const formatDateTime = (dateInput: string | Date) => {
  const date = new Date(dateInput);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return {
    dateTime: date.toLocaleString('en-US', dateTimeOptions),
    dateDay: date.toLocaleString('en-US', dateDayOptions),
    dateOnly: date.toLocaleString('en-US', dateOptions),
    timeOnly: date.toLocaleString('en-US', timeOptions),
  };
};

/** Format monétaire (USD) */
export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
}

/** Helpers génériques */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));


export const removeSpecialCharacters = (value?: string) => {
  return (value ?? '').replace(/[^\w\s]/gi, '');
};



/** Build d’URL avec query params (équivalent de formUrlQuery Next) */
interface UrlQueryParams {
  params: string; // e.g. location.search.slice(1) ou searchParams.toString()
  key: string;
  value: string;
}

/** Version “pure” basée sur query-string (comme dans Next) */
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  (currentUrl as any)[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

/** Mapping couleurs par type de compte */
export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case 'depository':
      return {
        bg: 'bg-blue-25',
        lightBg: 'bg-blue-100',
        title: 'text-blue-900',
        subText: 'text-blue-700',
      };
    case 'credit':
      return {
        bg: 'bg-success-25',
        lightBg: 'bg-success-100',
        title: 'text-success-900',
        subText: 'text-success-700',
      };
    default:
      return {
        bg: 'bg-green-25',
        lightBg: 'bg-green-100',
        title: 'text-green-900',
        subText: 'text-green-700',
      };
  }
}

export function countTransactionCategories(transactions: Transaction[] = []): CategoryCount[] {
  const categoryCounts: Record<string, number> = {};
  let totalCount = 0;

  transactions.forEach((t) => {
    const key = (t.category ?? 'OTHER') as string;
    if (Object.prototype.hasOwnProperty.call(categoryCounts, key)) {
      categoryCounts[key]++;
    } else {
      categoryCounts[key] = 1;
    }
    totalCount++;
  });

  const aggregated: CategoryCount[] = Object.keys(categoryCounts).map((key) => ({
    name: key,
    count: categoryCounts[key],
    totalCount,
  }));

  aggregated.sort((a, b) => b.count - a.count);
  return aggregated;
}

/** Extraire un ID depuis une URL (dernier segment) */
export function extractCustomerIdFromUrl(url: string) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

/** Enc/Dec basique (base64) */
export function encryptId(id: string) {
  return btoa(id);
}
export function decryptId(id: string) {
  return atob(id);
}

/** Statut de transaction en fonction de la date */
export const getTransactionStatus = (date: Date) => {
  const d = new Date(date);
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  return d > twoDaysAgo ? 'Processing' : 'Success';
};
