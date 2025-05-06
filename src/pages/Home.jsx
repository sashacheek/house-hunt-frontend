import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Card from "../components/Card"

function Home() {

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/addresses`)
      .then(response => response.json())
      .then(data => setAddresses(data))
      .catch(error => console.error('Error fetching addresses:', error));
  }, []);
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
      <div className="cards">
      <Card />
      </div>
      <ul>
  
      {addresses.map(address => (
  <li key={address.id}>{address.street} 
  {address.city}</li>
))}
      </ul>
    </div>
  );
}

export default Home;
