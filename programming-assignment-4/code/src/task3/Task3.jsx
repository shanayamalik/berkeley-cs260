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

function ShoppingListItem({ title, image, onDelete, isLoading }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {isLoading ? (
            <div 
              style={{ 
                height: 240, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f3f4f6'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    width: 40, 
                    height: 40, 
                    border: '4px solid #e5e7eb',
                    borderTop: '4px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }}
                />
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <p style={{ marginTop: 12, color: '#6b7280', fontSize: '0.875rem' }}>
                  Generating image...
                </p>
              </div>
            </div>
          ) : (
            <img
              className="img-fluid rounded-start"
              src={image}
              alt={`Image of ${title}`}
              style={{ maxHeight: 240 }}
            />
          )}
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

  async function generateImage(itemName) {
    try {
      // Use the URL directly with the item as a query parameter
      // This URL will redirect to the generated image
      const imageUrl = `https://noggin.rea.gent/ethical-yak-6746?key=rg_v1_qi128xp4dz0azhabwevu817my3w8cl32rawz_ngk&item=${encodeURIComponent(itemName)}`;
      return imageUrl;
    } catch (error) {
      console.error("Error generating image:", error);
      // Return a placeholder if image generation fails
      return "https://via.placeholder.com/240x240?text=Image+Failed";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    // Create an item with loading state
    const newItem = {
      title: input,
      image: "",
      isLoading: true,
    };

    // Add the item to the list immediately (optimistic UI)
    const newItemIndex = items.length;
    setItems((prevItems) => [...prevItems, newItem]);

    // Generate image in the background
    const imageUrl = await generateImage(input);

    // Update the item with the generated image
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === newItemIndex
          ? { ...item, image: imageUrl, isLoading: false }
          : item
      )
    );

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
              isLoading={item.isLoading || false}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
