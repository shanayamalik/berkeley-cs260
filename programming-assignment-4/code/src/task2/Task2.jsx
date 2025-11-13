import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import alekhine from "./alekhine.png";
import janon from "./janon.png";
import guilin from "./guilin.png";
import jayne from "./jayne.png";

const planets = [
  {
    name: "Alekhine",
    image: alekhine,
    blurb: (
      <>
        <h2>Alekhine</h2>
        <p>
          Continents — or, more precisely, islands — on the largely aquatic
          planet of Alekhine are in a perpetual state of rotational drift.
          Though the largest islands rotate only a few degrees per year, small
          islands are known to spin freely, some completing a single revolution
          in just a few hours.
        </p>
        <p>
          A tradition of intellectual curiosity goes back on this planet as far
          as human settlers do, in large part due to an early demand to bring
          clever problem-solvers in as settlers. How do you plan a city across
          an archipelago of individually-rotating islands? How can you maintain
          utility lines and train tracks? Only by enticing the best city
          planners, engineers, and even graph theorists did local governments
          get a hold on the complexity.
        </p>
        <p>
          Now that the basic issues are largely ironed out, the residents of
          Alekhine have found other ways to spend their time. Tall buildings,
          many painted a creamy white, host some of the galaxy’s most
          prestigious academic institutions. Some residents have taken to
          designing island-scale puzzles for visitors, requiring participants to
          summon their ingenuity to unpack the complexities of the ground
          rotating under their feet.
        </p>
        <p>
          Others choose a simpler life, riding the uniquely-circular waves on
          custom surfboards or tending to extravagant gardens that don’t require
          plants to be manually rotated. On Alekhine, humans have conquered the
          strange dynamic geology to their own benefit.
        </p>
      </>
    ),
  },
  {
    name: "Janon",
    image: janon,
    blurb: (
      <>
        <h2>Janon</h2>
        <p>
          The planet Janon is filled to the brim with nature, both oddly
          familiar and completely bewildering to natives of Earth. Equalizing
          wind currents leave most of the planet at an equally tropical
          temperature, lush with fractal tree-like plants, dotted with
          reservoirs of mostly-fresh water, and populated with beasts both
          mighty and meek. Compared to organisms on Earth, animals tend to be
          less astute (and none is nearly as intelligent as Earth’s primates
          are), but plants seem to flourish in coordinated patterns, leaving
          some to believe that they possess some limited intelligence of their
          own.
        </p>
        <p>
          Human outposts are hard to come by, since building them involves
          cutting through dense jungle in most parts of the world. Those
          settlements that do exist tend to be densely populated, with
          tightly-packed tall buildings that look over canopies of trees off in
          the distance.
        </p>
        <p>
          Janon is known for its exquisite cuisine, a trait unfortunately not
          coincidental with its rich wildlife; animals’ naturally-evolved
          instincts on the planet are no match for the skills of even a
          rudimentary hunter. Already some of the most delectable species on the
          planet are considered endangered, just a few generations after
          humanity systematically catalogued which meats were safe to eat, which
          were toxic, and which seem to just give you the runs.
        </p>
        <p>
          The crown jewel of Janon is Valoret, a city built in a rare clearing
          occupying around a hundred thousand acres. Local cuisine from around
          the planet is imported into the city, kept fresh only by the
          efficiency of a one-of-a-kind aerial logistics system that is held
          aloft by the globe’s natural wind currents. Beyond the clearing,
          suburbs expand outwards into the surrounding rainforest, connected by
          an underground transportation system that keeps the aboveground
          biosphere largely untouched.
        </p>
      </>
    ),
  },
  {
    name: "Guilin",
    image: guilin,
    blurb: (
      <>
        <h2>Guilin</h2>
        <p>
          Owing to its regular seismic activity, the planet Guilin is a haven
          for those who enjoy hot springs and impressive geyser displays.
          Downward erosion caused by fast-moving water has crafted tall stone
          towers in many regions on the planet, not unlike the world’s namesake
          back on Earth.
        </p>
        <p>
          The largest springs have been commercialized in resorts not unlike
          water parks, and sizable cities analogous to Earth’s beach towns have
          sprung up in support of these resorts. Those looking for a quieter
          place to appreciate the scenery will find no shortage of more private
          springs, especially far from the more densely-populated areas.
        </p>
        <p>
          The natural spires of Guilin have been a foundation for thrill-seeking
          activities like bungee jumping and rock climbing, but they also serve
          as serene outlooks for the beautiful vistas of the planet’s features,
          especially where elevators have been carved into the side of the stone
          for easier access to the summits.
        </p>
        <p>
          Guilin’s natural features aren’t limited to just spires and hot
          springs. It doesn’t take much travel to explore a myriad of geographic
          wonders far surpassing anything Earth has to offer. The planet’s
          public transit is limited, however, since the difficult terrain limits
          what kinds of infrastructure can be built. Bring your own hovercraft!
        </p>
      </>
    ),
  },
  {
    name: "Jayne",
    image: jayne,
    blurb: (
      <>
        <h2>Jayne</h2>
        <p>
          The planet Jayne, despite its hot weather and limited access to
          drinking water, is a monument to manual handiwork and a marvel of
          modern sculpture. Every historical figure, even those of middling
          significance, is personally commemorated by a life-sized statue. No
          one knows how many statues are present on the planet, but current
          estimates suggest that Jayne’s largest city adds dozens to the count
          every day. There are figures here enshrined in stone who don’t even
          meet the notability requirements of Galactic Wikipedia.
        </p>
        <p>
          For reasons that are fuzzy even to the most dedicated historians,
          Jayne’s cities have universally adopted a policy of redistributing
          wealth through a monthly ceremony during which golden coins are
          dropped from the sky by aerial vehicles. Some question the
          distribution mechanism, but no one is willing to reform the system if
          it means breaking tradition.
        </p>
        <p>
          If you happen to be present during a distribution, even as a tourist,
          you’re welcome to take what you can grab! Some penny-pinching visitors
          have been known to break even on their visits to the planet.
        </p>
        <p>
          Traditionally, the exact timing of the monthly money-drop comes as a
          surprise to residents. When the gold is dropped during just the right
          twilight, some say, not without a hint of nostalgia, that the tumbling
          coins off in the distance twinkle like fireflies.
        </p>
      </>
    ),
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600',
        margin: 0,
        color: '#111827'
      }}>
        Planet Finder
      </h1>
      {!isHome && (
        <button
          onClick={() => {
            navigate("../..", {
              relative: "path",
            });
          }}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            backgroundColor: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ← Back
        </button>
      )}
    </header>
  );
}

