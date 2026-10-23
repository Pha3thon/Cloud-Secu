/**
 * Access Request Approval & Return Logic
 * Section 7.6 of Training Specifications
 * Pure evaluation function for the QuickMart Access Request Portal.
 */

export const evaluateAccessRequest = (targetUser, requestedRole) => {
  if (requestedRole === 'admin') {
    return {
      approved: false,
      reason: 'Admin is reserved for the platform team.'
    };
  }

  if (targetUser === 'ravi-employee') {
    if (requestedRole === 'member') {
      return { approved: true, reason: null };
    }
    if (requestedRole === 'reader') {
      return {
        approved: false,
        reason: 'Ravi runs store operations and must create and manage resources.'
      };
    }
    return {
      approved: false,
      reason: 'Store operations requires member role access.'
    };
  }

  if (targetUser === 'freshfarms-vendor') {
    if (requestedRole === 'reader') {
      return { approved: true, reason: null };
    }
    if (requestedRole === 'member' || requestedRole === 'admin') {
      return {
        approved: false,
        reason: 'Suppliers only need to view stock reports.'
      };
    }
    return {
      approved: false,
      reason: 'Vendor requires read-only role.'
    };
  }

  if (targetUser === 'customer-test') {
    if (requestedRole === 'No access') {
      return { approved: true, reason: null };
    }
    return {
      approved: false,
      reason: 'Customers use the app, never the cloud.'
    };
  }

  return {
    approved: false,
    reason: 'Access request denied by policy.'
  };
};

export default evaluateAccessRequest;
