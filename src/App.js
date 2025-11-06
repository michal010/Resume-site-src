import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Portfolio from './Components/Portfolio';
import LanguageSwitcher from './Components/LanguageSwitcher';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import translationsEN from './translations/en.json';
import translationsPL from './translations/pl.json';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      resumeData: {},
      language: 'pl', // default language
      translations: translationsPL
    };
  }

  toggleLanguage = () => {
    this.setState(prevState => ({
      language: prevState.language === 'pl' ? 'en' : 'pl',
      translations: prevState.language === 'pl' ? translationsEN : translationsPL
    }));
  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <Router>
          <div className="App">
            {/* Language Switcher */}
            <LanguageSwitcher 
              language={this.state.language}
              onToggle={this.toggleLanguage}
            />

            <Routes>
              <Route path='/' element={
                <>
                  <Header 
                    data={this.state.resumeData.main} 
                    translations={this.state.translations}
                    language={this.state.language}
                  />
                  <About 
                    data={this.state.resumeData.main} 
                    translations={this.state.translations}
                    language={this.state.language}
                  />
                  <Resume 
                    data={this.state.resumeData.resume} 
                    translations={this.state.translations}
                    language={this.state.language}
                  />
                  <Portfolio 
                    data={this.state.resumeData.portfolio} 
                    translations={this.state.translations}
                    language={this.state.language}
                  />
                  <Footer data={this.state.resumeData.main} />
                </>
              } />

              <Route path='/Projekt' element={
                <div>Projekt Page</div>
              } />
            </Routes>
          </div>
      </Router>
    );
  }
}

export default App;