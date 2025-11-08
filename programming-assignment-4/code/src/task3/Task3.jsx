import React, { useState } from "react";

const initialItems = [
  {
    title: "Bananas",
    image: "images/giorgio-trovato-fczCr7MdE7U-unsplash.512.jpg",
  },
  {
    title: "Tide pods",
    image: "images/erik-binggeser-LLpejDmK-ek-unsplash.512.jpg",
  },
];

function ShoppingListItem({ title, image, onDelete }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="img-fluid rounded-start"
            src={image}
            alt={`Image of ${title}`}
            style={{ maxHeight: 240 }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <div className="card-body">
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Task3() {
  const [items, setItems] = useState(initialItems);
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    // YOUR CODE HERE

    // Create an item:
    const item = {
      title: "NOT IMPLEMENTED",
      image: "",
    };

    // then, add the item to the list!

    setInput("");
  }

  function handleDelete(idx) {
    setItems((items) => items.filter((_, i) => i !== idx));
  }

  return (
    <div className="container">
      <header>
        <h1>Shopping list</h1>
      </header>
      <div className="home" id="home-page">
        <div className="query">
          <form className="input-group mb-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="What do you need to buy?"
              aria-label="What do you need to buy?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Add to list
            </button>
          </form>
        </div>
        <div id="list">
          {items.map((item, idx) => (
            <ShoppingListItem
              key={idx}
              title={item.title}
              image={item.image}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
