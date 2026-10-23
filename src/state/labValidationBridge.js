/**
 * Lab Validation Bridge: Encapsulates configuration checks, answer matching, and automated completion.
 * Extracted from store.js to keep state files focused and under 300 lines.
 */

import { matchAnswer } from '@/labs/answerMatch';

export function validateConfiguration(LABS, simCloud, labEvents, topicNumberOrLabId, flagNumber) {
  try {
    const labId = typeof topicNumberOrLabId === 'string' && topicNumberOrLabId.startsWith('lab')
      ? topicNumberOrLabId.replace('-', '')
      : `lab${topicNumberOrLabId}`;
    const labDef = LABS[labId];
    if (!labDef) return { success: false, message: `Lab definition '${labId}' not found.` };
    const flagDef = labDef.flags?.[flagNumber - 1];
    if (!flagDef) return { success: false, message: `Flag ${flagNumber} not found for ${labId}.` };
    const currentLabEvents = labEvents?.[labId] || [];
    const result = flagDef.check(simCloud, currentLabEvents);
    if (result.pass) return { success: true, message: 'Configuration verified! Answer the question below.' };
    const failMessage = result.failures && result.failures.length > 0
      ? result.failures.join(' ')
      : 'Configuration check failed. Check your settings and try again.';
    return { success: false, message: failMessage };
  } catch (err) {
    return { success: false, message: `Check error: ${err.message}` };
  }
}

export function processLabAnswer(LABS, state, topicNumberOrLabId, flagNumber, inputAnswer) {
  const labId = typeof topicNumberOrLabId === 'string' && topicNumberOrLabId.startsWith('lab')
    ? topicNumberOrLabId.replace('-', '')
    : `lab${topicNumberOrLabId}`;
  const topicNum = parseInt(labId.replace('lab', ''), 10);
  const labDef = LABS[labId];
  if (!labDef) return { success: false, message: `Lab '${labId}' not found.` };
  const flagDef = labDef.flags?.[flagNumber - 1];
  if (!flagDef) return { success: false, message: `Flag ${flagNumber} not found.` };

  const isCorrect = matchAnswer(inputAnswer, flagDef, state.simCloud);
  if (!isCorrect) {
    return { success: false, message: 'Not quite — check your configuration and try again.' };
  }

  return { success: true, labId, topicNum };
}

export function generateAutoCompleteCloud(prevCloud, prevEvents, labId) {
  let cloud = JSON.parse(JSON.stringify(prevCloud));
  let events = [...(prevEvents || [])];

  if (labId === 'lab1') {
    cloud.activeHorizonUser = 'trainee';
    events.push('overview_opened', 'images_opened');
  } else if (labId === 'lab2') {
    if (!cloud.networks.some((n) => n.name === 'qm-net')) {
      cloud.networks.push({ name: 'qm-net', subnetName: 'qm-subnet', cidr: '10.20.1.0/24', gateway: '10.20.1.1', dhcp: true });
    }
    events.push('ports_tab_viewed', 'overview_opened');
  } else if (labId === 'lab3') {
    if (!cloud.routers.some((r) => r.name === 'qm-router')) {
      cloud.routers.push({ name: 'qm-router', externalNetwork: 'public-net', externalIp: '203.0.113.15', interfaces: ['qm-subnet'] });
    }
    events.push('topology_viewed');
  } else if (labId === 'lab4') {
    if (!cloud.securityGroups.some((s) => s.name === 'qm-web-sg')) {
      cloud.securityGroups.push({
        id: 'sg-qm-web',
        name: 'qm-web-sg',
        description: 'QuickMart Web Security Group',
        rules: [
          { id: 'r1', direction: 'ingress', protocol: 'tcp', port: '22', remote: '0.0.0.0/0' },
          { id: 'r2', direction: 'ingress', protocol: 'tcp', port: '80', remote: '0.0.0.0/0' },
          { id: 'r3', direction: 'ingress', protocol: 'tcp', port: '443', remote: '0.0.0.0/0' },
          { id: 'r4', direction: 'egress', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
        ]
      });
    }
    if (!cloud.securityGroups.some((s) => s.name === 'qm-db-sg')) {
      cloud.securityGroups.push({
        id: 'sg-qm-db',
        name: 'qm-db-sg',
        description: 'QuickMart DB Security Group',
        rules: [
          { id: 'r5', direction: 'ingress', protocol: 'tcp', port: '3306', remote: 'qm-web-sg' },
          { id: 'r6', direction: 'ingress', protocol: 'tcp', port: '22', remote: 'qm-web-sg' },
          { id: 'r7', direction: 'egress', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
        ]
      });
    }
    events.push('rules_viewed');
  } else if (labId === 'lab5') {
    if (!cloud.keyPairs.some((k) => k.name === 'qm-key')) cloud.keyPairs.push({ name: 'qm-key' });
    if (!cloud.instances.some((i) => i.name === 'qm-web-01')) {
      cloud.instances.push({ name: 'qm-web-01', image: 'ubuntu-22.04', flavor: 'm1.small', network: 'qm-net', privateIp: '10.20.1.3', securityGroups: ['qm-web-sg'], keyName: 'qm-key', status: 'ACTIVE' });
    }
    if (!cloud.instances.some((i) => i.name === 'qm-db-01')) {
      cloud.instances.push({ name: 'qm-db-01', image: 'mysql-8-server', flavor: 'm1.medium', network: 'qm-net', privateIp: '10.20.1.4', securityGroups: ['qm-db-sg'], keyName: 'qm-key', status: 'ACTIVE' });
    }
    events.push('overview_opened');
  } else if (labId === 'lab6') {
    cloud.floatingIps = [{ ip: '203.0.113.27', pool: 'public-net', instanceId: 'qm-web-01', portIp: '10.20.1.3' }];
    cloud.browserVisitedUrls = ['http://203.0.113.27', 'http://203.0.113.27/status', 'http://203.0.113.27:3306', 'http://10.20.1.4'];
    events.push('overview_opened', 'url:http://203.0.113.27', 'url:http://203.0.113.27/status', 'url:http://203.0.113.27:3306', 'url:http://10.20.1.4');
  } else if (labId === 'lab7') {
    cloud.timeSkipTriggered = true;
    cloud.reportOpened = true;
    cloud.identityVisitedAsTrainee = true;
    cloud.vendorDeleteAttempted = true;
    cloud.accessRequests = [
      { id: '1', user: 'ravi-employee', requestedRole: 'member', status: 'Approved' },
      { id: '2', user: 'freshfarms-vendor', requestedRole: 'reader', status: 'Approved' },
      { id: '3', user: 'customer-test', requestedRole: 'No access', status: 'Approved' }
    ];
    cloud.userRoles = { 'trainee': 'member', 'ravi-employee': 'member', 'freshfarms-vendor': 'reader', 'customer-test': 'No access' };
    events.push('report_opened', 'identity_403_seen', 'vendor_delete_attempted', 'customer_unauthorized_seen', 'vendor_delete_denied_seen');
  }

  return { cloud, events };
}
