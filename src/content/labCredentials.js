/**
 * Lab Credentials & Connection Endpoints
 * CDAC Cloud Security Training Platform
 */

export const M4_LAB_CREDENTIALS = {
  horizonUrl: "http://horizon.quickmart.lab/dashboard",
  accessUrl: "http://access.quickmart.lab",
  domain: "Default",
  username: "trainee",
  password: "Quick@Mart1",
  role: "member",
  project: "quickmart",
  personas: [
    { username: "ravi-employee", password: "Welcome@123", purpose: "Store operations lead" },
    { username: "freshfarms-vendor", password: "Welcome@123", purpose: "External produce supplier" },
    { username: "customer-test", password: "Welcome@123", purpose: "Sales customer testing" }
  ]
};

export default M4_LAB_CREDENTIALS;
