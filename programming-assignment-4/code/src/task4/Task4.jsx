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

    try {
      // Read the uploaded image as a data URL
      const dataUrl = await readDataUrlFromFileInput(e.target.file);

      // Send the image to the Noggin for analysis
      const response = await fetch(
        'https://noggin.rea.gent/jolly-horse-5272',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_wtk1z1nsycmb3765r398phmykhpi08nobuwt_ngk',
          },
          body: JSON.stringify({
            game_image: dataUrl,
          }),
        }
      );

      const responseText = await response.text();
      console.log("Raw response from Noggin:", responseText);
      
      // Check for HTTP errors before parsing
      if (!response.ok) {
        console.error("Noggin HTTP error:", response.status, responseText);
        throw new Error(`Failed to analyze image: server returned an error (status ${response.status})`);
      }
      
      // Parse the JSON response
      const data = JSON.parse(responseText);
      console.log("Parsed data:", data);

      // Pre-fill the form with extracted data (only if values exist and aren't null)
      setForm((f) => ({
        ...f,
        name: (data.title && data.title !== null) ? data.title : f.name,
        minAge: (data.min_age && data.min_age !== null) ? String(data.min_age) : f.minAge,
        expectedPlaytime: (data.playtime && data.playtime !== null) ? String(data.playtime) : f.expectedPlaytime,
      }));

      // Parse players field (e.g., "2-4" -> minPlayers: 2, maxPlayers: 4)
      if (data.players && data.players !== null) {
        const playersMatch = data.players.match(/(\d+)\s*-\s*(\d+)/);
        if (playersMatch) {
          // Range format: "2-4"
          setForm((f) => ({
            ...f,
            minPlayers: playersMatch[1],
            maxPlayers: playersMatch[2],
          }));
        } else if (data.players.match(/(\d+)\+/)) {
          // "Plus" format: "2+"
          const minMatch = data.players.match(/(\d+)\+/);
          setForm((f) => ({
            ...f,
            minPlayers: minMatch[1],
          }));
        } else if (data.players.match(/^\d+$/)) {
          // Single number: "4"
          setForm((f) => ({
            ...f,
            minPlayers: data.players,
            maxPlayers: data.players,
          }));
        }
      }

    } catch (error) {
      console.error("Error analyzing image:", error);
      console.error("Error details:", error.message);
      alert(`Failed to analyze image: ${error.message}\n\nPlease try again or fill out the form manually.`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', margin: 0 }}>
          Game inventory
        </h1>
      </header>

      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem' }}>
        Add new game
      </h2>
      <div className="upload-form" style={{ marginBottom: '1.25rem' }}>
        <form
          onSubmit={handleUpload}
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: '1.25rem'
          }}
        >
          <input 
            type="file" 
            name="file" 
            accept="image/*"
            className="form-control"
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
            }}
          />
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: uploading ? '#9ca3af' : '#3b82f6',
              backgroundColor: 'white',
              border: uploading ? '1px solid #d1d5db' : '1px solid #3b82f6',
              borderRadius: '6px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              if (!uploading) e.target.style.backgroundColor = '#eff6ff';
            }}
            onMouseOut={(e) => {
              if (!uploading) e.target.style.backgroundColor = 'white';
            }}
          >
            {uploading ? "Processing..." : "AI 🪄"}
          </button>
        </form>
      </div>

      <div className="new-game-form" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleAddGame} style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          border: '1px solid #e5e7eb' 
        }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Game title
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleFormChange}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Min Players
              </label>
              <input
                type="number"
                name="minPlayers"
                min="1"
                value={form.minPlayers}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Max Players
              </label>
              <input
                type="number"
                name="maxPlayers"
                min="1"
                value={form.maxPlayers}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Minimum Age
            </label>
            <input
              type="number"
              name="minAge"
              min="0"
              value={form.minAge}
              onChange={handleFormChange}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Expected playtime (minutes)
            </label>
            <input
              type="number"
              name="expectedPlaytime"
              min="0"
              value={form.expectedPlaytime}
              onChange={handleFormChange}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button 
              type="submit" 
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                color: '#3b82f6',
                backgroundColor: 'white',
                border: '1px solid #3b82f6',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#eff6ff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
              Add game
            </button>
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
