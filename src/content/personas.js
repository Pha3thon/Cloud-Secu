/**
 * Personas & Target Roles
 * Used for Lab 7 Identity & Access Control scenarios.
 */

export const PERSONAS = [
  {
    username: "ravi-employee",
    displayName: "Ravi Sharma",
    title: "Store Operations Lead",
    password: "Welcome@123",
    currentRole: null,
    targetRole: "member",
    allowedRoles: ["member"],
    justification: "Ravi manages store inventory and runs store operations. Needs to create and manage workloads.",
    reviewRule: {
      expectedRole: "member",
      rejectionReasons: {
        admin: "Admin is reserved for the platform team.",
        reader: "Ravi runs store operations and must create and manage resources.",
        "No access": "Store operations requires member role access."
      }
    }
  },
  {
    username: "freshfarms-vendor",
    displayName: "FreshFarms Supply",
    title: "Produce Supplier Partner",
    password: "Welcome@123",
    currentRole: null,
    targetRole: "reader",
    allowedRoles: ["reader"],
    justification: "External vendor requiring read-only access to view produce supply catalogs and reports.",
    reviewRule: {
      expectedRole: "reader",
      rejectionReasons: {
        admin: "Admin is reserved for the platform team.",
        member: "Suppliers only need to view stock reports.",
        "No access": "Vendor requires read-only role."
      }
    }
  },
  {
    username: "customer-test",
    displayName: "Customer QA Test",
    title: "Retail Customer Account",
    password: "Welcome@123",
    currentRole: null,
    targetRole: "No access",
    allowedRoles: ["No access"],
    justification: "Mobile and web customer testing account.",
    reviewRule: {
      expectedRole: "No access",
      rejectionReasons: {
        admin: "Admin is reserved for the platform team.",
        member: "Customers use the app, never the cloud.",
        reader: "Customers use the app, never the cloud."
      }
    }
  },
  {
    username: "trainee",
    displayName: "Trainee Cloud Engineer",
    title: "Junior Cloud Infrastructure Trainee",
    password: "Quick@Mart1",
    currentRole: "member",
    targetRole: "member",
    allowedRoles: ["member"],
    justification: "Building QuickMart architecture under Priya's supervision."
  }
];

export default PERSONAS;
