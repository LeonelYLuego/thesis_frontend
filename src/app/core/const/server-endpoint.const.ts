import { isDevMode } from '@angular/core';

const SERVER_PATH = isDevMode()
  ? 'http://localhost:3000/api'
  : 'http://localhost:3000/api';

const SERVER_RESOURCES = {
  AUTH: `${SERVER_PATH}/auth`,
  ACCOUNTS: `${SERVER_PATH}/accounts`,
  PAGES: `${SERVER_PATH}/pages`,
};

export const SERVER_ENDPOINTS = {
  AUTH: {
    LOG_IN: `${SERVER_RESOURCES.AUTH}/log-in`,
    LOGGED: `${SERVER_RESOURCES.AUTH}/logged`,
  },
  ACCOUNTS: {
    BASE_ENDPOINT: `${SERVER_RESOURCES.ACCOUNTS}`,
    BY_ID: (id: string) => `${SERVER_RESOURCES.ACCOUNTS}/${id}`,
  },
  PAGES: {
    BASE_ENDPOINT: `${SERVER_RESOURCES.PAGES}`,
    BY_PUBLIC_KEY: (publicKey: string) =>
      `${SERVER_RESOURCES.PAGES}/${publicKey}`,
  },
};
