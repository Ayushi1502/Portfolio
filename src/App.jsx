import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const RED = "#ff2a2a";

function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#ff2a2a]"
          initial={{ y: 0 }}
          exit={{ y: "-110%" }}
          transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="relative select-none text-[clamp(3.2rem,13vw,12rem)] font-black leading-none tracking-[-0.06em]"
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="text-black/32">Ayushi</span>
            <motion.span
              className="absolute inset-0 text-white"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            >
              Ayushi
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["Home", "About", "Experience", "Projects", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 2.15 }}
    >
      <nav
        className={`mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between rounded-full border px-5 transition-all duration-500 md:px-7 ${
          scrolled
            ? "h-16 border-white/12 bg-black/45 shadow-2xl shadow-black/30 backdrop-blur-2xl"
            : "h-20 border-white/8 bg-white/5 backdrop-blur-md"
        }`}
      >
        <a href="#home" className="text-2xl font-black tracking-[-0.05em] text-white">
          Ayushi<span className="text-[#ff2a2a]">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="link-underline text-sm font-semibold uppercase tracking-[0.18em] text-white/72 transition hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="/Ayu_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition"
          >
            CV
          </a>
          <a
            href="mailto:ayushiawasthi99073@gmail.com"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-white/5 backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-black"
          >
            Hire Me
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 md:hidden"
        >
          <span className="relative h-3.5 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-3 w-[calc(100%-32px)] overflow-hidden rounded-[2rem] bg-[#ff2a2a] p-4 shadow-2xl shadow-black/35 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-5 py-4 text-2xl font-black tracking-[-0.04em] text-black transition hover:bg-black hover:text-white"
              >
                {link}
              </a>
            ))}
            <a
              href="/Ayu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-5 py-4 text-2xl font-black tracking-[-0.04em] text-black transition hover:bg-black hover:text-white mt-1 border-t border-black/10 pt-4"
            >
              Resume PDF
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const playCountRef = useRef(0); // Plays counter track karne ke liye
  const [isMuted, setIsMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleVideo = async () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
      return;
    }
    try {
      playCountRef.current = 0; // Manual run start hone par reset counters
      await videoRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    if (playCountRef.current < 1) { // 1 original ended, 1 replay play hoga
      playCountRef.current += 1;
      videoRef.current.play();
    } else {
      setPlaying(false); // 2 plays poore hone par stop video state
    }
  };

  const item = {
    hidden: { y: 34, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src="/myvideo.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnded} // Play and replay detection
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(255,42,42,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.52),rgba(0,0,0,0.82))]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-[min(1180px,calc(100%-32px))] items-center gap-12 pb-24 pt-32 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.13, delayChildren: 2.25 } } }}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p variants={item} className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-[#ff2a2a]">
            Portfolio 2026
          </motion.p>
          <motion.h1 variants={item} className="text-[clamp(4rem,11vw,9.6rem)] font-black leading-[0.86] tracking-[-0.06em] text-white">
            Hi, I'm
            <span className="text-stroke block">Ayushi Awasthi</span>
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-2xl text-lg leading-8 text-white/78 shadow-black [text-shadow:0_8px_30px_rgba(0,0,0,0.7)]">
            A Full Stack Developer & AI-ML Engineer building fast, scalable web applications and intelligent machine learning solutions. Pursuing B.Tech in CSE-AIML.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:scale-105">
              View My Work
            </a>
            <a href="/Ayu_resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 bg-black/25 px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white backdrop-blur-xl transition hover:scale-105 hover:border-white">
              Download CV
            </a>
            <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition hover:scale-105 hover:border-white hover:text-white">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 md:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to about"
      >
        <ArrowDownIcon />
      </motion.a>

      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        <button
          onClick={toggleVideo}
          className="rounded-full bg-black/60 px-5 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-black/80 transition"
        >
          {playing ? "⏸ Pause Video" : "▶ Play Video"}
        </button>
        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setIsMuted(videoRef.current.muted);
            }
          }}
          className="rounded-full bg-black/60 px-5 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-black/80 transition"
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      </div>
    </section>
  );
}


