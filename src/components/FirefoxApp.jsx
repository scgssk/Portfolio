import { useState, useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBrain, FaRocket } from "react-icons/fa";
import emailjs from '@emailjs/browser';

export default function FirefoxApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sectionRefs = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      PUBLIC_KEY
    )
    .then(() => {
      alert("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("❌ Failed to send message. Try again later.");
    });
};



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full min-h-screen p-6 pb-30 overflow-y-auto text-green-300 space-y-10 bg-black bg-gradient-to-b from-[#0f0f0f] via-black to-[#0f0f0f]">
      {/* Address Bar */}
      <div className="w-full max-w-full mx-auto">
        <div className="flex items-center bg-gray-900/80 border border-green-500/30 rounded-2xl px-4 py-2 shadow-xl backdrop-blur-md">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-green-300 text-sm font-mono select-text">
            https://scgssk.dev
          </span>
        </div>
      </div>

      {/* HERO */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="opacity-0 transition-all duration-1000 ease-out mb-10"
      >
        <h1 className="text-3xl sm:text-3xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-lime-300 to-green-500 bg-clip-text text-transparent">
          Hey, I’m S C G Sree Soorya Kumar
        </h1>
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=scgssk"
          alt="AI Avatar"
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg bg-white/10 backdrop-blur-sm border border-green-500/40 hover:scale-105 transition duration-300"
        />
        <p className="text-center text-lg max-w-2xl mx-auto mb-6 opacity-80">
          Full-stack Engineer | Creative Coder | Vision-driven Builder
        </p>
        <div className="text-center">
          <button className="px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300 animate-pulse">
            🚀 Hire Me
          </button>
        </div>
      </section>

      {/* ABOUT */}
      {section(
        "About Me",
        1,
        <p className="text-center max-w-2xl mx-auto">
          Motivated and innovation-driven engineering student with hands-on experience in full-stack development using the MERN 
stack. Skilled in building responsive web applications and solving real-world problems through intuitive UI/UX and scalable backend 
systems. Proven ability to lead technical teams, mentor peers, and deliver production-ready solutions under tight deadlines. Actively 
working on productivity tools, smart systems, and AI-powered applications. Ready to bring agility, accountability, and forward
thinking development practices to your engineering team. 
        </p>
      )}

      {/* SKILLS */}
      {section(
        "Skills",
        2,
        <ul className="list-disc list-inside max-w-2xl mx-auto space-y-1">
          <li>Languages & Tools: Java, Python, JavaScript, HTML, CSS, Git, GitHub</li>
          <li>Frameworks & Libraries: React, Node.js, Express.js, TailwindCSS, NumPy, Pandas</li>
          <li>Databases: MongoDB, SQL </li>
          <li>Dev Tools: Git, Docker, Vercel, Figma</li>
          <li>Other: Scrum, CCNA, Agile, YAML </li>
        </ul>
      )}

      {/* EXPERIENCE */}
      {section("Experience", 3, (
        <div className="text-white">
          <VerticalTimeline lineColor="#7bf1a8">
            <VerticalTimelineElement
              
              icon={<FaBrain size={20} />}
              iconStyle={{ background: "#7bf1a8", color: "#000" }}
              contentStyle={{ background: "#000", color: "#7bf1a8", border: "1px solid #7bf1a8" }}
              contentArrowStyle={{ borderRight: "7px solid #7bf1a8" }}
            >
              <h3 className="text-lg font-bold">IronMind – Lead Developer</h3>
              <p>
                2025-Present<br/><br/>
                Architected a productivity OS with smart reminders, AI-driven insights,
                and lock-down focus systems.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              
              icon={<FaRocket size={20} />}
              iconStyle={{ background: "#7bf1a8", color: "#000" }}
              contentStyle={{ background: "#000", color: "#7bf1a8", border: "1px solid #7bf1a8" }}
              contentArrowStyle={{ borderRight: "7px solid #7bf1a8" }}
            >
              <h3 className="text-lg font-bold">WebLite – Founder & Dev</h3>
              <p>
                2024<br/><br/>
                Designed a DSL-powered HTML/CSS playground with a compiler-like
                experience for learning web dev faster.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      ))}

      {/* PROJECTS */}
      {section(
        "Projects",
        4,
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {projectCard("IronMind", "https://github.com/scgssk/IronMind-Web")}
          {projectCard("WebLite", "https://github.com/scgssk/WebLite-DSL")}
          {projectCard("Sahayak AI", "https://github.com/scgssk/Sahayak-Ai")}
          {projectCard("Multiplayer Quiz", "https://github.com/scgssk/QuizGame")}
          
        </div>
      )}

      {/* CERTIFICATIONS */}
      {section(
        "Certifications",
        5,
        <div className="max-w-xl mx-auto bg-white/5 border border-green-500/30 backdrop-blur-sm p-6 rounded-lg shadow-md text-center">
          <p className="text-green-200 text-lg mb-3">
            Verified Achievements & Skills
          </p>
          <a
            href="https://drive.google.com/drive/folders/12wxQQv_VwwaFh0wGA06EJ5ZTtjq9Gc1U?usp=sharing"
            target="_blank"
            className="inline-block px-5 py-2 bg-green-500 text-black font-semibold rounded-full hover:scale-105 transition"
          >
            🎓 View Certificates
          </a>
        </div>
      )}

      {/* RESUME */}
      {section(
        "Resume",
        6,
        <div className="max-w-xl mx-auto bg-white/5 border border-green-500/30 backdrop-blur-sm p-6 rounded-lg shadow-md text-center">
          <p className="text-green-200 text-lg mb-3">
            Download a copy of my latest resume
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-block px-5 py-2 bg-green-500 text-black font-semibold rounded-full hover:scale-105 transition"
          >
            📄 Download Resume
          </a>
        </div>
      )}

      {/* CONTACT */}
      {section(
        "Contact Me",
        7,
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-3 text-white"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow hover:scale-105 transition duration-300"
          >
            Send Message ✉️
          </button>
        </form>
      )}
    </div>
  );

  function section(title, index, children) {
    return (
      <section
        ref={(el) => (sectionRefs.current[index] = el)}
        className="opacity-0 translate-y-12 transition-all duration-1000 ease-out"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-6"
          style={styleNeon()}
        >
          {title}
        </h2>
        {children}
      </section>
    );
  }

  function projectCard(name, link) {
    return (
      <div className="backdrop-blur-sm bg-white/5 border border-green-500/40 p-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-transform transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-yellow-300 mb-1">{name}</h3>
        <a
          href={link}
          target="_blank"
          className="text-cyan-300 underline hover:text-cyan-100 transition"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  function styleNeon() {
    return {
      textShadow: "0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0",
    };
  }
}
