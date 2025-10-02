export function Sidebar({ setPage, currentPage }) {
  return (
    <div className="sidebar">
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
