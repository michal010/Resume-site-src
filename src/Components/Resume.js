import React, { Component } from 'react';

class Resume extends Component {
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
              line.trim().startsWith('-') || line.trim().startsWith('•')
                ? <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                : <p key={i}>{line}</p>
            ))}
          </div>

          {/* Main bar */}
          {!skill.subSkills && skill.level && (
            <div className="skill-level">
              <div className="skill-level-bar" style={{ width: skill.level }}></div>
            </div>
          )}

          {/* Sub-skills */}
          {skill.subSkills && skill.subSkills.length > 0 && (
            <div className="sub-skills">
              {skill.subSkills.map((sub, i) => (
                <div key={i} className="sub-skill">
                  <span className="sub-skill-label">{this.getText(sub.name)}</span>
                  <div className="sub-skill-level">
                    <div
                      className="sub-skill-level-bar"
                      style={{ width: sub.level }}
                    ></div>
                  </div>
                  <span className="sub-skill-percent">{sub.level}</span>
                </div>
              ))}
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
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: #313131;
          }
          .sub-skill-label {
            flex: 0 0 120px;
            font-family: 'opensans-semibold', sans-serif;
          }
          .sub-skill-level {
            flex: 1;
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
            flex: 0 0 40px;
            text-align: right;
            font-size: 13px;
            font-weight: bold;
            color: #313131;
          }

          @media (max-width: 768px) {
            .skill-card { padding: 20px; }
            .skill-header h3 { font-size: 18px; }
            .skill-header i { font-size: 24px; }
            .sub-skill-label { flex: 0 0 100px; font-size: 13px; }
            .sub-skill-percent { flex: 0 0 35px; font-size: 12px; }
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