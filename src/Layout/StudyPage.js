import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import StudyDeck from "./StudyDeck";
import StudyNotEnough from "./StudyNotEnough";

function StudyPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [cardNumber, setCardNumber] = useState(1);
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const cardCount = deck.cards.length;
  const nextHandler = () => {
    if (cardNumber === cardCount) {
      const returnToHomePage = !window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      return returnToHomePage ? history.push("/") : setCardNumber(1);
    }
    setCardNumber((prevState) => Math.min(cardCount, prevState + 1));
  };

  const cardTitle = `Card ${cardNumber} of ${cardCount}`;
  const card = deck.cards[cardNumber - 1];
  if (cardCount <= 2) {
    return (
      <StudyDeck name={deck.name} deckId={deckId}>
        <StudyNotEnough deckId={deckId} cardCount={cardCount} />
      </StudyDeck>
    );
  }

  return (
    <StudyDeck name={deck.name} deckId={deckId}>
      <StudyCard card={card} title={cardTitle}>
        <button type="button" className="btn btn-primary" onClick={nextHandler}>
          Next
        </button>
      </StudyCard>
    </StudyDeck>
  );
}
export default StudyPage;