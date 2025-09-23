export function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a
            href="#"
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
            onClick={() => {
              setPage("planner");
            }}
          >
            Planner
          </a>
        </li>
      </ul>
    </div>
  );
}
