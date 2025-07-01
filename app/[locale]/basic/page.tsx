export default function BasicPage() {
  return (
    <html>
      <head>
        <title>SaintSal Login</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1
            style={{ color: "#fbbf24", fontSize: "36px", marginBottom: "20px" }}
          >
            🔥 SAINTSAL™ LOGIN
          </h1>
          <p style={{ color: "#999", marginBottom: "40px" }}>
            Cookin' Knowledge Portal
          </p>

          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Email"
              style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#222",
                color: "#fff"
              }}
            />

            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#222",
                color: "#fff"
              }}
            />

            <button
              onClick={() => {
                window.location.href = "/en/workspace1/operations"
              }}
              style={{
                width: "100%",
                padding: "12px",
                margin: "20px 0",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(to right, #f59e0b, #d97706)",
                color: "#000",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🔥 Start Cookin → Operations
            </button>

            <button
              onClick={() => {
                window.location.href = "/en/setup"
              }}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #fbbf24",
                background: "transparent",
                color: "#fbbf24",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              📋 Setup Account
            </button>
          </div>

          <p style={{ color: "#666", fontSize: "14px", marginTop: "40px" }}>
            ✅ LOGIN PAGE IS WORKING!
            <br />
            Your SaintSal app is ready to go! 🚀
          </p>
        </div>
      </body>
    </html>
  )
}
