const greenLinks = ["HOME", "RFID", "PHISHING", "TEAM", "THANKS"];

const resourceCards = [
  { title: "VIDEO_DEMO", icon: "?", text: "Complete demonstration of RFID range extension attack and detection methods" },
  { title: "PRESENTATION", icon: "?", text: "Technical slides covering methodology, results, and security implications" },
  { title: "REPORT", icon: "?", text: "Comprehensive documentation of research findings and experimental data" },
  { title: "SOURCE_CODE", icon: "?", text: "Complete implementation including tools, scripts, and configuration files" },
];

const redCards = [
  { title: "VIDEO_DEMO", icon: "?", text: "Live demonstration of phishing email detection and classification system" },
  { title: "PRESENTATION", icon: "?", text: "ML architecture, training process, and performance metrics overview" },
  { title: "REPORT", icon: "?", text: "Full model evaluation, dataset analysis, and feature engineering insights" },
  { title: "SOURCE_CODE", icon: "?", text: "End-to-end phishing scanner implementation with detection pipeline" },
];

const team = [
  ["A", "Alice Chen", "Hardware Engineer"],
  ["M", "Marcus Rodriguez", "Security Researcher"],
  ["S", "Sarah Kim", "Software Developer"],
  ["J", "James Okonkwo", "RF Specialist"],
  ["E", "Emma Thompson", "Data Scientist"],
  ["D", "David Park", "ML Engineer"],
] as const;

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="brand">? CNS_MODULE.v1.0</div>
        <nav>
          {greenLinks.map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={i === 0 ? "active" : ""}>
              {i === 0 ? `> ${item}` : item}
            </a>
          ))}
        </nav>
      </header>

      <main className="shell">
        <section id="home" className="section hero">
          <p className="lead">&gt; COMP3000 // NETWORK_SECURITY // 2025-26</p>
          <h1>
            COMPUTER
            <br />
            NETWORK
            <br />
            SECURITY
          </h1>
          <div className="blurb">
            A comprehensive exploration of modern security principles, threat mitigation, and defensive technologies.
            This showcase presents two advanced projects demonstrating practical applications of network security concepts.
          </div>

          <div className="stats">
            <div className="stat"><span>CRYPTOGRAPHY</span>[ENABLED]</div>
            <div className="stat"><span>THREAT_ANALYSIS</span>[ACTIVE]</div>
            <div className="stat"><span>SECURE_PROTOCOLS</span>[IMPLEMENTED]</div>
          </div>
          <a className="cta" href="#rfid">&gt; EXPLORE_PROJECTS</a>
        </section>

        <section id="rfid" className="section project green">
          <p className="kicker">&gt; PROJECT_01</p>
          <h2>(?) RFID_EXTENDED_RANGE</h2>
          <div className="blurb">Investigating vulnerabilities in contactless authentication systems through range extension attacks. Demonstrates practical exploitation techniques and defensive countermeasures for RFID-based access control.</div>
          <div className="grid">
            {resourceCards.map((card) => (
              <article key={card.title} className="card">
                <h3>{card.icon} {card.title}</h3>
                <p>{card.text}</p>
                <a href="#">ACCESS ?</a>
              </article>
            ))}
          </div>
        </section>

        <section id="phishing" className="section project red">
          <p className="kicker">&gt; PROJECT_02</p>
          <h2>? PHISHING_SCANNER</h2>
          <div className="blurb">Machine learning-powered detection system for identifying sophisticated phishing attempts. Combines NLP, header analysis, and behavioral patterns to protect against social engineering attacks.</div>
          <div className="grid">
            {redCards.map((card) => (
              <article key={card.title} className="card">
                <h3>{card.icon} {card.title}</h3>
                <p>{card.text}</p>
                <a href="#">ACCESS ?</a>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="section">
          <p className="kicker">&gt; TEAM_MEMBERS</p>
          <h2 className="teamTitle">OUR_TEAM</h2>
          <div className="teamGrid">
            {team.map(([initial, name, role]) => (
              <article key={name} className="member">
                <div className="avatar">{initial}</div>
                <div>
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
                <span>?</span>
              </article>
            ))}
          </div>
        </section>

        <section id="thanks" className="section thanks">
          <div className="seal">?</div>
          <h2>ACKNOWLEDGEMENTS</h2>
          <div className="blurb">
            We extend our gratitude to Dr. Michael Stevens and the Computer Science faculty for their guidance throughout this module. Special thanks to the university&apos;s Security Research Lab for providing testing infrastructure and resources.
            <br />
            <br />
            This work would not have been possible without the support of our peers, mentors, and the open-source security community.
          </div>
          <footer>
            <p>UNIVERSITY COMPUTER NETWORK SECURITY MODULE</p>
            <p>&gt; SECURE // ANALYZE // DEFEND</p>
            <p>2025-26 © ALL RIGHTS RESERVED</p>
          </footer>
        </section>
      </main>
    </>
  );
}
