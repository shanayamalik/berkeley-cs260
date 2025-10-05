export function Sidebar({ setPage, currentPage }) {
  // Dynamic sidebar class based on current page
  const sidebarClass = currentPage === "planner" ? "sidebar sidebar-compact" : "sidebar sidebar-wide";
  
  return (
    <div className={sidebarClass}>
      <h1 className="sidebar-title">Smart Luggage Planner</h1>
      <ul>
        <li>
          <a
            href="#"
            className={currentPage === "luggage-overview" ? "active" : ""}
            onClick={() => {
              setPage("luggage-overview");
            }}
          >
            Luggage types
          </a>
        </li>
        <li>
          <a
            href="#"
            className={currentPage === "planner" ? "active" : ""}
            onClick={() => {
              setPage("planner");
            }}
          >
            Planner
          </a>
        </li>
        <li>
          <a
            href="#"
            className={currentPage === "summary" ? "active" : ""}
            onClick={() => {
              setPage("summary");
            }}
          >
            Summary
          </a>
        </li>
      </ul>
    </div>
  );
}
