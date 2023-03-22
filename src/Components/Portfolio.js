import React, { Component, useState } from 'react';

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
        },
        {
            "original" : "https://i.imgur.com/CB6iYM2.png",
            "thumbnail" : "https://i.imgur.com/CB6iYM2.png",
            "description": "Options Menu (WIP)"
        },
        {
            "original": "https://i.imgur.com/l799YqW.png",
            "thumbnail": "https://i.imgur.com/l799YqW.png",
            "description": "Upgrades Shop Menu (WIP)"
        },
        {
            "original": "https://i.imgur.com/nVdU699.png",
            "thumbnail": "https://i.imgur.com/nVdU699.png",
            "description": "Upgrades Shop Menu (WIP)"
        },
        {
            "original": "https://i.imgur.com/GmXkUus.png",
            "thumbnail": "https://i.imgur.com/GmXkUus.png",
            "description": "Game Mode Selection (WIP)"
        },
        {
            "original": "https://i.imgur.com/ejJKgac.png",
            "thumbnail": "https://i.imgur.com/ejJKgac.png",
            "description": "Level Selection (WIP)"
        },
        {
            "original": "https://i.imgur.com/CTatdul.png",
            "thumbnail": "https://i.imgur.com/CTatdul.png",
            "description": "Gameplay (WIP)"
        },
        {
            "original": "https://i.imgur.com/XWQgDtO.png",
            "thumbnail": "https://i.imgur.com/XWQgDtO.png",
            "description": "Gameplay (WIP)"
        },
        {
            "original": "https://i.imgur.com/vjG1fse.png",
            "thumbnail": "https://i.imgur.com/vjG1fse.png",
            "description": "Gameplay (WIP)"
        },
        {
            "original": "https://i.imgur.com/9gGombi.png",
            "thumbnail": "https://i.imgur.com/9gGombi.png",
            "description": "End Screen (WIP)"
        }
      ],
        description : "Komercyjna, jednoosobowa, zręcznościowa gra mobilna (w produkcji) pisana na silniku Unity w języku C#. Jest to połączenie klasycznego pong-a z lekkim twistem - paletka porusza się po orbicie, a zamiast rywalizacji z innym graczem, gracz ma za zadanie zniszczyć wszystkie cegiełki widoczne na ekranie poprzez odbijanie od nich piłki. Styl graficzny gry, w dużej mierze opiera się na neonowym wyglądzie, uzyskanym za pomocą Post-Processingu. Wszystkie graficzne elemnty gry zostały wykonane za pomocą darmowego programu do grafiki wektorowej Inkscape. Gra posiada dwa tryby - Endless, w pełni działający, polegający na zdobyciu jak największej liczby punktów do momentu wypadnięcia piłki poza ekran (w przypadku zniszczenia wszystkich cegiełek zostaje wygenerowany nowy poziom), oraz Adventure pozwalający na przechodzenie poziomów progresywnie, z coraz to większym poziomem trudności, każde przejście poziomu jest oceniane systemem gwiazdek (od 0 do 3, wraz z połówkami), co widać na ekranie Level Selection, gwiazdki są przyznawane na podstawie zdobytych punktów na danym poziomie, a algorytm wyznacza ilość punktów potrzebnych na zdobycie połowy gwiazdki - dzięki czemu można zdeterminować wymaganą ilość punktów na uzyskanie maksymalnego wyniku. Tryb ten nie jest jeszcze w pełni sprawny, wymaga wprowadzenia paru poprawek. Dodatkowo gra została urozmaicona o możliwość odblokowania tzw. power-upów (ekran Upgrades Shop Menu), dzięki którym, podczas zbijania cegiełek jest szansa na pojawienie się ulepszenia (symbolizowane jasnoniebieską, transparetną sferą z ikoną w środku, odpowiadającą danemu power-upowi), które zostaje aktywowane w momencie przejścia piłki przez nie."
    };

  }

  handleClick(images, desc, title)
  {
    this.setState(
      {
        galleryImages: images,
        description : desc,
        title: title
      }
    )
  }

  render() {
    
    // if(this.props.data){
    //   var projects = this.props.data.projects.map(function(projects){
    //     var projectImage = 'images/portfolio/'+projects.image;
    //     return <div key={projects.title} className="columns portfolio-item">
    //        <div className="item-wrap">
    //         <a href={projects.url} title={projects.title}>
    //            <img alt={projects.title} src={projectImage} />
    //            <div className="overlay">
    //               <div className="portfolio-item-meta">
    //              <h5>{projects.title}</h5>
    //                  <p>{projects.category}</p>
    //               </div>
    //             </div>
    //           <div className="link-icon"><i className="fa fa-link"></i></div>
    //         </a>
    //       </div>
    //     </div>
    //   })
    // }
  
    if(this.props.data){
      var projects = this.props.data.projects.map((projects) => {
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">

            <a title={projects.title} onClick={ () => this.handleClick(projects.images,projects.description,projects.title)}>
               <img alt={projects.title} src={projects.images[0].original} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.shortDesc}</p>
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
            {/* <h1>Sprawdź pare moich prac:</h1> */}
            <h2 className="responsive-headline"> {this.state.title}</h2>
            <h1>{this.state.description}</h1>
            <ImageGallery items={this.state.galleryImages} showPlayButton='false' showBullets='true'/>
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
