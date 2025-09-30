import { useState } from 'react';

const LUGGAGE_TYPES = [
  {
    icon: "🎒",
    name: "Personal item",
    maxWeightLbs: 15,
    description: "A small bag that fits under the seat in front of you.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
  },
  {
    icon: "💼",
    name: "Carry-on",
    maxWeightLbs: 22,
    description: "A larger bag that fits in the overhead bin.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
  },
  {
    icon: "🧳",
    name: "Checked bag",
    maxWeightLbs: 50,
    description:
      "A bag that is checked at the gate and stored in the cargo hold.",
    allowedInBasicEconomy: false,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
  },
];

// Reusable component for individual luggage types
function LuggageType({ icon, name, maxWeightLbs, description }) {
  return (
    <div className="luggage-card">
      <div className="luggage-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="luggage-body">
        <div className="luggage-header">
          <h2 className="luggage-name">{name}</h2>
          <span className="weight-badge">
            Max {maxWeightLbs} lbs
          </span>
        </div>
        <p className="luggage-description">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LuggageOverview() {
  // State variable to track the selected fare class
  const [fareClass, setFareClass] = useState('basic-economy');

  // Helper function to determine if a luggage type is allowed for the current fare class
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
      
      <label>
        Fare class: 
        <select 
          value={fareClass} 
          onChange={(e) => setFareClass(e.target.value)}
        >
          <option value="basic-economy">Basic Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business Class</option>
          <option value="first">First Class</option>
        </select>
      </label>

      {/* Dynamic rendering: iterate over LUGGAGE_TYPES array to create components */}
      {LUGGAGE_TYPES
        .filter(luggageType => isLuggageAllowed(luggageType))
        .map((luggageType, index) => (
          <LuggageType
            key={index}
            icon={luggageType.icon}
            name={luggageType.name}
            maxWeightLbs={luggageType.maxWeightLbs}
            description={luggageType.description}
          />
        ))}
    </div>
  );
}
