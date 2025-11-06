import React, { Component } from 'react';

class Resume extends Component {
  render() {
    const t = this.props.translations?.resume || {};
    const lang = this.props.language || 'pl';

    if(this.props.data){
      var education = this.props.data.education.map(function(education){
        const degree = typeof education.degree === 'object' 
          ? education.degree[lang] 
          : education.degree;
        const description = typeof education.description === 'object' 
          ? education.description[lang] 
          : education.description;
          
        return <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">{degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          <p>{description}</p>
        </div>
      })
      
      var work = this.props.data.work.map(function(work){
        const description = typeof work.description === 'object' 
          ? work.description[lang] 
          : work.description;
          
        return <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
          <p>{description}</p>
        </div>
      })
      
      var skills = this.props.data.skills.map(function(skills){
        const description = typeof skills.description === 'object' 
          ? skills.description[lang] 
          : skills.description;
          
        return <div key={skills.name}>
          <h3>{skills.name}</h3>
          <p>{description}</p>
        </div>
      })
    }

    return (
      <section id="resume">

      <div className="row education">
         <div className="three columns header-col">
            <h1><span>{t.education || 'Edukacja'}</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                 {education}
               </div>
            </div>
         </div>
      </div>


      <div className="row work">

         <div className="three columns header-col">
            <h1><span>{t.work || 'Praca'}</span></h1>
         </div>

         <div className="nine columns main-col">
          {work}
        </div>
    </div>



      <div className="row skill">

         <div className="three columns header-col">
            <h1><span>{t.skills || 'Umiejętności'}</span></h1>
         </div>

         <div className="nine columns main-col">
          {skills}
			</div>
      </div>
   </section>
    );
  }
}

export default Resume;