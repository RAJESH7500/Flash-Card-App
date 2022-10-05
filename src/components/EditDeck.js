import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        console.log("something went wong", error);
        throw error;
      }
    };
    loadDeck();
  }, []);

  const onChangeHandler = (e) => {
    setDeck({
      ...deck,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const data = await updateDeck(deck, abortController.signal);
    console.log("data is ", data);
    // setFormData({ ...initialState });
  };
  if (deck && deck.name)
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
                  <li className="breadcrumb-item">
                    <a href="#">{deck.name}</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Deck
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2">Edit Deck</h1>

              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Deck Name"
                    name="name"
                    onChange={(e) => onChangeHandler(e)}
                    value={deck.name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    placeholder="breif description about deck"
                    name="description"
                    onChange={(e) => onChangeHandler(e)}
                    value={deck.description}
                  ></textarea>
                </div>
                <Link to="/">
                  <button type="button" className="btn btn-secondary">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary ml-3"
                  onClick={() => history.push("/")}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">Loading ....</div>
      </div>
    </div>
  );
};

export default EditDeck;
