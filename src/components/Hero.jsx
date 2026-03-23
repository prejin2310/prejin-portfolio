import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";

const jumpTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const sectionLinks = [
  { label: "Projects", target: "projects" },
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
];

export default function Hero() {
  const { profile } = useData();
  const contact = profile?.contact ?? {};
  const location = contact.location || "Kerala, India";
  const socials = [
    contact.githubVisible && contact.githubUrl ? { label: contact.github || "GitHub", href: contact.githubUrl } : null,
    contact.linkedinVisible && contact.linkedinUrl ? { label: contact.linkedin || "LinkedIn", href: contact.linkedinUrl } : null,
    contact.instagramVisible && contact.instagramUrl ? { label: contact.instagram || "Instagram", href: contact.instagramUrl } : null,
  ].filter(Boolean);

  return (
    <section className="hero-shell">
      <div className="hero-bg hero-bg-one" aria-hidden="true" />

      <motion.div
        className="hero-frame"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero-salutation">Hello, I am</p>
        <h1 className="hero-title">{profile?.name || "Portfolio"}</h1>
        <p className="hero-role">{profile?.title || "Software Engineer"}</p>
        <p className="hero-location">{location}</p>

        <p className="hero-quick">Quick Access</p>
        <div className="hero-links">
          {sectionLinks.map((item) => (
            <button key={item.target} type="button" onClick={() => jumpTo(item.target)}>
              {item.label}
            </button>
          ))}
        </div>

        {socials.length > 0 && (
          <div className="hero-socials">
            {socials.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </motion.div>

      <style>{`
        .hero-shell {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 6.5rem 1.2rem 2.5rem;
          overflow: hidden;
          text-align: center;
        }

        .hero-bg {
          position: absolute;
          pointer-events: none;
        }

        .hero-bg-one {
          width: min(86vw, 58rem);
          aspect-ratio: 1;
          border-radius: 999px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(circle at center, rgba(0, 207, 173, 0.24), rgba(0, 207, 173, 0.06) 44%, transparent 74%),
            radial-gradient(circle at 26% 22%, rgba(255, 197, 61, 0.18), transparent 50%);
          filter: blur(2px);
        }

        .hero-frame {
          position: relative;
          z-index: 1;
          width: min(760px, 100%);
          padding: 2.3rem 1.15rem;
        }

        .hero-salutation {
          margin: 0;
          color: rgba(255, 255, 255, 0.62);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .hero-role {
          margin: 1rem 0 0;
          color: rgba(255, 255, 255, 0.72);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.65rem;
        }

        .hero-title {
          margin: 0.75rem 0 0;
          font-family: "NType82", "Inter", sans-serif;
          font-size: clamp(2.55rem, 10vw, 6.1rem);
          font-weight: 500;
          line-height: 0.9;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.98);
        }

        .hero-location {
          margin: 0.7rem 0 0;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-quick {
          margin: 1.45rem 0 0;
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .hero-links {
          margin-top: 0.6rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem 0;
        }

        .hero-links button {
          min-height: auto;
          padding: 0;
          border: 0;
          background: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .hero-links button + button::before {
          content: "/";
          margin: 0 0.85rem;
          color: rgba(255, 255, 255, 0.28);
        }

        .hero-links button:hover {
          color: rgba(255, 255, 255, 0.98);
        }

        .hero-socials {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .hero-socials a {
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .hero-socials a:hover {
          color: rgba(255, 255, 255, 1);
        }

        @media (max-width: 640px) {
          .hero-shell {
            padding: 5.8rem 1rem 1.2rem;
          }

          .hero-frame {
            padding: 1.6rem 0.15rem;
          }

          .hero-links {
            gap: 0.45rem;
          }

          .hero-links button + button::before {
            margin: 0 0.55rem;
          }
        }
      `}</style>
    </section>
  );
}
