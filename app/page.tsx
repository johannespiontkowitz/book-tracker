import Link from "next/link";

const SHELF_BOOKS = [
  { h: 88,  bg: "#e03131" },
  { h: 72,  bg: "#7048e8" },
  { h: 104, bg: "#2f9e44" },
  { h: 80,  bg: "#f59f00" },
  { h: 96,  bg: "#1098ad" },
  { h: 68,  bg: "#e64980" },
  { h: 112, bg: "#2563eb" },
  { h: 78,  bg: "#f76707" },
  { h: 92,  bg: "#9b59b6" },
  { h: 64,  bg: "#c92a2a" },
];

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 62px)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>

        {/* Pixel art bookshelf */}
        <div className="bt-pixel-scene" aria-hidden="true">
          <div className="bt-pixel-books">
            {SHELF_BOOKS.map((book, i) => (
              <div key={i} className="bt-pixel-book" style={{ height: book.h, background: book.bg }} />
            ))}
          </div>
          <div className="bt-pixel-plank" />
        </div>

        <h1 className="bt-heading" style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
          Die Bibliothek statt Bibliothek!
        </h1>
        <p style={{ color: "var(--bt-text-mid)", fontSize: "0.95rem", lineHeight: "1.8", marginBottom: "2.5rem" }}>
          Teile Bücher die du besitzt, stöbere durch die Sammlung deiner Freund:innen und stelle Ausleih-Anfragen für alles, was dich interessiert!
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" className="bt-btn bt-btn-primary">▶ Mitmachen!</Link>
          <Link href="/books/all" className="bt-btn bt-btn-secondary">Durch Bücher schmökern</Link>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
          {[
            { icon: "🏡", label: "Teile dein Bücherregal" },
            { icon: "🔍", label: "Finde was zu lesen" },
            { icon: "🤝", label: "Leihe es von deinen Freund:innen" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", background: "var(--bt-paper)", border: "3px solid var(--bt-border)", boxShadow: "4px 4px 0 0 var(--bt-border)", padding: "1.25rem 1rem", minWidth: "130px", flex: 1 }}>
              <span style={{ fontSize: "2.25rem" }}>{icon}</span>
              <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-pixel, monospace)", color: "var(--bt-text-mid)", lineHeight: 2, textAlign: "center", whiteSpace: "pre-line" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
