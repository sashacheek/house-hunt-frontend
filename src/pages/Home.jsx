import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Card from "../components/Card"

function Home() {

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addresses`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
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
