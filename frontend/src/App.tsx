import { useEffect, useMemo, useState } from "react";
import type { FeedItem, FeedResponse } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export function App() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(20);

  const url = useMemo(() => {
    const u = new URL("/api/feed", API_BASE);
    u.searchParams.set("limit", String(limit));
    return u.toString();
  }, [limit]);

  async function load(initial = false) {
    setLoading(true);
    setError(null);
    try {
      const u = new URL("/api/feed", API_BASE);
      u.searchParams.set("limit", String(limit));
      if (!initial && nextCursor) u.searchParams.set("cursor", nextCursor);
      const res = await fetch(u.toString());
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }
      const data: FeedResponse = await res.json();
      setItems(prev => (initial ? data.items : prev.concat(data.items)));
      setNextCursor(data.nextCursor);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Tasks Feed</h1>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <label>
          API Base:&nbsp;
          <code>{API_BASE}</code>
        </label>
        <label style={{ marginLeft: "auto" }}>
          Page size:&nbsp;
          <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
            {[10, 20, 30, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <button onClick={() => load(true)} disabled={loading}>Reload</button>
      </div>

      {error && <div style={{ color: "crimson", marginBottom: 12 }}>Error: {error}</div>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
        {items.map(item => (
          <li key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</div>
                <div style={{ color: "#6b7280" }}>
                  Project: <strong>{item.project.name}</strong> · Assignee: <strong>{item.assignee.name}</strong>
                </div>
              </div>
              <span style={{
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                background: item.status === "DONE" ? "#ecfdf5" : item.status === "IN_PROGRESS" ? "#eff6ff" : "#fef2f2"
              }}>
                {item.status}
              </span>
            </div>

            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.tags.map(t => (
                <span key={t.id} style={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 999, padding: "2px 8px" }}>
                  {t.name}
                </span>
              ))}
              {item.tags.length === 0 && <span style={{ color: "#9ca3af", fontSize: 12 }}>No tags</span>}
            </div>

            <div style={{ marginTop: 10, fontSize: 14, color: "#374151" }}>
              <strong>{item.commentsCount}</strong> comment{item.commentsCount === 1 ? "" : "s"}
              {item.lastComment && (
                <>
                  {" · Last by "}
                  <strong>{item.lastComment.author.name}</strong>
                  {" on "}
                  {new Date(item.lastComment.createdAt).toLocaleString()}
                  {": "}
                  <em>{item.lastComment.snippet}</em>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => load(false)} disabled={loading || !nextCursor}>
          {nextCursor ? "Load more" : "No more"}
        </button>
      </div>
    </div>
  );
}
