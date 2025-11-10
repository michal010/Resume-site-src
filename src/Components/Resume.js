import React, { Component } from 'react';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedSkills: {}, // Track which sub-skills are expanded
      initializedExpanded: false // Track if we've initialized from props
    };
  }

  // Get translation: t('resume', 'education') → "Edukacja" or "Education"
  t(section, key) {
    const lang = this.props.language || 'pl';
    return this.props.translations?.[section]?.[key] || key;
  }

  // Get bilingual text: {pl: "...", en: "..."} → correct lang version
  getText(obj) {
    const lang = this.props.language || 'pl';
    if (typeof obj === 'object' && obj !== null) {
      return obj[lang] || obj['pl'] || Object.values(obj)[0] || '';
    }
    return obj || '';
  }

  componentDidUpdate(prevProps) {
    // Initialize expanded state from resumeData when data becomes available
    if (!this.state.initializedExpanded && this.props.data?.skills) {
      const initialExpanded = {};
      this.props.data.skills.forEach(skill => {
        const skillName = this.getText(skill.name);
        if (skill.subSkills) {
          skill.subSkills.forEach(sub => {
            if (sub.expanded === true) {
              const key = `${skillName}-${this.getText(sub.name)}`;
              initialExpanded[key] = true;
            }
          });
        }
      });
      this.setState({ 
        expandedSkills: initialExpanded,
        initializedExpanded: true 
      });
    }
  }

  toggleSubSkill = (skillName, subSkillName) => {
    const key = `${skillName}-${subSkillName}`;
    this.setState(prevState => ({
      expandedSkills: {
        ...prevState.expandedSkills,
        [key]: !prevState.expandedSkills[key]
      }
    }));
  }

  render() {
    if (!this.props.data) return null;

    const education = this.props.data.education?.map((edu) => (
      <div key={edu.school}>
        <h3>{edu.school}</h3>
        <p className="info">
          {this.getText(edu.degree)} <span>&bull;</span>{' '}
          <em className="date">
            {this.t('resume', 'graduated') || 'Ukończono'}: {edu.graduated}
          </em>
        </p>
        <p>{this.getText(edu.description)}</p>
      </div>
    )) || [];

    const work = this.props.data.work?.map((job) => (
      <div key={job.company}>
        <h3>{job.company}</h3>
        <p className="info">
          {job.title} <span>&bull;</span>{' '}
          <em className="date">
            {this.t('resume', 'years') || 'Lata'}: {job.years}
          </em>
        </p>
        <p>{this.getText(job.description)}</p>
      </div>
    )) || [];

const skills = this.props.data.skills?.map((skill) => {
  const name = this.getText(skill.name);
  const icon = skill.icon || 'fa fa-code';
  const description = this.getText(skill.description);
  const lines = description ? description.split('\n').filter(l => l.trim()) : [];

  return (
    <div key={name} className="skill-card">
      <div className="skill-header">
        <i className={icon}></i>
        <h3>{name}</h3>
      </div>
      <div className="skill-content">
        {lines.map((line, i) => (
          line.trim().startsWith('-') || line.trim().startsWith('•') ? 
            <li key={i}>{line.replace(/^[-•]\s*/, '')}</li> : 
            <p key={i}>{line}</p>
        ))}
      </div>
      
      {/* Main bar: Show only if no sub-skills AND level is defined */}
      {!skill.subSkills && skill.level && skill.level.trim() !== '' && (
        <div className="skill-level">
          <div className="skill-level-bar" style={{ width: skill.level }}></div>
        </div>
      )}
      
      {/* Sub-skills: Always show toggle button */}
      {skill.subSkills && skill.subSkills.length > 0 && (
        <div className="sub-skills">
          {skill.subSkills.map((sub, i) => {
            const key = `${name}-${this.getText(sub.name)}`;
            const isExpanded = this.state.expandedSkills[key];
            const hasDescription = this.getText(sub.description);
            
            return (
              <div key={i} className="sub-skill">
                <div className="sub-skill-header">
                  <span className="sub-skill-label">{this.getText(sub.name)}</span>
                  
                  {/* Skill level bar or empty space */}
                  {sub.level && sub.level.trim() !== '' ? (
                    <div className="sub-skill-level">
                      <div className="sub-skill-level-bar" style={{ width: sub.level }}></div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  
                  {/* Percent display or empty space */}
                  {sub.level && sub.level.trim() !== '' ? (
                    <span className="sub-skill-percent">{sub.level}</span>
                  ) : (
                    <span></span>
                  )}
                  
                  {/* Always show toggle button if description exists */}
                  {hasDescription && (
                    <button 
                      className={`sub-skill-toggle ${isExpanded ? 'expanded' : ''}`} 
                      onClick={() => this.toggleSubSkill(name, this.getText(sub.name))} 
                      aria-label="Toggle details"
                    >
                      <i className="fa fa-chevron-down"></i>
                    </button>
                  )}
                </div>
                
                {/* Show description when expanded */}
                {hasDescription && isExpanded && (
                  <div className="sub-skill-details">
                    <p>{hasDescription}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}) || [];

    return (
      <>
        <style>{`
          .skill-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border-left: 4px solid #11ABB0;
          }
          .skill-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.12);
          }
          .skill-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
          }
          .skill-header i {
            font-size: 28px;
            color: #11ABB0;
            min-width: 35px;
          }
          .skill-header h3 {
            font: 22px/28px 'roboto-bold', sans-serif;
            color: #313131;
            margin: 0;
          }
          .skill-content {
            color: #6E7881;
            line-height: 1.8;
          }
          .skill-content p {
            margin-bottom: 12px;
            font: 15px/24px 'opensans-regular', sans-serif;
          }
          .skill-content li {
            margin-bottom: 8px;
            margin-left: 20px;
            padding-left: 10px;
            position: relative;
            list-style: none;
          }
          .skill-content li:before {
            content: '>';
            position: absolute;
            left: -15px;
            color: #11ABB0;
            font-weight: bold;
          }
          .skill-level {
            margin-top: 15px;
            height: 6px;
            background: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
          }
          .skill-level-bar {
            height: 100%;
            background: linear-gradient(90deg, #11ABB0 0%, #0d8a8e 100%);
            border-radius: 3px;
            transition: width 0.5s ease;
          }

          .sub-skills {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .sub-skill {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .sub-skill-header {
            display: grid;
            grid-template-columns: 120px 1fr 40px 30px;
            gap: 10px;
            align-items: center;
            font-size: 14px;
            color: #313131;
          }
          .sub-skill-label {
            font-family: 'opensans-semibold', sans-serif;
          }
          .sub-skill-level {
            height: 6px;
            background: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
          }
          .sub-skill-level-bar {
            height: 100%;
            background: linear-gradient(90deg, #11ABB0 0%, #0d8a8e 100%);
            border-radius: 3px;
            transition: width 0.5s ease;
          }
          .sub-skill-percent {
            text-align: right;
            font-size: 13px;
            font-weight: bold;
            color: #313131;
          }
          .sub-skill-toggle {
            width: 30px;
            height: 30px;
            border: none;
            background: transparent;
            color: #11ABB0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border-radius: 4px;
          }
          .sub-skill-toggle:hover {
            background: rgba(17, 171, 176, 0.1);
          }
          .sub-skill-toggle i {
            transition: transform 0.3s ease;
            font-size: 14px;
          }
          .sub-skill-toggle.expanded i {
            transform: rotate(180deg);
          }
          .sub-skill-details {
            padding: 12px 15px;
            background: #fff;
            border-radius: 6px;
            margin-left: 130px;
            border-left: 3px solid #11ABB0;
            animation: slideDown 0.3s ease;
          }
          .sub-skill-details p {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: #6E7881;
          }
          .skill-header i.unity-logo {
              background-image: url('https://www.citypng.com/public/uploads/preview/unity-game-engine-logo-icon-png-701751694709269rfgrsxrghr.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 35px;
            height: 35px;
            display: block;
          }

          .skill-header i.unity-logo::before {
            content: none;
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .skill-card { padding: 20px; }
            .skill-header h3 { font-size: 18px; }
            .skill-header i { font-size: 24px; }
            .sub-skill-header {
              grid-template-columns: 100px 1fr 35px 28px;
            }
            .sub-skill-label { font-size: 13px; }
            .sub-skill-percent { font-size: 12px; }
            .sub-skill-toggle { width: 28px; height: 28px; }
            .sub-skill-details { margin-left: 110px; }
          }
        `}</style>

        <section id="resume">
          {/* EDUCATION */}
          <div className="row education">
            <div className="three columns header-col">
              <h1><span>{this.t('resume', 'education')}</span></h1>
            </div>
            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>

          {/* WORK */}
          <div className="row work">
            <div className="three columns header-col">
              <h1><span>{this.t('resume', 'work')}</span></h1>
            </div>
            <div className="nine columns main-col">{work}</div>
          </div>

          {/* SKILLS */}
          <div className="row skill">
            <div className="three columns header-col">
              <h1><span>{this.t('resume', 'skills')}</span></h1>
            </div>
            <div className="nine columns main-col">{skills}</div>
          </div>
        </section>
      </>
    );
  }
}

export default Resume;