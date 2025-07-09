import Fuse from "fuse.js";

const commands = ["help", "about", "skills", "projects", "resume", "clear", "certificate"];

const fuse = new Fuse(commands, {
  includeScore: true,
  threshold: 0.4, // Lower = stricter match
});

export default function CommandRouter(cmd) {
  const input = cmd?.trim().toLowerCase();
  if (!input) return "";

  switch (input) {
    case "help":
      return `Available commands:
- about
- skills
- projects
- certificate
- resume
- clear`;

    case "about":
      return `Hey, I'm Sree Soorya Kumar S C G – an engineer focused on web/app development to solve real-world problems.`;

    case "skills":
      return `Frontend: React, Tailwind\nBackend: Node.js, Express\nDatabase: MongoDB`;

    case "projects":
      return (
        <div className="space-y-1">
          <div>
            <span className="text-yellow-400">IronMind</span> –{" "}
            <a
              href="https://github.com/scgssk/IronMind-Web"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300 transition duration-150"
            >
              GitHub
            </a>
          </div>
          <div>
            <span className="text-yellow-400">WebLite</span> –{" "}
            <a
              href="https://github.com/scgssk/WebLite-DSL"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300 transition duration-150"
            >
              GitHub
            </a>
          </div>
          <div>
            <span className="text-yellow-400">Sahayak Ai - Mobile App</span> –{" "}
            <a
              href="https://github.com/scgssk/Sahayak-Ai"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300 transition duration-150"
            >
              GitHub
            </a>
          </div>
          <div>
            <span className="text-yellow-400">WebLite - Tryit</span> –{" "}
            <a
              href="https://weblite-tryit.vercel.app/"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300 transition duration-150"
            >
              Live Demo
            </a>
          </div>
        </div>
      );

case "certificate":
  window.open("https://drive.google.com/drive/folders/12wxQQv_VwwaFh0wGA06EJ5ZTtjq9Gc1U?usp=sharing", "_blank");
  return `Opening certificates in new tab...`;


    case "resume":
      window.open("/resume.pdf", "_blank");
      return (
        <span>
          Opening resume... or{" "}
          <a href="/resume.pdf" className="text-cyan-400 underline">
            click here
          </a>
          .
        </span>
      );

    case "clear":
      window.location.reload();
      return "";
  }

  // Fuzzy Suggestion using Fuse.js
  const results = fuse.search(input);
  const suggestion = results.length > 0 ? results[0].item : null;
  const hint = suggestion ? `\nDid you mean '${suggestion}'?` : "";

  return `Unknown command: ${cmd}${hint}\nType 'help' to see available commands.`;
}
