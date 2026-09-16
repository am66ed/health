import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Settings, Accessibility, Menu, ExternalLink, Search } from 'lucide-react';

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
  /* Gov Bar */
  govBar: {
    background: '#ebebeb',
    borderBottom: '1px solid #d0d0d0',
    fontSize: '13px',
    color: '#444',
  },
  /* صف 1: العلم وحده في المنتصف */
  govRow1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 24px 6px',
  },
  saFlag: {
    width: '38px', height: '26px', background: '#006c35', borderRadius: '3px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  /* صف 2: النص في المنتصف */
  govRow2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 24px 6px',
    fontSize: '14px',
    color: '#222',
    fontWeight: '500',
  },
  /* صف 3: كيف تتحقق — يسار بدون border */
  govRow3: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '4px 24px 8px',
  },
  govVerify: {
    display: 'flex', alignItems: 'center', gap: '5px',
    color: '#006c35', textDecoration: 'none', fontSize: '13px',
    fontWeight: '500',
  },
  /* صف 4: أدوات الوصول يمين + الإعدادات يسار */
  govRow4: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 24px',
    borderTop: '1px solid #d0d0d0',
  },
  /* أدوات سهولة الوصول — يمين، بدون border */
  accessibilityLink: {
    display: 'flex', alignItems: 'center', gap: '6px',
    color: '#333', textDecoration: 'none', fontSize: '13px',
    fontWeight: '400',
  },
  /* الإعدادات — يسار، مع border واضح وخط تحت الكلمة */
  settingsLink: {
    display: 'flex', alignItems: 'center', gap: '6px',
    color: '#222', textDecoration: 'none', fontSize: '13px',
    fontWeight: '700',
    border: '2px solid #555',
    borderRadius: '4px',
    padding: '4px 12px',
  },
  settingsText: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  /* Main header */
  mainHeader: {
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
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
    textDecoration: 'none', fontSize: '14.5px',
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
    textAlign: 'center', fontSize: '34px', fontWeight: '800',
    color: '#1a1a1a', marginBottom: '28px', lineHeight: 1.3,
  },
  photoCenter: { textAlign: 'center', marginBottom: '32px' },
  photoImg: {
    width: '260px', height: '310px', objectFit: 'cover',
    border: '1px solid #ccc', borderRadius: '4px', display: 'inline-block',
  },
  photoPlaceholder: {
    width: '260px', height: '310px',
    border: '1px solid #ccc', borderRadius: '4px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: '#eee', color: '#aaa', fontSize: '13px',
  },
  fieldsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' },
  fieldWrap: { marginBottom: '22px', display: 'flex', flexDirection: 'column', gap: '6px' },
  fieldLabel: { fontSize: '15px', fontWeight: '700', color: '#1a1a1a', textAlign: 'right', display: 'block' },
  fieldInput: {
    width: '100%', height: '50px', padding: '0 14px',
    border: '1px solid #ced4da', borderRadius: '8px',
    background: '#f8f9fa', fontSize: '15px',
    fontFamily: "'Tajawal', sans-serif", color: '#495057',
    outline: 'none', direction: 'rtl', cursor: 'default',
    boxSizing: 'border-box', textAlign: 'right',
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

        /* ══ DESKTOP: Gov bar أفقي ══ */
        .cert-gov-mobile { display: none !important; }
        .cert-gov-desktop { display: block !important; }

        @media (max-width: 768px) {
          /* إخفاء النسخة الديسكتوب وإظهار الموبايل */
          .cert-gov-desktop { display: none !important; }
          .cert-gov-mobile  { display: block !important; }

          /* Header */
          .cert-header-inner {
            padding: 0 16px !important;
            height: 64px !important;
            justify-content: flex-end !important;
          }
          .cert-logo { display: none !important; }
          .cert-main-nav, .cert-header-actions { display: none !important; }
          .cert-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          /* Page */
          .cert-page-bg  { background: #fff !important; padding: 0 !important; }
          .cert-page-wrap { padding: 0 !important; }
          .cert-card {
            box-shadow: none !important;
            padding: 20px 16px 40px !important;
            border-radius: 0 !important;
          }
          .cert-page-title {
            font-size: 34px !important;
            font-weight: 800 !important;
            color: #1a1a1a !important;
          }
          .cert-photo-img, .cert-photo-placeholder {
            width: 260px !important; height: 310px !important;
          }
          .cert-fields-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .cert-field-wrap  { margin-bottom: 20px !important; }

          /* Footer */
          .cert-footer-inner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .cert-footer-links { justify-content: center !important; }
        }
      `}</style>

      {/* ══ GOV BAR — DESKTOP (أفقي) ══ */}
      <div style={S.govBar} className="cert-gov-desktop">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* يمين: العلم + النص + كيف تتحقق */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={S.saFlag}>
              <svg viewBox="0 0 20 12" style={{ width: 22, height: 14 }}>
                <rect width="20" height="12" fill="#006c35"/>
                <text x="10" y="9" textAnchor="middle" fontSize="5" fill="white" fontFamily="serif">لا إله إلا الله</text>
              </svg>
            </span>
            <span style={{ fontSize: '13px', color: '#222', fontWeight: '500' }}>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</span>
            <a href="#" style={S.govVerify}>
              <span style={{ fontSize: '11px' }}>∨</span>
              كيف تتحقق
            </a>
          </div>
          {/* يسار: أدوات الوصول + الإعدادات */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" style={S.accessibilityLink}>
              <Accessibility size={16} strokeWidth={1.8} />
              أدوات سهولة الوصول
            </a>
            <a href="#" style={S.settingsLink}>
              <Settings size={15} strokeWidth={2} />
              <span style={S.settingsText}>الإعدادات</span>
            </a>
          </div>
        </div>
      </div>

      {/* ══ GOV BAR — MOBILE (4 صفوف) ══ */}
      <div style={S.govBar} className="cert-gov-mobile">

        {/* صف 1: العلم وحده في المنتصف */}
        <div style={S.govRow1}>
          <span style={S.saFlag}>
            <svg viewBox="0 0 20 12" style={{ width: 22, height: 14 }}>
              <rect width="20" height="12" fill="#006c35"/>
              <text x="10" y="9" textAnchor="middle" fontSize="5" fill="white" fontFamily="serif">لا إله إلا الله</text>
            </svg>
          </span>
        </div>

        {/* صف 2: النص في المنتصف */}
        <div style={S.govRow2}>
          موقع حكومي مسجل لدى هيئة الحكومة الرقمية
        </div>

        {/* صف 3: كيف تتحقق — يسار بدون border */}
        <div style={S.govRow3}>
          <a href="#" style={S.govVerify}>
            <span style={{ fontSize: '13px' }}>∨</span>
            كيف تتحقق
          </a>
        </div>

        {/* صف 4: أدوات الوصول يمين + الإعدادات يسار — مع خط فاصل فوقه */}
        <div style={S.govRow4}>
          {/* يمين: أدوات سهولة الوصول */}
          <a href="#" style={S.accessibilityLink}>
            <Accessibility size={17} strokeWidth={1.8} />
            أدوات سهولة الوصول
          </a>
          {/* يسار: الإعدادات مع border وunderline */}
          <a href="#" style={S.settingsLink}>
            <Settings size={15} strokeWidth={2} />
            <span style={S.settingsText}>الإعدادات</span>
          </a>
        </div>
      </div>

      {/* ══ MAIN HEADER ══ */}
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
              <ExternalLink size={14} strokeWidth={2.2} style={{ flexShrink: 0 }} />
              بلدي أعمال
            </a>
            <button style={S.btnSearch}>
              <Search size={17} strokeWidth={2} />
              بحث
            </button>
          </div>
          {/* Hamburger — يظهر فقط على الموبايل في اليمين */}
          <button className="cert-hamburger">
            <Menu size={28} color="#333" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ══ PAGE CONTENT ══ */}
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

              <h2 style={S.pageTitle} className="cert-page-title">شهادة صحية للانشطة التجارية</h2>

              <div style={S.photoCenter}>
                {person.photoUrl ? (
                  <img src={person.photoUrl} alt="صورة المستفيد"
                    style={S.photoImg} className="cert-photo-img"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={S.photoPlaceholder} className="cert-photo-placeholder">لا توجد صورة</div>
                )}
              </div>

              <div style={S.fieldsGrid} className="cert-fields-grid">

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-amanah">الامانة</label>
                  <input id="cert-amanah" type="text" readOnly value={person.amanah || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-municipality">البلدية</label>
                  <input id="cert-municipality" type="text" readOnly value={person.municipality || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-name">الاسم</label>
                  <input id="cert-name" type="text" readOnly value={person.name || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-iqama">رقم الاقامة</label>
                  <input id="cert-iqama" type="text" readOnly value={person.iqamaNumber || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-gender">الجنس</label>
                  <input id="cert-gender" type="text" readOnly value={person.gender || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-nationality">الجنسية</label>
                  <input id="cert-nationality" type="text" readOnly value={person.nationality || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-certno">رقم الشهادة الصحية</label>
                  <input id="cert-certno" type="text" readOnly value={person.certificateNumber || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-job">المهنة</label>
                  <input id="cert-job" type="text" readOnly value={person.jobTitle || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-issue-h">تاريخ إصدار الشهادة الصحية هجري</label>
                  <input id="cert-issue-h" type="text" readOnly value={person.issueDateHijri || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-issue-g">تاريخ إصدار الشهادة الصحية ميلادي</label>
                  <input id="cert-issue-g" type="text" readOnly value={person.issueDateGregorian || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-expiry-h">تاريخ نهاية الشهادة الصحية هجري</label>
                  <input id="cert-expiry-h" type="text" readOnly value={person.expiryDateHijri || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-expiry-g">تاريخ نهاية الشهادة الصحية ميلادي</label>
                  <input id="cert-expiry-g" type="text" readOnly value={person.expiryDateGregorian || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-program">نوع البرنامج التثقيفى</label>
                  <input id="cert-program" type="text" readOnly value={person.programType || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-prog-exp">تاريخ انتهاء البرنامج التثقيفى</label>
                  <input id="cert-prog-exp" type="text" readOnly value={person.programExpiryHijri || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-license">رقم الرخصة</label>
                  <input id="cert-license" type="text" readOnly value={person.licenseNumber || ''} style={S.fieldInput} />
                </div>
                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-estname">اسم المنشأة</label>
                  <input id="cert-estname" type="text" readOnly value={person.establishmentName || ''} style={S.fieldInput} />
                </div>

                <div style={S.fieldWrap} className="cert-field-wrap">
                  <label style={S.fieldLabel} htmlFor="cert-estno">رقم المنشأة</label>
                  <input id="cert-estno" type="text" readOnly value={person.establishmentNumber || ''} style={S.fieldInput} />
                </div>
                <div />

              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
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