function About() {
  const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "TensorFlow",
    "SQL",
    "C++",
    "AWS",
    "Git"
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#ff2a2a] px-4 py-24 md:py-32">
      <FloatingStar className="left-[8%] top-24" />
      <FloatingStar className="right-[10%] top-32 scale-75" />
      <FloatingStar className="bottom-28 left-[48%] scale-90" />

      <div className="mx-auto grid w-[min(1180px,100%)] items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="relative mx-auto w-[min(360px,88vw)] pt-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute left-1/2 top-0 h-28 w-4 -translate-x-1/2 rounded-full bg-black shadow-xl" />
          <div className="absolute left-1/2 top-24 h-8 w-24 -translate-x-1/2 rounded-full border-[10px] border-zinc-900 bg-zinc-400 shadow-2xl" />
          <motion.div
            className="-rotate-3 rounded-[2rem] bg-zinc-900 p-5 shadow-[0_34px_80px_rgba(0,0,0,0.35)]"
            whileHover={{ rotate: -1, y: -8 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <div className="aspect-[4/4.9] rounded-[1.4rem] bg-[#2a2a2a] p-5">
              <div className="h-2 w-16 rounded-full bg-white/18" />
              <div className="mt-8 aspect-square overflow-hidden rounded-3xl shadow-inner shadow-black/30">
                <img src="/myphoto.png" alt="Ayushi" className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-white/50">Developer ID</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">Ayushi Awasthi</h3>
              <p className="mt-1 text-sm text-white/54">Full Stack & AI-ML Engineer</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[clamp(5rem,13vw,12rem)] font-black leading-none tracking-[-0.08em] text-black">Hello!</h2>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white md:text-2xl md:leading-10">
            I am <strong className="font-black uppercase text-black">Ayushi Awasthi</strong>, a full-stack developer and AI-ML engineer crafting expressive interfaces, performant APIs, and intelligent data systems.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-red-100">
            Currently pursuing B.Tech in CSE-AIML at Oriental Institute of Science & Technology, Bhopal (CGPA: 8.14), my work combines responsive MERN stack applications with machine learning workflows.
          </p>

          <div id="skills" className="mt-12 grid grid-cols-3 gap-4 sm:max-w-xl">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="grid aspect-square place-items-center rounded-[2rem] border border-black/12 bg-white/10 text-center shadow-2xl shadow-black/15 backdrop-blur-sm p-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
              >
                <span className="text-xl font-black tracking-[-0.05em] text-black sm:text-2xl">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <svg className="absolute bottom-[-1px] left-0 h-20 w-full text-white md:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 54L70 66L139 43L209 70L279 51L349 75L418 44L488 68L558 57L628 77L697 48L767 71L837 52L907 74L976 46L1046 69L1116 55L1186 76L1255 49L1325 66L1395 52L1440 60V120H0V54Z" />
      </svg>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      role: "MERN Stack Developer Intern",
      company: "Throne8 Technologies",
      duration: "May 2026 - Present",
      type: "On-Site",
      points: [
        "Full Stack Development: Worked on MERN stack technologies to develop and maintain responsive web applications with efficient backend integration.",
        "Project Development: Built and contributed to real-world projects using MongoDB, Express.js, React.js, and Node.js.",
        "Collaboration: Collaborated with team members in an on-site environment and gained hands-on experience in modern web development practices."
      ]
    },
    {
      role: "AI-ML Virtual Intern",
      company: "EduSkills",
      duration: "10 Weeks",
      type: "Virtual",
      points: [
        "AI & ML Fundamentals: Learned the fundamentals of Artificial Intelligence and Machine Learning through practical concepts.",
        "Hands-on Learning: Gained exposure to machine learning workflows, data analysis, and problem-solving using Python."
      ]
    },
    {
      role: "Software Internship",
      company: "Cognifyz",
      duration: "Completed",
      type: "Remote",
      points: [
        "Gained exposure to full-stack engineering and development practices.",
        "Actively participated in technical projects and AI/ML-based problem-solving initiatives."
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology - CSE-AIML",
      institution: "Oriental Institute of Science & Technology, Bhopal",
      duration: "2023 - 2027",
      detail: "CGPA: 8.14",
      courses: "Operating Systems, Data Structures, Analysis of Algorithms, AI, Machine Learning, Databases"
    },
    {
      degree: "High School (12th PCM + CS)",
      institution: "New-age Public School, Gadarwara",
      duration: "2022 - 2023",
      detail: "Percentage: 69.6%"
    },
    {
      degree: "Secondary School (10th)",
      institution: "New-age Public School, Gadarwara",
      duration: "2020 - 2021",
      detail: "Percentage: 78.2%"
    }
  ];

  return (
    <section id="experience" className="relative bg-zinc-950 px-4 py-24 text-white md:py-32">
      <div className="mx-auto w-[min(1180px,100%)]">
        <div className="relative mb-16 max-w-3xl">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff2a2a] backdrop-blur-xl">
            My Journey
          </span>
          <h2 className="mt-8 text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.92] tracking-[-0.07em]">
            Experience & Education
          </h2>
        </div>

        <div className="grid gap-14 md:grid-cols-2">
          {/* Experience Column */}
          <div>
            <h3 className="mb-8 font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#ff2a2a] border-b border-white/10 pb-4">
              Work Experience
            </h3>
            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className="relative pl-6 border-l-2 border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#ff2a2a]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                    {exp.duration} • {exp.type}
                  </span>
                  <h4 className="mt-1 text-2xl font-black tracking-tight">{exp.role}</h4>
                  <p className="font-serif italic text-[#ff2a2a]">{exp.company}</p>
                  <ul className="mt-4 space-y-2.5 text-white/70 text-sm leading-relaxed list-disc list-inside">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="pl-1 text-indent-[-1.5rem]">{pt}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="mb-8 font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#ff2a2a] border-b border-white/10 pb-4">
              Education
            </h3>
            <div className="space-y-10">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="relative pl-6 border-l-2 border-white/10"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-white" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                    {edu.duration}
                  </span>
                  <h4 className="mt-1 text-2xl font-black tracking-tight">{edu.degree}</h4>
                  <p className="font-serif italic text-white/80">{edu.institution}</p>
                  <p className="mt-2 text-sm font-semibold text-[#ff2a2a]">{edu.detail}</p>
                  {edu.courses && (
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      <strong className="text-white/80">Courses:</strong> {edu.courses}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Certifications and Publications */}
            <div className="mt-14 space-y-8">
              <h3 className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#ff2a2a] border-b border-white/10 pb-4">
                Publications & Certifications
              </h3>
              <motion.div
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="rounded-full bg-[#ff2a2a] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  Research Publication
                </span>
                <h4 className="mt-3 text-xl font-black tracking-tight">Federated Machine Learning Framework</h4>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Published research on privacy-preserving predictive analytics across distributed edge devices under the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry.
                </p>
                <p className="mt-2 text-xs text-[#ff2a2a] font-mono">Tech: Federated Learning, AI/ML, Predictive Analytics</p>
              </motion.div>

              <motion.div
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  Professional Credentials
                </span>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Completed industry-recognized certifications in AI, Cyber Security, Data Science, and IoT from <strong className="text-white">Cisco</strong>, <strong className="text-white">Accenture</strong>, <strong className="text-white">Infosys</strong>, and <strong className="text-white">HackerRank</strong>.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "PathShala AI",
      subtitle: "AI-Powered Career Guidance Platform",
      desc: "Developed an AI-based career guidance platform to help students and young professionals explore suitable career paths based on interests, skills, and market trends. Focused on solving the problem of generic career counseling.",
      tech: ["AI", "Python", "Web Development", "React.js"]
    },
    {
      title: "SubsidyChain",
      subtitle: "AI-Powered Government Subsidy Platform",
      desc: "Built an intelligent platform to simplify access to government subsidies through multilingual support, an AI chatbot, and a user-friendly dashboard for discovering and applying to schemes.",
      tech: ["AI", "Chatbot", "Web Development", "Python", "Tailwind"]
    },
    {
      title: "MERN Stack Development Projects",
      subtitle: "Full-Stack Application Development",
      desc: "Worked on responsive web applications using MongoDB, Express.js, React.js, and Node.js with backend integration, improving problem-solving and full-stack development skills.",
      tech: ["MERN Stack", "APIs", "Database Management", "Express.js"]
    }
  ];

  return (
    <section id="projects" className="relative overflow-hidden bg-black px-4 py-24 text-white md:py-32">
      <div className="mx-auto w-[min(1180px,100%)]">
        <div className="relative mb-16 max-w-3xl">
          <span className="rounded-full border border-[#ff2a2a]/30 bg-[#ff2a2a]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff2a2a]">
            My Portfolio
          </span>
          <h2 className="mt-8 text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.92] tracking-[-0.07em]">
            Selected Projects
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            A showcase of software engineering and artificial intelligence projects blending frontend design with analytical workflows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((proj, i) => (
            <motion.article
              key={i}
              className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-900/30 p-8 backdrop-blur-md transition-all hover:bg-zinc-900/50 hover:border-[#ff2a2a]/40"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff2a2a]/10 text-[#ff2a2a] group-hover:bg-[#ff2a2a] group-hover:text-black transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </div>

              <h3 className="text-3xl font-black tracking-tight text-white">{proj.title}</h3>
              <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#ff2a2a]">{proj.subtitle}</p>
              <p className="mt-5 text-sm leading-relaxed text-white/70">{proj.desc}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = Array.isArray(item.img) ? item.img : [item.img];
  const currentImg = images[activeImageIndex];

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (images.length > 1) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <motion.div
      className={`group relative rounded-[2rem] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.06)] border border-black/5 bg-white transition-all duration-300 ${item.rotation}`}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, boxShadow: "0 30px 90px rgba(0,0,0,0.15)" }}
    >
      <div
        onClick={handleNextImage}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-inner cursor-pointer select-none"
      >
        <img
          src={currentImg}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
            const countText = images.length > 1 ? ` (Photo ${activeImageIndex + 1}/${images.length})` : '';
            e.target.parentNode.innerHTML = `<div class="flex flex-col h-full w-full items-center justify-center font-mono text-xs text-black/30 bg-black/[0.03] uppercase tracking-wider text-center p-4"><span>${item.title} Photo${countText}</span><span class="text-[9px] mt-2 block text-black/20 font-sans normal-case">(Click to cycle)</span></div>`;
          }}
        />
        {/* Carousel indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-md z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  idx === activeImageIndex ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <h3 className="mt-6 text-xl font-black tracking-tight text-black">{item.title}</h3>
      <p className="mt-2 font-serif text-sm italic leading-relaxed text-black/60">{item.caption}</p>
    </motion.div>
  );
}

function MomentsGallery() {
  const galleryItems = [
    {
      img: [
        "/gallery/h1.jpeg",
        "/gallery/h2.jpeg",
        "/gallery/h3.jpeg"
      ],
      title: "Hackathons & Innovation",
      caption: "Collaborating on AI-driven solutions and rapid prototyping during local & national hackathons.",
      rotation: "rotate-[-3deg]"
    },
    {
      img: [
        "/gallery/gdg1.jpeg",
        "/gallery/gdg2.jpeg"
      ],
      title: "GDG & Tech Communities",
      caption: "Exploring developer communities, technical workshops, and sharing knowledge with peers.",
      rotation: "rotate-[2deg]"
    },
    {
      img: [
        "/gallery/award1.jpeg",
        "/gallery/award2.jpeg"
      ],
      title: "Honors & Achievements",
      caption: "Receiving professional certifications and awards for academic & programming excellence.",
      rotation: "rotate-[-1.5deg]"
    },
    {
      img: [
        "/gallery/team_project.jpg",
        "/gallery/team_project2.jpg",
        "/gallery/team_project3.jpg"
      ],
      title: "Team Collaborations",
      caption: "Designing systems and writing MERN stack applications with passionate developer teams.",
      rotation: "rotate-[3deg]"
    }
  ];

  return (
    <section id="gallery" className="relative overflow-hidden bg-white px-4 py-24 text-black md:py-32">
      <div className="mx-auto w-[min(1180px,100%)]">
        <div className="relative mb-16 max-w-3xl">
          <span className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff2a2a] shadow-xl shadow-black/5">
            Visual Journey
          </span>
          <h2 className="mt-8 text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.92] tracking-[-0.07em]">
            Moments & Milestones
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
            A glimpse into my experiences, community involvement, hackathons, and collaborative software engineering adventures. (Click on photos to cycle)
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="overflow-hidden bg-[#111111] px-4 py-20 text-[#f4f4f4] md:min-h-[50vh] md:py-24">
      <div className="mx-auto w-[min(1180px,100%)]">
        <motion.div
          className="grid gap-10 border-y border-white/10 py-12 font-mono text-xs uppercase tracking-[0.24em] text-white/62 md:grid-cols-3"
          initial={{ y: 34, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="space-y-3">
            <p>Full Stack Development</p>
            <p>Machine Learning & AI</p>
            <p>Database Management</p>
            <p>API Integration</p>
          </div>
          <div>
            <p className="text-white">Socials & Links</p>
            <a
              href="https://github.com/Ayushi1502"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 block text-white/72 hover:text-white"
            >
              GitHub Profile
            </a>
            <a
              href="https://linkedin.com/in/ayushi1502"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-2 block text-white/72 hover:text-white"
            >
              LinkedIn Profile
            </a>
            <a href="#projects" className="link-underline mt-2 block text-white/72 hover:text-white">
              View Work
            </a>
          </div>
          <div className="md:text-right">
            <p className="text-white">Available for Internships</p>
            <p className="mt-2 text-white/70">Mobile: +91-9752311470</p>
            <p className="mt-5">{currentYear}</p>
          </div>
        </motion.div>
        

        <div className="grid gap-8 border-t border-white/10 pt-9 text-sm text-white/60 md:grid-cols-3">
          <div>
            <a href="mailto:ayushiawasthi99073@gmail.com" className="link-underline text-white">Contact</a>
            <p className="mt-5">© {currentYear} Ayushi Awasthi. Built with React.</p>
          </div>
          <a href="mailto:ayushiawasthi99073@gmail.com" className="link-underline justify-self-start text-white md:justify-self-center">
            ayushiawasthi99073@gmail.com
          </a>
          <a href="#home" className="link-underline justify-self-start text-white md:justify-self-end">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FloatingStar({ className }) {
  return (
    <motion.span
      className={`absolute h-12 w-12 text-black ${className}`}
      animate={{ scale: [1, 1.16, 1], opacity: [0.55, 1, 0.55], rotate: [0, 12, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 0L28.6 18.9L48 24L28.6 29.1L24 48L19.4 29.1L0 24L19.4 18.9L24 0Z" />
      </svg>
    </motion.span>
  );
}

function SketchArrow() {
  return (
    <svg className="absolute -right-16 top-14 hidden h-32 w-40 rotate-12 md:block" viewBox="0 0 180 120" fill="none" aria-hidden="true">
      <path d="M12 92C54 30 113 18 155 48" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
      <path d="M143 29L158 50L130 54" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <MomentsGallery />
      </main>
      <Footer />
    </>
  );
}