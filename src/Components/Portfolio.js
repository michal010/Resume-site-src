import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'professional', // 'professional', 'hobby', or 'astrophotography'
      showModal: false,
      selectedProject: null,
      galleryImages: [],
      description: '',
      title: ''
    };
  }

  handleProjectClick = (project, lang) => {
    const processedImages = project.images.map(img => ({
      ...img,
      description: typeof img.description === 'object' 
        ? img.description[lang] 
        : img.description
    }));

    const description = typeof project.description === 'object' 
      ? project.description[lang] 
      : project.description;

    this.setState({
      showModal: true,
      selectedProject: project,
      galleryImages: processedImages,
      description: description,
      title: project.title
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedProject: null
    });
  }

  switchSection = (section) => {
    this.setState({ activeSection: section });
  }

  render() {
    const lang = this.props.language || 'pl';
    const t = this.props.translations?.portfolio || {};
    
    // Separate projects by category
    const professionalProjects = this.props.data?.projects?.filter(p => p.category === 'professional') || [];
    const hobbyProjects = this.props.data?.projects?.filter(p => p.category === 'hobby') || [];
    const astrophotographyProjects = this.props.data?.projects?.filter(p => p.category === 'astrophotography') || [];
    
    const currentProjects = this.state.activeSection === 'professional' 
      ? professionalProjects 
      : this.state.activeSection === 'hobby'
      ? hobbyProjects
      : astrophotographyProjects;

    const renderProjectCard = (project) => {
      const shortDesc = typeof project.shortDesc === 'object' 
        ? project.shortDesc[lang] 
        : project.shortDesc;

      return (
        <div key={project.title} className="project-card">
          <div 
            className="project-image-wrapper"
            onClick={() => this.handleProjectClick(project, lang)}
          >
            <img 
              src={project.images[0].original} 
              alt={project.title}
              className="project-thumbnail"
            />
            <div className="project-overlay">
              <i className="fa fa-search-plus"></i>
            </div>
          </div>
          <div className="project-info">
            <h3>{project.title}</h3>
            <p>{shortDesc}</p>
            {project.technologies && (
              <div className="tech-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <>
        <style>{`
          #portfolio {
            background: #ebeeee;
            padding: 90px 0 60px;
          }

          .portfolio-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .portfolio-header h1 {
            font: 25px/30px 'roboto-bold', 'opensans-semibold', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #313131;
            margin-bottom: 30px;
          }

          .section-switcher {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
            flex-wrap: wrap;
          }

          .section-btn {
            padding: 12px 30px;
            font: 16px/24px 'roboto-medium', 'opensans-semibold', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: #fff;
            color: #313131;
            border: 2px solid #11ABB0;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .section-btn:hover {
            background: #11ABB0;
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(17, 171, 176, 0.3);
          }

          .section-btn.active {
            background: #11ABB0;
            color: #fff;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
            padding: 0 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .project-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          .project-image-wrapper {
            position: relative;
            height: 220px;
            overflow: hidden;
            background: #f5f5f5;
          }

          .project-thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .project-card:hover .project-thumbnail {
            transform: scale(1.05);
          }

          .project-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(17, 171, 176, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .project-card:hover .project-overlay {
            opacity: 1;
          }

          .project-overlay i {
            font-size: 48px;
            color: #fff;
          }

          .project-info {
            padding: 20px;
          }

          .project-info h3 {
            font: 20px/28px 'roboto-bold', 'opensans-bold', sans-serif;
            color: #313131;
            margin-bottom: 10px;
          }

          .project-info p {
            font: 14px/22px 'opensans-regular', sans-serif;
            color: #6E7881;
            margin-bottom: 15px;
          }

          .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .tech-tag {
            display: inline-block;
            padding: 4px 12px;
            background: #f0f0f0;
            color: #666;
            font-size: 12px;
            border-radius: 15px;
            font-family: 'opensans-semibold', sans-serif;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .modal-content {
            background: #fff;
            border-radius: 8px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
          }

          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(50px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }

          .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #fff;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }

          .modal-close:hover {
            background: #11ABB0;
            color: #fff;
            transform: rotate(90deg);
          }

          .modal-body {
            padding: 30px;
          }

          .modal-body h2 {
            font: 28px/36px 'roboto-bold', 'opensans-bold', sans-serif;
            color: #313131;
            margin-bottom: 20px;
          }

          .modal-body p {
            font: 16px/26px 'opensans-regular', sans-serif;
            color: #6E7881;
            margin-bottom: 30px;
            white-space: pre-wrap;
          }

          .modal-body .project-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
          }

          .modal-body .project-details h3 {
            font: 18px/24px 'roboto-bold', 'opensans-bold', sans-serif;
            color: #313131;
            margin-bottom: 15px;
            border-bottom: 2px solid #11ABB0;
            padding-bottom: 8px;
          }

          .modal-body .project-details p {
            margin-bottom: 15px;
            line-height: 1.8;
          }

          .modal-body .project-details ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 15px;
          }

          .modal-body .project-details ul li {
            padding-left: 25px;
            position: relative;
            margin-bottom: 8px;
            line-height: 1.6;
          }

          .modal-body .project-details ul li:before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #11ABB0;
            font-weight: bold;
          }

          .modal-tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
          }

          .modal-tech-tags .tech-tag {
            background: #11ABB0;
            color: #fff;
            padding: 6px 16px;
            font-size: 13px;
          }

          .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
          }

          .empty-state i {
            font-size: 64px;
            margin-bottom: 20px;
            color: #ddd;
          }

          .empty-state p {
            font: 18px/28px 'opensans-regular', sans-serif;
          }

          @media screen and (max-width: 768px) {
            .projects-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .section-switcher {
              flex-direction: column;
              padding: 0 20px;
            }

            .section-btn {
              width: 100%;
            }

            .modal-content {
              max-height: 95vh;
            }

            .modal-body {
              padding: 20px;
            }
          }
        `}</style>

        <section id="portfolio">
          <div className="row">
            <div className="twelve columns">
              <div className="portfolio-header">
                <h1>
                  {t.title || (lang === 'pl' ? 'Moje Projekty' : 'My Projects')}
                </h1>
                
                <div className="section-switcher">
                  <button
                    className={`section-btn ${this.state.activeSection === 'professional' ? 'active' : ''}`}
                    onClick={() => this.switchSection('professional')}
                  >
                    <i className="fa fa-briefcase"></i> {' '}
                    {t.professional || (lang === 'pl' ? 'Projekty Komercyjne' : 'Professional Projects')}
                  </button>
                  <button
                    className={`section-btn ${this.state.activeSection === 'hobby' ? 'active' : ''}`}
                    onClick={() => this.switchSection('hobby')}
                  >
                    <i className="fa fa-gamepad"></i> {' '}
                    {t.hobby || (lang === 'pl' ? 'Projekty Hobbystyczne' : 'Hobby Projects')}
                  </button>
                  <button
                    className={`section-btn ${this.state.activeSection === 'astrophotography' ? 'active' : ''}`}
                    onClick={() => this.switchSection('astrophotography')}
                  >
                    <i className="fa fa-star"></i> {' '}
                    {t.astrophotography || (lang === 'pl' ? 'Astrofotografia' : 'Astrophotography')}
                  </button>
                </div>
              </div>

              {currentProjects.length > 0 ? (
                <div className="projects-grid">
                  {currentProjects.map(renderProjectCard)}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fa fa-folder-open"></i>
                  <p>
                    {lang === 'pl' 
                      ? 'Brak projektów w tej kategorii' 
                      : 'No projects in this category'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {this.state.showModal && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={this.closeModal}>
                <i className="fa fa-times"></i>
              </button>
              <div className="modal-body">
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <ImageGallery
                  items={this.state.galleryImages}
                  showPlayButton={false}
                  showBullets={true}
                  showFullscreenButton={true}
                  showThumbnails={true}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Portfolio;