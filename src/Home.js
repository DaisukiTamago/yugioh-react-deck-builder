import React from 'react';
import './Home.css';
import Deck from './Components/Deck'
import Search from './Components/Search'
import Lister from './Components/Lister'
import Options from './Components/Options'

function Home() {
  return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
      <Options/>
    </div>
  );
}

export default Home;
