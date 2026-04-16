import { type FC, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Profile: FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "Andrew Adetokunbo",
    email: "andrew@email.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  const initials = formData.fullName
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <DashboardLayout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 780, margin: "0 auto", padding: "40px 0 40px" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
          .profile-input { transition: border-color 0.2s, background 0.2s !important; }
          .profile-input:focus { border-color: rgba(16,185,129,0.5) !important; background: rgba(16,185,129,0.04) !important; outline: none !important; }
          .save-btn { transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
          .save-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#10b981", fontFamily: "'DM Mono', monospace", marginBottom: 8,
          }}>ACCOUNT</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: 4 }}>
            Profile
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Manage your personal information
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, overflow: "hidden",
          position: "relative",
        }}>
          {/* Top shimmer */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
          }} />

          {/* Avatar Row */}
          <div style={{
            padding: "24px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #10b981, #0d9488)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, fontWeight: 700, color: "#fff",
              fontFamily: "'DM Mono', monospace",
              boxShadow: "0 0 20px rgba(16,185,129,0.25)",
            }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                {formData.fullName}
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginTop: 3 }}>
                {formData.email}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "28px 28px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
              <ProfileField label="Full Name">
                <input
                  className="profile-input"
                  type="text" name="fullName" value={formData.fullName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </ProfileField>

              <ProfileField label="Email Address">
                <input
                  type="email" name="email" value={formData.email} disabled
                  style={{ ...inputStyle, background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.25)", cursor: "not-allowed" }}
                />
              </ProfileField>

              <ProfileField label="Phone Number">
                <input
                  className="profile-input"
                  type="text" name="phone" value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </ProfileField>

              <ProfileField label="Address">
                <input
                  className="profile-input"
                  type="text" name="address" value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </ProfileField>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "24px 0 20px" }} />

            {/* Action Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14 }}>
              {saved && (
                <span style={{
                  fontSize: 12, color: "#10b981",
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                }}>
                  ✓ CHANGES SAVED
                </span>
              )}
              <button
                type="submit"
                className="save-btn"
                style={{
                  padding: "11px 24px", borderRadius: 8, border: "none",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  background: "linear-gradient(135deg, #10b981, #0d9488)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  fontSize: 14, background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 8, color: "#f1f5f9",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
};

const ProfileField: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label style={{
      display: "block", fontSize: 10, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
      marginBottom: 7, fontFamily: "'DM Mono', monospace",
    }}>
      {label}
    </label>
    {children}
  </div>
);

export default Profile;