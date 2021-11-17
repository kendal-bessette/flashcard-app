import React from "react";
import { Switch, Route } from "react-router";
import AddCard from "./AddCard";
import CreateDeck from "./CreateDeck"; 
import EditCard from "./EditCard"; 
import Header from "./Header"; 
import Home from "./Home"; 
import EditDeck from "./EditDeck";
import NotFound from "./NotFound"; 
import StudyPage from "./StudyPage"; 
import ViewDeck from "./ViewDeck"; 

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path='/decks/:deckId/study'>
            <StudyPage />
          </Route>

          <Route exact path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>

          <Route exact path ='/decks/:deckId'>
            <ViewDeck />
          </Route>

          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>

          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
