import React, { Component } from 'react';

class About extends Component {
  render() {
    const t = this.props.translations?.about || {};
    const lang = this.props.language || 'pl';

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      
      // Handle bilingual CV file
      var cv = "files/" + (typeof this.props.data.fileCV === 'object' 
        ? this.props.data.fileCV[lang] 
        : this.props.data.fileCV);
      
      // Handle bilingual bio
      var bio = typeof this.props.data.bio === 'object' 
        ? this.props.data.bio[lang] 
        : this.props.data.bio;
      
      var phone= this.props.data.phone;
      var email = this.props.data.email;
    }

    return (
      <section id="about">
      <div className="row">
         <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Profile Pic" />
         </div>
         <div className="nine columns main-col">
            <h2>{t.title || 'O mnie'}</h2>

            <p>{bio}</p>
            <div className="row">
               <div className="columns contact-details">
                  <h2>{t.contactDetails || 'Dane do kontaktu'}</h2>
                  <p className="address">
						   <span>{name}</span><br />
						   <span>{phone}</span><br />
                     <span>{email}</span>
					   </p>
               </div>
               <div className="columns download">
                  <p>
                     <a href={cv} className="button">
                       <i className="fa fa-download"></i>
                       {t.download || 'Pobierz CV'}
                     </a>
                  </p>
               </div>
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;