import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";
const Deck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        console.log("something went wrong", error);
        throw error;
      }
    };
    loadDeck();
  }, []);

  const deleteCardHandler = async (id) => {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this card?\n\nYou will not able to recover it")
    ) {
      await deleteCard(id);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    {" "}
                    <i className="bi bi-house-door"></i>Home
                  </Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  {deck && deck.name && deck.name}
                </li>
              </ol>
            </nav>
            <div className="deck-info mb-3">
              <div className="deck-name">
                <h4>{deck && deck.name && deck.name}</h4>
              </div>
              <p className="deck-description">
                {deck && deck.description && deck.description}
              </p>
              <div className="deck-buttons">
                <Link to={`/decks/${deck && deck.id && deck.id}/edit`}>
                  <button type="button" className="btn btn-secondary">
                    <i className="bi bi-pencil"></i>edit
                  </button>
                </Link>
                <Link to={`/decks/${deckId}/study`}>
                  <button type="button" className="btn btn-primary ml-3">
                    <i className="bi bi-book"></i>Study
                  </button>
                </Link>
                <Link to={`/decks/${deckId}/cards/new`}>
                  <button type="button" className="btn btn-primary ml-3">
                    + Add Cards
                  </button>
                </Link>
                <button type="button" className="btn btn-danger float-right">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <h3>Cards</h3>
            {deck &&
              deck.name &&
              deck.cards.map((card) => (
                <div className="card" key={card.id}>
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-5">{card.front}</div>
                      <div className="col-1"></div>
                      <div className="col-5">{card.back}</div>
                    </div>
                    <div className="card-buttons float-right mt-3">
                      <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                        <button
                          type="button"
                          className="btn btn-secondary mr-3"
                        >
                          <i className="bi bi-pencil"></i>edit
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteCardHandler(card.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
