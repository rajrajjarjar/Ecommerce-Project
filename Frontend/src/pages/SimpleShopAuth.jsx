import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Components/AuthContext';


// ============================================================================
// SimpleShopAuth
// ----------------------------------------------------------------------------
// A single component that renders BOTH the login and register screens for
// SimpleShop. It's one component (not two pages) because the two forms share
// almost everything visually — swapping between them is just a state flip,
// which is cheaper than duplicating the whole layout.
//
// HOW TO WIRE THIS INTO YOUR MERN APP:
//   - If you're using React Router, split this into <LoginPage /> and
//     <RegisterPage /> routes, or keep it as one component mounted at
//     "/auth" and let the internal `mode` state control which form shows.
//   - Point handleSubmit() at your existing Express routes, e.g.
//     POST /api/auth/login   and   POST /api/auth/register
//   - Replace the placeholder logo <img> below with your real logo import.
// ============================================================================

export default function SimpleShopAuth() {
  const { login } = useAuth(); // pull login() from context
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";
  const navigate = useNavigate();

  // Single form-state object for both modes. `name` is simply unused/ignored
  // when mode === "login", so we don't need two separate state objects.
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Generic change handler — works for any input because we key off `name`.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Placeholder submit handler. Replace the console.log with your real
  // fetch/axios call to the backend auth routes you already have running.
  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          {
            Email: form.email,
            password: form.password
          }
        );


        login(response.data.token);

        navigate("/");

      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/register", // Note: make sure this matches your backend route exactly
          {
            name: form.name,
            Email: form.email,
            password: form.password
          }
        );

        console.log(response.data.message);

        // Flip the form back to login mode
        setMode("login");

        // Clear the password field so they can type it fresh for login
        setForm(prev => ({ ...prev, password: "" }));
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      // Optional: alert(error.response?.data?.message || "An error occurred");
    }
  };
  // Lets the user hit "Enter" in the last field to submit, since we're
  // intentionally not using a native <form> tag in this artifact.
  const handleEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Google Fonts: Space Grotesk for headings, Inter for everything else */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ======================================================================
          LEFT PANEL — the actual login / register form
          ====================================================================== */}
      <div className="w-full lg:w-[42%] flex flex-col justify-center px-8 sm:px-16 py-12 font-body">
        <div className="w-full max-w-sm mx-auto">
          {/* --- Logo -------------------------------------------------------
              This is a bogus placeholder image standing in for your real
              logo. Swap the <img src> for your actual asset, e.g.:
                import logo from "../assets/simpleshop-logo.svg";
                <img src={logo} alt="SimpleShop" className="h-9 w-auto" />
          ------------------------------------------------------------------- */}
          <img
            src="images/2_title.png"
            alt="Simple-shop logo"
            className="h-10 w-auto mb-10"
          />

          {/* --- Heading + mode switch, mirrors the MongoDB reference ------- */}
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Log in to your account" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(isLogin ? "register" : "login")}
              className="text-green-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>

          {/* --- Form fields --------------------------------------------- */}
          <div className="space-y-5">
            {/* Name field only exists in register mode */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rajvardhan Chavan"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Password
              </label>
              {/* Wrapped in a relative div so the eye icon can sit inside the input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleEnterKey}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* --- Submit button ------------------------------------------
                Black by default (matches your header bar), green on hover
                so it borrows the same accent used on "Add to Cart".
            --------------------------------------------------------------- */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#0C0F0D] hover:bg-green-600 text-white font-semibold rounded-lg py-3 mt-2 transition-colors flex items-center justify-center gap-2"
            >
              {isLogin ? "Log In" : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================================
          RIGHT PANEL — brand / story panel (hidden on small screens)
          ====================================================================== */}
      <div className="hidden lg:block lg:w-[58%] relative overflow-hidden bg-[#0C0F0D]">
        {/* Soft green glow in the bottom-right corner, echoing the green
            gradient in the MongoDB reference image. Pure CSS, no image file. */}
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-green-600/30 blur-[120px]" />

        {/* Giant faint "SS" monogram watermark — this is the signature
            element: it's built from SimpleShop's own initials rather than
            a generic decorative shape, so it can't be mistaken for anyone
            else's brand panel. Purely decorative, so it's aria-hidden. */}
        <div
          aria-hidden="true"
          className="font-display absolute -top-24 -right-16 text-[420px] font-bold text-white/[0.04] leading-none select-none pointer-events-none"
        >
          SS
        </div>

        {/* Line-art shopping bag, cropped top-right — stands in for the
            bracket/quote shapes in the MongoDB sample, but drawn from your
            own product category (retail) instead of borrowing theirs. */}
        <svg
          aria-hidden="true"
          className="absolute top-10 right-10 w-64 h-64 text-green-500/25 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M40 60 L20 195 Q20 200 25 200 L175 200 Q180 200 180 195 L160 60 Z" />
          <path d="M70 60 V45 a30 30 0 0 1 60 0 V60" />
        </svg>

        {/* Line-art price tag, cropped bottom-left, same purpose as above */}
        <svg
          aria-hidden="true"
          className="absolute -bottom-8 -left-8 w-56 h-56 text-green-500/20 pointer-events-none"
          viewBox="0 0 160 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M10 70 L70 10 H150 V90 L90 150 Z" />
          <circle cx="105" cy="45" r="10" />
        </svg>

        {/* --- Actual content sitting above the decorative layers --------- */}
        <div className="relative z-10 h-full flex flex-col justify-center px-16 py-12 max-w-xl">
          <div className="flex items-center gap-2 text-green-400 mb-6">
            <ShoppingBag size={20} />
            <span className="font-semibold text-sm tracking-wide uppercase">
              SimpleShop
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-6">
            A shopping experience,
            <br />
            built from scratch.
          </h2>

          {/* This paragraph is the "about the project" blurb, standing in
              for MongoDB's marketing copy in the reference screenshot. */}
          <p className="text-gray-300 text-[15px] leading-relaxed mb-8">
            Hey, I'm Rajvardhan this is a MERN-stack project I built
            end-to-end: React on the front end, Node.js and Express powering
            the API layer, and MongoDB handling persistence, with JWT-based
            authentication and bcrypt password hashing behind the form
            you're looking at right now. It's a personal build to sharpen my
            full-stack skills, so treat it as a sandbox — no real payments,
            inventory, or orders are ever processed here.
          </p>

          {/* Small tech-stack pills — this is "structure as information":
              it's a literal, factual list of the stack, not decoration. */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["React", "Node.js", "Express", "MongoDB", "JWT Auth"].map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium text-green-300/90 bg-white/5 border border-white/10 rounded-full px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Demo-project notice badge — mirrors the "Use ATLAS50 for 50%
              off" callout style from the reference, repurposed as a plain
              honesty notice instead of a promo. */}
          <div className="inline-flex items-center gap-2 w-fit bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
            <ShieldCheck size={16} className="text-green-400 shrink-0" />
            Demo project — no real transactions occur.
          </div>
        </div>
      </div>
    </div>
  );
}
