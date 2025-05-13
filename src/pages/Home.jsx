import '../App.css';
import Cards from "../components/Cards";

function Home() {


  
  return (
    <div className="App">
      <header className="App-header">
        <div id="home-search">
            <div className="content">
                <form>
                    <input placeholder="Enter City, State, or Zip Code"></input>
                </form>
            </div>
        </div>
      </header>
      <Cards />
    </div>
  );
}

export default Home;
