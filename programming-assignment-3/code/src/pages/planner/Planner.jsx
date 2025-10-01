import { useState } from "react";
import { LUGGAGE_TYPES } from "../../data/luggageTypes";

// Reusable component for individual items
function Item({ id, name, weight, unit, onDelete }) {
  return (
    <li className="item">
      <div className="item-info">
        <span className="item-name">{name}</span>
        <span className="item-weight">{weight} {unit}</span>
      </div>
      <button 
        className="delete-button" 
        onClick={() => onDelete(id)}
        aria-label={`Delete ${name}`}
      >
        ×
      </button>
    </li>
  );
}

export default function Planner() {
  const [personalItemItems, setPersonalItemItems] = useState([]);
  const [carryOnItems, setCarryOnItems] = useState([]);
  const [checkedBagItems, setCheckedBagItems] = useState([]);
  const [checkedBag2Items, setCheckedBag2Items] = useState([]);
  
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
  
  // Form state for adding new items to checked bag 2
  const [checkedBag2Name, setCheckedBag2Name] = useState("");
  const [checkedBag2Weight, setCheckedBag2Weight] = useState("");

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

  // Get number of allowed checked bags for current cabin class
  const getCheckedBagLimit = () => {
    return checkedBagData.bagLimits[cabinClass] || 0;
  };

  // Calculate total weight for each bag type
  const calculateTotalWeight = (items) => {
    return items.reduce((total, item) => total + item.weight, 0);
  };

  const personalItemTotalWeight = calculateTotalWeight(personalItemItems);
  const carryOnTotalWeight = calculateTotalWeight(carryOnItems);
  const checkedBagTotalWeight = calculateTotalWeight(checkedBagItems);
  const checkedBag2TotalWeight = calculateTotalWeight(checkedBag2Items);

  // Helper function to get weight limit in correct unit
  const getWeightLimitInUnit = (weightInLbs) => {
    if (weightUnit === 'kg') {
      return (weightInLbs * 0.453592).toFixed(1);
    }
    return weightInLbs;
  };

  // Helper function to get remaining weight
  const getRemainingWeight = (currentWeight, maxWeightLbs) => {
    const maxWeight = parseFloat(getWeightLimitInUnit(maxWeightLbs));
    const remaining = maxWeight - currentWeight;
    return Math.max(0, remaining).toFixed(1);
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

  // Validation function to check if checked bag 2 form is valid
  const isCheckedBag2FormValid = () => {
    const name = checkedBag2Name.trim();
    const weight = parseFloat(checkedBag2Weight);
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

  // Function to add item to checked bag 2
  const addToCheckedBag2 = (e) => {
    e.preventDefault();
    if (checkedBag2Name.trim() && checkedBag2Weight.trim()) {
      const weight = parseFloat(checkedBag2Weight);
      if (weight > 0) {
        setCheckedBag2Items([...checkedBag2Items, {
          id: Date.now() + 1, // Simple ID generation with offset
          name: checkedBag2Name.trim(),
          weight: weight,
          unit: weightUnit
        }]);
        setCheckedBag2Name("");
        setCheckedBag2Weight("");
      }
    }
  };

  // Delete functions for each bag type
  const deleteFromPersonalItem = (itemId) => {
    setPersonalItemItems(personalItemItems.filter(item => item.id !== itemId));
  };

  const deleteFromCarryOn = (itemId) => {
    setCarryOnItems(carryOnItems.filter(item => item.id !== itemId));
  };

  const deleteFromCheckedBag = (itemId) => {
    setCheckedBagItems(checkedBagItems.filter(item => item.id !== itemId));
  };

  const deleteFromCheckedBag2 = (itemId) => {
    setCheckedBag2Items(checkedBag2Items.filter(item => item.id !== itemId));
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
            <p className="weight-limit">Max: {getWeightLimitInUnit(personalItemData.weightLimits[cabinClass])} {weightUnit}</p>
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
            <div className="weight-summary">
              <span className="total-weight">
                Used: {personalItemTotalWeight.toFixed(1)} {weightUnit} • 
                Remaining: {getRemainingWeight(personalItemTotalWeight, personalItemData.weightLimits[cabinClass])} {weightUnit}
              </span>
            </div>
            {personalItemItems.length === 0 ? (
              <p className="empty-message">No items added yet</p>
            ) : (
              <ul className="item-list">
                {personalItemItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    weight={item.weight}
                    unit={item.unit}
                    onDelete={deleteFromPersonalItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Carry-On Section */}
        <div className="bag-section">
          <h2>💼 Carry-On</h2>
          <p className="weight-limit">Max: {getWeightLimitInUnit(carryOnData.weightLimits[cabinClass])} {weightUnit}</p>
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
            <div className="weight-summary">
              <span className="total-weight">
                Used: {carryOnTotalWeight.toFixed(1)} {weightUnit} • 
                Remaining: {getRemainingWeight(carryOnTotalWeight, carryOnData.weightLimits[cabinClass])} {weightUnit}
              </span>
            </div>
            {carryOnItems.length === 0 ? (
              <p className="empty-message">No items added yet</p>
            ) : (
              <ul className="item-list">
                {carryOnItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    weight={item.weight}
                    unit={item.unit}
                    onDelete={deleteFromCarryOn}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        </div>

        {/* Checked Bag Section(s) - only show if allowed for current cabin class */}
        {isCheckedBagAllowed() && (
          <>
            {/* First Checked Bag */}
            <div className="bag-row checked-bag-row">
              <div className="bag-section">
                <h2>🧳 Checked Bag {getCheckedBagLimit() > 1 ? '1' : ''}</h2>
                <p className="weight-limit">Max: {getWeightLimitInUnit(checkedBagData.weightLimits[cabinClass])} {weightUnit}</p>
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
                  <div className="weight-summary">
                    <span className="total-weight">
                      Used: {checkedBagTotalWeight.toFixed(1)} {weightUnit} • 
                      Remaining: {getRemainingWeight(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass])} {weightUnit}
                    </span>
                  </div>
                  {checkedBagItems.length === 0 ? (
                    <p className="empty-message">No items added yet</p>
                  ) : (
                    <ul className="item-list">
                      {checkedBagItems.map((item) => (
                        <Item
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          weight={item.weight}
                          unit={item.unit}
                          onDelete={deleteFromCheckedBag}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {getCheckedBagLimit() === 2 ? (
                /* Second Checked Bag for Business/First Class */
                <div className="bag-section">
                  <h2>🧳 Checked Bag 2</h2>
                  <p className="weight-limit">Max: {getWeightLimitInUnit(checkedBagData.weightLimits[cabinClass])} {weightUnit}</p>
                  <div className="add-item-form">
                    <h3>Add Item</h3>
                    <form onSubmit={addToCheckedBag2}>
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="Item name"
                          value={checkedBag2Name}
                          onChange={(e) => setCheckedBag2Name(e.target.value)}
                          className="item-name-input"
                        />
                        <input
                          type="number"
                          placeholder={`Weight (${weightUnit})`}
                          value={checkedBag2Weight}
                          onChange={(e) => setCheckedBag2Weight(e.target.value)}
                          step="0.1"
                          min="0"
                          className="item-weight-input"
                        />
                        <button type="submit" className="add-button" disabled={!isCheckedBag2FormValid()}>
                          Add Item
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="items-list">
                    <h3>Items ({checkedBag2Items.length})</h3>
                    <div className="weight-summary">
                      <span className="total-weight">
                        Used: {checkedBag2TotalWeight.toFixed(1)} {weightUnit} • 
                        Remaining: {getRemainingWeight(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass])} {weightUnit}
                      </span>
                    </div>
                    {checkedBag2Items.length === 0 ? (
                      <p className="empty-message">No items added yet</p>
                    ) : (
                      <ul className="item-list">
                        {checkedBag2Items.map((item) => (
                          <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            weight={item.weight}
                            unit={item.unit}
                            onDelete={deleteFromCheckedBag2}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                /* Invisible spacer for Premium Economy (1 bag) */
                <div className="bag-section invisible-spacer"></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
