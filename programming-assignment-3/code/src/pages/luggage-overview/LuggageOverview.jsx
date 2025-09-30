const LUGGAGE_TYPES = [
  {
    icon: "🎒",
    name: "Personal item",
    maxWeightLbs: 15,
    description: "A small bag that fits under the seat in front of you.",
  },
  {
    icon: "💼",
    name: "Carry-on",
    maxWeightLbs: 22,
    description: "A larger bag that fits in the overhead bin.",
  },
  {
    icon: "🧳",
    name: "Checked bag",
    maxWeightLbs: 50,
    description:
      "A bag that is checked at the gate and stored in the cargo hold.",
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
  return (
    <div className="luggage-overview">
      <h1>Luggage types</h1>
      
      {LUGGAGE_TYPES.map((luggageType, index) => (
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
