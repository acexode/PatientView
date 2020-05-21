import React from 'react'
import css from './home.css'
import logo from '../../assets/MEDICALL.svg'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg  static-top" style={{marginBottom:"0px", background:'#fff'}}>
    <div className="container">
        <a className="navbar-brand" href="#"><img style={{width:'100px'}} src={logo} /></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Blog</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link signup" to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
      
    </div> 
</nav>

  
  <header className="masthead text-white text-center">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-xl-9 mx-auto">
            <h1 className="mb-5 hero-text">Consult a Doctor <br/>Anytime Anywhere</h1>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <Link to="/login" className="btn get-started">Get Started</Link>
        </div>
      </div>
    </div>
  </header>
 
  <section className="features-icons  text-center">
    <div className="container ">
      <div className="row">
        <div className="col-md-12">
            <p className="med">With MEDICALL you can</p>
        </div>
        <div className="col-lg-6">          
            <div className="card bradius">
                <img className="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  />
                <div className="card-body pb-5">
                  <p className="card-text">Get answers to your medical questions from the comfort of your home</p>
                </div>
              </div>
         
        </div>
        <div className="col-lg-6">          
            <div className="card bradius">
                <img className="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt=""  />
                <div className="card-body pb-5">
                  <p className="card-text">View your health summary <br/> and needed test</p>
                </div>
            
          </div>
        </div>
        <div className="col-lg-6">
          
            <div className="card bradius">
                <img className="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/162583/work-workplace-office-computer-162583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  />
                <div className="card-body pb-5">
                  <p className="card-text">See upcoming appointments</p>
                </div>
              </div>         
        </div>
        <div className="col-lg-6">          
            <div className="card bradius">
                <img className="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/954583/pexels-photo-954583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  />
                <div className="card-body pb-5">
                  <p className="card-text">View lab and imaging test results</p>
                </div>
              </div>         
        </div>
       
      </div>
    </div>
  </section>

 
  <section className="call-to-action text-white text-center">    
        <div className="">
          <div className="row">
            <div className="col-md-12">
              <h2 className="underline">Testimonials</h2>
              <div id="myCarousel" className="carousel slide" data-ride="carousel">         
                <div className="carousel-inner">
                  <div className="item carousel-item active">
                    <div className="row">                  
                      <div className="col-md-5 slant">
                        <div className="scontent">
                          <blockquote className="blockquote text-center">
                            <p className="">See what patients are saying about their experience</p>
                          
                            <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the next best thing </q></footer>
                            <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                          </blockquote>
                         
    
                        </div>
                      </div>
                      <div className="col-md-7 skewLeft">
                        <div className="img-box"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Black_woman_with_women%27s_suit_10.jpg/599px-Black_woman_with_women%27s_suit_10.jpg" alt="" /></div>
                        <div className="overlay-text pl-2 pr-3  pb-2">
                            <blockquote className="blockquote text-center">
                              <p className="">See what patients are saying about their experience</p>
                            
                              <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the <br/> next best thing </q></footer>
                              <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                            </blockquote>
                           
      
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="item carousel-item">
                    <div className="row">                  
                      <div className="col-md-5 slant">
                        <div className="scontent">
                          <blockquote className="blockquote text-center">
                            <p className="">See what patients are saying about their experience</p>
                          
                            <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the next best thing </q></footer>
                            <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                          </blockquote>
                         
    
                        </div>
                      </div>
                      <div className="col-md-7 skewLeft">
                        <div className="img-box"><img src="https://media.glamour.com/photos/5b06fc3c5abbd74fed2e4dfe/16:9/w_2560%2Cc_limit/ervin%2525201.JPG" alt="" /></div>
                        <div className="overlay-text pl-2 pr-3  pb-2">
                            <blockquote className="blockquote text-center">
                              <p className="">See what patients are saying about their experience</p>
                            
                              <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the <br/> next best thing </q></footer>
                              <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                            </blockquote>
                           
      
                          </div>
                      </div>
                    </div>
                
                    
                  </div>
                  <div className="item carousel-item">
                    <div className="row">                  
                      <div className="col-md-5 slant">
                        <div className="scontent">
                          <blockquote className="blockquote text-center">
                            <p className="">See what patients are saying about their experience</p>
                          
                            <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the next best thing </q></footer>
                            <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                          </blockquote>
                         
    
                        </div>
                      </div>
                      <div className="col-md-7 skewLeft">
                        <div className="img-box"><img src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" /></div>
                        <div className="overlay-text pl-2 pr-3  pb-2">
                            <blockquote className="blockquote text-center">
                              <p className="">See what patients are saying about their experience</p>
                            
                              <footer className="blockquote-footer text-light"> <q className="b"> Nurses may not be angels but they are the <br/> next best thing </q></footer>
                              <button type="button" className="btn text-light btn-outline-secondary">See more</button>
                            </blockquote>
                           
      
                          </div>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
               
                <a className="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
                  <i className="fa fa-angle-left"></i>
                </a>
                <a className="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  <footer className="footer">
    <div className="container">
      <div className="row">
        <h2 className="line"><span>Medicall</span></h2>

      </div>
      <div className="row h-100 p-5">               
            <div className="col-md-3">
              <a href="#">About</a>
            </div>           
            <div className="col-md-3">
              <a href="#">Contact</a>
            </div>            
            <div className="col-md-3">
              <a href="#">Terms of Use</a>
            </div>         
            <div className="col-md-3">
              <a href="#">Privacy Policy</a>
            </div>   
      </div>
      <p className="text-muted small text-center mb-4 mb-lg-0">&copy; Medicall 2020. All Rights Reserved.</p>
    </div>
  </footer> 
        </div>
    )
}

export default Home
