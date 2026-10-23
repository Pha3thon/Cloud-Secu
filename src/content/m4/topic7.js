/**
 * M4 Topic 7: Users & Roles (Keystone)
 */

export const topic7 = {
  id: "topic-7",
  topicNumber: 7,
  title: "Users & Roles (Keystone)",
  service: "Keystone",
  slides: [
    {
      id: "7.1",
      code: "7.1",
      title: "What is Keystone?",
      textLines: [
        "Keystone is OpenStack's identity service.",
        "It knows who users are, which projects they belong to, and what role they hold there.",
        "A domain groups users and projects, which is why the Horizon login asks for one.",
        "Every request starts with Keystone checking who you are."
      ],
      realLifeExample: {
        title: "Corporate Head Office",
        analogy: "QuickMart head office is the domain, and the departments are the projects."
      },
      recapChip: "Revisit 1.5 – projects, M3 – users, roles, least privilege",
      sceneKey: "scene_7_1"
    },
    {
      id: "7.2",
      code: "7.2",
      title: "How it works, and why access changes go through a request",
      textLines: [
        "When you log in, Keystone issues a token carrying your identity and your role in a project, and each service checks it before acting.",
        "Roles are assigned per project.",
        "Horizon's Identity panels appear only for admin users. Your trainee account is a member: it can build, but it cannot create users or change roles.",
        "At QuickMart, access changes go through an access request that Priya's team reviews, so no one hands out their own access."
      ],
      realLifeExample: {
        title: "Color-Coded Wristbands",
        analogy: "Event wristbands: the color decides which areas you enter, and the registration desk decides who gets one."
      },
      recapChip: "Revisit M3 – separation of duties",
      sceneKey: "scene_7_2"
    },
    {
      id: "7.3.1",
      code: "7.3.1",
      title: "Roles: reader, member, admin",
      textLines: [
        "A reader can only view.",
        "A member can view, create, and manage resources.",
        "An admin can do everything, including users, roles, and deleting anything.",
        "They form a ladder of increasing power, and you should give the lowest rung that gets the job done."
      ],
      realLifeExample: {
        title: "Badge Tiers",
        analogy: "Visitor pass, store staff badge, and store manager master key."
      },
      sceneKey: "scene_7_3_1"
    },
    {
      id: "7.3.2",
      code: "7.3.2",
      title: "Role assignment",
      textLines: [
        "A role assignment links one user to one role in one project.",
        "A user with no role on any project can log in but sees only 'You are not authorized for any projects'.",
        "Changing someone's access means changing that assignment, and an admin does this in Identity → Projects → Manage Members."
      ],
      realLifeExample: {
        title: "Official Staff Register",
        analogy: "The staff register that records each person's security badge level."
      },
      sceneKey: "scene_7_3_2"
    },
    {
      id: "7.3.3",
      code: "7.3.3",
      title: "Who gets an account at QuickMart",
      textLines: [
        "Ravi (employee) runs the platform day to day, so he gets member.",
        "FreshFarms (vendor) only needs to view stock reports, so it gets reader.",
        "Customers use the public storefront and never log in to the cloud, so they get no role.",
        "You hold member: enough to build, not enough to hand out access. That is deliberate."
      ],
      realLifeExample: {
        title: "Store Clearances",
        analogy: "Staff get keys to the shop floor, suppliers get a viewing window, and shoppers use the front door."
      },
      sceneKey: "scene_7_3_3"
    },
    {
      id: "7.3.4",
      code: "7.3.4",
      title: "The Access Request portal",
      textLines: [
        "Open http://access.quickmart.lab.",
        "Choose a User, choose the Requested access (reader, member, admin, or No access), and write a Justification that states the business need.",
        "Priya's team reviews it and the status moves from Under review to Approved or Returned with a reason. A returned request can be fixed and resubmitted."
      ],
      realLifeExample: {
        title: "Formal Purchase Request",
        analogy: "A purchase request form: you state the business need, finance approves or denies."
      },
      sceneKey: "scene_7_3_4"
    },
    {
      id: "7.3.5",
      code: "7.3.5",
      title: "Reading a denial in Horizon",
      textLines: [
        "When a request is refused for lack of permission, Horizon shows a red message ending in HTTP 403 Forbidden, which means 'I know who you are, but you aren't allowed.'",
        "A 401 means the system doesn't know who you are.",
        "You will see a 403 yourself when your own account tries to open the Identity pages."
      ],
      realLifeExample: {
        title: "Recognized but Not on the List",
        analogy: "Being recognized at the front door by the bouncer, but your name is not on the VIP lounge list."
      },
      recapChip: "Revisit M1 – HTTP",
      sceneKey: "scene_7_3_5"
    }
  ],
  lab: {
    id: "lab-7",
    topicNumber: 7,
    title: "Lab 7: The Morning After (Fix the Broken Cloud)",
    priyaIntro: "QuickMart is live and the team is growing. Ravi from store ops and our supplier FreshFarms need access, and Sales wants a customer test account that needs none. IT has created the logins. You decide what access each should get and send me the requests. I'll approve what's right.",
    flags: [
      {
        id: "flag-7-1",
        flagNumber: 1,
        storyBeat: "Submit access requests for the three new personas according to least privilege.",
        objective: "In Access Portal, request ravi-employee=member, freshfarms-vendor=reader, customer-test=No access.",
        steps: [
          "In Firefox, open http://access.quickmart.lab",
          "Click '+ New Request'",
          "Request 1: User = ravi-employee, Role = member, Justification = 'Store operations lead needs to manage daily resources' → Submit",
          "Request 2: User = freshfarms-vendor, Role = reader, Justification = 'Produce supplier only views daily stock reports' → Submit",
          "Request 3: User = customer-test, Role = No access, Justification = 'Customers shop through the app and need zero cloud console access' → Submit",
          "Wait for all three to transition from 'Under review' to 'Approved'"
        ],
        checkId: "check_access_requests_flag1",
        question: "What access did you request for the vendor account?",
        correctAnswers: ["reader", "read-only", "read only"],
        hint: "The vendor only needs to view things.",
        priyaReply: "Approved. All three roles assigned properly. Time to pack up for the day."
      },
      {
        id: "flag-7-2",
        flagNumber: 2,
        storyBeat: "Next morning, 9:12 AM. The audit bot flagged unauthorized overnight role escalations!",
        objective: "Inspect access-report-0912.html, verify trainee 403, and test vendor delete safeguard.",
        steps: [
          "In Kali desktop, open Files → Documents → access-report-0912.html and inspect the overnight role assignments",
          "In Horizon as trainee, attempt to open http://horizon.quickmart.lab/identity/ and observe the 403 Forbidden error",
          "Sign out of Horizon and sign in as freshfarms-vendor (Password: Welcome@123)",
          "Go to Project → Compute → Instances, select qm-db-01, click 'Delete Instance' and confirm",
          "Observe the training safeguard banner: 'Training safeguard: nothing was deleted, but this request would have been Allowed.'"
        ],
        checkId: "check_diagnose_flag2",
        question: "Which user holds the admin role but shouldn't?",
        correctAnswers: ["freshfarms-vendor", "vendor", "freshfarms"],
        hint: "A supplier only needs to look. Check who was allowed to delete qm-db-01.",
        priyaReply: "The vendor was escalated to admin overnight! They could have deleted our entire database."
      },
      {
        id: "flag-7-3",
        flagNumber: 3,
        storyBeat: "Submit remediation requests and verify that excessive privileges are revoked.",
        objective: "Remediate via Access Portal, verify vendor 403 on delete, and customer lockout.",
        steps: [
          "Sign back into Horizon / Access Portal as trainee (Quick@Mart1)",
          "In http://access.quickmart.lab, submit: freshfarms-vendor → reader (Justification: 'Revoke admin, restrict to read-only stock audit')",
          "Submit: customer-test → No access (Justification: 'Revoke member, customer accounts must not have cloud roles')",
          "Wait for both requests to show 'Approved'",
          "Sign in as freshfarms-vendor, retry deleting qm-db-01 → Observe HTTP 403 Forbidden",
          "Sign in as customer-test → Observe 'You are not authorized for any projects'"
        ],
        checkId: "check_remediate_flag3",
        question: "What HTTP status code did the denied delete show?",
        correctAnswers: ["403", "403 forbidden", "http 403"],
        hint: "Read the end of the red message after the vendor tries to delete.",
        priyaReply: "403 Forbidden! Least privilege is restored. You've completed Module M4!"
      }
    ]
  }
};

export default topic7;
