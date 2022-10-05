import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCard from "./components/AddCard";
import CreateDeck from "./components/CreateDeck";
import Deck from "./components/Deck";
import EditCard from "./components/EditCard";
import EditDeck from "./components/EditDeck";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Study from "./components/Study";
function App() {
  return (
    <div className="app-routes">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
