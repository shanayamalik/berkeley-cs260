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
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        marginBottom: '0.75rem'
      }}
    >
      {isLoading ? (
        <div 
          style={{ 
            width: 80,
            height: 80,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '6px'
          }}
        >
          <div 
            style={{ 
              width: 24, 
              height: 24, 
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <img
          src={image}
          alt={`Image of ${title}`}
          style={{ 
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: '6px',
            flexShrink: 0
          }}
        />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 500, color: '#111827' }}>
          {title}
        </h3>
      </div>
      <button 
        onClick={onDelete}
        style={{
          padding: '0.375rem 0.75rem',
          fontSize: '0.875rem',
          color: '#dc2626',
          backgroundColor: 'white',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flexShrink: 0
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#fef2f2';
          e.target.style.borderColor = '#fca5a5';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.borderColor = '#fecaca';
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default function Task3() {
  const [items, setItems] = useState(initialItems);
  const [input, setInput] = useState("");

  async function generateImage(itemName) {
    try {
      // Use the SDXL Lightning Noggin URL with the item as a query parameter
      // This URL will redirect to the generated image
      const imageUrl = `https://noggin.rea.gent/fine-scorpion-2166?key=rg_v1_d4byyuwvs7cxj4vwch5bi0f3aas4sgkh48p4_ngk&item=${encodeURIComponent(itemName)}`;
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
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>
          Shopping list
        </h1>
      </header>
      <div className="home" id="home-page">
        <div className="query" style={{ marginBottom: '1.5rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="What do you need to buy?"
              aria-label="What do you need to buy?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.625rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                color: '#3b82f6',
                backgroundColor: 'white',
                border: '1px solid #3b82f6',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#eff6ff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
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
