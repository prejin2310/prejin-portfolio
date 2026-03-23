import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useData } from "../contexts/DataContext";

const Section = ({ title, children }) => (
  <section className="ats-section">
    <h2>{title}</h2>
    {children}
  </section>
);

export default function Resume() {
  const { profile, experience, skills, projects } = useData();
  const featuredProjects = (projects ?? []).slice(0, 3);
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!resumeRef.current || isDownloading) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const widthFromImage = pageWidth;
      const heightFromImage = (canvas.height * widthFromImage) / canvas.width;

      let renderWidth = widthFromImage;
      let renderHeight = heightFromImage;
      let x = 0;
      let y = 0;

      if (heightFromImage > pageHeight) {
        renderHeight = pageHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
        x = (pageWidth - renderWidth) / 2;
      } else {
        y = (pageHeight - heightFromImage) / 2;
      }

      pdf.addImage(imageData, "JPEG", x, y, renderWidth, renderHeight, undefined, "FAST");
      const fileName = `${(profile?.name || "resume").replace(/\s+/g, "-").toLowerCase()}-resume.pdf`;
      pdf.save(fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resume-page-wrap">
      <div className="resume-toolbar no-print">
        <button type="button" onClick={handleDownloadPdf} disabled={isDownloading}>
          {isDownloading ? "Preparing PDF..." : "Download PDF Resume"}
        </button>
      </div>

      <div ref={resumeRef} className="resume-sheet">
        <header className="ats-header">
          <div>
            <h1>{profile.name}</h1>
            <p className="ats-role">{profile.title}</p>
          </div>
          <div className="ats-contact">
            <span>{profile.contact.email}</span>
            <span>{profile.contact.location}</span>
            <span>{profile.contact.linkedin}</span>
            <span>{profile.contact.github}</span>
          </div>
        </header>

        <Section title="Professional Summary">
          <p className="ats-copy">{profile.summary}</p>
        </Section>

        <Section title="Core Skills">
          <div className="ats-skills">
            {(skills ?? []).map((group) => (
              <div key={group.category} className="ats-skill-row">
                <strong>{group.category}</strong>
                <span>{group.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Professional Experience">
          <div className="ats-block-list">
            {(experience ?? []).map((item) => (
              <article key={item.id ?? item.role} className="ats-block">
                <div className="ats-block-top">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}{item.type ? ` | ${item.type}` : ""}</p>
                  </div>
                  <div className="ats-block-meta">
                    <span>{item.location}</span>
                    <span>{item.period}</span>
                  </div>
                </div>
                <ul>
                  {(item.responsibilities ?? []).map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                {item.tech?.length > 0 && (
                  <p className="ats-inline-meta">
                    <strong>Tech Stack:</strong> {item.tech.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section title="Selected Projects">
          <div className="ats-block-list">
            {featuredProjects.map((project) => (
              <article key={project.id ?? project.title} className="ats-block">
                <div className="ats-block-top">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.category}{project.year ? ` | ${project.year}` : ""}</p>
                  </div>
                  <div className="ats-block-meta">
                    <span>{project.status}</span>
                  </div>
                </div>
                <p className="ats-copy compact">{project.description || project.tagline}</p>
                {project.highlights?.length > 0 && (
                  <ul>
                    {project.highlights.slice(0, 3).map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                )}
                {project.technologies?.length > 0 && (
                  <p className="ats-inline-meta">
                    <strong>Tech Stack:</strong> {project.technologies.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>
      </div>

      <style>{`
        .resume-page-wrap {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 7.5rem 1.5rem 4rem;
        }
        .resume-toolbar {
          max-width: 960px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
        }
        .resume-toolbar button {
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.94);
          color: #0a0a0a;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .resume-toolbar button:disabled {
          cursor: wait;
          opacity: 0.75;
        }
        .resume-sheet {
          max-width: 960px;
          margin: 0 auto;
          background: #ffffff;
          color: #121212;
          border-radius: 20px;
          padding: 42px 44px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.24);
        }
        .ats-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 18px;
          border-bottom: 2px solid #161616;
        }
        .ats-header h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 32px;
          line-height: 1.1;
          letter-spacing: 0;
          color: #111111;
        }
        .ats-role {
          margin: 8px 0 0;
          font-size: 14px;
          color: #444444;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .ats-contact {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: right;
          font-size: 13px;
          color: #333333;
          line-height: 1.5;
        }
        .ats-section {
          padding-top: 22px;
        }
        .ats-section h2 {
          margin: 0 0 10px;
          font-family: Inter, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #111111;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ats-copy {
          margin: 0;
          font-size: 14px;
          line-height: 1.75;
          color: #202020;
        }
        .ats-copy.compact {
          margin-bottom: 10px;
        }
        .ats-skills {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ats-skill-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 16px;
          font-size: 14px;
          line-height: 1.6;
        }
        .ats-skill-row strong {
          color: #111111;
        }
        .ats-block-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ats-block {
          padding-bottom: 16px;
          border-bottom: 1px solid #d9d9d9;
        }
        .ats-block:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        .ats-block-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
        }
        .ats-block-top h3 {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #111111;
          letter-spacing: 0;
        }
        .ats-block-top p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #444444;
        }
        .ats-block-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          font-size: 12px;
          color: #555555;
          text-align: right;
          white-space: nowrap;
        }
        .ats-block ul {
          margin: 0 0 10px 18px;
          padding: 0;
        }
        .ats-block li {
          margin-bottom: 6px;
          font-size: 14px;
          line-height: 1.7;
          color: #202020;
        }
        .ats-inline-meta {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
          color: #303030;
        }
        @media (max-width: 720px) {
          .resume-page-wrap {
            padding: 6.5rem 1rem 2.5rem;
          }
          .resume-toolbar {
            flex-direction: column;
          }
          .resume-sheet {
            padding: 24px 18px;
            border-radius: 14px;
          }
          .ats-header,
          .ats-block-top {
            flex-direction: column;
          }
          .ats-contact,
          .ats-block-meta {
            text-align: left;
            align-items: flex-start;
          }
          .ats-skill-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
        @media print {
          body {
            background: #ffffff !important;
          }
          .no-print,
          nav,
          footer {
            display: none !important;
          }
          .resume-page-wrap {
            padding: 0 !important;
            background: #ffffff !important;
          }
          .resume-sheet {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .ats-section {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
