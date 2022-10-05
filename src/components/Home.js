import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";
const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const data = await listDecks(new AbortController().signal);
        setDecks(data);
      } catch (error) {
        console.log("somthing went wrong with error", error);
      }
    };
    loadDecks();
  }, []);
  const deleteDeckHandler = async (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not able to recover it")
    ) {
      const abortController = new AbortController();
      await deleteDeck(id, abortController.signal);
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary">
                + Create Deck
              </button>
            </Link>

            {decks.map((deck) => (
              <div
                className="card m-3 "
                key={deck.id}
                style={{ width: "35rem" }}
              >
                <div className="card-body  ">
                  <div className="card-title">
                    {deck.name}
                    <span className="text-muted   float-right">
                      {deck.cards.length} cards
                    </span>
                  </div>

                  <p className="card-text">{deck.description}</p>
                  <Link to={`decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary">
                      <i className="bi bi-eye"></i>
                      View
                    </button>
                  </Link>
                  <Link to={`decks/${deck.id}/study`}>
                    <button type="button" className="btn btn-primary ml-2">
                      <i className="bi bi-book"></i>
                      Study
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    onClick={() => deleteDeckHandler(deck.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
