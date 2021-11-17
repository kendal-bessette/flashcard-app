import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

// The path to this screen should include the deckId(i.e., /decks/:deckId/edit).
// You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).
// It displays the same form as the Create Deck screen, except it is pre-filled with information for the existing deck.
// The user can edit and update the form.
// If the user clicks "Cancel", the user is taken to the Deck screen.


function DeckEdit() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({ name: "", description: "" });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function submitHandler(updatedDeck) {
    updateDeck(updatedDeck).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  function cancel() {
    history.goBack();
  }

  const child = deck.id ? (
    <DeckForm onCancel={cancel} onSubmit={submitHandler} initialState={deck} />
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {child}
    </div>
  );
}
export default DeckEdit;