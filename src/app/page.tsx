"use client";

import { useEffect, useMemo, useState } from "react";
import { Shield, Radio, Mail, Video, Presentation, FileText, Github, X, Circle, ArrowRight, Mail as MailIcon, Github as GithubIcon, Clock3, MapPin, Users, Heart } from "lucide-react";
import Image from "next/image";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "rfid", label: "RFID" },
  { id: "phishing", label: "PHISHING" },
  { id: "team", label: "TEAM" },
  { id: "meetings", label: "MEETINGS" },
  { id: "thanks", label: "THANKS" },
];

type TeamMember = {
  leader?: boolean;
  initial: string;
  name: string;
  photo?: string;
  mark: number;
  tasks: string[];
  project1Percent: number;
  project2Percent: number;
  email?: string;
  github?: string;
};

type ResourceCard = { id: string; title: string; text: string; icon: React.ReactNode };

const resourceCards: ResourceCard[] = [
  { id: "rfid-video", title: "VIDEO_DEMO", icon: <Video size={36} />, text: "Complete demonstration of RFID range extension attack and detection methods" },
  { id: "rfid-presentation", title: "PRESENTATION", icon: <Presentation size={36} />, text: "Technical slides covering methodology, results, and security implications" },
  { id: "rfid-report", title: "REPORT", icon: <FileText size={36} />, text: "Comprehensive documentation of research findings and experimental data" },
  { id: "rfid-code", title: "SOURCE_CODE", icon: <Github size={36} />, text: "Complete implementation including tools, scripts, and configuration files" },
];

const redCards: ResourceCard[] = [
  { id: "phishing-video", title: "VIDEO_DEMO", icon: <Video size={36} />, text: "Live demonstration of phishing email detection and classification system" },
  { id: "phishing-presentation", title: "PRESENTATION", icon: <Presentation size={36} />, text: "ML architecture, training process, and performance metrics overview" },
  { id: "phishing-report", title: "REPORT", icon: <FileText size={36} />, text: "Full model evaluation, dataset analysis, and feature engineering insights" },
  { id: "phishing-code", title: "SOURCE_CODE", icon: <Github size={36} />, text: "End-to-end phishing scanner implementation with detection pipeline" },
];

const teamMembers: TeamMember[] = [
  { initial: "S", leader: true, name: "Lyna Selsabila Remadi", photo: "/team/selsabila.jpg", mark: 10, tasks: ["[Leadership] Planned and led all team meetings; assigned tasks across both projects.", "[Leadership] Set up the GitHub repository and defined the contribution workflow.", "[Relations] Managed external relations and drafted/sent emails to professors about lab access and hardware.", "[Leadership] Monitored deliverables across both subteams and identified blockers early.", "[Phishing] Built the interactive web platform integrating the ML detection model.", "[Phishing] Implemented and tested algorithms on the email dataset.", "[Phishing] Wrote part of the report covering methodology, tests, and results.", "[RFID] Tested the RFID module at 52 Hz during the first stage.", "[RFID] Built a 40-turn coil (14 cm diameter, 0.75 mm wire) and designed the electrical schematic.", "[RFID] Authored the RFID technical report and prepared presentation slides.", "[RFID] RFID video editing and filming", "[Phishing] Phishing Extension"], project1Percent: 50, project2Percent: 50, email: "lyna.selsabila.remadie@ensia.edu.dz", github: "https://github.com/lyna1908" },
  { initial: "A", name: "Amani Boulahia", photo: "/team/amani.jpg", mark: 10, tasks: ["[RFID] Studied the theoretical and technical foundations of RFID systems: signal behavior,coil physics with calculations.", "[Relations] Contacted professors and teachers in electronics and electrical engineering to gather guidance and technical insights.", "[Relations] Organized and led a visit to USTHB with the CELEC electronics club to access specialized equipment and test the hardware.", "[RFID] Built the RFID extension circuit and ran hardware tests, including different coils.", "[RFID] Authored part of the technical report and reviewed the full document for accuracy, coherence, and completeness.", "[Relations] The report check"], project1Percent: 100, project2Percent: 0, email: "amani.boulahia@ensia.edu.dz", github: "https://github.com/amani-blhiaaa" },
  { initial: "C", name: "Chiraz Benakmoum", photo: "/team/chiraz.jpg", mark: 10, tasks: ["[Phishing] Found, cleaned, and preprocessed phishing data.", "[Phishing] Wrote part of the phishing technical report.", "[Phishing] Prepared the phishing project slides.", "[Phishing] Built a Linear Regression model.", "[Phishing] Built an SVM model.", "[Phishing] Trained and tested both models.", "[RFID] Participated in circuit assembly and hardware testing.", "[RFID] RFID slides", "[Phishing] Phishing video editing"], project1Percent: 35, project2Percent: 65, email: "chiraz.benakmoum@ensia.edu.dz", github: "https://github.com/Chirazbkm" },
  { initial: "H", name: "Yousra Hind Bennabi", photo: "/team/hind.jpg", mark: 9, tasks: ["[RFID] Prepared the content of the RFID presentation slides.", "[RFID] Studied the theoretical and technical foundations of RFID systems, including range limitations, hardware constraints, and calculations.", "[RFID] Built the RFID extension circuit and ran hardware tests with different coils.", "[Phishing] Performed phishing email testing."], project1Percent: 90, project2Percent: 10, email: "yousra.hind.bennabi@ensia.edu.dz", github: "https://github.com/Hind-BENNABI" },
  { initial: "O", name: "Oumaima Boucekkine", photo: "/team/oumaima.jpg", mark: 9, tasks: ["[RFID] Organized and managed a visit to a bobinage workshop in Douira to source expertise and materials for coil fabrication.", "[RFID] Participated in building and testing the RFID extension circuit hands-on.", "[RFID] Built a 50-turn copper coil (5 cm diameter) using 0.2 mm copper wire.", "[RFID] Built a second 50-turn copper coil (10 cm diameter) using 0.2 mm copper wire for extended range testing.", "[Phishing] Edited and produced the phishing detection demo video for the final presentation.", "[Phishing] Phishing video filming"], project1Percent: 80, project2Percent: 20, email: "oumaima.boucekkine@ensia.edu.dz", github: "https://github.com/Oumaima-Bouc" },
];

type MeetingItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  whatWeDid: string;
  present: string[];
  absent: string[];
};

const meetings: MeetingItem[] = [
  {
    title: "Kick-off meeting (Meeting)",
    date: "February 15, 2026",
    time: "7:30 PM",
    location: "At school",
    whatWeDid: "Topic selection and project kick-off.",
    present: ["Lyna Selsabila Remadi", "Amani Boulahia", "Chiraz Benakmoum"],
    absent: ["Yousra Hind Bennabi", "Oumaima Boucekkine"],
  },
  {
    title: "Online meeting - Ramadan (Online)",
    date: "February 23, 2026",
    time: "10:15 PM",
    location: "Online",
    whatWeDid: "Work division discussion and clarification of critical points in both projects.",
    present: ["Lyna Selsabila Remadi", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: ["Amani Boulahia"],
  },
  {
    title: "First circuit testing session (Meeting)",
    date: "April 7, 2026",
    time: "3:00 PM",
    location: "At school",
    whatWeDid: "Tested the first circuit prototype and decided on range improvement strategies.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: [],
  },
  {
    title: "Lab session with Prof. Kheloufi (Meeting)",
    date: "April 8, 2026",
    time: "4:40 PM",
    location: "Electronic Circuit Lab",
    whatWeDid: "RFID testing and technical guidance from Prof. Kheloufi.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum", "Oumaima Boucekkine"],
    absent: ["Yousra Hind Bennabi"],
  },
  {
    title: "Progress check meeting (Meeting)",
    date: "April 12, 2026",
    time: "3:00 PM",
    location: "At school",
    whatWeDid: "Quick check-in to review progress across both projects.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: [],
  },
  {
    title: "Component collection - Prof. Djoumaa's lab (Visit)",
    date: "April 26, 2026",
    time: "3:00 PM",
    location: "Electronic Circuit Lab",
    whatWeDid: "Collected hardware components from Prof. Djoumaa.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi"],
    absent: ["Oumaima Boucekkine"],
  },
  {
    title: "USTHB visit - CELEC club (Visit)",
    date: "April 27, 2026",
    time: "12:00 PM - 8:30 PM",
    location: "Faculty of Electrical Engineering",
    whatWeDid: "Met with the CELEC electronics club and purchased additional hardware.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi"],
    absent: ["Oumaima Boucekkine"],
  },
  {
    title: "First coil assembly session (Meeting)",
    date: "April 29, 2026",
    time: "2pm",
    location: "At school",
    whatWeDid: "Built the first coil: 40 turns, 14 cm diameter, 0.75 mm copper wire.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Oumaima Boucekkine"],
    absent: ["Yousra Hind Bennabi"],
  },
  {
    title: "Lab session with Ms. Bensalem (Meeting)",
    date: "May 4, 2026",
    time: "3:00 PM",
    location: "Electronic Circuit Lab",
    whatWeDid: "Added additional power supply to the circuit.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: [],
  },
  {
    title: "Testing session with Prof. Kheloufi (Meeting)",
    date: "May 6, 2026",
    time: "5:00 PM - 7:00 PM",
    location: "Electronic Circuit Lab",
    whatWeDid: "Voltage and continuity measurements and full circuit diagnostics.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: [],
  },
  {
    title: "Slides & video production session (Work session)",
    date: "May 6, 2026",
    time: "10:00 PM",
    location: "At the dorm",
    whatWeDid: "Collaborative session to build presentation slides and edit the demo video.",
    present: ["Lyna Selsabila Remadi","Amani Boulahia", "Chiraz Benakmoum","Yousra Hind Bennabi", "Oumaima Boucekkine"],
    absent: [],
  },
  {
    title: "Douira workshop visit (Visit)",
    date: "May 7, 2026",
    time: "12:00 PM",
    location: "Bobinage workshop",
    whatWeDid: "Sourced 0.2 mm copper wire for the new coil designs.",
    present: ["Oumaima Boucekkine","Amani Boulahia"],
    absent: ["Lyna Selsabila Remadi","Chiraz Benakmoum","Yousra Hind Bennabi"],
  },
  {
    title: "New coil fabrication session (Work session)",
    date: "May 7, 2026",
    time: "From 12:00 PM",
    location: "Workshop / Lab",
    whatWeDid: "Built two new coils: 50 turns / 5 cm diameter and 50 turns / 10 cm diameter, both with 0.2 mm copper wire.",
    present: ["Lyna Selsabila Remadi","Chiraz Benakmoum","Oumaima Boucekkine", "Amani Boulahia"],
    absent: ["Yousra Hind Bennabi"],
  },
];

