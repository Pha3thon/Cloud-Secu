/**
 * M4 Topic 6: Floating IPs & Exposure (Neutron)
 */

export const topic6 = {
  id: "topic-6",
  topicNumber: 6,
  title: "Floating IPs & Exposure (Neutron)",
  service: "Neutron",
  slides: [
    {
      id: "6.1",
      code: "6.1",
      title: "What is a floating IP?",
      textLines: [
        "A floating IP is a public address that Neutron gives you from public-net and attaches to one instance.",
        "It is called 'floating' because you can move it to another instance without rebuilding anything.",
        "Instances have only private addresses by default, so a floating IP is how the outside world reaches one."
      ],
      realLifeExample: {
        title: "Public Vanity Phone Number",
        analogy: "A shop's public street address or toll-free hotline that you can redirect to another warehouse anytime."
      },
      sceneKey: "scene_6_1"
    },
    {
      id: "6.2",
      code: "6.2",
      title: "How it works, and why we need it",
      textLines: [
        "The router maps the public address to the instance's private address, one to one.",
        "Visitors connect to the public IP and the router quietly forwards inward.",
        "Give a floating IP only to instances that must be public. Everything else stays private, which keeps what outsiders can reach small."
      ],
      realLifeExample: {
        title: "Front Desk Call Forwarding",
        analogy: "A receptionist forwards public phone calls only to the specific desks that need them."
      },
      sceneKey: "scene_6_2"
    },
    {
      id: "6.3.1",
      code: "6.3.1",
      title: "Allocate IP To Project",
      textLines: [
        "Allocate IP To Project reserves an address from a Pool (public-net).",
        "It counts against your floating-IP quota straight away, so the counter goes from 0/3 to 1/3.",
        "An allocated address that isn't attached is reserved and does nothing."
      ],
      realLifeExample: {
        title: "Reserving a Phone Line",
        analogy: "Booking a phone number with the telco before plugging the phone hardware in."
      },
      sceneKey: "scene_6_3_1"
    },
    {
      id: "6.3.2",
      code: "6.3.2",
      title: "Manage Associations",
      textLines: [
        "Manage Associations attaches the address to an instance.",
        "You choose the IP Address, then the Port to be associated, which is the instance's private IP (for example qm-web-01: 10.20.1.3).",
        "Attach it only to qm-web-01. After that the router draws the mapping."
      ],
      realLifeExample: {
        title: "Plugging Wire into the Desk",
        analogy: "Connecting the external phone line into the receptionist's desk."
      },
      sceneKey: "scene_6_3_2"
    },
    {
      id: "6.3.3",
      code: "6.3.3",
      title: "Attack surface",
      textLines: [
        "Your attack surface is everything an outsider can try to reach.",
        "Each public IP and each open port adds to it. A good design exposes as little as possible.",
        "QuickMart's storefront must be public and the database never is.",
        "You'll look at this from the attacker's side in the Attack phase."
      ],
      realLifeExample: {
        title: "Exterior Doors & Windows",
        analogy: "The more street-facing doors a shop has, the more locks a burglar can test."
      },
      sceneKey: "scene_6_3_3"
    },
    {
      id: "6.3.4",
      code: "6.3.4",
      title: "Reading results in the browser",
      textLines: [
        "From the Kali workstation, which acts as the outside world, Firefox shows what is exposed.",
        "A page that loads means the port is open.",
        "'The connection has timed out' means a firewall silently dropped the traffic.",
        "'Unable to connect' means there is no route to that address. Telling them apart shows whether a firewall or the network is the cause."
      ],
      realLifeExample: {
        title: "Three Kinds of Doors",
        analogy: "A door that opens, a door that never answers, and a street with no door at all."
      },
      sceneKey: "scene_6_3_4"
    }
  ],
  lab: {
    id: "lab-6",
    topicNumber: 6,
    title: "Lab 6: Open the Front Door, Only the Front Door",
    priyaIntro: "Customers still can't reach the store. Only the web server should be public. The database stays private.",
    flags: [
      {
        id: "flag-6-1",
        flagNumber: 1,
        storyBeat: "Allocate a floating IP from public-net and associate it with qm-web-01.",
        objective: "Allocate floating IP 203.0.113.27 and associate with qm-web-01.",
        steps: [
          "In Horizon, open Project → Network → Floating IPs",
          "Click 'Allocate IP To Project', Pool: public-net → Allocate IP (you receive 203.0.113.27)",
          "On the row for 203.0.113.27, click 'Associate'",
          "Port to be associated: select 'qm-web-01: 10.20.1.3'",
          "Click Associate",
          "Do NOT attach any floating IP to qm-db-01!"
        ],
        checkId: "check_associate_fip",
        question: "What floating IP did you receive?",
        correctAnswers: ["203.0.113.27"],
        hint: "Look at the Floating IPs table.",
        priyaReply: "203.0.113.27 is routed to qm-web-01. The front door is open."
      },
      {
        id: "flag-6-2",
        flagNumber: 2,
        storyBeat: "Check how many floating IPs remain in the project quota.",
        objective: "Inspect remaining floating IPs in Overview.",
        steps: [
          "Project → Compute → Overview",
          "Look at the Floating IPs graph"
        ],
        checkId: "check_fip_quota",
        question: "How many floating IPs do you have left?",
        correctAnswers: ["2", "two"],
        hint: "You started with 3 in Lab 1.",
        priyaReply: "2 remaining. We conserved public IPv4 space."
      },
      {
        id: "flag-6-3",
        flagNumber: 3,
        storyBeat: "Prove from the outside workstation what is exposed and what is shielded.",
        objective: "Test the 4 URLs from Kali Firefox to verify exposure behavior.",
        steps: [
          "In Kali Firefox, visit http://203.0.113.27 (Storefront loads)",
          "Visit http://203.0.113.27/status (Database: 10.20.1.4:3306 connected)",
          "Visit http://203.0.113.27:3306 (Observe connection timeout)",
          "Visit http://10.20.1.4 (Observe 'Unable to connect')"
        ],
        checkId: "check_prove_exposure",
        question: "What did Firefox show for http://203.0.113.27:3306?",
        correctAnswers: ["timed out", "timeout", "the connection has timed out", "connection timed out", "took too long"],
        hint: "The firewall has no rule for that port, so the request never gets an answer.",
        priyaReply: "Timed out! The database firewall silently drops packets from the outside. QuickMart is live!"
      }
    ]
  }
};

export default topic6;
