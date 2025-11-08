import React, { useState } from "react";

function GameCard({ game }) {
  return (
    <div className="game mb-3 p-3 border rounded" style={{ width: 400 }}>
      <h3 className="game-name">{game.name}</h3>
      <div className="game-data d-flex justify-content-between">
        <div>
          <p className="game-players mb-1">
            Players:
            <br />
            {game.minPlayers && game.maxPlayers
              ? game.minPlayers === game.maxPlayers
                ? game.minPlayers
                : `${game.minPlayers} - ${game.maxPlayers}`
              : game.minPlayers
              ? `${game.minPlayers}+`
              : game.maxPlayers
              ? `Up to ${game.maxPlayers}`
              : ""}
          </p>
        </div>
        {game.minAge && (
          <p className="game-age mb-1">
            Minimum age:
            <br />
            {game.minAge}
          </p>
        )}
        {game.expectedPlaytime && (
          <p className="game-playtime mb-1">
            Expected playtime:
            <br />
            {game.expectedPlaytime} minutes
          </p>
        )}
      </div>
    </div>
  );
}

async function readDataUrlFromFileInput(fileInput) {
  return new Promise((resolve, reject) => {
    const file = fileInput.files[0];
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });
}

export default function Task4() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    name: "",
    minPlayers: "",
    maxPlayers: "",
    minAge: "",
    expectedPlaytime: "",
  });
  const [uploading, setUploading] = useState(false);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleAddGame(e) {
    e.preventDefault();
    setGames((games) => [
      ...games,
      {
        name: form.name,
        minPlayers: form.minPlayers,
        maxPlayers: form.maxPlayers,
        minAge: form.minAge,
        expectedPlaytime: form.expectedPlaytime,
      },
    ]);
    setForm({
      name: "",
      minPlayers: "",
      maxPlayers: "",
      minAge: "",
      expectedPlaytime: "",
    });
  }

  async function handleUpload(e) {
    e.preventDefault();
    setUploading(true);

    // YOUR CODE HERE
    const file = await readDataUrlFromFileInput(e.target.file);

    setUploading(false);
  }

  return (
    <div className="container">
      <header>
        <h1>Game inventory</h1>
      </header>

      <h2>Add new game</h2>
      <div className="upload-form mb-4">
        <form
          onSubmit={handleUpload}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <input type="file" name="file" className="form-control" />
          <input
            type="submit"
            value={uploading ? "Processing..." : "AI 🪄"}
            className="btn btn-primary"
            disabled={uploading}
          />
        </form>
      </div>

      <div className="new-game-form mb-4">
        <form onSubmit={handleAddGame}>
          <div className="form-group row mb-4">
            <label htmlFor="game-name" className="col-sm-2 col-form-label">
              Game title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={form.name}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <label htmlFor="min-players" className="col-sm-2 col-form-label">
              Min Players
            </label>
            <div className="col-sm-4">
              <input
                type="number"
                name="minPlayers"
                className="form-control"
                min="1"
                value={form.minPlayers}
                onChange={handleFormChange}
              />
            </div>
            <label htmlFor="max-players" className="col-sm-2 col-form-label">
              Max Players
            </label>
            <div className="col-sm-4">
              <input
                type="number"
                name="maxPlayers"
                className="form-control"
                min="1"
                value={form.maxPlayers}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <label htmlFor="min-age" className="col-sm-2 col-form-label">
              Minimum Age
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="minAge"
                className="form-control"
                min="0"
                value={form.minAge}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <label
              htmlFor="expected-playtime"
              className="col-sm-4 col-form-label"
            >
              Expected playtime (minutes)
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                name="expectedPlaytime"
                className="form-control"
                min="0"
                value={form.expectedPlaytime}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="col-sm-12 text-end">
            <input type="submit" value="Add game" className="btn btn-primary" />
          </div>
        </form>
      </div>

      <h2>Games</h2>
      <section className="d-flex flex-wrap gap-3 justify-content-center">
        {games.map((game, idx) => (
          <GameCard key={idx} game={game} />
        ))}
      </section>
    </div>
  );
}
