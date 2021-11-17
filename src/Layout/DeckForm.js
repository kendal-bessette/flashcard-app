import React from "react";
import { useState } from "react";

// A form is shown with the appropriate fields for creating a new deck.
// The name field is an <input> field of type text.
// The description field is a <textarea> field that can be multiple lines of text.
// If the user clicks "submit", the user is taken to the Deck screen.
// If the user clicks "cancel", the user is taken to the Home screen.

function DeckForm({
    onSubmit,
    onCancel,
    initialState = { name: "", description: "" },
  }) {
    const [deck, setDeck] = useState(initialState);
  
    function changeHandler({ target: { name, value } }) {
      setDeck((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    return (
        <div>
            <form>
        <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={deck.name}
          required={true}
          placeholder="Deck Name"
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          className="form-control"
          rows="4"
          required={true}
          placeholder="Brief description of the deck"
          onChange={changeHandler}
          value={deck.description}
        />
      </div>
      <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
      </form>
      </div>
    )
}

export default DeckForm; 