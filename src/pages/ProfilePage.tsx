import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AccountInfo } from '@azure/msal-browser';

const API = process.env.REACT_APP_API_BASE_URL || '';

const GRADE_OPTIONS = [9, 10, 11, 12] as const;

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

/** Pull given_name / family_name out of CIAM ID token claims if present */
function claimsFrom(user: AccountInfo | null) {
  const c = user?.idTokenClaims as Record<string, unknown> | undefined;
  return {
    givenName:  (c?.given_name  as string) ?? '',
    familyName: (c?.family_name as string) ?? '',
  };
}

interface ProfileFields {
  firstName:  string;
  middleName: string;
  lastName:   string;
  state:      string;
  grade:      number;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [fields,  setFields]  = useState<ProfileFields>({
    firstName: '', middleName: '', lastName: '', state: '', grade: 9,
  });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  // Load profile from DB; fall back to MSAL claims for first/last name
  useEffect(() => {
    if (!user) return;
    const { givenName, familyName } = claimsFrom(user);

    fetch(`${API}/api/profile/${user.localAccountId}`)
      .then(r => r.json())
      .then(data => {
        setFields({
          firstName:  data.firstName  || givenName,
          middleName: data.middleName || '',
          lastName:   data.lastName   || familyName,
          state:      data.state      || '',
          grade:      data.grade      ?? 9,
        });
      })
      .catch(() => {
        // Profile may not exist yet — seed from MSAL claims
        setFields(prev => ({
          ...prev,
          firstName: prev.firstName || givenName,
          lastName:  prev.lastName  || familyName,
        }));
      })
      .finally(() => setLoading(false));
  }, [user]);

  const set = (key: keyof ProfileFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      await fetch(`${API}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:      user.localAccountId,
          displayName: `${fields.firstName} ${fields.lastName}`.trim(),
          email:       user.username,
          firstName:   fields.firstName,
          middleName:  fields.middleName,
          lastName:    fields.lastName,
          state:       fields.state,
          grade:       fields.grade,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <header className="header">
        <div className="header-content">
          <div className="header-icon">👤</div>
          <div>
            <h1>My Profile</h1>
            <p>Manage your account settings</p>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="profile-card">
          {loading ? (
            <p className="loading-msg">Loading profile...</p>
          ) : (
            <>
              {/* Read-only account info from CIAM */}
              <section className="profile-section">
                <h2>Account</h2>
                <div className="profile-field">
                  <label className="profile-label">Email</label>
                  <span className="profile-value">{user?.username ?? '—'}</span>
                </div>
                <p className="profile-hint" style={{ marginTop: '0.5rem' }}>
                  Email is managed by your Microsoft account and cannot be changed here.
                </p>
              </section>

              <hr className="profile-divider" />

              {/* Editable name + location */}
              <section className="profile-section">
                <h2>Personal Information</h2>

                <div className="profile-form-grid">
                  <div className="profile-form-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      value={fields.firstName}
                      onChange={set('firstName')}
                      placeholder="First name"
                    />
                  </div>
                  <div className="profile-form-field">
                    <label htmlFor="middleName">Middle Name</label>
                    <input
                      id="middleName"
                      type="text"
                      value={fields.middleName}
                      onChange={set('middleName')}
                      placeholder="Middle name (optional)"
                    />
                  </div>
                  <div className="profile-form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      value={fields.lastName}
                      onChange={set('lastName')}
                      placeholder="Last name"
                    />
                  </div>
                  <div className="profile-form-field">
                    <label htmlFor="state">State</label>
                    <select id="state" value={fields.state} onChange={set('state')}>
                      <option value="">— Select state —</option>
                      {US_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <hr className="profile-divider" />

              {/* Grade selector */}
              <section className="profile-section">
                <h2>Current Grade</h2>
                <p className="profile-hint">
                  Your grade determines which milestones appear on your Dashboard.
                </p>
                <div className="profile-grade-options">
                  {GRADE_OPTIONS.map(g => (
                    <button
                      key={g}
                      className={`profile-grade-btn${fields.grade === g ? ' selected' : ''}`}
                      onClick={() => setFields(prev => ({ ...prev, grade: g }))}
                    >
                      <span className="profile-grade-num">{g}th</span>
                    </button>
                  ))}
                </div>
              </section>

              {error && <p className="error-msg">{error}</p>}

              <div className="profile-save-row">
                <button
                  className="profile-save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                {saved && <span className="profile-saved-msg">Saved!</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
