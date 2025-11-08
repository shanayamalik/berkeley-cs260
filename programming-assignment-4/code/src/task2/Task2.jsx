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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <h1>Planet finder</h1>
      {!isHome && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (isHome) navigate("/");
            else
              navigate("../..", {
                relative: "path",
              });
          }}
        >
          Back
        </button>
      )}
    </header>
  );
}

function Home() {
  const navigate = useNavigate();
  const [suggestInput, setSuggestInput] = useState("");

  const suggest = useCallback(async () => {
    // YOUR CODE HERE: use the value of suggestInput to determine the best planet
    // and navigate to its blurb page.

    // for example:
    navigate("/task2/planet/alekhine");
  }, [suggestInput]);

  return (
    <div className="home">
      <div className="query">
        <form
          className="input-group mb-4"
          id="suggest-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control"
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            value={suggestInput}
            onChange={(e) => setSuggestInput(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            type="submit"
            onClick={suggest}
          >
            Help me choose
          </button>
        </form>
      </div>
      {planets.map((planet) => (
        <div
          className="card mb-3"
          role="button"
          key={planet.name}
          onClick={() => navigate(`/task2/planet/${planet.name.toLowerCase()}`)}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={planet.image}
                className="img-fluid rounded-start"
                alt={`A depiction of the planet ${planet.name}, produced by SXDL 1.0`}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{planet.name}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanetBlurb({ name }) {
  const planet = planets.find((p) => p.name.toLowerCase() === name);
  if (!planet) return <div>Planet not found.</div>;
  return (
    <div
      className="planet-blurb"
      style={{
        backgroundColor: "white",
        padding: "2rem",
        boxShadow: "0 0 1rem rgba(0,0,0,0.1)",
        display: "flex",
        gap: "4rem",
        alignItems: "center",
      }}
    >
      <div className="planet-image" style={{ flex: 1 }}>
        <img
          src={planet.image}
          alt={`A depiction of the planet ${planet.name}, produced by SXDL 1.0`}
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div className="planet-info" style={{ flex: 2 }}>
        {planet.blurb}
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
