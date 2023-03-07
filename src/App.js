import './App.css';
import React, { useState, useEffect } from 'react';
import Carousel from './carousel';
import SearchResult from './SearchResult';
import { TextField, Grid } from '@mui/material';


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResults, setSelectedResults] = useState([])

  const handleInput = (e) => {
    if(e.target.value) {
      setSearchInput(e.target.value)
    } else {
      setSearchInput(searchTerm)
    }
  }

  useEffect(() => {

    fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&key=LIVDSRZULELA`)
    .then(res => res.json())
    .then(data => setSelectedResults(data.results))

  }, [searchTerm])

  return (
    <div className="App">
      <header className="App_header">
        <div class ="searchbox">
          <TextField fullWidth value={searchTerm} onChange={handleInput} label="Search GIFs or Stickers" />
          <button type = "submit"><i class = "fa fa-search"></i></button>
        </div>
      </header>
      <Carousel setSearchTerm={setSearchTerm} />
      <SearchResult selectedResults={selectedResults} />
    </div>
  );
}

export default App;
