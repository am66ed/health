import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/* ─── Inline styles extracted 1:1 from balady_health_certificate.html ─── */
const S = {
  /* Reset */
  body: {
    fontFamily: "'Tajawal', sans-serif",
    background: '#f0f0f0',
    direction: 'rtl',
    color: '#222',
    fontSize: '15px',
    margin: 0,
  },
  /* Gov bar */
  govBar: {
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    padding: '6px 0',
    fontSize: '13px',
    color: '#444',
  },
  govBarInner: {
    maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  govBarRight: { display: 'flex', alignItems: 'center', gap: '6px' },
  saFlag: {
    width: '26px', height: '18px', background: '#006c35', borderRadius: '2px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', color: '#fff', fontWeight: '700', flexShrink: 0,
  },
  govVerify: {
    display: 'flex', alignItems: 'center', gap: '4px',
    color: '#006c35', textDecoration: 'none', fontSize: '13px',
    border: '1px solid #ccc', borderRadius: '4px', padding: '2px 8px',
    marginRight: '8px',
  },
  chev: { fontSize: '10px', color: '#666' },
  govBarLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  govBarLeftA: {
    color: '#555', textDecoration: 'none', fontSize: '13px',
    display: 'flex', alignItems: 'center', gap: '5px',
  },
  /* Main header */
  mainHeader: {
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 1px 4px rgba(0,0,0,.05)',
  },
  headerInner: {
    maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
    height: '74px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
  },
  logoLink: { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 },
  logoEmblem: { width: '56px', height: '56px', flexShrink: 0 },
  logoTextBlock: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 },
  logoTopAr: { fontSize: '10px', color: '#aaa', fontWeight: '400', letterSpacing: '.5px', marginBottom: '1px' },
  logoMainAr: { fontSize: '21px', fontWeight: '700', color: '#006c35', letterSpacing: '-.3px', lineHeight: 1 },
  logoEn: { fontSize: '8.5px', color: '#bbb', letterSpacing: '2px', fontWeight: '400', marginTop: '1px', textTransform: 'uppercase' },
  /* Nav */
  mainNav: { display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'flex-end', paddingLeft: '20px' },
  navA: {
    display: 'flex', alignItems: 'center', gap: '4px',
    color: '#333', textDecoration: 'none',
    fontSize: '14.5px', fontWeight: '400',
    padding: '10px 13px', borderRadius: '6px',
    whiteSpace: 'nowrap',
  },
  navActive: {
    display: 'flex', alignItems: 'center', gap: '4px',
    background: '#006c35', color: '#fff', fontWeight: '600',
    textDecoration: 'none',
    fontSize: '14.5px',
    padding: '10px 13px', borderRadius: '6px',
    whiteSpace: 'nowrap',
  },
  arr: { fontSize: '10px', opacity: '.7' },
  headerActions: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 },
  btnBusiness: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: '#006c35', color: '#fff',
    border: 'none', borderRadius: '8px',
    padding: '9px 18px',
    fontSize: '14px', fontFamily: 'inherit', fontWeight: '600',
    cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
  },
  btnSearch: {
    display: 'flex', alignItems: 'center', gap: '5px',
    background: 'none', border: 'none',
    color: '#444', fontSize: '14px', fontFamily: 'inherit',
    cursor: 'pointer', padding: '8px 10px', whiteSpace: 'nowrap',
  },
  /* Page */
  pageBg: { background: '#f0f0f0', minHeight: 'calc(100vh - 160px)', padding: '30px 0 50px' },
  pageWrap: { maxWidth: '980px', margin: '0 auto', padding: '0 16px' },
  card: {
    background: '#fff', borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,.08)',
    padding: '32px 38px 38px',
  },
  pageTitle: {
    textAlign: 'center', fontSize: '25px', fontWeight: '700',
    color: '#1a1a1a', marginBottom: '26px',
  },
  /* Photo */
  photoCenter: { textAlign: 'center', marginBottom: '26px' },
  photoImg: {
    width: '150px', height: '200px', objectFit: 'cover',
    border: '1px solid #ccc', borderRadius: '4px',
  },
  /* Fields grid */
  fieldsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' },
  /* Float-label field */
  flField: { position: 'relative', marginBottom: '18px', display: 'flex' },
  flFieldInput: {
    width: '100%', height: '54px',
    padding: '20px 14px 6px',
    border: '1px solid #d6d6d6', borderRadius: '8px',
    background: '#f7f7f7',
    fontSize: '15px', fontFamily: 'inherit',
    color: '#333', outline: 'none', direction: 'rtl',
    cursor: 'default',
    boxSizing: 'border-box',
  },
  flLabelUp: {
    position: 'absolute', top: '9px', right: '14px',
    fontSize: '11px', color: '#5a9a6a', fontWeight: '500',
    pointerEvents: 'none',
  },
  flLabelCenter: {
    position: 'absolute', top: '50%', right: '14px',
    transform: 'translateY(-50%)',
    fontSize: '14px', color: '#999',
    pointerEvents: 'none',
  },
  /* Footer */
  siteFooter: { background: '#1b4a2d', color: '#b8d8c5', padding: '22px 0' },
  footerInner: {
    maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: '12px',
  },
  footerLinks: { display: 'flex', gap: '22px' },
  footerLinkA: { color: '#b8d8c5', textDecoration: 'none', fontSize: '13px' },
  footerCopy: { textAlign: 'center', fontSize: '12.5px', lineHeight: '1.9', color: '#a0c8b0' },
  footerLogos: { display: 'flex', alignItems: 'center', gap: '12px' },
  dgaBadge: {
    fontSize: '10.5px', color: '#a0c8b0',
    border: '1px solid #3d7050', padding: '4px 9px', borderRadius: '4px',
  },
  baladyLogoFooter: { fontSize: '17px', fontWeight: '700', color: '#c8e4d4', letterSpacing: '.5px' },
  /* Loading / error */
  loadingWrap: {
    minHeight: '300px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexDirection: 'column', gap: '12px',
  },
  spinner: {
    width: '40px', height: '40px',
    border: '3px solid #e0e0e0', borderTopColor: '#006c35',
    borderRadius: '50%', animation: 'spin .8s linear infinite',
  },
  errorBox: {
    background: '#fdecea', border: '1px solid #e57373', borderRadius: '8px',
    padding: '14px 18px', margin: '30px 0', color: '#c62828', textAlign: 'center',
  },
};

