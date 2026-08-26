import Link from "next/link";

export default function Home() {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)", padding: "2rem 1.5rem"}}>
      <div style={{maxWidth: "540px", width: "100%", textAlign: "center"}}>
        <div style={{fontSize: "3.5rem", marginBottom: "1.25rem"}}>📚</div>
        <h1 className="bt-heading" style={{fontSize: "2.25rem", marginBottom: "1rem"}}>Your little lending library</h1>
        <p style={{color: "var(--bt-text-mid)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2.5rem"}}>
          Share the books you own, discover what your friends have, and ask to borrow anything that catches your eye.
        </p>
        <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap"}}>
          <Link href="/signup" className="bt-btn bt-btn-primary">Get started</Link>
          <Link href="/books/all" className="bt-btn bt-btn-secondary">Browse books</Link>
        </div>
        <div style={{display: "flex", gap: "2rem", justifyContent: "center", marginTop: "3.5rem", flexWrap: "wrap"}}>
          {[
            { icon: "🏡", label: "Share your shelf" },
            { icon: "🔍", label: "Find something to read" },
            { icon: "🤝", label: "Borrow from friends" },
          ].map(({ icon, label }) => (
            <div key={label} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem"}}>
              <span style={{fontSize: "1.75rem"}}>{icon}</span>
              <span style={{fontSize: "0.825rem", fontWeight: 600, color: "var(--bt-text-soft)", letterSpacing: "0.02em"}}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
