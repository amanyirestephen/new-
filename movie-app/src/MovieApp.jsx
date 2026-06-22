import React, { useState, useEffect, useCallback } from "react";

const MOVIES = [
  {
    id: 1, title: "Dune: Part Two", year: 2024, genre: ["Sci-Fi", "Adventure"],
    rating: 8.5, runtime: 166, director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "🏜️", color: "#C8973A", trending: true, featured: true, category: "trending"
  },
  {
    id: 2, title: "Oppenheimer", year: 2023, genre: ["Drama", "History"],
    rating: 8.9, runtime: 180, director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster: "☢️", color: "#E85D04", trending: true, featured: false, category: "trending"
  },
  {
    id: 3, title: "Poor Things", year: 2023, genre: ["Comedy", "Drama"],
    rating: 8.0, runtime: 141, director: "Yorgos Lanthimos",
    cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"],
    description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life.",
    poster: "🌸", color: "#7B2D8B", trending: false, featured: false, category: "drama"
  },
  {
    id: 4, title: "Killers of the Flower Moon", year: 2023, genre: ["Crime", "Drama"],
    rating: 7.7, runtime: 206, director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"],
    description: "Members of the Osage Nation are murdered under mysterious circumstances in 1920s Oklahoma.",
    poster: "🌙", color: "#8B0000", trending: false, featured: false, category: "drama"
  },
  {
    id: 5, title: "The Batman", year: 2022, genre: ["Action", "Crime"],
    rating: 7.8, runtime: 176, director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a series of cryptic clues.",
    poster: "🦇", color: "#1A1A2E", trending: false, featured: false, category: "action"
  },
  {
    id: 6, title: "Everything Everywhere All at Once", year: 2022, genre: ["Sci-Fi", "Comedy"],
    rating: 8.2, runtime: 139, director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Jamie Lee Curtis"],
    description: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence.",
    poster: "🌀", color: "#FF006E", trending: false, featured: true, category: "sci-fi"
  },
  {
    id: 7, title: "Parasite", year: 2019, genre: ["Thriller", "Drama"],
    rating: 8.5, runtime: 132, director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "🪲", color: "#2D6A4F", trending: false, featured: false, category: "thriller"
  },
  {
    id: 8, title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama"],
    rating: 8.7, runtime: 169, director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "🌌", color: "#0D3B6E", trending: false, featured: false, category: "sci-fi"
  },
  {
    id: 9, title: "Mad Max: Fury Road", year: 2015, genre: ["Action", "Sci-Fi"],
    rating: 8.1, runtime: 120, director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    description: "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to flee from a cult leader.",
    poster: "🔥", color: "#FF4500", trending: false, featured: false, category: "action"
  },
  {
    id: 10, title: "The Grand Budapest Hotel", year: 2014, genre: ["Comedy", "Drama"],
    rating: 8.1, runtime: 99, director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars.",
    poster: "🏨", color: "#F7A4B7", trending: false, featured: false, category: "comedy"
  },
  {
    id: 11, title: "Alien: Romulus", year: 2024, genre: ["Sci-Fi", "Horror"],
    rating: 7.3, runtime: 119, director: "Fede Álvarez",
    cast: ["Cailee Spaeny", "David Jonsson", "Archie Renaux"],
    description: "A group of young space colonizers come face to face with the most terrifying life form in the universe.",
    poster: "👾", color: "#1B4332", trending: true, featured: false, category: "trending"
  },
  {
    id: 12, title: "Civil War", year: 2024, genre: ["Action", "Drama"],
    rating: 7.4, runtime: 109, director: "Alex Garland",
    cast: ["Kirsten Dunst", "Wagner Moura", "Cailee Spaeny"],
    description: "A team of journalists travel across America during a rapidly escalating civil war.",
    poster: "📸", color: "#495057", trending: true, featured: false, category: "trending"
  },
];

const GENRES = ["All", "Trending", "Action", "Sci-Fi", "Drama", "Comedy", "Thriller"];

// --- StarRating ---
const StarRating = ({ rating }) => {
  const stars = Math.round(rating / 2);
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= stars ? "#FFD700" : "#444", fontSize: "12px" }}>★</span>
      ))}
      <span style={{ color: "#aaa", fontSize: "12px", marginLeft: "4px" }}>{rating}</span>
    </div>
  );
};

