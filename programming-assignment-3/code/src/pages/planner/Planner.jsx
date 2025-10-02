import React, { useState } from 'react';
import { LUGGAGE_TYPES } from "../../data/luggageTypes";
import Suggestions from "../../components/Suggestions";

// Reusable component for individual items
function Item({ id, name, weight, unit, onDelete, onUpdate, bagType }) {
  // Edit state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editWeight, setEditWeight] = useState(weight);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({
      id,
      name,
      weight,
      unit,
      sourceBag: bagType
    }));
    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  // Edit handlers
  const handleSaveItem = () => {
    let updates = {};
    let hasChanges = false;

    if (editName.trim() && editName !== name) {
      updates.name = editName.trim();
      hasChanges = true;
    }

    const weightNum = parseFloat(editWeight);
    if (!isNaN(weightNum) && weightNum > 0 && weightNum !== weight) {
      updates.weight = weightNum;
      hasChanges = true;
    }

    if (hasChanges) {
      onUpdate(id, updates);
    }
    setIsEditingName(false);
    setIsEditingWeight(false);
  };

  const handleCancelEdit = () => {
    setEditName(name);
    setEditWeight(weight);
    setIsEditingName(false);
    setIsEditingWeight(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveItem();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const startEditing = () => {
    setIsEditingName(true);
    setIsEditingWeight(true);
  };

  return (
    <li 
      className="item"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="item-info">
        <span className="drag-handle">⋮⋮</span>
        <span 
          className="edit-icon"
          onClick={startEditing}
          title="Click to edit item"
        >
          ✏️
        </span>
        {isEditingName ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveItem}
            onKeyDown={handleEditKeyDown}
            className="edit-input edit-name-input"
            autoFocus
          />
        ) : (
          <span 
            className="item-name" 
            onDoubleClick={startEditing}
            title="Double-click to edit"
          >
            {name}
          </span>
        )}
        {isEditingWeight ? (
          <div className="edit-weight-container">
            <input
              type="number"
              value={editWeight}
              onChange={(e) => setEditWeight(e.target.value)}
              onBlur={handleSaveItem}
              onKeyDown={handleEditKeyDown}
              className="edit-input edit-weight-input"
              min="0"
              step="0.1"
            />
            <span className="weight-unit">{unit}</span>
          </div>
        ) : (
          <span 
            className="item-weight"
            onDoubleClick={startEditing}
            title="Double-click to edit"
          >
            {weight} {unit}
          </span>
        )}
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

export default function Planner({ luggageData, luggageActions }) {
  // Destructure luggage data from props
  const {
    personalItemItems,
    carryOnItems,
    checkedBagItems,
    checkedBag2Items,
    cabinClass,
    weightUnit,
    personalItemName,
    personalItemWeight,
    personalItemQuantity,
    carryOnName,
    carryOnWeight,
    carryOnQuantity,
    checkedBagName,
    checkedBagWeight,
    checkedBagQuantity,
    checkedBag2Name,
    checkedBag2Weight,
    checkedBag2Quantity
  } = luggageData;

  // Destructure luggage actions from props
  const {
    setPersonalItemItems,
    setCarryOnItems,
    setCheckedBagItems,
    setCheckedBag2Items,
    setCabinClass,
    setWeightUnit,
    setPersonalItemName,
    setPersonalItemWeight,
    setPersonalItemQuantity,
    setCarryOnName,
    setCarryOnWeight,
    setCarryOnQuantity,
    setCheckedBagName,
    setCheckedBagWeight,
    setCheckedBagQuantity,
    setCheckedBag2Name,
    setCheckedBag2Weight,
    setCheckedBag2Quantity
  } = luggageActions;

  // State for tracking accepted/declined suggestions
  const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);
  // State for enabling/disabling suggestions
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);

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
    return remaining.toFixed(1);
  };

  // Helper function to check if bag is overweight
  const isWeightExceeded = (currentWeight, maxWeightLbs) => {
    const maxWeight = parseFloat(getWeightLimitInUnit(maxWeightLbs));
    return currentWeight > maxWeight;
  };

  // Validation function to check if personal item form is valid
  const isPersonalItemFormValid = () => {
    const name = personalItemName.trim();
    const weight = parseFloat(personalItemWeight);
    const quantity = parseInt(personalItemQuantity);
    return name.length > 0 && !isNaN(weight) && weight >= 0 && !isNaN(quantity) && quantity >= 1;
  };

  // Validation function to check if carry-on form is valid
  const isCarryOnFormValid = () => {
    const name = carryOnName.trim();
    const weight = parseFloat(carryOnWeight);
    const quantity = parseInt(carryOnQuantity);
    return name.length > 0 && !isNaN(weight) && weight >= 0 && !isNaN(quantity) && quantity >= 1;
  };

  // Validation function to check if checked bag form is valid
  const isCheckedBagFormValid = () => {
    const name = checkedBagName.trim();
    const weight = parseFloat(checkedBagWeight);
    const quantity = parseInt(checkedBagQuantity);
    return name.length > 0 && !isNaN(weight) && weight >= 0 && !isNaN(quantity) && quantity >= 1;
  };

  // Validation function to check if checked bag 2 form is valid
  const isCheckedBag2FormValid = () => {
    const name = checkedBag2Name.trim();
    const weight = parseFloat(checkedBag2Weight);
    const quantity = parseInt(checkedBag2Quantity);
    return name.length > 0 && !isNaN(weight) && weight >= 0 && !isNaN(quantity) && quantity >= 1;
  };

  // Function to add item to personal item bag
  const addToPersonalItem = (e) => {
    e.preventDefault();
    if (personalItemName.trim() && personalItemWeight.trim() && personalItemQuantity.trim()) {
      const weight = parseFloat(personalItemWeight);
      const quantity = parseInt(personalItemQuantity);
      if (weight > 0 && quantity > 0) {
        const newItems = [];
        for (let i = 0; i < quantity; i++) {
          newItems.push({
            id: Date.now() + i, // Ensure unique IDs
            name: personalItemName.trim(),
            weight: weight,
            unit: weightUnit
          });
        }
        setPersonalItemItems([...personalItemItems, ...newItems]);
        setPersonalItemName("");
        setPersonalItemWeight("");
        setPersonalItemQuantity("");
      }
    }
  };

  // Function to add item to carry-on bag
  const addToCarryOn = (e) => {
    e.preventDefault();
    if (carryOnName.trim() && carryOnWeight.trim() && carryOnQuantity.trim()) {
      const weight = parseFloat(carryOnWeight);
      const quantity = parseInt(carryOnQuantity);
      if (weight > 0 && quantity > 0) {
        const newItems = [];
        for (let i = 0; i < quantity; i++) {
          newItems.push({
            id: Date.now() + i, // Ensure unique IDs
            name: carryOnName.trim(),
            weight: weight,
            unit: weightUnit
          });
        }
        setCarryOnItems([...carryOnItems, ...newItems]);
        setCarryOnName("");
        setCarryOnWeight("");
        setCarryOnQuantity("");
      }
    }
  };

  // Function to add item to checked bag
  const addToCheckedBag = (e) => {
    e.preventDefault();
    if (checkedBagName.trim() && checkedBagWeight.trim() && checkedBagQuantity.trim()) {
      const weight = parseFloat(checkedBagWeight);
      const quantity = parseInt(checkedBagQuantity);
      if (weight > 0 && quantity > 0) {
        const newItems = [];
        for (let i = 0; i < quantity; i++) {
          newItems.push({
            id: Date.now() + i, // Ensure unique IDs
            name: checkedBagName.trim(),
            weight: weight,
            unit: weightUnit
          });
        }
        setCheckedBagItems([...checkedBagItems, ...newItems]);
        setCheckedBagName("");
        setCheckedBagWeight("");
        setCheckedBagQuantity("");
      }
    }
  };

  // Function to add item to checked bag 2
  const addToCheckedBag2 = (e) => {
    e.preventDefault();
    if (checkedBag2Name.trim() && checkedBag2Weight.trim() && checkedBag2Quantity.trim()) {
      const weight = parseFloat(checkedBag2Weight);
      const quantity = parseInt(checkedBag2Quantity);
      if (weight > 0 && quantity > 0) {
        const newItems = [];
        for (let i = 0; i < quantity; i++) {
          newItems.push({
            id: Date.now() + i + 1000, // Ensure unique IDs with larger offset
            name: checkedBag2Name.trim(),
            weight: weight,
            unit: weightUnit
          });
        }
        setCheckedBag2Items([...checkedBag2Items, ...newItems]);
        setCheckedBag2Name("");
        setCheckedBag2Weight("");
        setCheckedBag2Quantity("");
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

  // Update functions for each bag type
  const updatePersonalItem = (itemId, updates) => {
    setPersonalItemItems(personalItemItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  const updateCarryOnItem = (itemId, updates) => {
    setCarryOnItems(carryOnItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  const updateCheckedBagItem = (itemId, updates) => {
    setCheckedBagItems(checkedBagItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  const updateCheckedBag2Item = (itemId, updates) => {
    setCheckedBag2Items(checkedBag2Items.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  // Handle suggestion acceptance/decline
  const handleSuggestion = (bagType, suggestion) => {
    // Mark suggestion as handled
    setAcceptedSuggestions(prev => [...prev, suggestion.id]);
    
    // If not declined, add to appropriate bag
    if (!suggestion.decline) {
      const newItem = {
        id: Date.now(),
        name: suggestion.name,
        weight: suggestion.weight,
        unit: suggestion.unit
      };

      switch (bagType) {
        case "personal-item":
          setPersonalItemItems(prev => [...prev, newItem]);
          break;
        case "carry-on":
          setCarryOnItems(prev => [...prev, newItem]);
          break;
        case "checked-bag":
          setCheckedBagItems(prev => [...prev, newItem]);
          break;
        case "checked-bag-2":
          setCheckedBag2Items(prev => [...prev, newItem]);
          break;
        default:
          break;
      }
    }
  };

  // Drag and Drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    // Only remove drag-over if we're actually leaving the drop zone
    // Check if the relatedTarget (where we're going) is outside this element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      e.currentTarget.classList.remove("drag-over");
    }
  };

  const handleDrop = (e, targetBag) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { id, name, weight, unit, sourceBag } = dragData;
      
      // Don't do anything if dropping in the same bag
      if (sourceBag === targetBag) return;
      
      // Remove item from source bag
      switch (sourceBag) {
        case "personal-item":
          setPersonalItemItems(personalItemItems.filter(item => item.id !== id));
          break;
        case "carry-on":
          setCarryOnItems(carryOnItems.filter(item => item.id !== id));
          break;
        case "checked-bag":
          setCheckedBagItems(checkedBagItems.filter(item => item.id !== id));
          break;
        case "checked-bag-2":
          setCheckedBag2Items(checkedBag2Items.filter(item => item.id !== id));
          break;
      }
      
      // Add item to target bag
      const newItem = { id: Date.now(), name, weight, unit }; // New ID to avoid conflicts
      switch (targetBag) {
        case "personal-item":
          setPersonalItemItems([...personalItemItems, newItem]);
          break;
        case "carry-on":
          setCarryOnItems([...carryOnItems, newItem]);
          break;
        case "checked-bag":
          setCheckedBagItems([...checkedBagItems, newItem]);
          break;
        case "checked-bag-2":
          setCheckedBag2Items([...checkedBag2Items, newItem]);
          break;
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <div className="planner">
      <h1>Planner</h1>
      
      <div className="planner-controls">
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
        
        <div className="suggestions-toggle">
          <label htmlFor="suggestions-toggle" className="unit-label">
            Packing Suggestions:
          </label>
          <button
            id="suggestions-toggle"
            className={`toggle-button ${suggestionsEnabled ? 'enabled' : 'disabled'}`}
            onClick={() => setSuggestionsEnabled(!suggestionsEnabled)}
            title={suggestionsEnabled ? 'Disable suggestions' : 'Enable suggestions'}
          >
            {suggestionsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      
      <div className="bag-sections">
        {/* First row: Personal Item and Carry-On */}
        <div className="bag-row">
          {/* Personal Item Section */}
          <div className="bag-section">
            <h2>🎒 Personal Item</h2>
            <p className="weight-limit">Max: {getWeightLimitInUnit(personalItemData.weightLimits[cabinClass])} {weightUnit}</p>
            
            {suggestionsEnabled && (
              <Suggestions 
                bagType="personal-item"
                onAcceptSuggestion={(suggestion) => handleSuggestion("personal-item", suggestion)}
                acceptedSuggestions={acceptedSuggestions}
              />
            )}
            
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
                <input
                  type="number"
                  placeholder="Qty"
                  value={personalItemQuantity}
                  onChange={(e) => setPersonalItemQuantity(e.target.value)}
                  min="1"
                  className="item-quantity-input"
                />
                <button type="submit" className="add-button" disabled={!isPersonalItemFormValid()}>
                  Add Item
                </button>
              </div>
            </form>
          </div>
          
          <div 
            className="items-list"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "personal-item")}
          >
            <div className="drop-zone-message">Drop item here</div>
            <h3>Items ({personalItemItems.length})</h3>
            <div className={`weight-summary ${isWeightExceeded(personalItemTotalWeight, personalItemData.weightLimits[cabinClass]) ? 'weight-exceeded' : ''}`}>
              <span className="total-weight">
                Used: {personalItemTotalWeight.toFixed(1)} {weightUnit} • {isWeightExceeded(personalItemTotalWeight, personalItemData.weightLimits[cabinClass]) ? (
                  <span className="exceeded-text">
                    Weight exceeded by: {Math.abs(parseFloat(getRemainingWeight(personalItemTotalWeight, personalItemData.weightLimits[cabinClass]))).toFixed(1)} {weightUnit}
                  </span>
                ) : (
                  <span>
                    Remaining: {getRemainingWeight(personalItemTotalWeight, personalItemData.weightLimits[cabinClass])} {weightUnit}
                  </span>
                )}
              </span>
              {isWeightExceeded(personalItemTotalWeight, personalItemData.weightLimits[cabinClass]) && (
                <div className="weight-warning">
                  ⚠️ This bag's weight limit has been exceeded. Please remove some items.
                </div>
              )}
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
                    onUpdate={updatePersonalItem}
                    bagType="personal-item"
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
          
          {suggestionsEnabled && (
            <Suggestions 
              bagType="carry-on"
              onAcceptSuggestion={(suggestion) => handleSuggestion("carry-on", suggestion)}
              acceptedSuggestions={acceptedSuggestions}
            />
          )}
          
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
                <input
                  type="number"
                  placeholder="Qty"
                  value={carryOnQuantity}
                  onChange={(e) => setCarryOnQuantity(e.target.value)}
                  min="1"
                  className="item-quantity-input"
                />
                <button type="submit" className="add-button" disabled={!isCarryOnFormValid()}>
                  Add Item
                </button>
              </div>
            </form>
          </div>
          
          <div 
            className="items-list"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "carry-on")}
          >
            <div className="drop-zone-message">Drop item here</div>
            <h3>Items ({carryOnItems.length})</h3>
            <div className={`weight-summary ${isWeightExceeded(carryOnTotalWeight, carryOnData.weightLimits[cabinClass]) ? 'weight-exceeded' : ''}`}>
              <span className="total-weight">
                Used: {carryOnTotalWeight.toFixed(1)} {weightUnit} • {isWeightExceeded(carryOnTotalWeight, carryOnData.weightLimits[cabinClass]) ? (
                  <span className="exceeded-text">
                    Weight exceeded by: {Math.abs(parseFloat(getRemainingWeight(carryOnTotalWeight, carryOnData.weightLimits[cabinClass]))).toFixed(1)} {weightUnit}
                  </span>
                ) : (
                  <span>
                    Remaining: {getRemainingWeight(carryOnTotalWeight, carryOnData.weightLimits[cabinClass])} {weightUnit}
                  </span>
                )}
              </span>
              {isWeightExceeded(carryOnTotalWeight, carryOnData.weightLimits[cabinClass]) && (
                <div className="weight-warning">
                  ⚠️ This bag's weight limit has been exceeded. Please remove some items.
                </div>
              )}
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
                    onUpdate={updateCarryOnItem}
                    bagType="carry-on"
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
                
                {suggestionsEnabled && (
                  <Suggestions 
                    bagType="checked-bag"
                    onAcceptSuggestion={(suggestion) => handleSuggestion("checked-bag", suggestion)}
                    acceptedSuggestions={acceptedSuggestions}
                  />
                )}
                
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
                      <input
                        type="number"
                        placeholder="Qty"
                        value={checkedBagQuantity}
                        onChange={(e) => setCheckedBagQuantity(e.target.value)}
                        min="1"
                        className="item-quantity-input"
                      />
                      <button type="submit" className="add-button" disabled={!isCheckedBagFormValid()}>
                        Add Item
                      </button>
                    </div>
                  </form>
                </div>
                
                <div 
                  className="items-list"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "checked-bag")}
                >
                  <div className="drop-zone-message">Drop item here</div>
                  <h3>Items ({checkedBagItems.length})</h3>
                  <div className={`weight-summary ${isWeightExceeded(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass]) ? 'weight-exceeded' : ''}`}>
                    <span className="total-weight">
                      Used: {checkedBagTotalWeight.toFixed(1)} {weightUnit} • {isWeightExceeded(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass]) ? (
                        <span className="exceeded-text">
                          Weight exceeded by: {Math.abs(parseFloat(getRemainingWeight(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass]))).toFixed(1)} {weightUnit}
                        </span>
                      ) : (
                        <span>
                          Remaining: {getRemainingWeight(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass])} {weightUnit}
                        </span>
                      )}
                    </span>
                    {isWeightExceeded(checkedBagTotalWeight, checkedBagData.weightLimits[cabinClass]) && (
                      <div className="weight-warning">
                        ⚠️ This bag's weight limit has been exceeded. Please remove some items.
                      </div>
                    )}
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
                          onUpdate={updateCheckedBagItem}
                          bagType="checked-bag"
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
                  
                  {suggestionsEnabled && (
                    <Suggestions 
                      bagType="checked-bag-2"
                      onAcceptSuggestion={(suggestion) => handleSuggestion("checked-bag-2", suggestion)}
                      acceptedSuggestions={acceptedSuggestions}
                    />
                  )}
                  
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
                        <input
                          type="number"
                          placeholder="Qty"
                          value={checkedBag2Quantity}
                          onChange={(e) => setCheckedBag2Quantity(e.target.value)}
                          min="1"
                          className="item-quantity-input"
                        />
                        <button type="submit" className="add-button" disabled={!isCheckedBag2FormValid()}>
                          Add Item
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div 
                    className="items-list"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "checked-bag-2")}
                  >
                    <div className="drop-zone-message">Drop item here</div>
                    <h3>Items ({checkedBag2Items.length})</h3>
                    <div className={`weight-summary ${isWeightExceeded(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass]) ? 'weight-exceeded' : ''}`}>
                      <span className="total-weight">
                        Used: {checkedBag2TotalWeight.toFixed(1)} {weightUnit} • {isWeightExceeded(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass]) ? (
                          <span className="exceeded-text">
                            Weight exceeded by: {Math.abs(parseFloat(getRemainingWeight(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass]))).toFixed(1)} {weightUnit}
                          </span>
                        ) : (
                          <span>
                            Remaining: {getRemainingWeight(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass])} {weightUnit}
                          </span>
                        )}
                      </span>
                      {isWeightExceeded(checkedBag2TotalWeight, checkedBagData.weightLimits[cabinClass]) && (
                        <div className="weight-warning">
                          ⚠️ This bag's weight limit has been exceeded. Please remove some items.
                        </div>
                      )}
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
                            onUpdate={updateCheckedBag2Item}
                            bagType="checked-bag-2"
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
