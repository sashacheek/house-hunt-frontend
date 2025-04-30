import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'

function Home() {

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/addresses')
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
