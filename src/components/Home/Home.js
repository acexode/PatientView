import React from 'react'
import css from './home.css'
import logo from '../../assets/logo.jpeg'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg  static-top" style={{marginBottom:"0px", background:'#fff'}}>
    <div class="container">
        <a class="navbar-brand" href="#"><img style={{width:'100px'}} src={logo} /></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav navbar-nav pull-right">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Blog</a>
          </li>
          <li class="nav-item">
            <Link class="nav-link signup" to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
      
    </div> 
</nav>

  
  <header class="masthead text-white text-center">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
            <h1 class="mb-5 hero-text">Consult a Doctor <br/>Anytime Anywhere</h1>
        </div>
        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <button type="submit" class="btn get-started">Get Started</button>
        </div>
      </div>
    </div>
  </header>
 
  <section class="features-icons  text-center">
    <div class="container ">
      <div class="row">
        <div class="col-md-12">
            <p class="med">With MEDICALL you can</p>
        </div>
        <div class="col-lg-6">          
            <div class="card bradius">
                <img class="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                <div class="card-body pb-5">
                  <p class="card-text">Get answers to your medical questions from the comfort of your home</p>
                </div>
              </div>
         
        </div>
        <div class="col-lg-6">          
            <div class="card bradius">
                <img class="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                <div class="card-body pb-5">
                  <p class="card-text">View your health summary <br/> and needed test</p>
                </div>
            
          </div>
        </div>
        <div class="col-lg-6">
          
            <div class="card bradius">
                <img class="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/162583/work-workplace-office-computer-162583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                <div class="card-body pb-5">
                  <p class="card-text">See upcoming appointments</p>
                </div>
              </div>         
        </div>
        <div class="col-lg-6">          
            <div class="card bradius">
                <img class="img-card" style={{height:"200px"}} src="https://images.pexels.com/photos/954583/pexels-photo-954583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                <div class="card-body pb-5">
                  <p class="card-text">View lab and imaging test results</p>
                </div>
              </div>         
        </div>
       
      </div>
    </div>
  </section>

 
  <section class="call-to-action text-white text-center">    
    <div class="">
      <div class="row">
        <div class="col-md-12">
          <h2 class="underline">Testimonials</h2>
          <div id="myCarousel" class="carousel slide" data-ride="carousel">         
            <div class="carousel-inner">
              <div class="item carousel-item active">
                <div class="row">                  
                  <div class="col-md-5 slant">
                    <div class="scontent">
                      <blockquote class="blockquote text-center">
                        <p class="">See what patients are saying about their experience</p>
                      
                        <footer class="blockquote-footer mb-3 text-light"> <q class="b"> Nurses may not be angels but they are the next best thing </q></footer>
                        <button type="button" class="btn text-light btn-outline-secondary">See more</button>
                      </blockquote>
                     

                    </div>
                  </div>
                  <div class="col-md-7 skewLeft">
                    <div class="img-box"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Black_woman_with_women%27s_suit_10.jpg/599px-Black_woman_with_women%27s_suit_10.jpg" alt="" /></div>
                    
                  </div>
                </div>
              </div>
              <div class="item carousel-item">
                <div class="row">                  
                  <div class="col-md-5 slant">
                    <div class="scontent">
                      <blockquote class="blockquote text-center">
                        <p class="">See what patients are saying about their experience</p>
                      
                        <footer class="blockquote-footer mb-3 text-light"> <q class="b"> Nurses may not be angels but they are the next best thing </q></footer>
                        <button type="button" class="btn text-light btn-outline-secondary">See more</button>
                      </blockquote>
                     

                    </div>
                  </div>
                  <div class="col-md-7 skewLeft">
                    <div class="img-box"><img src="https://media.glamour.com/photos/5b06fc3c5abbd74fed2e4dfe/16:9/w_2560%2Cc_limit/ervin%2525201.JPG" alt="" /></div>
                    
                  </div>
                </div>
            
                
              </div>
              <div class="item carousel-item">
                <div class="row">                  
                  <div class="col-md-5 slant">
                    <div class="scontent">
                      <blockquote class="blockquote text-center">
                        <p class="">See what patients are saying about their experience</p>
                      
                        <footer class="blockquote-footer mb-3 text-light"> <q class="b"> Nurses may not be angels but they are the next best thing </q></footer>
                        <button type="button" class="btn text-light btn-outline-secondary">See more</button>
                      </blockquote>
                     

                    </div>
                  </div>
                  <div class="col-md-7 skewLeft">
                    <div class="img-box"><img src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" /></div>
                    
                  </div>
                </div>
                
                
              </div>
            </div>
           
            <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
              <i class="fa fa-angle-left"></i>
            </a>
            <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

 
  <footer class="footer">
    <div class="container">
      <div class="row">
        <h2 class="line"><span>Medicall</span></h2>

      </div>
      <div class="row h-100 p-5">               
            <div class="col-md-3">
              <a href="#">About</a>
            </div>           
            <div class="col-md-3">
              <a href="#">Contact</a>
            </div>            
            <div class="col-md-3">
              <a href="#">Terms of Use</a>
            </div>         
            <div class="col-md-3">
              <a href="#">Privacy Policy</a>
            </div>   
      </div>
      <p class="text-muted small text-center mb-4 mb-lg-0">&copy; Medicall 2020. All Rights Reserved.</p>
    </div>
  </footer> 
        </div>
    )
}

export default Home
