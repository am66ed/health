import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Accessibility } from 'lucide-react';

/* ─── Styles ─── */
const S = {
  body: {
    fontFamily: "'Tajawal', sans-serif",
    background: '#f0f0f0',
    direction: 'rtl',
    color: '#222',
    fontSize: '15px',
    margin: 0,
  },
  govBar: {
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    padding: '8px 0',
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
  govBarLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  govBarLeftA: {
    color: '#555', textDecoration: 'none', fontSize: '13px',
    display: 'flex', alignItems: 'center', gap: '5px',
  },
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
  pageBg: { background: '#f0f0f0', minHeight: 'calc(100vh - 160px)', padding: '30px 0 50px' },
  pageWrap: { maxWidth: '980px', margin: '0 auto', padding: '0 16px' },
  card: {
    background: '#fff', borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,.08)',
    padding: '32px 38px 38px',
  },
  /* Title: بالضبط كما في الصورة — أسود، كبير، وسط */
  pageTitle: {
    textAlign: 'center',
    fontSize: '34px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '28px',
    lineHeight: 1.3,
  },
  /* الصورة الشخصية — أكبر كما في الصورة */
  photoCenter: { textAlign: 'center', marginBottom: '32px' },
  photoImg: {
    width: '260px',
    height: '310px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'inline-block',
  },
  photoPlaceholder: {
    width: '260px',
    height: '310px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eee',
    color: '#aaa',
    fontSize: '13px',
  },
  /* حقول — كل واحد عمود كامل بـ label خارجي bold */
  fieldsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 24px',
  },
  fieldWrap: {
    marginBottom: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  fieldLabel: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'right',
    display: 'block',
  },
  fieldInput: {
    width: '100%',
    height: '50px',
    padding: '0 14px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    background: '#f8f9fa',
    fontSize: '15px',
    fontFamily: "'Tajawal', sans-serif",
    color: '#495057',
    outline: 'none',
    direction: 'rtl',
    cursor: 'default',
    boxSizing: 'border-box',
    textAlign: 'right',
  },
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

