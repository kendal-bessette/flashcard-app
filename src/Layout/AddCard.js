import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api"
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import CardForm from "./CardForm";


function AddCard() {

    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: [] });

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
      }, [deckId]);

    function handleSubmit(card) {
        createCard(deckId, card); 
    }

    function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
         <li className="breadcrumb-item"><Link to="/">Home</Link></li>
         <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        </nav>
        <CardForm 
        deckName={deck.name}
        initialState={deck}
        onDone={handleDone}
        onSubmit={handleSubmit}
        />
        </div>
    )
}

export default AddCard; 