function Home() {
  const navigate = useNavigate();
  const [suggestInput, setSuggestInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggest = useCallback(async () => {
    if (!suggestInput.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://noggin.rea.gent/specific-cod-7980", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer rg_v1_7y2acrianxj75bgbypmjtf20pdw3ewhr5neb_ngk",
        },
        body: JSON.stringify({ query: suggestInput }),
      });

      const data = await response.text();
      const result = JSON.parse(data);
      
      // Extract planet name and explanation
      const planetName = result.planet.toLowerCase();
      const explanationText = result.explanation || "";
      
      // Navigate to the planet page with explanation in state
      navigate(`/task2/planet/${planetName}`, {
        state: { explanation: explanationText }
      });
    } catch (error) {
      console.error("Error getting planet recommendation:", error);
      // Fallback: navigate to a default planet if there's an error
      alert("Sorry, we couldn't process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [suggestInput, navigate]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Search Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Find Your Perfect Planet
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Tell us what you're looking for in your next interstellar destination
        </p>
        
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Describe your ideal vacation..."
              value={suggestInput}
              onChange={(e) => setSuggestInput(e.target.value)}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                fontSize: '0.9375rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s',
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
            <button
              type="submit"
              onClick={suggest}
              disabled={isLoading || !suggestInput.trim()}
              style={{
                padding: '0.875rem 1.75rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: isLoading || !suggestInput.trim() ? '#9ca3af' : '#3b82f6',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: isLoading || !suggestInput.trim() ? '#e5e7eb' : '#3b82f6',
                borderRadius: '0.5rem',
                cursor: isLoading || !suggestInput.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isLoading && suggestInput.trim()) {
                  e.target.style.backgroundColor = '#eff6ff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && suggestInput.trim()) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {isLoading ? "Thinking..." : "Help me choose"}
            </button>
          </div>
        </form>
      </div>

      {/* Planet Cards */}
      <div>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#374151'
        }}>
          Or browse all destinations
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1rem' 
        }}>
          {planets.map((planet) => (
            <div
              key={planet.name}
              role="button"
              onClick={() => navigate(`/task2/planet/${planet.name.toLowerCase()}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                width: '100%', 
                height: '200px',
                overflow: 'hidden',
                backgroundColor: '#f9fafb'
              }}>
                <img
                  src={planet.image}
                  alt={`A depiction of the planet ${planet.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
              <div style={{ 
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600',
                  margin: 0,
                  color: '#111827'
                }}>
                  {planet.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanetBlurb({ name }) {
  const location = useLocation();
  const explanation = location.state?.explanation;
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  
  const planet = planets.find((p) => p.name.toLowerCase() === name);
  if (!planet) return <div>Planet not found.</div>;
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      {explanation && (
        <div 
          style={{ 
            marginBottom: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              backgroundColor: '#eff6ff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#111827',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#dbeafe';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#eff6ff';
            }}
          >
            <span>💡 Why this planet?</span>
            <span style={{ 
              fontSize: '0.75rem',
              transition: 'transform 0.3s ease',
              transform: isExplanationOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}>
              ▾
            </span>
          </button>
          {isExplanationOpen && (
            <div 
              style={{ 
                padding: '1rem 1.25rem',
                backgroundColor: 'white',
                fontSize: '0.9375rem',
                color: '#374151',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              {explanation}
            </div>
          )}
        </div>
      )}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ 
          flex: '0 0 320px',
          overflow: 'hidden',
          borderRadius: '0.5rem',
        }}>
          <img
            src={planet.image}
            alt={`A depiction of the planet ${planet.name}`}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
        <div style={{ 
          flex: 1, 
          fontSize: '0.9rem',
          lineHeight: '1.6'
        }}>
          {planet.blurb}
        </div>
      </div>
    </div>
  );
}

export default function Task2() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planet/:planetName" element={<PlanetBlurbWrapper />} />
      </Routes>
    </div>
  );
}

function PlanetBlurbWrapper() {
  const { planetName } = useParams();
  return <PlanetBlurb name={planetName} />;
}
