import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
const Study = () => {
  const initialState = {
    current: 1,
    text: "",
    length: 0,
    next: false,
    isFront: true,
  };
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cardInfo, setCardInfo] = useState({
    ...initialState,
  });

  const history = useHistory();
  useEffect(() => {
    const loadDeck = async () => {
      const abortController = new AbortController();
      const data = await readDeck(deckId, abortController.signal);
      setDeck(data);
      if (data.cards.length > 2) {
        setCardInfo({
          ...cardInfo,
          text: data.cards[0].front,
          length: data.cards.length,
        });
      }
    };
    loadDeck();
  }, []);

  const filpHandler = () => {
    setCardInfo({
      ...cardInfo,
      text: deck.cards[cardInfo.current - 1].back,
      isFront: false,
      next: true,
    });
  };

  const nextCard = () => {
    if (cardInfo.current === cardInfo.length) {
      if (
        window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to the home page`
        )
      ) {
        setCardInfo({
          ...initialState,
          length: deck.cards.length,
          text: deck.cards[0].front,
        });
      } else {
        history.push("/");
      }
    } else {
      setCardInfo({
        ...cardInfo,
        current: cardInfo.current + 1,
        isFront: true,
        next: false,
        text: deck.cards[cardInfo.current - 1].front,
      });
    }
  };
  if (deck && deck.cards && deck.cards.length <= 2)
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    {" "}
                    <i className="bi bi-house-door"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{deck.name}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Study
                </li>
              </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards.</h2>
            <p>
              You need atleat 3 cards to study. There are {deck.cards.length}{" "}
              cards in this deck
            </p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button type="button" className="btn btn-primary">
                + Add Cards
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  else if (deck && deck.id)
    return (
      <div className="deck">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{deck.name}</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Study
                  </li>
                </ol>
              </nav>
              <h1>{deck.name}: Study</h1>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Card {cardInfo.current} of {cardInfo.length}
                  </h5>
                  <h6 className="card-subtitle mt-1 mb-2">{cardInfo.text}</h6>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={filpHandler}
                  >
                    Flip
                  </button>
                  {cardInfo.next && (
                    <button
                      type="button"
                      className="btn btn-primary ml-2"
                      onClick={nextCard}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-auto">Loading...</div>
      </div>
    </div>
  );
};

export default Study;
