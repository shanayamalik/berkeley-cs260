const LUGGAGE_TYPES = [
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

export default function LuggageOverview() {
  return (
    <div className="luggage-overview">
      <h1>Luggage types</h1>

      <div className="luggage-card">
        <div className="luggage-icon" aria-hidden="true">
          {LUGGAGE_TYPES[0].icon}
        </div>
        <div className="luggage-body">
          <div className="luggage-header">
            <h2 className="luggage-name">{LUGGAGE_TYPES[0].name}</h2>
            <span className="weight-badge">
              Max {LUGGAGE_TYPES[0].maxWeightLbs} lbs
            </span>
          </div>
          <p className="luggage-description">
            {LUGGAGE_TYPES[0].description}
          </p>
        </div>
      </div>

      <div className="luggage-card">
        <div className="luggage-icon" aria-hidden="true">
          {LUGGAGE_TYPES[1].icon}
        </div>
        <div className="luggage-body">
          <div className="luggage-header">
            <h2 className="luggage-name">{LUGGAGE_TYPES[1].name}</h2>
            <span className="weight-badge">
              Max {LUGGAGE_TYPES[1].maxWeightLbs} lbs
            </span>
          </div>
          <p className="luggage-description">
            {LUGGAGE_TYPES[1].description}
          </p>
        </div>
      </div>
    </div>
  );
}
