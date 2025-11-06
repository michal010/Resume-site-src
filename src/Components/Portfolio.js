import React, { Component } from 'react';

import ImageGallery from  'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


class Portfolio extends Component { 
  constructor(props)
  {
    super(props);
    this.state = 
    {
      title : "Cirpong",
      galleryImages : [ 
        {
            "original": "https://i.imgur.com/xSFfiED.png",
            "thumbnail": "https://i.imgur.com/xSFfiED.png",
            "description": "Main Menu (WIP)"
        }
      ],
      description : "Komercyjna, jednoosobowa, zręcznościowa gra mobilna..."
    };
  }

  handleClick(images, desc, title, lang)
  {
    // Handle bilingual descriptions in image gallery
    const processedImages = images.map(img => ({
      ...img,
      description: typeof img.description === 'object' 
        ? img.description[lang] 
        : img.description
    }));

    const description = typeof desc === 'object' ? desc[lang] : desc;

    this.setState({
      galleryImages: processedImages,
      description: description,
      title: title
    });
  }

  render() {
    const lang = this.props.language || 'pl';
  
    if(this.props.data){
      var projects = this.props.data.projects.map((project) => {
        const shortDesc = typeof project.shortDesc === 'object' 
          ? project.shortDesc[lang] 
          : project.shortDesc;

        return <div key={project.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a title={project.title} onClick={() => 
              this.handleClick(
                project.images, 
                project.description, 
                project.title,
                lang
              )
            }>
               <img alt={project.title} src={project.images[0].original} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{project.title}</h5>
                     <p>{shortDesc}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }
    
    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">
            <h2 className="responsive-headline">{this.state.title}</h2>
            <h1>{this.state.description}</h1>
            <ImageGallery 
              items={this.state.galleryImages} 
              showPlayButton={false} 
              showBullets={true}
            />
            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;