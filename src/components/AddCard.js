import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

const AddCard = () => {
  const initialState = {
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ ...initialState });
  const { deckId } = useParams();
  const history = useHistory();
  useEffect(() => {
    const loadDeck = async () => {
      const abortController = new AbortController();
      const data = await readDeck(deckId, abortController.signal);
      setDeck(data);
    };
    loadDeck();
  }, []);

  const onChangeHandler = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    await createCard(deckId, card, abortController.signal);
    setCard({ ...initialState });
  };

  if (deck && deck.id)
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="bi bi-house-door"></i>Home
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link to="">{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add Card
                </li>
              </ol>
            </nav>

            <h3 className="title">{deck.name}: Add Card</h3>

            <form onSubmit={(e) => submitHandler(e)}>
              <div className="form-group">
                <label htmlFor="name">Front</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="front"
                  rows="3"
                  placeholder="Font side of card"
                  name="front"
                  onChange={(e) => onChangeHandler(e)}
                  value={card.front}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Back</label>
                <textarea
                  className="form-control"
                  id="back"
                  type="text"
                  rows="3"
                  placeholder="Back side of card"
                  name="back"
                  onChange={(e) => onChangeHandler(e)}
                  value={card.back}
                />
              </div>
              <Link to={`/decks/${deckId}`}>
                <button type="button" className="btn btn-secondary">
                  done
                </button>
              </Link>
              <button type="submit" className="btn btn-primary ml-3">
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">Loading...</div>
      </div>
    </div>
  );
};

export default AddCard;
