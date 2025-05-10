import '../App.css';
import Navigation from '../components/Navigation'
import Cards from "../components/Cards"

function Home() {


  
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <div id="home-search">
            <div className="content">
                <form>
                    <input></input>
                </form>
            </div>
        </div>
      </header>
      <Cards />
    </div>
  );
}

export default Home;
