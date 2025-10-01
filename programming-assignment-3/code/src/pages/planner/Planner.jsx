import { useState } from "react";

export default function Planner() {
  const [personalItemItems, setPersonalItemItems] = useState([]);
  const [carryOnItems, setCarryOnItems] = useState([]);
  
  // Form state for adding new items
  const [newItemName, setNewItemName] = useState("");
  const [newItemWeight, setNewItemWeight] = useState("");

  // Function to add item to personal item bag
  const addToPersonalItem = (e) => {
    e.preventDefault();
    if (newItemName.trim() && newItemWeight.trim()) {
      const weight = parseFloat(newItemWeight);
      if (weight > 0) {
        setPersonalItemItems([...personalItemItems, {
          id: Date.now(), // Simple ID generation
          name: newItemName.trim(),
          weight: weight
        }]);
        setNewItemName("");
        setNewItemWeight("");
      }
    }
  };

  // Function to add item to carry-on bag
  const addToCarryOn = (e) => {
    e.preventDefault();
    if (newItemName.trim() && newItemWeight.trim()) {
      const weight = parseFloat(newItemWeight);
      if (weight > 0) {
        setCarryOnItems([...carryOnItems, {
          id: Date.now(), // Simple ID generation
          name: newItemName.trim(),
          weight: weight
        }]);
        setNewItemName("");
        setNewItemWeight("");
      }
    }
  };

  return (
    <div className="planner">
      <h1>Planner</h1>
      
      <div className="bag-sections">
        {/* Personal Item Section */}
        <div className="bag-section">
          <h2>🎒 Personal Item</h2>
          <div className="add-item-form">
            <h3>Add Item</h3>
            <form onSubmit={addToPersonalItem}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="item-name-input"
                />
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={newItemWeight}
                  onChange={(e) => setNewItemWeight(e.target.value)}
                  step="0.1"
                  min="0"
                  className="item-weight-input"
                />
                <button type="submit" className="add-button">
                  Add to Personal Item
                </button>
              </div>
            </form>
          </div>
          
          <div className="items-list">
            <h3>Items ({personalItemItems.length})</h3>
            {personalItemItems.length === 0 ? (
              <p className="empty-message">No items added yet</p>
            ) : (
              <ul className="item-list">
                {personalItemItems.map((item) => (
                  <li key={item.id} className="item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-weight">{item.weight} lbs</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Carry-On Section */}
        <div className="bag-section">
          <h2>💼 Carry-On</h2>
          <div className="add-item-form">
            <h3>Add Item</h3>
            <form onSubmit={addToCarryOn}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="item-name-input"
                />
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={newItemWeight}
                  onChange={(e) => setNewItemWeight(e.target.value)}
                  step="0.1"
                  min="0"
                  className="item-weight-input"
                />
                <button type="submit" className="add-button">
                  Add to Carry-On
                </button>
              </div>
            </form>
          </div>
          
          <div className="items-list">
            <h3>Items ({carryOnItems.length})</h3>
            {carryOnItems.length === 0 ? (
              <p className="empty-message">No items added yet</p>
            ) : (
              <ul className="item-list">
                {carryOnItems.map((item) => (
                  <li key={item.id} className="item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-weight">{item.weight} lbs</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
