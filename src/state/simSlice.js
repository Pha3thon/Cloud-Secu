/**
 * Simulated Cloud State Slice
 * Manages OpenStack resources (Nova, Neutron, Keystone, Glance) and user role assignments.
 */

import { getInitialVirtualFilesystem } from '@/simulations/terminal/virtualFilesystem';

export const INITIAL_SIMULATED_CLOUD = {
  // Horizon logged in user: 'trainee' | 'ravi-employee' | 'freshfarms-vendor' | 'customer-test' | null
  activeHorizonUser: 'trainee',
  terminalVfs: getInitialVirtualFilesystem('lab1'),
  overviewVisited: false,
  imagesVisited: false,
  portsVisited: false,
  topologyVisited: false,
  identityVisitedAsTrainee: false,
  vendorDeleteAttempted: false,
  reportOpened: false,
  timeSkipTriggered: false,

  // OpenStack Resources
  networks: [],
  routers: [],
  securityGroups: [
    {
      id: 'sg-default',
      name: 'default',
      description: 'Default security group',
      rules: [
        { id: 'r-def-1', direction: 'ingress', rule: 'ALL', protocol: 'ALL', port: 'ALL', remote: 'default' },
        { id: 'r-def-2', direction: 'egress', rule: 'ALL', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
      ]
    }
  ],
  keyPairs: [],
  instances: [],
  floatingIps: [],

  // User Personas & Keystone role assignments
  userRoles: {
    'trainee': 'member',
    'ravi-employee': null,
    'freshfarms-vendor': null,
    'customer-test': null
  },

  // Access Request Portal Requests
  accessRequests: [],

  // Kali Workstation Files
  kaliFiles: {
    downloads: [],
    documents: []
  },

  // Browser visit history
  browserVisitedUrls: []
};

export const simReducer = (state, action) => {
  switch (action.type) {
    case 'SIM/UPDATE_CLOUD': {
      const patchOrUpdater = action.payload;
      const nextCloud = typeof patchOrUpdater === 'function'
        ? patchOrUpdater(state.simCloud)
        : { ...state.simCloud, ...patchOrUpdater };
      return {
        ...state,
        simCloud: nextCloud
      };
    }

    default:
      return state;
  }
};
