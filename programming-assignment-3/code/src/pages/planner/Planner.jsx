import { useState } from "react";

export default function Planner() {
  const [personalItemItems, setPersonalItemItems] = useState([]);
  const [carryOnItems, setCarryOnItems] = useState([]);
  
  // Weight unit preference (default to lbs)
  const [weightUnit, setWeightUnit] = useState("lbs");
  
  // Form state for adding new items to personal item bag
  const [personalItemName, setPersonalItemName] = useState("");
  const [personalItemWeight, setPersonalItemWeight] = useState("");
  
  // Form state for adding new items to carry-on bag
  const [carryOnName, setCarryOnName] = useState("");
  const [carryOnWeight, setCarryOnWeight] = useState("");

  // Validation function to check if personal item form is valid
  const isPersonalItemFormValid = () => {
    const name = personalItemName.trim();
    const weight = parseFloat(personalItemWeight);
    return name.length > 0 && !isNaN(weight) && weight >= 0;
  };

  // Validation function to check if carry-on form is valid
  const isCarryOnFormValid = () => {
    const name = carryOnName.trim();
    const weight = parseFloat(carryOnWeight);
    return name.length > 0 && !isNaN(weight) && weight >= 0;
  };

  // Function to add item to personal item bag
  const addToPersonalItem = (e) => {
    e.preventDefault();
    if (personalItemName.trim() && personalItemWeight.trim()) {
      const weight = parseFloat(personalItemWeight);
      if (weight > 0) {
        setPersonalItemItems([...personalItemItems, {
          id: Date.now(), // Simple ID generation
          name: personalItemName.trim(),
          weight: weight,
          unit: weightUnit
        }]);
        setPersonalItemName("");
        setPersonalItemWeight("");
      }
    }
  };

  // Function to add item to carry-on bag
  const addToCarryOn = (e) => {
    e.preventDefault();
    if (carryOnName.trim() && carryOnWeight.trim()) {
      const weight = parseFloat(carryOnWeight);
      if (weight > 0) {
        setCarryOnItems([...carryOnItems, {
          id: Date.now(), // Simple ID generation
          name: carryOnName.trim(),
          weight: weight,
          unit: weightUnit
        }]);
        setCarryOnName("");
        setCarryOnWeight("");
      }
    }
  };

  return (
    <div className="planner">
      <h1>Planner</h1>
      
      <div className="weight-unit-selector">
        <label htmlFor="weight-unit-select" className="unit-label">
          Weight Unit:
        </label>
        <select 
          id="weight-unit-select"
          className="unit-dropdown"
          value={weightUnit} 
          onChange={(e) => setWeightUnit(e.target.value)}
        >
          <option value="lbs">Pounds (lbs)</option>
          <option value="kg">Kilograms (kg)</option>
        </select>
      </div>
      
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
                  value={personalItemName}
                  onChange={(e) => setPersonalItemName(e.target.value)}
                  className="item-name-input"
                />
                <input
                  type="number"
                  placeholder={`Weight (${weightUnit})`}
                  value={personalItemWeight}
                  onChange={(e) => setPersonalItemWeight(e.target.value)}
                  step="0.1"
                  min="0"
                  className="item-weight-input"
                />
                <button type="submit" className="add-button" disabled={!isPersonalItemFormValid()}>
                  Add Item
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
                    <span className="item-weight">{item.weight} {item.unit}</span>
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
                  value={carryOnName}
                  onChange={(e) => setCarryOnName(e.target.value)}
                  className="item-name-input"
                />
                <input
                  type="number"
                  placeholder={`Weight (${weightUnit})`}
                  value={carryOnWeight}
                  onChange={(e) => setCarryOnWeight(e.target.value)}
                  step="0.1"
                  min="0"
                  className="item-weight-input"
                />
                <button type="submit" className="add-button" disabled={!isCarryOnFormValid()}>
                  Add Item
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
                    <span className="item-weight">{item.weight} {item.unit}</span>
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
