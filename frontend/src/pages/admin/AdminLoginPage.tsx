import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('कृपया ईमेल आणि पासवर्ड प्रविष्ट करा / Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setErrorMsg(
        typeof detail === 'string' 
          ? detail 
          : 'चुकीचे क्रेडेन्शियल्स. कृपया पुन्हा प्रयत्न करा. / Invalid email or password credentials.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 0%, #1e112a 0%, #0c0f1d 50%, #05070f 100%)',
        padding: '2rem 1.25rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Background Glow Effects */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '450px',
          background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.22) 0%, rgba(185, 28, 28, 0.08) 45%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Grid Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glassmorphic Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '2.5rem 2.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 40px -10px rgba(220, 38, 38, 0.25)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Header & Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* Glowing Shield Emblem */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)',
              color: '#ffffff',
              marginBottom: '1.25rem',
              boxShadow: '0 12px 28px -6px rgba(220, 38, 38, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              position: 'relative',
            }}
          >
            <ShieldCheck size={36} strokeWidth={2.2} />
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2px solid #0f172a',
                boxShadow: '0 0 8px #10b981',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#ffffff' }}>
              NIRBHID<span style={{ color: '#ef4444' }}>NEWS</span>
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.15rem 0.45rem',
                borderRadius: '6px',
              }}
            >
              CMS 2.0
            </span>
          </div>

          <h2
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#94a3b8',
              margin: '0 0 0.5rem 0',
            }}
          >
            Editorial Management Portal
          </h2>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            <Sparkles size={12} color="#f59e0b" />
            <span>सत्य • निर्भीड • निष्पक्ष पत्रकारिता</span>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.825rem',
              lineHeight: 1.45,
              animation: 'fadeIn 0.25s ease-in-out',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="admin-email"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#e2e8f0',
                marginBottom: '0.5rem',
              }}
            >
              <span>Editorial Email</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Authorized ID</span>
            </label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '12px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: emailFocused ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
              }}
            >
              <Mail
                size={18}
                color={emailFocused ? '#ef4444' : '#64748b'}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  pointerEvents: 'none',
                  transition: 'color 0.2s',
                }}
              />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="editor@nirbhidnews.com"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.85rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: `1px solid ${emailFocused ? '#ef4444' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="admin-password"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#e2e8f0',
                marginBottom: '0.5rem',
              }}
            >
              <span>Secure Password</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Access Key</span>
            </label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '12px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: pwdFocused ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
              }}
            >
              <Lock
                size={18}
                color={pwdFocused ? '#ef4444' : '#64748b'}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  pointerEvents: 'none',
                  transition: 'color 0.2s',
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwdFocused(true)}
                onBlur={() => setPwdFocused(false)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem 3rem 0.85rem 2.85rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: `1px solid ${pwdFocused ? '#ef4444' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  letterSpacing: showPassword ? 'normal' : '2px',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: showPassword ? '#ef4444' : '#64748b',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '0.65rem',
              width: '100%',
              padding: '0.9rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 24px -4px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              opacity: isSubmitting ? 0.75 : 1,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(220, 38, 38, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={19} className="spinner" />
                <span>Authenticating Portal...</span>
              </>
            ) : (
              <>
                <KeyRound size={18} />
                <span>Sign In to Admin Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Security & Navigation Footer */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <Link
            to="/"
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <ArrowLeft size={15} />
            <span>Back to Main Portal</span>
          </Link>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#34d399',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            <CheckCircle2 size={13} />
            <span>256-Bit SSL Encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
};