function ContributionCircle({
  project1Percent,
  project2Percent,
}: {
  project1Percent: number;
  project2Percent: number;
}) {
  const radius = 36;
  const stroke = 6;
  const normalized1 = Math.max(0, Math.min(100, project1Percent));
  const normalized2 = Math.max(0, Math.min(100, project2Percent));
  const circumference = 2 * Math.PI * radius;
  const dashOffset1 = circumference - (normalized1 / 100) * circumference;
  const dashOffset2 = circumference - (normalized2 / 100) * circumference;

  return (
    <div className="progressItem single">
      <svg width="110" height="110" viewBox="0 0 110 110" className="progressRing" aria-label={`Project contribution`}>
        <circle cx="55" cy="55" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#00ff00"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset1}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
        <circle
          cx="55"
          cy="55"
          r={radius - 10}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="55"
          cy="55"
          r={radius - 10}
          stroke="#ff0000"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={2 * Math.PI * (radius - 10)}
          strokeDashoffset={(2 * Math.PI * (radius - 10)) - (normalized2 / 100) * (2 * Math.PI * (radius - 10))}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
      </svg>
      <div className="contribLegend">
        <p><span className="dot green" /> RFID: {normalized1}%</p>
        <p><span className="dot red" /> PHISHING: {normalized2}%</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const links = useMemo(() => navItems, []);
  const leader = teamMembers.find((m) => m.leader) ?? teamMembers[0];
  const others = teamMembers.filter((m) => m !== leader);
  const getMailToLink = (email: string, name: string) =>
    `mailto:${email}?subject=${encodeURIComponent(`Hello ${name}`)}`;
  const getResourceLink = (id: string) => {
    if (id === "phishing-presentation") return "/phishing_email_presentation.pdf";
    return "#";
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY + 140;
      let current = "home";
      for (const item of links) {
        const el = document.getElementById(item.id);
        if (el && scrollY >= el.offsetTop) current = item.id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [links]);

  return (
    <>
      <header className="topbar">
        <div className="brand"><Shield size={28} /> CNS_MODULE.v1.0</div>
        <nav>
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""}>
              {activeSection === item.id ? `> ${item.label}` : item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="shell">
        <section id="home" className="section hero">
          <div className="heroLayout">
            <div className="heroContent">
              <p className="lead">&gt; COMP3000 // NETWORK_SECURITY // 2025-26</p>
              <h1>COMPUTER<br />NETWORK<br />SECURITY</h1>
              <div className="blurb">A comprehensive exploration of modern security principles, threat mitigation, and defensive technologies. This showcase presents two advanced projects demonstrating practical applications of network security concepts.</div>
              <a className="cta" href="#rfid">&gt; EXPLORE_PROJECTS</a>
            </div>
            <aside className="homeVisual">
              <div className="visualCrop">
                <Image
                  src="/home-clean-v2.png"
                  alt="RFID phishing visual"
                  width={520}
                  height={520}
                  priority
                />
              </div>
            </aside>
          </div>
        </section>

        <section id="rfid" className="section project green">
          <p className="kicker">&gt; PROJECT_01</p>
          <h2><Radio size={56} /> RFID_EXTENDED_RANGE</h2>
          <div className="blurb">Investigating vulnerabilities in contactless authentication systems through range extension attacks. Demonstrates practical exploitation techniques and defensive countermeasures for RFID-based access control.</div>
          <div className="grid">
            {resourceCards.map((card) => (
              <article key={card.id} className="card">
                <h3><span className="iconWrap">{card.icon}</span>{card.title}</h3>
                <p>{card.text}</p>
                <a
                  href={getResourceLink(card.id)}
                  target={getResourceLink(card.id) !== "#" ? "_blank" : undefined}
                  rel={getResourceLink(card.id) !== "#" ? "noreferrer" : undefined}
                  onClick={(e) => {
                    if (getResourceLink(card.id) === "#") e.preventDefault();
                  }}
                >
                  ACCESS <ArrowRight size={19} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="phishing" className="section project red">
          <p className="kicker">&gt; PROJECT_02</p>
          <h2><Mail size={56} /> PHISHING_SCANNER</h2>
          <div className="blurb">Machine learning-powered detection system for identifying sophisticated phishing attempts. Combines NLP, header analysis, and behavioral patterns to protect against social engineering attacks.</div>
          <div className="grid">
            {redCards.map((card) => (
              <article key={card.id} className="card">
                <h3><span className="iconWrap">{card.icon}</span>{card.title}</h3>
                <p>{card.text}</p>
                <a
                  href={getResourceLink(card.id)}
                  target={getResourceLink(card.id) !== "#" ? "_blank" : undefined}
                  rel={getResourceLink(card.id) !== "#" ? "noreferrer" : undefined}
                  onClick={(e) => {
                    if (getResourceLink(card.id) === "#") e.preventDefault();
                  }}
                >
                  ACCESS <ArrowRight size={19} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="section">
          <p className="kicker">&gt; TEAM_MEMBERS</p>
          <h2 className="teamTitle">OUR_TEAM</h2>
          <div className="leaderWrap">
            <button className="member leader" onClick={() => setSelectedMember(leader)}>
              <div className="avatar">
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={leader.name}
                    width={88}
                    height={88}
                    className="avatarPhoto"
                  />
                ) : (
                  leader.initial
                )}
              </div>
              <div><h4>{leader.name} {leader.leader && <span className="nameTag leaderTag">LEADER</span>}</h4></div>
              <span><ArrowRight size={26} /></span>
            </button>
          </div>
          <div className="teamGrid">
            {others.map((member) => (
              <button key={member.name} className="member" onClick={() => setSelectedMember(member)}>
                <div className="avatar">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={88}
                      height={88}
                      className="avatarPhoto"
                    />
                  ) : (
                    member.initial
                  )}
                </div>
                <div><h4>{member.name}</h4></div>
                <span><ArrowRight size={26} /></span>
              </button>
            ))}
          </div>
        </section>

        <section id="meetings" className="section">
          <p className="kicker">&gt; MEETING_LOG</p>
          <h2 className="teamTitle">MEETINGS_VISITS</h2>
          <div className="meetingTimeline">
            {meetings.map((meeting) => (
              <article key={`${meeting.title}-${meeting.date}`} className="meetingCard">
                <h3>{meeting.title}</h3>
                <p><Clock3 size={16} /> {meeting.date} | {meeting.time}</p>
                <p><MapPin size={16} /> {meeting.location}</p>
                <p>{meeting.whatWeDid}</p>
                <p><Users size={16} /> Attendance</p>
                <div className="attendanceBlock">
                  <p className="attendanceTitle">Present</p>
                  <div className="attendanceTags">
                    {meeting.present.map((member) => (
                      <span key={`${meeting.title}-${member}-present`} className="tagPresent">{member}</span>
                    ))}
                  </div>
                  <p className="attendanceTitle absentTitle">Absent</p>
                  <div className="attendanceTags">
                    {meeting.absent.length > 0 ? (
                      meeting.absent.map((member) => (
                        <span key={`${meeting.title}-${member}-absent`} className="tagAbsent">{member}</span>
                      ))
                    ) : (
                      <span className="tagPresent">None</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="thanks" className="section thanks">
          <div className="seal"><Heart size={70} fill="currentColor" /></div>
          <h2>ACKNOWLEDGEMENTS</h2>
          <div className="blurb thanksText">
            <p className="thanksMain">From the bottom of our hearts — the whole team</p>
            <p>Every word of encouragement, every bit of guidance, and every helping hand made a real difference. We are truly grateful for all of you.</p>
            
            <div className="thanksGrid">
              <div className="thanksItem">
                <strong>Prof. Lounis</strong>
                <span>Your mentorship lit our path. Thank you for your wisdom.</span>
              </div>
              <div className="thanksItem">
                <strong>Prof. Kheloufi</strong>
                <span>Your insights shaped our thinking. We are forever thankful.</span>
              </div>
              <div className="thanksItem">
                <strong>Prof. Bensalem</strong>
                <span>Your patience and expertise guided us through challenges.</span>
              </div>
              <div className="thanksItem">
                <strong>Prof. Djoumaa</strong>
                <span>Your dedication inspired us to push beyond our limits.</span>
              </div>
              <div className="thanksItem">
                <strong>CELEC Club — USTHB</strong>
                <span>Your community made us feel supported every step of the way.</span>
              </div>
              <div className="thanksItem">
                <strong>Our Families</strong>
                <span>Your unconditional love and patience were our greatest fuel.</span>
              </div>
              <div className="thanksItem">
                <strong>The Electrician in the Dorm</strong>
                <span>The small help you gave us kept us going. Thank you!</span>
              </div>
              <div className="thanksItem">
                <strong>Our School&apos;s Security Agent</strong>
                <span>Your warm presence and care never went unnoticed.</span>
              </div>
            </div>

            <p className="thanksClosing">No act of kindness is too small. You all left a mark on our journey.</p>
            <p className="signature">— With sincere gratitude, the team leader &amp; the whole team</p>
          </div>
          <footer><p>UNIVERSITY COMPUTER NETWORK SECURITY MODULE</p><p>&gt; SECURE // ANALYZE // DEFEND</p><p>2025-26 (C) ALL RIGHTS RESERVED</p></footer>
        </section>
      </main>

      {selectedMember && (
        <div className="modalOverlay" onClick={() => setSelectedMember(null)}>
          <article className="memberModal" onClick={(e) => e.stopPropagation()}>
            <button className="closeModal" onClick={() => setSelectedMember(null)}><X size={16} /></button>
            <div className="modalHeader">
              <div className="avatar modalAvatar">
                {selectedMember.photo ? (
                  <Image
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    width={74}
                    height={74}
                    className="avatarPhoto"
                  />
                ) : (
                  selectedMember.initial
                )}
              </div>
              <h3>{selectedMember.name} {selectedMember.leader && <span className="nameTag leaderTag">LEADER</span>}</h3>
            </div>
            <div className="modalBlock">
              <h4>&gt; MARK</h4>
              <p className="markLine">{selectedMember.mark.toFixed(1)} / 10</p>
            </div>
            <div className="modalBlock">
              <h4>&gt; CONTRIBUTION</h4>
              <div className="progressGrid">
                <ContributionCircle
                  project1Percent={selectedMember.project1Percent}
                  project2Percent={selectedMember.project2Percent}
                />
              </div>
            </div>
            <div className="modalBlock">
              <h4>&gt; TASKS</h4>
              <ul className="taskList">
                {selectedMember.tasks.map((task) => (
                  <li key={task}>
                    {(() => {
                      const match = task.match(/^\[(.+?)\]\s*(.*)$/);
                      const tag = match?.[1] ?? "General";
                      const text = match?.[2] ?? task;
                      const tagClass =
                        tag.toLowerCase() === "leadership"
                          ? "taskTag leadership"
                          : tag.toLowerCase() === "phishing"
                            ? "taskTag phishing"
                            : tag.toLowerCase() === "rfid"
                              ? "taskTag rfid"
                              : "taskTag";
                      return (
                        <span className="taskLine">
                          <span className={tagClass}>{tag}</span>
                          {" "}
                          <span>{text}</span>
                        </span>
                      );
                    })()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modalBlock"><h4>&gt; CONTACT</h4><div className="contactLinks">{selectedMember.email && <a href={getMailToLink(selectedMember.email, selectedMember.name)} aria-label="email" title={`Email ${selectedMember.name}`}><MailIcon size={15} /></a>}{selectedMember.github && <a href={selectedMember.github} target="_blank" rel="noreferrer" aria-label="github"><GithubIcon size={15} /></a>}</div></div>
          </article>
        </div>
      )}
    </>
  );
}
