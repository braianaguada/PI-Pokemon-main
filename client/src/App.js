import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import PokemonDetail from "./components/pokemondetails";
import Landing from "./components/landing";
import AddPokemon from "./components/addpokemon";

function App() {

  return (

    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path="/home/:id" component={PokemonDetail}/>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/create' component={AddPokemon} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
