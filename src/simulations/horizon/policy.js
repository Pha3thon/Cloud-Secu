/**
 * OpenStack Horizon Role-Based Access Policy & Safeguards
 * Pure rule engine for role permissions and lab safeguards.
 */

export const ROLES = {
  READER: 'reader',
  MEMBER: 'member',
  ADMIN: 'admin'
};

export const canAccessIdentity = (role) => {
  return role === ROLES.ADMIN;
};

export const canCreateResource = (role) => {
  return role === ROLES.MEMBER || role === ROLES.ADMIN;
};

export const evaluateDeleteAction = (activeUser, role) => {
  // Vendor escalation safeguard in Lab 7
  if (activeUser === 'freshfarms-vendor' && role === ROLES.ADMIN) {
    return {
      allowed: true,
      safeguardTriggered: true,
      status: 200,
      message: 'Training safeguard: nothing was deleted, but this request would have been Allowed.'
    };
  }

  // Reader role is denied
  if (role === ROLES.READER) {
    return {
      allowed: false,
      safeguardTriggered: false,
      status: 403,
      message: 'HTTP 403 Forbidden: Readers are not authorized to delete resources.'
    };
  }

  // Trainee or member
  if (role === ROLES.MEMBER || role === ROLES.ADMIN) {
    return {
      allowed: true,
      safeguardTriggered: false,
      status: 200,
      message: 'Resource deleted.'
    };
  }

  return {
    allowed: false,
    safeguardTriggered: false,
    status: 403,
    message: 'HTTP 403 Forbidden: Unauthorized.'
  };
};
