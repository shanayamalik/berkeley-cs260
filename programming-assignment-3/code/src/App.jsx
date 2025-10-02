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
  const [personalItemQuantity, setPersonalItemQuantity] = useState("1");
  
  // Form state for adding new items to carry-on bag
  const [carryOnName, setCarryOnName] = useState("");
  const [carryOnWeight, setCarryOnWeight] = useState("");
  const [carryOnQuantity, setCarryOnQuantity] = useState("1");
  
  // Form state for adding new items to checked bag
  const [checkedBagName, setCheckedBagName] = useState("");
  const [checkedBagWeight, setCheckedBagWeight] = useState("");
  const [checkedBagQuantity, setCheckedBagQuantity] = useState("1");
  
  // Form state for adding new items to checked bag 2
  const [checkedBag2Name, setCheckedBag2Name] = useState("");
  const [checkedBag2Weight, setCheckedBag2Weight] = useState("");
  const [checkedBag2Quantity, setCheckedBag2Quantity] = useState("1");

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
