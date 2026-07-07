import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Those details did not match an admin account. Please try again.");
      return;
    }
    navigate("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-charcoal rounded-2xl p-8 border border-gold/10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center mb-3">
            <Lock className="text-gold" size={20} />
          </div>
          <h1 className="font-display text-xl text-ivory">Admin Sign In</h1>
          <p className="text-ivory/40 text-sm mt-1">B.A Connect Organization</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full rounded-lg px-4 py-2.5 bg-ink border border-gold/15 text-ivory text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg px-4 py-2.5 bg-ink border border-gold/15 text-ivory text-sm focus:outline-none focus:border-gold"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-2">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <a href="/" className="block text-center text-ivory/30 text-xs mt-6 hover:text-ivory/60">
          &larr; Back to website
        </a>
      </div>
    </div>
  );
}
