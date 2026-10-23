/**
 * URL Routing Rules for Simulated Kali Workstation Firefox Browser
 * Section 7.4 of Training Specifications
 */

export const ROUTE_TYPES = {
  HORIZON: 'HORIZON',
  ACCESS_PORTAL: 'ACCESS_PORTAL',
  STOREFRONT: 'STOREFRONT',
  STOREFRONT_STATUS: 'STOREFRONT_STATUS',
  DB_PORT_TIMEOUT: 'DB_PORT_TIMEOUT',
  RFC1918_UNROUTABLE: 'RFC1918_UNROUTABLE',
  NOT_FOUND: 'NOT_FOUND'
};

export const matchFirefoxUrl = (rawUrl = '') => {
  const url = rawUrl.toLowerCase().trim().replace(/\/$/, '');

  if (url === 'http://horizon.quickmart.lab/dashboard' || url === 'http://horizon.quickmart.lab') {
    return { type: ROUTE_TYPES.HORIZON, title: 'OpenStack Horizon — Training Edition' };
  }

  if (url === 'http://access.quickmart.lab' || url === 'http://access.quickmart.lab/') {
    return { type: ROUTE_TYPES.ACCESS_PORTAL, title: 'QuickMart Cloud — Access Request Portal' };
  }

  if (url === 'http://203.0.113.27' || url === 'http://203.0.113.27/') {
    return { type: ROUTE_TYPES.STOREFRONT, title: 'QuickMart — Groceries in 10 Minutes' };
  }

  if (url === 'http://203.0.113.27/status') {
    return { type: ROUTE_TYPES.STOREFRONT_STATUS, title: 'QuickMart Health Check Endpoint' };
  }

  if (url === 'http://203.0.113.27:3306') {
    return { type: ROUTE_TYPES.DB_PORT_TIMEOUT, title: 'Problem loading page — Timed Out' };
  }

  if (url === 'http://10.20.1.4' || url.startsWith('http://10.20.1.')) {
    return { type: ROUTE_TYPES.RFC1918_UNROUTABLE, title: 'Unable to connect' };
  }

  return { type: ROUTE_TYPES.NOT_FOUND, title: '404 Server Not Found' };
};

export default matchFirefoxUrl;
