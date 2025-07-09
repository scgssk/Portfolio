import { useState, useEffect, useRef } from "react";

export default function FirefoxApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sectionRefs = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message sent:", form);
    alert("Message sent! Thank you 🙏");
    setForm({ name: "", email: "", message: "" });
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
    <div className="w-full h-full p-6 pb-30 overflow-y-auto text-green-300 space-y-16 bg-black bg-gradient-to-b from-[#0f0f0f] via-black to-[#0f0f0f]">
      {/* HERO */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="opacity-0 translate-y-12 transition-all duration-1000 ease-out"
      >
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-lime-300 to-green-500 bg-clip-text text-transparent animate-pulse"
        >
          Hey, I’m sk
        </h1>
        <p className="text-center text-lg max-w-xl mx-auto mb-6 opacity-80">
          Full-stack Engineer | Creative Coder | Vision-driven Builder
        </p>
        <div className="text-center">
          <button className="px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-green-400 transition duration-300 animate-pulse">
            🚀 Hire Me
          </button>
        </div>
      </section>

      {/* ABOUT */}
      {section("About Me", 1, (
        <p className="text-center max-w-3xl mx-auto">
          I thrive at the intersection of code and creativity. I build intuitive UIs,
          engineer resilient backends, and architect systems that solve real-world problems.
        </p>
      ))}

      {/* SKILLS */}
      {section("Skills", 2, (
        <ul className="list-disc list-inside max-w-md mx-auto space-y-1">
          <li>Frontend: React, TailwindCSS, Next.js</li>
          <li>Backend: Node.js, Express</li>
          <li>Databases: MongoDB, Firebase</li>
          <li>Dev Tools: Git, Docker, Vercel, Figma</li>
        </ul>
      ))}

      {/* PROJECTS */}
      {section("Projects", 3, (
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {projectCard("IronMind", "https://github.com/scgssk/IronMind-Web")}
          {projectCard("WebLite", "https://github.com/scgssk/WebLite-DSL")}
          {projectCard("Sahayak AI", "https://github.com/scgssk/Sahayak-Ai")}
        </div>
      ))}

      {/* CERTIFICATIONS */}
      {section("Certifications", 4, (
        <p className="text-center">
          <a
            href="https://drive.google.com/drive/folders/12wxQQv_VwwaFh0wGA06EJ5ZTtjq9Gc1U?usp=sharing"
            target="_blank"
            className="underline text-cyan-400 hover:text-cyan-200 transition"
          >
            🎓 View Certificates
          </a>
        </p>
      ))}

      {/* RESUME */}
      {section("Resume", 5, (
        <p className="text-center">
          <a
            href="/resume.pdf"
            target="_blank"
            className="underline text-cyan-400 hover:text-cyan-200 transition"
          >
            📄 Download Resume
          </a>
        </p>
      ))}

      {/* CONTACT */}
      {section("Contact Me", 6, (
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
      ))}
    </div>
  );

  // Section builder
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

  // Project card builder
  function projectCard(name, link) {
    return (
      <div className="bg-gray-800 border border-green-400 p-4 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2">{name}</h3>
        <a
          href={link}
          target="_blank"
          className="text-cyan-400 underline hover:text-cyan-200"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  // Neon title styling
  function styleNeon() {
    return {
      textShadow: "0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0",
    };
  }
}
