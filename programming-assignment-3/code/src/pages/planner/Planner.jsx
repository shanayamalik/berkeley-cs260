import { useState } from "react";
import { LUGGAGE_TYPES } from "../../data/luggageTypes";

export default function Planner() {
  const [personalItemItems, setPersonalItemItems] = useState([]);
  const [carryOnItems, setCarryOnItems] = useState([]);
  const [checkedBagItems, setCheckedBagItems] = useState([]);
  
  // Cabin class selection (default to basic-economy)
  const [cabinClass, setCabinClass] = useState("basic-economy");
  
  // Weight unit preference (default to lbs)
  const [weightUnit, setWeightUnit] = useState("lbs");
  
  // Form state for adding new items to personal item bag
  const [personalItemName, setPersonalItemName] = useState("");
  const [personalItemWeight, setPersonalItemWeight] = useState("");
  
  // Form state for adding new items to carry-on bag
  const [carryOnName, setCarryOnName] = useState("");
  const [carryOnWeight, setCarryOnWeight] = useState("");
  
  // Form state for adding new items to checked bag
  const [checkedBagName, setCheckedBagName] = useState("");
  const [checkedBagWeight, setCheckedBagWeight] = useState("");

  // Get luggage type data
  const personalItemData = LUGGAGE_TYPES.find(type => type.name === "Personal Item");
  const carryOnData = LUGGAGE_TYPES.find(type => type.name === "Carry-On");
  const checkedBagData = LUGGAGE_TYPES.find(type => type.name === "Checked Bag");

  // Check if checked bag is allowed for current cabin class
  const isCheckedBagAllowed = () => {
    switch (cabinClass) {
      case 'basic-economy':
        return checkedBagData.allowedInBasicEconomy;
      case 'premium-economy':
        return checkedBagData.allowedInPremiumEconomy;
      case 'business':
        return checkedBagData.allowedInBusiness;
      case 'first':
        return checkedBagData.allowedInFirst;
      default:
        return false;
    }
  };

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

  // Validation function to check if checked bag form is valid
  const isCheckedBagFormValid = () => {
    const name = checkedBagName.trim();
    const weight = parseFloat(checkedBagWeight);
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

  // Function to add item to checked bag
  const addToCheckedBag = (e) => {
    e.preventDefault();
    if (checkedBagName.trim() && checkedBagWeight.trim()) {
      const weight = parseFloat(checkedBagWeight);
      if (weight > 0) {
        setCheckedBagItems([...checkedBagItems, {
          id: Date.now(), // Simple ID generation
          name: checkedBagName.trim(),
          weight: weight,
          unit: weightUnit
        }]);
        setCheckedBagName("");
        setCheckedBagWeight("");
      }
    }
  };

  return (
    <div className="planner">
      <h1>Planner</h1>
      
      <div className="planner-controls">
        <div className="cabin-class-selector">
          <label htmlFor="cabin-class-select" className="cabin-label">
            Cabin Class:
          </label>
          <select 
            id="cabin-class-select"
            className="cabin-dropdown"
            value={cabinClass} 
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="basic-economy">Basic Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business Class</option>
            <option value="first">First Class</option>
          </select>
        </div>
        
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
      </div>
      
      <div className="bag-sections">
        {/* First row: Personal Item and Carry-On */}
        <div className="bag-row">
          {/* Personal Item Section */}
          <div className="bag-section">
            <h2>🎒 Personal Item</h2>
            <p className="weight-limit">Max: {personalItemData.weightLimits[cabinClass]} {weightUnit === 'lbs' ? 'lbs' : `kg (${Math.round(personalItemData.weightLimits[cabinClass] * 0.453592 * 2) / 2} kg)`}</p>
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
          <p className="weight-limit">Max: {carryOnData.weightLimits[cabinClass]} {weightUnit === 'lbs' ? 'lbs' : `kg (${Math.round(carryOnData.weightLimits[cabinClass] * 0.453592 * 2) / 2} kg)`}</p>
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

        {/* Checked Bag Section - only show if allowed for current cabin class */}
        {isCheckedBagAllowed() && (
          <div className="bag-row checked-bag-row">
            <div className="bag-section">
              <h2>🧳 Checked Bag</h2>
              <p className="weight-limit">Max: {checkedBagData.weightLimits[cabinClass]} {weightUnit === 'lbs' ? 'lbs' : `kg (${Math.round(checkedBagData.weightLimits[cabinClass] * 0.453592 * 2) / 2} kg)`}</p>
              <div className="add-item-form">
                <h3>Add Item</h3>
                <form onSubmit={addToCheckedBag}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={checkedBagName}
                      onChange={(e) => setCheckedBagName(e.target.value)}
                      className="item-name-input"
                    />
                    <input
                      type="number"
                      placeholder={`Weight (${weightUnit})`}
                      value={checkedBagWeight}
                      onChange={(e) => setCheckedBagWeight(e.target.value)}
                      step="0.1"
                      min="0"
                      className="item-weight-input"
                    />
                    <button type="submit" className="add-button" disabled={!isCheckedBagFormValid()}>
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="items-list">
                <h3>Items ({checkedBagItems.length})</h3>
                {checkedBagItems.length === 0 ? (
                  <p className="empty-message">No items added yet</p>
                ) : (
                  <ul className="item-list">
                    {checkedBagItems.map((item) => (
                      <li key={item.id} className="item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-weight">{item.weight} {item.unit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Invisible spacer to match the layout structure */}
            <div className="bag-section invisible-spacer"></div>
          </div>
        )}
      </div>
    </div>
  );
}
