import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import LuggageOverview from "./pages/luggage-overview/LuggageOverview";
import Planner from "./pages/planner/Planner";
import Summary from "./pages/summary/Summary";
import { saveLuggageData, loadLuggageData, clearLuggageData, isLocalStorageAvailable } from "./utils/localStorage";

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
  const [personalItemQuantity, setPersonalItemQuantity] = useState("");
  
  // Form state for adding new items to carry-on bag
  const [carryOnName, setCarryOnName] = useState("");
  const [carryOnWeight, setCarryOnWeight] = useState("");
  const [carryOnQuantity, setCarryOnQuantity] = useState("");
  
  // Form state for adding new items to checked bag
  const [checkedBagName, setCheckedBagName] = useState("");
  const [checkedBagWeight, setCheckedBagWeight] = useState("");
  const [checkedBagQuantity, setCheckedBagQuantity] = useState("");
  
  // Form state for adding new items to checked bag 2
  const [checkedBag2Name, setCheckedBag2Name] = useState("");
  const [checkedBag2Weight, setCheckedBag2Weight] = useState("");
  const [checkedBag2Quantity, setCheckedBag2Quantity] = useState("");

  // Suggestions state
  const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);

  // Load saved data on component mount
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const savedData = loadLuggageData();
      if (savedData) {
        // Restore luggage items
        if (savedData.personalItemItems) setPersonalItemItems(savedData.personalItemItems);
        if (savedData.carryOnItems) setCarryOnItems(savedData.carryOnItems);
        if (savedData.checkedBagItems) setCheckedBagItems(savedData.checkedBagItems);
        if (savedData.checkedBag2Items) setCheckedBag2Items(savedData.checkedBag2Items);
        
        // Restore settings
        if (savedData.cabinClass) setCabinClass(savedData.cabinClass);
        if (savedData.weightUnit) setWeightUnit(savedData.weightUnit);
        
        // Restore form states
        if (savedData.personalItemName !== undefined) setPersonalItemName(savedData.personalItemName);
        if (savedData.personalItemWeight !== undefined) setPersonalItemWeight(savedData.personalItemWeight);
        if (savedData.personalItemQuantity !== undefined) setPersonalItemQuantity(savedData.personalItemQuantity);
        if (savedData.carryOnName !== undefined) setCarryOnName(savedData.carryOnName);
        if (savedData.carryOnWeight !== undefined) setCarryOnWeight(savedData.carryOnWeight);
        if (savedData.carryOnQuantity !== undefined) setCarryOnQuantity(savedData.carryOnQuantity);
        if (savedData.checkedBagName !== undefined) setCheckedBagName(savedData.checkedBagName);
        if (savedData.checkedBagWeight !== undefined) setCheckedBagWeight(savedData.checkedBagWeight);
        if (savedData.checkedBagQuantity !== undefined) setCheckedBagQuantity(savedData.checkedBagQuantity);
        if (savedData.checkedBag2Name !== undefined) setCheckedBag2Name(savedData.checkedBag2Name);
        if (savedData.checkedBag2Weight !== undefined) setCheckedBag2Weight(savedData.checkedBag2Weight);
        if (savedData.checkedBag2Quantity !== undefined) setCheckedBag2Quantity(savedData.checkedBag2Quantity);
        
        // Restore suggestions state
        if (savedData.acceptedSuggestions) setAcceptedSuggestions(savedData.acceptedSuggestions);
        if (savedData.suggestionsEnabled !== undefined) setSuggestionsEnabled(savedData.suggestionsEnabled);
      }
    }
  }, []);

  // Auto-save data whenever state changes
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const dataToSave = {
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
        checkedBag2Quantity,
        acceptedSuggestions,
        suggestionsEnabled
      };
      saveLuggageData(dataToSave);
    }
  }, [
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
    checkedBag2Quantity,
    acceptedSuggestions,
    suggestionsEnabled
  ]);

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
    checkedBag2Quantity,
    acceptedSuggestions,
    suggestionsEnabled
  };

  // Reset function to clear all data
  const resetAllData = () => {
    // Clear localStorage
    clearLuggageData();
    
    // Reset all state
    setPersonalItemItems([]);
    setCarryOnItems([]);
    setCheckedBagItems([]);
    setCheckedBag2Items([]);
    setCabinClass("basic-economy");
    setWeightUnit("lbs");
    setPersonalItemName("");
    setPersonalItemWeight("");
    setPersonalItemQuantity("");
    setCarryOnName("");
    setCarryOnWeight("");
    setCarryOnQuantity("");
    setCheckedBagName("");
    setCheckedBagWeight("");
    setCheckedBagQuantity("");
    setCheckedBag2Name("");
    setCheckedBag2Weight("");
    setCheckedBag2Quantity("");
    setAcceptedSuggestions([]);
    setSuggestionsEnabled(true);
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
    setCheckedBag2Quantity,
    setAcceptedSuggestions,
    setSuggestionsEnabled,
    resetAllData
  };

  return (
    <div className="app">
      <Sidebar setPage={setPage} currentPage={page} />
      <div className="main">
        {page === "luggage-overview" ? <LuggageOverview cabinClass={cabinClass} setCabinClass={setCabinClass} /> : null}
        {page === "planner" ? <Planner luggageData={luggageData} luggageActions={luggageActions} /> : null}
        {page === "summary" ? <Summary luggageData={luggageData} /> : null}
      </div>
    </div>
  );
}

export default App;
