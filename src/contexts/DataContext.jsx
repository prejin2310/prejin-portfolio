import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAll, getDocument } from "../lib/db";
import { projects as staticProjects } from "../data/projectsData";
import { certificates as staticCertificates } from "../data/certificatesData";
import { experience as staticExperience } from "../data/experienceData";
import { skills as staticSkills } from "../data/skillsData";
import { profile as staticProfile } from "../data/profileData";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [state, setState] = useState({
    projects: staticProjects,
    certificates: staticCertificates,
    experience: staticExperience,
    skills: staticSkills,
    profile: staticProfile,
    loaded: false,
  });

  const refresh = useCallback(async () => {
    try {
      const [projects, certificates, experience, skills, profile] = await Promise.all([
        getAll("projects"),
        getAll("certificates"),
        getAll("experience"),
        getAll("skills"),
        getDocument("settings", "profile"),
      ]);
      setState({
        projects:     projects.length     ? projects     : staticProjects,
        certificates: certificates.length ? certificates : staticCertificates,
        experience:   experience.length   ? experience   : staticExperience,
        skills:       skills.length       ? skills       : staticSkills,
        profile:      profile             ?? staticProfile,
        loaded: true,
      });
    } catch {
      setState((prev) => ({ ...prev, loaded: true }));
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <DataContext.Provider value={{ ...state, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
