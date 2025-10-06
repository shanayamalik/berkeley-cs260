import { useState } from 'react';
import { LUGGAGE_TYPES } from '../../data/luggageTypes';

// Reusable component for individual luggage types
function LuggageType({ icon, name, maxWeightLbs, description, bagLimit }) {
  // Convert lbs to kg (1 lb = 0.453592 kg, rounded to nearest 0.5 kg)
  const maxWeightKg = Math.round(maxWeightLbs * 0.453592 * 2) / 2;
  
  return (
    <div className="luggage-card">
      <div className="luggage-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="luggage-body">
        <div className="luggage-header">
          <h2 className="luggage-name">{name}</h2>
          <div className="luggage-badges">
            {bagLimit > 1 && (
              <span className="bag-badge">
                Up to {bagLimit} bags
              </span>
            )}
            <span className="weight-badge">
              Max {maxWeightLbs} lbs ({maxWeightKg} kg){bagLimit > 1 ? ' per bag' : ''}
            </span>
          </div>
        </div>
        <p className="luggage-description">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LuggageOverview({ cabinClass, setCabinClass }) {
  const [showFeatures, setShowFeatures] = useState(false);
  
  // Helper function to determine if a luggage type is allowed for the current cabin class
  const isLuggageAllowed = (luggageType) => {
    switch (cabinClass) {
      case 'basic-economy':
        return luggageType.allowedInBasicEconomy;
      case 'premium-economy':
        return luggageType.allowedInPremiumEconomy;
      case 'business':
        return luggageType.allowedInBusiness;
      case 'first':
        return luggageType.allowedInFirst;
      default:
        return true;
    }
  };

  return (
    <div className="luggage-overview">
      <h1>Luggage types</h1>
      
      {/* Features Panel */}
      <div className="features-panel">
        <button 
          className="features-toggle"
          onClick={() => setShowFeatures(!showFeatures)}
          aria-expanded={showFeatures}
        >
          ℹ️ New Features Added {showFeatures ? '▼' : '▶'}
        </button>
        
        {showFeatures && (
          <div className="features-content">
            <ul>
              <li><strong>Drag & Drop:</strong> move items between bags by dragging them</li>
              <li><strong>Inline Editing:</strong> click the edit icon to modify item names and weights directly</li>
              <li><strong>Smart Packing Suggestions:</strong> toggle on provides packing recommendations</li>
              <li><strong>Persistent Storage:</strong> bags are saved and loaded from local storage</li>
              <li><strong>Weight Calculations:</strong> real-time weight tracking with option for unit selection (lbs/kg)</li>
              <li><strong>Cabin Class Selection:</strong> bag availability and weight limit changes based on the selected class</li>
              <li><strong>Moving Items Across Bags:</strong> reorder items within a bag, or move items between bags</li>
              <li><strong>Visual Summary:</strong> button for chart on Summary page shows weight distribution of items across bags</li>
            </ul>
          </div>
        )}
      </div>
      
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
      </div>

      {/* Dynamic rendering: iterate over LUGGAGE_TYPES array to create components */}
      {LUGGAGE_TYPES
        .filter(luggageType => isLuggageAllowed(luggageType))
        .map((luggageType, index) => (
          <LuggageType
            key={index}
            icon={luggageType.icon}
            name={luggageType.name}
            maxWeightLbs={luggageType.weightLimits[cabinClass]}
            description={luggageType.description}
            bagLimit={luggageType.bagLimits[cabinClass]}
          />
        ))}
    </div>
  );
}
