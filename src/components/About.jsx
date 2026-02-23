import { FiMic, FiFileText, FiUsers, FiGlobe } from "react-icons/fi";
import { palette } from "../utils/palette";
import { useFadeIn } from "../hooks/useFadeIn";

const HIGHLIGHTS = [
  { icon: <FiMic size={18} />,      text: "Keynote presentations from leading scientists" },
  { icon: <FiFileText size={18} />, text: "Research paper presentations & poster sessions" },
  { icon: <FiGlobe size={18} />,    text: "Panel discussions on emerging technologies" },
  { icon: <FiUsers size={18} />,    text: "Networking sessions for interdisciplinary collaboration" },
];

/* ── small reusable section-label strip ───────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="flex-shrink-0 h-0.5 w-10 rounded-full"
        style={{ background: palette.yellow }}
      />
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: palette.yellow }}
      >
        {text}
      </span>
    </div>
  );
}

/* ── picture card with floating caption ─────────────────────── */
function PersonCard({ src, alt, title, subtitle }) {
  return (
    <div className="relative mb-14 sm:mb-10">
      {/* image */}
      <div
        className="rounded-3xl overflow-hidden shadow-2xl relative"
        style={{ border: `3px solid ${palette.yellow}` }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full object-cover"
          style={{ maxHeight: 480, objectPosition: "top" }}
        />
        {/* subtle blue overlay at bottom for legibility */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,38,71,0.55) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* floating caption */}
      <div
        className="absolute -bottom-8 left-4 right-4 sm:left-6 sm:right-auto bg-white p-4 sm:p-5 rounded-2xl shadow-xl"
        style={{ border: `1px solid rgba(10,38,71,0.08)`, maxWidth: 340 }}
      >
        <p className="text-sm font-bold leading-snug" style={{ color: palette.blue }}>
          {title}
        </p>
        <p className="text-xs mt-1 leading-snug text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useFadeIn();

  return (
    <section id="about" className="py-20 sm:py-28" style={{ background: "#ffffff" }}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
        }}
      >

        {/* ════════════════════════════════════════════════════════
            BLOCK 1 — Conference intro message
        ════════════════════════════════════════════════════════ */}
        <SectionLabel text="About the Programme" />

        <h2
          className="text-3xl sm:text-4xl font-bold mb-10"
          style={{ color: palette.blue, letterSpacing: "-0.02em" }}
        >
          A Premier Academic{" "}
          <br className="hidden md:block" />
          Gathering
        </h2>

        {/* intro text + dean sign-off */}
        <div
          className="max-w-4xl text-base leading-relaxed mb-16"
          style={{ color: "#334155", fontStyle: "italic" }}
        >
          <p className="mb-6">
            Welcome to the{" "}
            <span className="font-bold">
              2nd International Conference of the Faculty of Applied Sciences
            </span>
            , scheduled for June 1 – 4, 2026 at KolaDaisi University, Ibadan.
            This year's theme,{" "}
            <span style={{ color: palette.blue, fontWeight: 700 }}>
              "Bridging Academia, Industry, and Society: Innovative Solutions
              for Sustainable Development,"
            </span>{" "}
            highlights the need for collaboration in addressing real-world
            challenges through research, innovation, and practical application.
            The conference will provide a platform to showcase cutting-edge
            research, encourage interdisciplinary dialogue, strengthen
            partnerships with industry, and promote sustainable, evidence-based
            solutions. Participants will engage in keynote lectures, technical
            sessions, panel discussions, exhibitions, and networking
            opportunities designed to foster meaningful collaboration and
            impact. We warmly invite scholars, professionals, policymakers, and
            students from around the world to join us and contribute to making
            this conference a landmark event.
          </p>

          <p className="mb-8">
            The conference fosters interdisciplinary collaboration and promotes
            innovation that addresses real-world challenges, bridging theory
            with applied practice across global institutions.
          </p>

          {/* dean sign-off — left-bordered quote style */}
          <div
            className="pl-5 border-l-4 not-italic"
            style={{ borderColor: palette.yellow }}
          >
            <p className="font-bold" style={{ color: palette.blue }}>
              Prof Ademola Olusola ADESINA
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Dean, Faculty of Applied Sciences
              <br />
              KolaDaisi University, Ibadan, Nigeria
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            BLOCK 2 — Two person cards (VC + Dean)
        ════════════════════════════════════════════════════════ */}
        <div className="grid sm:grid-cols-2 gap-8 md:gap-12 mb-28 sm:mb-32">
          {/* Picture of Vice Chancellor */}
          <PersonCard
            src="https://koladaisiuniversity.edu.ng/wp-content/uploads/2023/05/IMG-20230517-WA0005.jpg"
            alt="Vice Chancellor picture"
            title="Chief Host: Prof Olatunbosun san"
            subtitle="Vice-Chancellor of KolaDaisi University, Ibadan, Nigeria"
          />

          {/* Picture of Dean, Faculty of Applied Sciences */}
          <PersonCard
            src="https://koladaisiuniversity.edu.ng/wp-content/uploads/2026/02/IMG-20260212-WA0033-150x150.jpg"
            alt="Dean of Faculty of Applied Sciences picture"
            title="Host: Prof Ademola Olusola ADESINA"
            subtitle="Dean, Faculty of Applied Sciences — KolaDaisi University, Ibadan, Nigeria"
          />
        </div>

        {/* thin divider */}
        <div
          className="mb-16"
          style={{ height: 1, background: "rgba(10,38,71,0.07)" }}
        />

        {/* ════════════════════════════════════════════════════════
            BLOCK 3 — About KolaDaisi University
        ════════════════════════════════════════════════════════ */}
        <SectionLabel text="About KolaDaisi University (KDU), Ibadan, Nigeria" />

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Description */}
          <div
            className="text-base leading-relaxed"
            style={{ color: "#334155", fontStyle: "italic" }}
          >
            <p className="mb-6">
              <span style={{ color: palette.blue, fontWeight: 700 }}>
                KolaDaisi University
              </span>{" "}
              is a private university located in Ibadan, Oyo State, Nigeria. It
              was established in 2016 and officially licensed by the National
              Universities Commission (NUC) to operate as a degree-awarding
              institution. The university was founded by Chief Kola Daisi to
              expand access to quality higher education and promote academic
              excellence, innovation, and entrepreneurship. It offers
              undergraduate programs across several faculties, including Applied
              Sciences, Computing and Information Technology, Arts, Management
              and Social Sciences, and Law.{" "}
              <span style={{ color: palette.blue, fontWeight: 700 }}>
                KolaDaisi University
              </span>{" "}
              is known for its relatively modern campus environment, focus on
              practical and industry-relevant education, smaller class sizes,
              and emphasis on discipline, leadership, and character development.
              The institution aims to bridge academic learning with real-world
              application, preparing students to compete both nationally and
              globally. Visit the school website to learn more{" "}
              <a
                href="https://koladaisiuniversity.edu.ng"
                target="_blank"
                rel="noreferrer"
                className="not-italic font-bold underline underline-offset-2 transition-colors duration-200"
                style={{ color: palette.blue }}
                onMouseEnter={(e) => (e.currentTarget.style.color = palette.blueMid)}
                onMouseLeave={(e) => (e.currentTarget.style.color = palette.blue)}
              >
                KolaDaisi University.edu.ng
              </a>
            </p>
          </div>

          {/* Campus image */}
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: `3px solid ${palette.yellow}` }}
          >
            <img
              src="/images/kdu-campus.jpeg"
              alt="KolaDaisi University campus"
              className="w-full object-cover"
              style={{ maxHeight: 420, objectPosition: "center" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
