import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

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
            <Switch>
              <Route path ='/'>
                <Header data={this.state.resumeData.main} />
                <About data={this.state.resumeData.main} />
                <Resume data={this.state.resumeData.resume} />
                <Portfolio data={this.state.resumeData.portfolio} />
                {/* <Testimonials data={this.state.resumeData.testimonials} />
                <Contact data={this.state.resumeData.main} /> */}
                <Footer data={this.state.resumeData.main} />
              </Route>

              <Route path='/Projekt'>

              </Route>

            </Switch>
          </div>
      </Router>
    //   <div className="App">
    //   <Header data={this.state.resumeData.main}/>
    //   <About data={this.state.resumeData.main}/>
    //   <Resume data={this.state.resumeData.resume}/>
    //   <Portfolio data={this.state.resumeData.portfolio}/>
    //   <Testimonials data={this.state.resumeData.testimonials}/>
    //   <Contact data={this.state.resumeData.main}/>
    //   <Footer data={this.state.resumeData.main}/>
    // </div>


    // <Router>
    //       <Navbar />
    //       <div className='Content'>
            
    //         <Switch>
    //           <Route path='/' exact component={Home} />
    //           <Route path='/Projects' exact component={Projects} />
    //           <Route path='/Contact' exact component={Contact} />
    //         </Switch>
    //       <div className='Footer-Spacer'></div>
    //       </div>
    //       <Footer />
    //   </Router>

    );
  }
}

export default App;
