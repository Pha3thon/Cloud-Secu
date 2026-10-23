/**
 * Lab 7 Validation Logic: The Morning After (Fix the Broken Cloud)
 */

export const lab7 = {
  id: 'lab7',
  topicId: 'topic-7',
  topicNumber: 7,
  order: 7,
  title: 'Lab 7: The Morning After (Fix the Broken Cloud)',
  priyaIntro: "QuickMart is live and the team is growing. Ravi from store ops and our supplier FreshFarms need access, and Sales wants a customer test account that needs none. IT has created the logins. You decide what access each should get and send me the requests. I'll approve what's right.",
  nextModuleId: 'm5',
  onComplete: 'celebrate',
  flags: [
    {
      id: 'lab7-flag1',
      flagNumber: 1,
      storyBeat: 'Submit access requests for the three new personas according to least privilege.',
      objective: 'In Access Portal, request ravi-employee=member, freshfarms-vendor=reader, customer-test=No access.',
      steps: [
        'In Firefox, open http://access.quickmart.lab',
        "Click '+ New Request'",
        "Request 1: User = ravi-employee, Role = member, Justification = 'Store operations lead needs to manage daily resources' → Submit",
        "Request 2: User = freshfarms-vendor, Role = reader, Justification = 'Produce supplier only views daily stock reports' → Submit",
        "Request 3: User = customer-test, Role = No access, Justification = 'Customers shop through the app and need zero cloud console access' → Submit",
        "Wait for all three to transition from 'Under review' to 'Approved'"
      ],
      check: (simState, labEvents = []) => {
        try {
          const reqs = simState.accessRequests || [];
          const ravi = reqs.find((r) => r.user === 'ravi-employee' && r.requestedRole === 'member' && r.status === 'Approved');
          const fresh = reqs.find((r) => r.user === 'freshfarms-vendor' && r.requestedRole === 'reader' && r.status === 'Approved');
          const cust = reqs.find((r) => r.user === 'customer-test' && r.requestedRole === 'No access' && r.status === 'Approved');

          const failures = [];
          if (!ravi) failures.push("Request for ravi-employee (member) has not been Approved.");
          if (!fresh) failures.push("Request for freshfarms-vendor (reader) has not been Approved.");
          if (!cust) failures.push("Request for customer-test (No access) has not been Approved.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What access did you request for the vendor account?',
      answers: ['reader'],
      altAnswers: ['read-only', 'read only', 'reader role'],
      hint: 'The vendor only needs to view things.',
      priyaReply: 'Approved. All three roles assigned properly. Time to pack up for the day.'
    },
    {
      id: 'lab7-flag2',
      flagNumber: 2,
      storyBeat: 'Next morning, 9:12 AM. The audit bot flagged unauthorized overnight role escalations!',
      objective: 'Inspect access-report-0912.html, verify trainee 403, and test vendor delete safeguard.',
      steps: [
        'In Kali desktop, open Files → Documents → access-report-0912.html and inspect the overnight role assignments',
        'In Horizon as trainee, attempt to open http://horizon.quickmart.lab/identity/ and observe the 403 Forbidden error',
        'Sign out of Horizon and sign in as freshfarms-vendor (Password: Welcome@123)',
        "Go to Project → Compute → Instances, select qm-db-01, click 'Delete Instance' and confirm",
        "Observe the training safeguard banner: 'Training safeguard: nothing was deleted, but this request would have been Allowed.'"
      ],
      check: (simState, labEvents = []) => {
        try {
          const failures = [];
          const reportOpened = labEvents.includes('report_opened');
          const id403Seen = labEvents.includes('identity_403_seen');
          const vendorDelete = labEvents.includes('vendor_delete_attempted');

          if (!reportOpened) failures.push("Open Files → Documents → access-report-0912.html to review the overnight audit.");
          if (!id403Seen) failures.push("In Horizon as trainee, navigate to http://horizon.quickmart.lab/identity/ to observe 403 Forbidden.");
          if (!vendorDelete) failures.push("Sign in as freshfarms-vendor (Welcome@123) and attempt to delete qm-db-01 to verify safeguard.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'Which user holds the admin role but shouldn’t?',
      answers: ['freshfarms-vendor'],
      altAnswers: ['vendor', 'freshfarms', 'freshfarms-vendor user'],
      hint: 'A supplier only needs to look. Check who was allowed to delete qm-db-01.',
      priyaReply: 'The vendor was escalated to admin overnight! They could have deleted our entire database.'
    },
    {
      id: 'lab7-flag3',
      flagNumber: 3,
      storyBeat: 'Submit remediation requests and verify that excessive privileges are revoked.',
      objective: 'Remediate via Access Portal, verify vendor 403 on delete, and customer lockout.',
      steps: [
        'Sign back into Horizon / Access Portal as trainee (Quick@Mart1)',
        "In http://access.quickmart.lab, submit: freshfarms-vendor → reader (Justification: 'Revoke admin, restrict to read-only stock audit')",
        "Submit: customer-test → No access (Justification: 'Revoke member, customer accounts must not have cloud roles')",
        "Wait for both requests to show 'Approved'",
        'Sign in as freshfarms-vendor, retry deleting qm-db-01 → Observe HTTP 403 Forbidden',
        "Sign in as customer-test → Observe 'You are not authorized for any projects'"
      ],
      check: (simState, labEvents = []) => {
        try {
          const roles = simState.userRoles || {};
          const failures = [];
          if (roles['freshfarms-vendor'] !== 'reader') {
            failures.push("freshfarms-vendor role must be remediated to 'reader' in Access Portal.");
          }
          if (roles['customer-test'] !== null && roles['customer-test'] !== 'No access') {
            failures.push("customer-test role must be remediated to 'No access' in Access Portal.");
          }
          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What HTTP status code did the denied delete show?',
      answers: ['403'],
      altAnswers: ['403 forbidden', 'http 403', 'http 403 forbidden'],
      hint: 'Read the end of the red message after the vendor tries to delete.',
      priyaReply: "403 Forbidden! Least privilege is restored. You've completed Module M4!"
    }
  ]
};

export default lab7;
