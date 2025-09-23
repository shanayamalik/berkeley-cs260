import { useState } from "react";
import { Sidebar } from "./Sidebar";
import LuggageOverview from "./pages/luggage-overview/LuggageOverview";
import Planner from "./pages/planner/Planner";

function App() {
  const [page, setPage] = useState("luggage-overview");

  return (
    <div className="app">
      <Sidebar setPage={setPage} />
      <div className="main">
        {page === "luggage-overview" ? <LuggageOverview /> : null}
        {page === "planner" ? <Planner /> : null}
      </div>
    </div>
  );
}

export default App;
