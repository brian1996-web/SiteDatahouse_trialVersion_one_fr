import Header from "./Header";
import image from './images/data track.png';
import './Home.css';

function Home () {

  return (

    <div className="home-page">

      <Header/>
          <div className="home-details">

            <nav className="app-detail"> 
            <h1>Site Dh is an application that enables Supervisors and management 
        keep Track of their daily site activities in real time.
        </h1>
          </nav>

          <nav className="data-image">
        <img src={image} className="image" alt="image showing data tracking"/>
            </nav>    

       
        </div>
    </div>
  )
  
}

export default Home;