/* ─── حقل بـ label خارجي ─── */
function CertField({ label, value, id }) {
  return (
    <div style={S.fieldWrap}>
      <label htmlFor={id} style={S.fieldLabel}>{label}</label>
      <input
        id={id}
        type="text"
        value={value || ''}
        readOnly
        style={S.fieldInput}
        aria-label={label}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CertificatePage
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        @keyframes spin { to { transform: rotate(360deg) } }

        * { box-sizing: border-box; }

        .cert-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }

        /* ══════════ MOBILE ══════════ */
        @media (max-width: 768px) {

          /* Gov Bar — 3 صفوف منفصلة */
          .cert-gov-bar { padding: 0 !important; }
          .cert-gov-bar-inner {
            flex-direction: column !important;
            padding: 0 !important;
            gap: 0 !important;
            align-items: stretch !important;
          }
          .cert-gov-bar-row1 {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            padding: 10px 16px 6px !important;
            border-bottom: 1px solid #f0f0f0;
          }
          .cert-gov-bar-row2 {
            display: flex !important;
            justify-content: center !important;
            padding: 6px 16px !important;
            border-bottom: 1px solid #f0f0f0;
          }
          .cert-gov-bar-row3 {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 8px 16px !important;
          }
          /* إخفاء العناصر الديسكتوب في الغوف بار */
          .cert-gov-bar-right-desktop,
          .cert-gov-bar-left { display: none !important; }

          /* Header */
          .cert-header-inner {
            padding: 0 16px !important;
            height: 64px !important;
            justify-content: flex-end !important;
          }
          .cert-logo { display: none !important; }
          .cert-main-nav, .cert-header-actions { display: none !important; }
          .cert-hamburger { display: flex !important; align-items: center; justify-content: center; }

          /* Page bg */
          .cert-page-bg { background: #fff !important; padding: 0 !important; }
          .cert-page-wrap { padding: 0 !important; }
          .cert-card {
            box-shadow: none !important;
            padding: 20px 16px 40px !important;
            border-radius: 0 !important;
          }

          /* Title */
          .cert-page-title {
            font-size: 34px !important;
            color: #1a1a1a !important;
            margin-bottom: 24px !important;
            font-weight: 800 !important;
          }

          /* Photo */
          .cert-photo-img {
            width: 260px !important;
            height: 310px !important;
          }
          .cert-photo-placeholder {
            width: 260px !important;
            height: 310px !important;
          }

          /* Fields — عمود واحد */
          .cert-fields-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          /* Field wrap — label خارجي، bold، أسود */
          .cert-field-wrap {
            margin-bottom: 20px !important;
            gap: 6px !important;
          }
          .cert-field-label {
            font-size: 15px !important;
            font-weight: 700 !important;
            color: #1a1a1a !important;
          }
          .cert-field-input {
            height: 50px !important;
            background: #f8f9fa !important;
            border: 1px solid #ced4da !important;
            color: #495057 !important;
            font-size: 15px !important;
            border-radius: 8px !important;
          }

          /* Footer */
          .cert-footer-inner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
            padding: 0 16px !important;
          }
          .cert-footer-links { justify-content: center !important; }
        }
      `}</style>

      {/* ── TOP GOVERNMENT BAR ── */}
      <div style={S.govBar} className="cert-gov-bar">
        {/* Desktop layout */}
        <div style={S.govBarInner} className="cert-gov-bar-inner">

          {/* Desktop Right */}
          <div style={S.govBarRight} className="cert-gov-bar-right-desktop">
            <span style={S.saFlag}>
              <svg viewBox="2 2 16 7" style={{ width: 16, height: 10 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.13775 3C8.12247 3 8.09956 3.00764 8.07029 3.02546C8.00155 3.07128 7.86664 3.21256 7.86154 3.37548C7.85773 3.4684 7.83991 3.4684 7.89973 3.52822C7.94301 3.58932 7.98883 3.58423 8.07538 3.53713C8.12629 3.49895 8.14284 3.47731 8.16066 3.41494C8.18102 3.31311 8.04992 3.46585 8.03338 3.34875C8.0041 3.24184 8.08811 3.19601 8.16702 3.09419C8.16957 3.04328 8.16957 3.00509 8.13775 3.00255V3Z" fill="white"/>
              </svg>
            </span>
            <span style={{ color: '#555', fontSize: '13px' }}>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</span>
            <a href="#" style={S.govVerify}>كيف تتحقق <span style={{ fontSize: '10px', color: '#666' }}>⌄</span></a>
          </div>
          <div style={S.govBarLeft} className="cert-gov-bar-left">
            <a href="#" style={S.govBarLeftA}>⚙ الإعدادات</a>
            <a href="#" style={S.govBarLeftA}>
              <Accessibility size={15} strokeWidth={1.8} />
               أدوات سهولة الوصول</a>
          </div>

          {/* Mobile Row 1: العلم + النص */}
          <div className="cert-gov-bar-row1" style={{ display: 'none' }}>
            <span style={S.saFlag}>
              <svg viewBox="2 2 16 7" style={{ width: 16, height: 10 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.13775 3C8.12247 3 8.09956 3.00764 8.07029 3.02546C8.00155 3.07128 7.86664 3.21256 7.86154 3.37548C7.85773 3.4684 7.83991 3.4684 7.89973 3.52822C7.94301 3.58932 7.98883 3.58423 8.07538 3.53713C8.12629 3.49895 8.14284 3.47731 8.16066 3.41494C8.18102 3.31311 8.04992 3.46585 8.03338 3.34875C8.0041 3.24184 8.08811 3.19601 8.16702 3.09419C8.16957 3.04328 8.16957 3.00509 8.13775 3.00255V3Z" fill="white"/>
              </svg>
            </span>
            <span style={{ color: '#555', fontSize: '13px' }}>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</span>
          </div>

          {/* Mobile Row 2: كيف تتحقق */}
          <div className="cert-gov-bar-row2" style={{ display: 'none' }}>
            <a href="#" style={{ ...S.govVerify, marginRight: 0 }}>
              <span style={{ fontSize: '10px' }}>⌄</span> كيف تتحقق
            </a>
          </div>

          {/* Mobile Row 3: الإعدادات + أدوات سهولة الوصول */}
          <div className="cert-gov-bar-row3" style={{ display: 'none' }}>
            <a href="#" style={S.govBarLeftA}>♿ أدوات سهولة الوصول</a>
            <a href="#" style={{ ...S.govBarLeftA, border: '1px solid #ccc', borderRadius: '4px', padding: '3px 10px' }}>⚙ الإعدادات</a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header style={S.mainHeader}>
        <div style={S.headerInner} className="cert-header-inner">
          <a href="/" style={S.logoLink} className="cert-logo">
            <img src="https://balady.gov.sa/themes/custom/balady_new/logo.svg" alt="Balady Logo" style={{ height: '45px' }} />
          </a>
          <nav style={S.mainNav} className="cert-main-nav">
            <a href="#" style={S.navA}>عن بلدي <span style={S.arr}>&#8964;</span></a>
            <a href="#" style={S.navActive}>الخدمات <span style={S.arr}>&#8964;</span></a>
            <a href="#" style={S.navA}>الاستعلامات</a>
            <a href="#" style={S.navA}>تواصل معنا <span style={S.arr}>&#8964;</span></a>
          </nav>
          <div style={S.headerActions} className="cert-header-actions">
            <a href="#" style={S.btnBusiness}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              بلدي أعمال
            </a>
            <button style={S.btnSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '17px', height: '17px' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              بحث
            </button>
          </div>
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
        <div style={S.pageWrap} className="cert-page-wrap">

          {loading && (
            <div style={S.loadingWrap}>
              <div style={S.spinner} />
              <span style={{ color: '#666', fontSize: '14px' }}>جارٍ تحميل الشهادة…</span>
            </div>
          )}

          {error && <div style={S.errorBox}>{error}</div>}

          {person && !loading && (
            <div style={S.card} className="cert-card">

              {/* العنوان */}
              <h2 style={S.pageTitle} className="cert-page-title">شهادة صحية للانشطة التجارية</h2>

              {/* الصورة الشخصية */}
              <div style={S.photoCenter}>
                {person.photoUrl ? (
                  <img
                    src={person.photoUrl}
                    alt="صورة المستفيد"
                    style={S.photoImg}
                    className="cert-photo-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={S.photoPlaceholder} className="cert-photo-placeholder">
                    لا توجد صورة
                  </div>
                )}
              </div>

              {/* الحقول */}
              <div style={S.fieldsGrid} className="cert-fields-grid">

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-amanah">الامانة</label>
                  <input id="cert-amanah" type="text" readOnly value={person.amanah || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-municipality">البلدية</label>
                  <input id="cert-municipality" type="text" readOnly value={person.municipality || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-name">الاسم</label>
                  <input id="cert-name" type="text" readOnly value={person.name || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-iqama">رقم الاقامة</label>
                  <input id="cert-iqama" type="text" readOnly value={person.iqamaNumber || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-gender">الجنس</label>
                  <input id="cert-gender" type="text" readOnly value={person.gender || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-nationality">الجنسية</label>
                  <input id="cert-nationality" type="text" readOnly value={person.nationality || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-certno">رقم الشهادة الصحية</label>
                  <input id="cert-certno" type="text" readOnly value={person.certificateNumber || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-job">المهنة</label>
                  <input id="cert-job" type="text" readOnly value={person.jobTitle || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-issue-h">تاريخ إصدار الشهادة الصحية هجري</label>
                  <input id="cert-issue-h" type="text" readOnly value={person.issueDateHijri || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-issue-g">تاريخ إصدار الشهادة الصحية ميلادي</label>
                  <input id="cert-issue-g" type="text" readOnly value={person.issueDateGregorian || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-expiry-h">تاريخ نهاية الشهادة الصحية هجري</label>
                  <input id="cert-expiry-h" type="text" readOnly value={person.expiryDateHijri || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-expiry-g">تاريخ نهاية الشهادة الصحية ميلادي</label>
                  <input id="cert-expiry-g" type="text" readOnly value={person.expiryDateGregorian || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-program">نوع البرنامج التثقيفى</label>
                  <input id="cert-program" type="text" readOnly value={person.programType || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-prog-exp">تاريخ انتهاء البرنامج التثقيفى</label>
                  <input id="cert-prog-exp" type="text" readOnly value={person.programExpiryHijri || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-license">رقم الرخصة</label>
                  <input id="cert-license" type="text" readOnly value={person.licenseNumber || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-estname">اسم المنشأة</label>
                  <input id="cert-estname" type="text" readOnly value={person.establishmentName || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} className="cert-field-label" htmlFor="cert-estno">رقم المنشأة</label>
                  <input id="cert-estno" type="text" readOnly value={person.establishmentNumber || ''} style={S.fieldInput} className="cert-field-input" />
                </div>

                {/* خلية فارغة لإكمال الشبكة */}
                <div />

              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={S.siteFooter}>
        <div style={S.footerInner} className="cert-footer-inner">
          <div style={S.footerLinks} className="cert-footer-links">
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