// --- SearchBar ---
const SearchBar = ({ value, onChange }) => (
  <div style={{ position: "relative", maxWidth: "360px", width: "100%" }}>
    <span style={{
      position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
      color: "#555", fontSize: "16px", pointerEvents: "none"
    }}>🔍</span>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search movies..."
      style={{
        width: "100%", background: "#1a1a1a", border: "1px solid #333",
        borderRadius: "10px", color: "#fff", fontSize: "14px",
        padding: "10px 16px 10px 40px", outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s"
      }}
      onFocus={e => e.target.style.borderColor = "#E63946"}
      onBlur={e => e.target.style.borderColor = "#333"}
    />
  </div>
);

// --- MovieCard ---
const MovieCard = ({ movie, onClick, size = "normal" }) => {
  const [hovered, setHovered] = useState(false);
  const isLarge = size === "large";

  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, #1a1a2e 0%, ${movie.color}33 100%)`
          : "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
        border: `1px solid ${hovered ? movie.color : "#222"}`,
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 12px 32px ${movie.color}44` : "0 2px 8px rgba(0,0,0,0.5)",
        overflow: "hidden",
        minWidth: isLarge ? "280px" : "180px",
        maxWidth: isLarge ? "280px" : "180px",
        flexShrink: 0,
      }}
    >
      <div style={{
        height: isLarge ? "180px" : "120px",
        background: `linear-gradient(135deg, ${movie.color}22 0%, ${movie.color}55 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isLarge ? "64px" : "44px",
        position: "relative",
      }}>
        {movie.poster}
        {movie.trending && (
          <div style={{
            position: "absolute", top: "8px", right: "8px",
            background: "#FF4444", color: "#fff", fontSize: "9px",
            fontWeight: 700, padding: "2px 6px", borderRadius: "4px",
            letterSpacing: "0.5px", textTransform: "uppercase"
          }}>HOT</div>
        )}
      </div>
      <div style={{ padding: isLarge ? "16px" : "10px" }}>
        <div style={{
          color: "#fff", fontWeight: 600,
          fontSize: isLarge ? "15px" : "13px",
          marginBottom: "4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>{movie.title}</div>
        <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>
          {movie.year} · {movie.runtime}m
        </div>
        <StarRating rating={movie.rating} />
        {isLarge && (
          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {movie.genre.map(g => (
              <span key={g} style={{
                background: `${movie.color}33`,
                color: movie.color,
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "100px",
                border: `1px solid ${movie.color}44`
              }}>{g}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- HorizontalRow ---
const HorizontalRow = ({ title, movies, onMovieClick, cardSize }) => (
  <div style={{ marginBottom: "40px" }}>
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      marginBottom: "16px", paddingLeft: "24px"
    }}>
      <div style={{ width: "3px", height: "20px", background: "#E63946", borderRadius: "2px" }} />
      <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: 0 }}>{title}</h2>
    </div>
    <div style={{
      display: "flex", gap: "16px", overflowX: "auto",
      paddingLeft: "24px", paddingRight: "24px", paddingBottom: "8px",
      // FIX: removed invalid msOverflowStyle; scrollbarWidth handles Firefox
      scrollbarWidth: "none",
    }}>
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} onClick={onMovieClick} size={cardSize} />
      ))}
    </div>
  </div>
);

