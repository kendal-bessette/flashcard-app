import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api"
import DeckForm from "./DeckForm"

// The Create Deck form has required fields for name & description. 
//The cancel button will bring the user back to the home, and submit will take the user to the deck screen.

function CreateDeck() {

    const history = useHistory(); 

    function handleCancel() {
        history.goBack();
      }

    function handleSubmit(deck) {
      createDeck(deck).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
      )
    }

  return (
<div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">Create Deck</li>
      </ol>
    </nav>
    
    <h1>Create Deck</h1>
    <DeckForm onCancel={handleCancel} onSubmit={handleSubmit}/>
    </div>
  );
}

export default CreateDeck;
