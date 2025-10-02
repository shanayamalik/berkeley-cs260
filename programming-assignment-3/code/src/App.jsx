import { useState } from "react";
import { Sidebar } from "./Sidebar";
import LuggageOverview from "./pages/luggage-overview/LuggageOverview";
import Planner from "./pages/planner/Planner";
import Summary from "./pages/summary/Summary";

function App() {
  const [page, setPage] = useState("luggage-overview");
  
  // Luggage state - lifted up from Planner
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

  // Create luggage data object to pass to child components
  const luggageData = {
    personalItemItems,
    carryOnItems,
    checkedBagItems,
    checkedBag2Items,
    cabinClass,
    weightUnit,
    personalItemName,
    personalItemWeight,
    carryOnName,
    carryOnWeight,
    checkedBagName,
    checkedBagWeight,
    checkedBag2Name,
    checkedBag2Weight
  };

  // Create luggage actions object to pass to Planner
  const luggageActions = {
    setPersonalItemItems,
    setCarryOnItems,
    setCheckedBagItems,
    setCheckedBag2Items,
    setCabinClass,
    setWeightUnit,
    setPersonalItemName,
    setPersonalItemWeight,
    setCarryOnName,
    setCarryOnWeight,
    setCheckedBagName,
    setCheckedBagWeight,
    setCheckedBag2Name,
    setCheckedBag2Weight
  };

  return (
    <div className="app">
      <Sidebar setPage={setPage} />
      <div className="main">
        {page === "luggage-overview" ? <LuggageOverview cabinClass={cabinClass} setCabinClass={setCabinClass} /> : null}
        {page === "planner" ? <Planner luggageData={luggageData} luggageActions={luggageActions} /> : null}
        {page === "summary" ? <Summary luggageData={luggageData} /> : null}
      </div>
    </div>
  );
}

export default App;
