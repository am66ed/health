/** Shared Balady header/footer layout wrapper */
export default function BalaydLayout({ children }) {
  return (
    <>
      {/* ── TOP GOVERNMENT BAR ── */}
      <div className="gov-bar">
        <div className="inner">
          <div className="gov-bar-right">
            <span className="sa-flag">🇸🇦</span>
            <span style={{ color: '#555', fontSize: '13px' }}>
              موقع حكومي مسجل لدى هيئة الحكومة الرقمية
            </span>
            <a href="#" className="gov-verify">
              كيف تتحقق <span className="chev">⌄</span>
            </a>
          </div>
          <div className="gov-bar-left">
            <a href="#">
              <span className="icon-settings" /> الإعدادات
            </a>
            <a href="#">
              <span className="icon-access" /> أدوات سهولة الوصول
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className="main-header">
        <div className="header-inner">
          {/* Logo */}
          <a href="/" className="logo-link">
            <svg className="logo-emblem" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="circ"><circle cx="55" cy="55" r="50" /></clipPath>
              </defs>
              <circle cx="55" cy="55" r="52" fill="#fff" stroke="#d0d0d0" strokeWidth="1" />
              <circle cx="55" cy="55" r="50" fill="none" stroke="#006c35" strokeWidth="3" />
              <rect x="52" y="48" width="6" height="30" rx="3" fill="#006c35" />
              <ellipse cx="55" cy="40" rx="20" ry="10" transform="rotate(-15,55,40)" fill="#006c35" opacity=".9" />
              <ellipse cx="55" cy="40" rx="20" ry="10" transform="rotate(15,55,40)" fill="#006c35" opacity=".9" />
              <ellipse cx="55" cy="38" rx="14" ry="8" fill="#006c35" />
              <ellipse cx="42" cy="44" rx="13" ry="6" transform="rotate(-35,42,44)" fill="#006c35" opacity=".8" />
              <ellipse cx="68" cy="44" rx="13" ry="6" transform="rotate(35,68,44)" fill="#006c35" opacity=".8" />
              <line x1="36" y1="68" x2="74" y2="84" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="74" y1="68" x2="36" y2="84" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="36" cy="68" r="2" fill="#006c35" />
              <circle cx="74" cy="68" r="2" fill="#006c35" />
            </svg>
            <div className="logo-text-block">
              <span className="logo-top-ar">خدمات</span>
              <span className="logo-main-ar">بلدي</span>
              <span className="logo-en">BALADY SERVICES</span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="main-nav">
            <a href="#">عن بلدي <span className="arr">&#8964;</span></a>
            <a href="#" className="nav-active">الخدمات <span className="arr">&#8964;</span></a>
            <a href="#">الاستعلامات</a>
            <a href="#">تواصل معنا <span className="arr">&#8964;</span></a>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <a href="#" className="btn-business">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              بلدي أعمال
            </a>
            <button className="btn-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              بحث
            </button>
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <div className="page-bg">
        <div className="page-wrap">
          {children}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="#">خريطة الموقع</a>
            <a href="#">RSS</a>
            <a href="#">شروط الاستخدام</a>
          </div>
          <div className="footer-copy">
            <p><strong style={{ color: '#daeee6' }}>جميع الحقوق محفوظة لوزارة البلديات والإسكان © 2026</strong></p>
            <p>تم تطويره وصيانته بواسطة وزارة البلديات والإسكان</p>
          </div>
          <div className="footer-logos">
            <span className="dga-badge">مسجل لدى هيئة الحكومة الرقمية</span>
            <span className="balady-logo-footer">balady</span>
          </div>
        </div>
      </footer>
    </>
  );
}
