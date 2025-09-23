import { useState } from "react";

export default function Planner() {
  const [personalItemItems, setPersonalItemItems] = useState([]);
  const [carryOnItems, setCarryOnItems] = useState([]);

  return (
    <div className="planner">
      <h1>Planner</h1>
    </div>
  );
}