// --- MovieModal ---
const MovieModal = ({ movie, onClose }) => {
  // FIX: wrap onClose in useCallback at call-site isn't possible here,
  // so we stabilise the effect by storing onClose in a ref to avoid
  // re-registering the listener on every render.
  const onCloseRef = React.useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCloseRef.current(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // empty deps — safe because we use the ref

  if (!movie) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
          border: `1px solid ${movie.color}55`,
          borderRadius: "16px",
          width: "100%", maxWidth: "540px",
          boxShadow: `0 24px 80px ${movie.color}44`,
          overflow: "hidden",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{
          height: "200px",
          background: `linear-gradient(135deg, ${movie.color}33 0%, ${movie.color}66 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "80px", position: "relative", flexShrink: 0,
        }}>
          {movie.poster}
          <button onClick={onClose} style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(0,0,0,0.5)", border: "none",
            color: "#fff", width: "32px", height: "32px",
            borderRadius: "50%", cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>✕</button>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <div style={{ flex: 1, marginRight: "12px" }}>
              <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>{movie.title}</h2>
              <div style={{ color: "#888", fontSize: "13px" }}>{movie.year} · {movie.runtime} min · Dir. {movie.director}</div>
            </div>
            <div style={{
              background: `${movie.color}22`, border: `1px solid ${movie.color}55`,
              borderRadius: "8px", padding: "8px 12px", textAlign: "center", flexShrink: 0,
            }}>
              <div style={{ color: "#FFD700", fontSize: "18px", fontWeight: 700 }}>{movie.rating}</div>
              <div style={{ color: "#888", fontSize: "10px" }}>IMDb</div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {movie.genre.map(g => (
              <span key={g} style={{
                background: `${movie.color}22`, color: movie.color,
                fontSize: "11px", padding: "3px 10px", borderRadius: "100px",
                border: `1px solid ${movie.color}44`
              }}>{g}</span>
            ))}
          </div>
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>{movie.description}</p>
          <div>
            <div style={{ color: "#666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Cast</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {movie.cast.map(a => (
                <span key={a} style={{
                  background: "#1a1a1a", border: "1px solid #333",
                  color: "#ddd", fontSize: "12px", padding: "4px 10px", borderRadius: "6px"
                }}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FeaturedBanner ---
const FeaturedBanner = ({ movie, onClick }) => {
  const [hovered, setHovered] = useState(false);

  // FIX: guard against undefined movie (e.g. no featured movies exist)
  if (!movie) return null;

  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        margin: "0 24px 40px",
        background: `linear-gradient(135deg, #0d0d0d 0%, ${movie.color}44 100%)`,
        border: `1px solid ${movie.color}55`,
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        gap: "32px",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: hovered ? `0 16px 48px ${movie.color}44` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        flexWrap: "wrap",
      }}
    >
      <div style={{
        fontSize: "96px", flexShrink: 0,
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))"
      }}>{movie.poster}</div>
      <div style={{ flex: 1, minWidth: "200px" }}>
        <div style={{
          color: movie.color, fontSize: "11px", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px"
        }}>✦ Featured</div>
        <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2 }}>
          {movie.title}
        </h2>
        <div style={{ color: "#888", fontSize: "13px", marginBottom: "12px" }}>
          {movie.year} · {movie.runtime} min · {movie.director}
        </div>
        <StarRating rating={movie.rating} />
        <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginTop: "12px", maxWidth: "420px" }}>
          {movie.description}
        </p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {movie.genre.map(g => (
            <span key={g} style={{
              background: `${movie.color}22`, color: movie.color,
              fontSize: "11px", padding: "4px 12px", borderRadius: "100px",
              border: `1px solid ${movie.color}44`
            }}>{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [watchlist, setWatchlist] = useState([]);
  // FIX: new state to toggle watchlist view
  const [showingWatchlist, setShowingWatchlist] = useState(false);

  const featuredMovie = MOVIES.find(m => m.featured) ?? null; // FIX: safe find instead of [0] on filtered array
  const trending = MOVIES.filter(m => m.trending);
  const topRated = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const isInWatchlist = (id) => watchlist.includes(id);
  const toggleWatchlist = useCallback((movie) => {
    setWatchlist(w => w.includes(movie.id) ? w.filter(x => x !== movie.id) : [...w, movie.id]);
  }, []);

  const filteredMovies = MOVIES.filter(m => {
    if (showingWatchlist) return watchlist.includes(m.id);
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.director.toLowerCase().includes(search.toLowerCase());
    const matchGenre = activeGenre === "All" ? true
      : activeGenre === "Trending" ? m.trending
      : m.genre.some(g => g.toLowerCase() === activeGenre.toLowerCase());
    return matchSearch && matchGenre;
  });

  const showingSearch = search.length > 0 || activeGenre !== "All" || showingWatchlist;

  const handleWatchlistClick = () => {
    setShowingWatchlist(prev => !prev);
    setSearch("");
    setActiveGenre("All");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
    }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a1a1a",
        padding: "0 24px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "64px", gap: "16px"
        }}>
          {/* Logo — clicking resets to home */}
          <div
            onClick={() => { setSearch(""); setActiveGenre("All"); setShowingWatchlist(false); }}
            style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, cursor: "pointer" }}
          >
            <span style={{ fontSize: "22px" }}>🎬</span>
            <span style={{ fontWeight: 800, fontSize: "18px", color: "#fff", letterSpacing: "-0.5px" }}>
              CINE<span style={{ color: "#E63946" }}>MAX</span>
            </span>
          </div>

          <SearchBar value={search} onChange={v => { setSearch(v); setShowingWatchlist(false); }} />

          {/* FIX: Saved button now toggles watchlist view instead of resetting state */}
          <div
            onClick={handleWatchlistClick}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: showingWatchlist ? "#E63946" : watchlist.length > 0 ? "#3a1a1e" : "#1a1a1a",
              border: `1px solid ${showingWatchlist ? "#E63946" : watchlist.length > 0 ? "#E63946" : "#333"}`,
              borderRadius: "8px", padding: "6px 12px", cursor: "pointer",
              fontSize: "13px", flexShrink: 0, transition: "all 0.2s"
            }}
          >
            <span>🔖</span>
            <span>{watchlist.length} Saved</span>
          </div>
        </div>

        {/* Genre Tabs */}
        <div style={{
          display: "flex", gap: "4px", paddingBottom: "12px",
          overflowX: "auto", scrollbarWidth: "none",
        }}>
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => { setActiveGenre(g); setShowingWatchlist(false); }}
              style={{
                background: activeGenre === g && !showingWatchlist ? "#E63946" : "transparent",
                border: `1px solid ${activeGenre === g && !showingWatchlist ? "#E63946" : "#333"}`,
                color: activeGenre === g && !showingWatchlist ? "#fff" : "#888",
                borderRadius: "100px", padding: "5px 16px",
                fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s", fontWeight: activeGenre === g && !showingWatchlist ? 600 : 400
              }}
            >{g}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: "24px", paddingBottom: "40px" }}>
        {showingSearch ? (
          <div style={{ padding: "0 24px" }}>
            <div style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>
              {showingWatchlist ? "Your saved movies" : `${filteredMovies.length} result${filteredMovies.length !== 1 ? "s" : ""} found`}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px"
            }}>
              {filteredMovies.map(m => (
                <div key={m.id} style={{ position: "relative" }}>
                  <MovieCard movie={m} onClick={setSelected} size="normal" />
                  <button
                    onClick={e => { e.stopPropagation(); toggleWatchlist(m); }}
                    style={{
                      position: "absolute", top: "8px", left: "8px",
                      background: isInWatchlist(m.id) ? "#E63946" : "rgba(0,0,0,0.7)",
                      border: "none", borderRadius: "6px",
                      color: "#fff", fontSize: "12px", padding: "3px 8px",
                      cursor: "pointer", zIndex: 10
                    }}
                  >
                    {isInWatchlist(m.id) ? "✓" : "+"}
                  </button>
                </div>
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <div style={{ textAlign: "center", paddingTop: "60px", color: "#555" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                  {showingWatchlist ? "🔖" : "🎬"}
                </div>
                <div style={{ fontSize: "16px" }}>
                  {showingWatchlist ? "No saved movies yet" : "No movies found"}
                </div>
                <div style={{ fontSize: "13px", marginTop: "8px" }}>
                  {showingWatchlist ? "Use the + button on any card to save movies" : "Try a different search"}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <FeaturedBanner movie={featuredMovie} onClick={setSelected} />

            <HorizontalRow title="Trending Now" movies={trending} onMovieClick={setSelected} cardSize="large" />

            <HorizontalRow title="Top Rated" movies={topRated} onMovieClick={setSelected} cardSize="normal" />

            {watchlist.length > 0 && (
              <HorizontalRow
                title="Your Watchlist"
                movies={MOVIES.filter(m => watchlist.includes(m.id))}
                onMovieClick={setSelected}
                cardSize="normal"
              />
            )}

            {/* All Movies Grid */}
            <div style={{ marginBottom: "40px", paddingLeft: "24px", paddingRight: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "3px", height: "20px", background: "#E63946", borderRadius: "2px" }} />
                <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: 0 }}>All Movies</h2>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "16px"
              }}>
                {MOVIES.map(m => (
                  <div key={m.id} style={{ position: "relative" }}>
                    <MovieCard movie={m} onClick={setSelected} size="normal" />
                    <button
                      onClick={e => { e.stopPropagation(); toggleWatchlist(m); }}
                      style={{
                        position: "absolute", top: "8px", left: "8px",
                        background: isInWatchlist(m.id) ? "#E63946" : "rgba(0,0,0,0.7)",
                        border: "none", borderRadius: "6px",
                        color: "#fff", fontSize: "12px", padding: "3px 8px",
                        cursor: "pointer", zIndex: 10
                      }}
                    >
                      {isInWatchlist(m.id) ? "✓" : "+"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
