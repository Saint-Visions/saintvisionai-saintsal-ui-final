export default function SimplePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #000000, #2a2a2a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        padding: "20px"
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            background: "linear-gradient(to right, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            marginBottom: "16px"
          }}
        >
          SAINTSAL™ LOGIN
        </h1>
        <p
          style={{
            color: "#fbbf24",
            fontSize: "20px",
            opacity: 0.8
          }}
        >
          Cookin' Knowledge Portal
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(31, 41, 55, 0.5)",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid rgba(251, 191, 36, 0.2)"
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#d1d5db",
              fontSize: "14px"
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #4b5563",
              background: "#374151",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#d1d5db",
              fontSize: "14px"
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #4b5563",
              background: "#374151",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(to right, #f59e0b, #d97706)",
            color: "black",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          🔥 Start Cookin
        </button>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center"
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px"
            }}
          >
            Don't have an account?{" "}
            <span style={{ color: "#fbbf24" }}>Sign up</span>
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center"
        }}
      >
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px"
          }}
        >
          © 2025 Saint Vision Technologies. All rights reserved.
        </p>
      </div>
    </div>
  )
}
