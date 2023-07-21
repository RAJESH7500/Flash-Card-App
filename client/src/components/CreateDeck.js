import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, deleteCard } from "../utils/api";
const CreateDeck = () => {
  const initialState = {
    name: "",
    description: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialState });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const data = await createDeck(formData, abortController.signal);
    history.push(`/decks/${data.id}`);
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
                  Create Deck
                </li>
              </ol>
            </nav>
            <h1 className="mt-2">Create Deck</h1>

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
                  value={formData.name}
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
                  value={formData.description}
                ></textarea>
              </div>
              <Link to="/">
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn btn-primary ml-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
