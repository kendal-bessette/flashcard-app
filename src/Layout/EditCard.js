import { useHistory, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../utils/api"; 
import CardForm from "./CardForm"; 

// The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
// It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
// If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.


function EditCard({ title }) {

    const history = useHistory(); 

    const { deckId, cardId } = useParams(); 

    const [card, setCard] = useState({ front: "", back: "" });
    const [deck, setDeck] = useState({ cards: [] });

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
        readCard(cardId)
        .then(setCard); 
    }, [deckId, cardId]); 

    function handleDone() {
        history.push(`/decks/${deck.id}`); 
    }

    function handleSubmit(card) {
        updateCard(card)
        .then(handleDone);
    }

    const child = card.id ? ( 
        <CardForm
        onSubmit={handleSubmit}
        onDone={handleDone}
        deckName={deck.name}
        initialState={card}
        doneButtonLabel="Cancel"
        />
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
              <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
        <h2>Edit Card</h2>
        {child}
      </div>
    )
}; 

export default EditCard; 