/* ─── Float-label read-only field ─── */
function CertField({ label, value, id }) {
  const hasVal = value !== '' && value !== null && value !== undefined;
  return (
    <div style={S.flField} className="cert-fl-field">
      <label htmlFor={id} style={hasVal ? S.flLabelUp : S.flLabelCenter}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value || ''}
        readOnly
        placeholder=" "
        style={S.flFieldInput}
        aria-label={label}
      />
    </div>
  );
}

/* ─── Balady SVG Logo ─── */
function BalaydLogo() {
  return (
    <svg style={S.logoEmblem} viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id="circ2"><circle cx="55" cy="55" r="50" /></clipPath></defs>
      <circle cx="55" cy="55" r="52" fill="#fff" stroke="#d0d0d0" strokeWidth="1" />
      <circle cx="55" cy="55" r="50" fill="none" stroke="#006c35" strokeWidth="3" />
      <rect x="52" y="48" width="6" height="30" rx="3" fill="#006c35" />
      <ellipse cx="55" cy="40" rx="20" ry="10" transform="rotate(-15,55,40)" fill="#006c35" opacity=".9" />
      <ellipse cx="55" cy="40" rx="20" ry="10" transform="rotate(15,55,40)"  fill="#006c35" opacity=".9" />
      <ellipse cx="55" cy="38" rx="14" ry="8" fill="#006c35" />
      <ellipse cx="42" cy="44" rx="13" ry="6" transform="rotate(-35,42,44)" fill="#006c35" opacity=".8" />
      <ellipse cx="68" cy="44" rx="13" ry="6" transform="rotate(35,68,44)"  fill="#006c35" opacity=".8" />
      <line x1="36" y1="68" x2="74" y2="84" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="74" y1="68" x2="36" y2="84" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="68" r="2" fill="#006c35" />
      <circle cx="74" cy="68" r="2" fill="#006c35" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CertificatePage – Responsive & pixel-perfect
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CertificatePage() {
  const { id } = useParams();
  const [person, setPerson]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!id) { setError('معرف الشهادة غير موجود.'); setLoading(false); return; }
    axios.get(`/api/persons/${id}`)
      .then((res) => { setPerson(res.data); setLoading(false); })
      .catch((err) => {
        setError(
          err?.response?.status === 404
            ? 'لم يتم العثور على الشهادة المطلوبة.'
            : 'حدث خطأ أثناء تحميل الشهادة.'
        );
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={S.body}>
      {/* ─── CSS For Mobile Responsiveness (matching screenshot exactly) ─── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        
        .cert-hamburger { display: none; background: none; border: none; cursor: pointer; }
        
        @media (max-width: 768px) {
          /* Top Gov Bar */
          .cert-gov-bar-inner { flex-direction: column !important; padding: 10px 16px !important; gap: 8px; }
          .cert-gov-bar-right { flex-direction: column !important; gap: 8px !important; text-align: center; }
          .cert-gov-bar-left { width: 100%; justify-content: space-between !important; margin-top: 8px; border-top: 1px solid #eee; padding-top: 8px; }
          
          /* Main Header */
          .cert-header-inner { flex-direction: row-reverse !important; padding: 0 16px !important; height: 70px !important; }
          .cert-main-nav, .cert-header-actions { display: none !important; }
          .cert-hamburger { display: block !important; }
          
          /* Page bg & Card */
          .cert-page-bg { background: #fff !important; padding: 15px 0 !important; }
          .cert-card { box-shadow: none !important; padding: 0 16px !important; border-radius: 0 !important; }
          .cert-page-title { color: #44546A !important; font-size: 28px !important; margin-bottom: 20px !important; }
          
          /* Fields */
          .cert-fields-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          
          /* Stacked Labels for Mobile */
          .cert-fl-field { flex-direction: column !important; margin-bottom: 0 !important; }
          .cert-fl-field label { 
            position: static !important; 
            transform: none !important; 
            font-size: 14px !important; 
            color: #000 !important; 
            font-weight: 700 !important; 
            margin-bottom: 6px !important;
            display: block !important;
            text-align: right;
          }
          .cert-fl-field input { 
            padding: 12px 14px !important; 
            height: 48px !important; 
            background: #f8f9fa !important; 
            border: 1px solid #ced4da !important;
            color: #495057 !important;
          }
          
          /* Footer */
          .cert-footer-inner { flex-direction: column; text-align: center; gap: 15px; }
        }
      `}</style>

      {/* ── TOP GOVERNMENT BAR ── */}
      <div style={S.govBar}>
        <div style={S.govBarInner} className="cert-gov-bar-inner">
          <div style={S.govBarRight} className="cert-gov-bar-right">
            <span style={S.saFlag}>🇸🇦</span>
            <span style={{ color: '#555', fontSize: '13px' }}>
              موقع حكومي مسجل لدى هيئة الحكومة الرقمية
            </span>
            <a href="#" style={S.govVerify}>
              كيف تتحقق <span style={S.chev}>⌄</span>
            </a>
          </div>
          <div style={S.govBarLeft} className="cert-gov-bar-left">
            <a href="#" style={S.govBarLeftA}>⚙ الإعدادات</a>
            <a href="#" style={S.govBarLeftA}>♿ أدوات سهولة الوصول</a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header style={S.mainHeader}>
        <div style={S.headerInner} className="cert-header-inner">

          {/* Logo */}
          <a href="/" style={S.logoLink}>
            <BalaydLogo />
            <div style={S.logoTextBlock}>
              <span style={S.logoTopAr}>خدمات</span>
              <span style={S.logoMainAr}>بلدي</span>
              <span style={S.logoEn}>BALADY SERVICES</span>
            </div>
          </a>

          {/* Nav */}
          <nav style={S.mainNav} className="cert-main-nav">
            <a href="#" style={S.navA}>عن بلدي <span style={S.arr}>&#8964;</span></a>
            <a href="#" style={S.navActive}>الخدمات <span style={S.arr}>&#8964;</span></a>
            <a href="#" style={S.navA}>الاستعلامات</a>
            <a href="#" style={S.navA}>تواصل معنا <span style={S.arr}>&#8964;</span></a>
          </nav>

          {/* Actions */}
          <div style={S.headerActions} className="cert-header-actions">
            <a href="#" style={S.btnBusiness}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                style={{ width: '14px', height: '14px', flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              بلدي أعمال
            </a>
            <button style={S.btnSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ width: '17px', height: '17px' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              بحث
            </button>
          </div>
          
          {/* Hamburger Icon for Mobile */}
          <button className="cert-hamburger">
            <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" style={{ width: 28, height: 28 }}>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <div style={S.pageBg} className="cert-page-bg">
        <div style={S.pageWrap}>

          {/* Loading */}
          {loading && (
            <div style={S.loadingWrap}>
              <div style={S.spinner} />
              <span style={{ color: '#666', fontSize: '14px' }}>جارٍ تحميل الشهادة…</span>
            </div>
          )}

          {/* Error */}
          {error && <div style={S.errorBox}>{error}</div>}

          {/* Certificate card */}
          {person && !loading && (
            <div style={S.card} className="cert-card">
              <h2 style={S.pageTitle} className="cert-page-title">شهادة صحية</h2>

              {/* Person photo */}
              <div style={S.photoCenter}>
                {person.photoUrl ? (
                  <img
                    src={person.photoUrl}
                    alt="صورة المستفيد"
                    style={S.photoImg}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    ...S.photoImg,
                    background: '#eee',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    fontSize: '13px',
                  }}>
                    لا توجد صورة
                  </div>
                )}
              </div>

              {/* Fields grid – exact same order as reference HTML */}
              <div style={S.fieldsGrid} className="cert-fields-grid">

                <CertField id="cert-amanah"      label="الامانة"                            value={person.amanah} />
                <CertField id="cert-municipality" label="البلدية"                            value={person.municipality} />

                <CertField id="cert-name"         label="الاسم"                              value={person.name} />
                <CertField id="cert-iqama"        label="رقم الاقامة"                        value={person.iqamaNumber} />

                <CertField id="cert-gender"       label="الجنس"                              value={person.gender} />
                <CertField id="cert-nationality"  label="الجنسية"                            value={person.nationality} />

                <CertField id="cert-certno"       label="رقم الشهادة الصحية"                 value={person.certificateNumber} />
                <CertField id="cert-job"          label="المهنة"                             value={person.jobTitle} />

                <CertField id="cert-issue-h"      label="تاريخ إصدار الشهادة الصحية هجري"   value={person.issueDateHijri} />
                <CertField id="cert-issue-g"      label="تاريخ إصدار الشهادة الصحية ميلادي" value={person.issueDateGregorian} />

                <CertField id="cert-expiry-h"     label="تاريخ نهاية الشهادة الصحية هجري"   value={person.expiryDateHijri} />
                <CertField id="cert-expiry-g"     label="تاريخ نهاية الشهادة الصحية ميلادي" value={person.expiryDateGregorian} />

                <CertField id="cert-program"      label="نوع البرنامج التثقيفى"              value={person.programType} />
                <CertField id="cert-prog-exp"     label="تاريخ انتهاء البرنامج التثقيفى"     value={person.programExpiryHijri} />

                <CertField id="cert-license"      label="رقم الرخصة"                         value={person.licenseNumber} />
                <CertField id="cert-estname"      label="اسم المنشأة"                        value={person.establishmentName} />

                <CertField id="cert-estno"        label="رقم المنشأة"                        value={person.establishmentNumber} />
                {/* empty cell to complete grid row */}
                <div />

              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={S.siteFooter}>
        <div style={S.footerInner} className="cert-footer-inner">
          <div style={S.footerLinks}>
            <a href="#" style={S.footerLinkA}>خريطة الموقع</a>
            <a href="#" style={S.footerLinkA}>RSS</a>
            <a href="#" style={S.footerLinkA}>شروط الاستخدام</a>
          </div>
          <div style={S.footerCopy}>
            <p><strong style={{ color: '#daeee6' }}>جميع الحقوق محفوظة لوزارة البلديات والإسكان © 2026</strong></p>
            <p>تم تطويره وصيانته بواسطة وزارة البلديات والإسكان</p>
          </div>
          <div style={S.footerLogos}>
            <span style={S.dgaBadge}>مسجل لدى هيئة الحكومة الرقمية</span>
            <span style={S.baladyLogoFooter}>balady</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
