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
