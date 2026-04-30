import React, { useEffect, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';
import { GiWireframeGlobe,GiArchiveResearch } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaReact,FaRobot,FaConfluence,FaFigma, FaJira,FaNodeJs, FaAws, FaDocker, FaGitAlt, FaJava,FaHtml5,FaAngular } from 'react-icons/fa';
import { SiRubyonrails,SiMicrostrategy,SiRoadmapdotsh,SiN8N, SiTypescript, SiPostgresql, SiMysql, SiKubernetes, SiGooglecloud, SiSpringboot, SiPhp, SiNetlify, SiHeroku, SiHtml5, SiCss3, SiRabbitmq, SiImessage,SiJavascript } from 'react-icons/si';
import { Skill } from '../types';
import { FcStatistics } from "react-icons/fc";
import { DiCodepen } from "react-icons/di";


const iconMap: { [key: string]: JSX.Element } = {
  SiRubyonrails: <SiRubyonrails />,
  FaNodeJs: <FaNodeJs />,
  SiSpringboot: <SiSpringboot />,
  FaJava: <FaJava />,
  SiPhp: <SiPhp />,
  FaReact: <FaReact />,
  SiTypescript: <SiTypescript />,
  FaAws: <FaAws />,
  FaDocker: <FaDocker />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiKubernetes: <SiKubernetes />,
  SiGooglecloud: <SiGooglecloud />,
  SiHeroku: <SiHeroku />,
  SiNetlify: <SiNetlify />,
  SiRabbitmq: <SiRabbitmq />,
  SiImessage: <SiImessage />,
  GiWireframeGlobe: <GiWireframeGlobe />,
  GiArchiveResearch: <GiArchiveResearch />,
  FaPeopleGroup: <FaPeopleGroup />,
  FcStatistics: <FcStatistics />,
  DiCodepen: <DiCodepen />,
  FaHtml5: <FaHtml5 />,
  FaAngular: <FaAngular />,
  SiJavascript: <SiJavascript />,
  FaJira: <FaJira />,
  FaFigma: <FaFigma />,
  SiN8N: <SiN8N />,
  FaConfluence: <FaConfluence />,
  SiRoadmapdotsh: <SiRoadmapdotsh />,
  SiMicrostrategy: <SiMicrostrategy />,
  FaRobot: <FaRobot />,

};


const Skills: React.FC = () => {

  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data);
    }

    fetchSkills()
  }, []);

  if (skillsData.length === 0) return <div>Loading...</div>;

  const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});


  return (
    <div className="skills-container">
      {Object.keys(skillsByCategory).map((category, index) => (
        <div key={index} className="skill-category">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {skillsByCategory[category].map((skill: any, idx: number) => (
              <div key={idx} className="skill-card">
                <div className="icon">{iconMap[skill.icon] || <FaReact />}</div>
                <h3 className="skill-name">
                  {skill.name.split('').map((letter: any, i: number) => (
                    <span key={i} className="letter" style={{ animationDelay: `${i * 0.05}s` }}>
                      {letter}
                    </span>
                  ))}
                </h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
