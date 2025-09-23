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

      {/* This feels pretty redundant... */}

      <div className="luggage-type">
        <h2>{LUGGAGE_TYPES[0].name}</h2>
        <p>{LUGGAGE_TYPES[0].icon}</p>
        <p>Max weight: {LUGGAGE_TYPES[0].maxWeightLbs} lbs</p>
        <p>{LUGGAGE_TYPES[0].description}</p>
      </div>

      <div className="luggage-type">
        <h2>{LUGGAGE_TYPES[1].name}</h2>
        <p>{LUGGAGE_TYPES[1].icon}</p>
        <p>Max weight: {LUGGAGE_TYPES[1].maxWeightLbs} lbs</p>
        <p>{LUGGAGE_TYPES[1].description}</p>
      </div>
    </div>
  );
}
