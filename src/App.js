import React from "react";
import Axios from "axios";
import './App.css';
import logo from "../src/images/logo.png"


function App() {

  //create a state to display data
  const [pokemon, setPokemon] = React.useState("pikachu");
  const [pokemonData, setPokemonData] = React.useState([]);
  const [pokemonType, setPokemonType] = React.useState(""); 

  //create a function when called gets pokemon
  const getPokemon = () => {
    const toArray = [];
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(
      (response)=> {
      toArray.push(response.data);
      setPokemonType(response.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(response);  
    }
    );
  };

  //function to make entered text to lower case
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  // function that prevents page from refreshing
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  
  return(
  <div className="App">
    <div className="nav">
      <img className="logo" src={logo}/>
    <form onSubmit={handleSubmit}>
    <p>Type in your character and press Enter Key to view stats</p>
      <label>
        <input className="input" type="text" onChange={handleChange} placeholder="Search..."/>
      </label>
    </form>
    </div>
    
    {pokemonData.map((data) => {
      return(
        <div className="body">
            <img className="sprite" src={data.sprites["front_default"]} alt="Pokemon"/>
            <div className="Table">
              <table className="det">
                <tr>
                  <th>Species</th>
                  <td>{data.species.name}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{pokemonType}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{""}{Math.round(data.height * 3.9)} "</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{""}{Math.round((data.weight/4.3)*0.454)} kgs</td>
                </tr>
                <tr>
                  <th>Battle No.</th>
                  <td>{data.game_indices.length}</td>
                </tr>
                <tr>
                  <th>Hp</th>
                  <td>{data.stats[0].base_stat}</td>
                </tr>
                <tr>
                  <th>Attack</th>
                  <td>{data.stats[1].base_stat}</td>
                </tr>
                <tr>
                  <th>Defense</th>
                  <td>{data.stats[2].base_stat}</td>
                </tr>
              
              </table>
            
            </div>
           
           </div>

      )
    })} 
  </div> );
}

export default App;
