import { useState } from 'react';

const LUGGAGE_TYPES = [
  {
    icon: "🎒",
    name: "Personal Item",
    maxWeightLbs: 15,
    description: "A small bag that fits under the seat in front of you.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Weight and bag limits are the same across all cabin classes for personal items
    weightLimits: {
      'basic-economy': 15,
      'premium-economy': 15,
      'business': 15,
      'first': 15
    },
    bagLimits: {
      'basic-economy': 1,
      'premium-economy': 1,
      'business': 1,
      'first': 1
    }
  },
  {
    icon: "💼",
    name: "Carry-On",
    maxWeightLbs: 22,
    description: "A larger bag that fits in the overhead bin.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Weight and bag limits are the same across all cabin classes for carry-on
    weightLimits: {
      'basic-economy': 22,
      'premium-economy': 22,
      'business': 22,
      'first': 22
    },
    bagLimits: {
      'basic-economy': 1,
      'premium-economy': 1,
      'business': 1,
      'first': 1
    }
  },
  {
    icon: "🧳",
    name: "Checked Bag",
    maxWeightLbs: 50,
    description: "A bag that is checked at the gate and stored in the cargo hold.",
    allowedInBasicEconomy: false,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Different weight and bag limits for checked bags based on cabin class
    weightLimits: {
      'basic-economy': 0, // Not allowed
      'premium-economy': 50,
      'business': 70,
      'first': 70
    },
    bagLimits: {
      'basic-economy': 0, // Not allowed
      'premium-economy': 1,
      'business': 2,
      'first': 3
    }
  },
];

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

export default function LuggageOverview() {
  // State variable to track the selected cabin class
  const [fareClass, setFareClass] = useState('basic-economy');

  // Helper function to determine if a luggage type is allowed for the current cabin class
  const isLuggageAllowed = (luggageType) => {
    switch (fareClass) {
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
      
      <div className="fare-selector">
        <label htmlFor="fare-class-select" className="fare-label">
          Select Cabin Class:
        </label>
        <select 
          id="fare-class-select"
          className="fare-dropdown"
          value={fareClass} 
          onChange={(e) => setFareClass(e.target.value)}
        >
          <option value="basic-economy">Basic Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business Class</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* Dynamic rendering: iterate over LUGGAGE_TYPES array to create components */}
      {LUGGAGE_TYPES
        .filter(luggageType => isLuggageAllowed(luggageType))
        .map((luggageType, index) => (
          <LuggageType
            key={index}
            icon={luggageType.icon}
            name={luggageType.name}
            maxWeightLbs={luggageType.weightLimits[fareClass]}
            description={luggageType.description}
            bagLimit={luggageType.bagLimits[fareClass]}
          />
        ))}
    </div>
  );
}
