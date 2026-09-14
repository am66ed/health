import { useState, useRef } from 'react';
import axios from 'axios';
import BalaydLayout from '../components/BalaydLayout';
import FloatLabelInput from '../components/FloatLabelInput';

const INITIAL = {
  name: '',
  iqamaNumber: '',
  nationality: '',
  gender: '',
  jobTitle: '',
  certificateNumber: '',
  issueDateHijri: '',
  issueDateGregorian: '',
  expiryDateHijri: '',
  expiryDateGregorian: '',
  programType: '',
  programExpiryHijri: '',
  licenseNumber: '',
  establishmentName: '',
  establishmentNumber: '',
  amanah: 'أمانة منطقة الرياض',
  municipality: 'بلدية الرياض',
};

export default function AdminPage() {
  const [form, setForm] = useState(INITIAL);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { person, qrCode }
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);

      const res = await axios.post('/api/persons', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.error || 'حدث خطأ أثناء الحفظ. يرجى المحاولة مجدداً.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL);
    setPhoto(null);
    setPhotoPreview(null);
    setResult(null);
    setError('');
  };

  const handleDownloadQR = () => {
    if (!result?.qrCode) return;
    const link = document.createElement('a');
    link.href = result.qrCode;
    const certNo = result.person.certificateNumber || result.person._id;
    link.download = `qrcode_${certNo}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BalaydLayout>
      <div className="card">
        <h2 className="admin-page-title">إضافة شهادة صحية جديدة</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="fields-grid">

            {/* الامانة */}
            <FloatLabelInput
              id="amanah" name="amanah" label="الامانة"
              value={form.amanah} onChange={handleChange}
            />
            {/* البلدية */}
            <FloatLabelInput
              id="municipality" name="municipality" label="البلدية"
              value={form.municipality} onChange={handleChange}
            />

            {/* الاسم */}
            <FloatLabelInput
              id="name" name="name" label="الاسم"
              value={form.name} onChange={handleChange} required
            />
            {/* رقم الاقامة */}
            <FloatLabelInput
              id="iqamaNumber" name="iqamaNumber" label="رقم الاقامة"
              value={form.iqamaNumber} onChange={handleChange}
            />

            {/* الجنس – select */}
            <div className={`fl-field${form.gender ? ' has-val' : ''}`}>
              <div className="select-wrap">
                <select
                  id="gender" name="gender"
                  value={form.gender} onChange={handleChange}
                  required
                >
                  <option value="" disabled> </option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
              <label htmlFor="gender">الجنس</label>
            </div>

            {/* الجنسية */}
            <FloatLabelInput
              id="nationality" name="nationality" label="الجنسية"
              value={form.nationality} onChange={handleChange}
            />

            {/* رقم الشهادة */}
            <FloatLabelInput
              id="certificateNumber" name="certificateNumber" label="رقم الشهادة الصحية"
              value={form.certificateNumber} onChange={handleChange}
            />
            {/* المهنة */}
            <FloatLabelInput
              id="jobTitle" name="jobTitle" label="المهنة"
              value={form.jobTitle} onChange={handleChange}
            />

            {/* تاريخ الإصدار هجري */}
            <FloatLabelInput
              id="issueDateHijri" name="issueDateHijri"
              label="تاريخ إصدار الشهادة الصحية هجري"
              value={form.issueDateHijri} onChange={handleChange}
            />
            {/* تاريخ الإصدار ميلادي */}
            <FloatLabelInput
              id="issueDateGregorian" name="issueDateGregorian"
              label="تاريخ إصدار الشهادة الصحية ميلادي"
              value={form.issueDateGregorian} onChange={handleChange}
            />

            {/* تاريخ الانتهاء هجري */}
            <FloatLabelInput
              id="expiryDateHijri" name="expiryDateHijri"
              label="تاريخ نهاية الشهادة الصحية هجري"
              value={form.expiryDateHijri} onChange={handleChange}
            />
            {/* تاريخ الانتهاء ميلادي */}
            <FloatLabelInput
              id="expiryDateGregorian" name="expiryDateGregorian"
              label="تاريخ نهاية الشهادة الصحية ميلادي"
              value={form.expiryDateGregorian} onChange={handleChange}
            />

            {/* نوع البرنامج */}
            <FloatLabelInput
              id="programType" name="programType" label="نوع البرنامج التثقيفي"
              value={form.programType} onChange={handleChange}
            />
            {/* تاريخ انتهاء البرنامج */}
            <FloatLabelInput
              id="programExpiryHijri" name="programExpiryHijri"
              label="تاريخ انتهاء البرنامج التثقيفي هجري"
              value={form.programExpiryHijri} onChange={handleChange}
            />

            {/* رقم الرخصة */}
            <FloatLabelInput
              id="licenseNumber" name="licenseNumber" label="رقم الرخصة"
              value={form.licenseNumber} onChange={handleChange}
            />
            {/* اسم المنشأة */}
            <FloatLabelInput
              id="establishmentName" name="establishmentName" label="اسم المنشأة"
              value={form.establishmentName} onChange={handleChange}
            />

            {/* رقم المنشأة */}
            <FloatLabelInput
              id="establishmentNumber" name="establishmentNumber" label="رقم المنشأة"
              value={form.establishmentNumber} onChange={handleChange}
            />

            {/* رفع صورة – spanning full width */}
            <div className="fl-field full-width" style={{ marginBottom: 0 }}>
              <div
                className="upload-area"
                onClick={() => fileInputRef.current.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
                aria-label="رفع صورة المستفيد"
              >
                <label>
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="#006c35"
                    strokeWidth="1.8" style={{ width: 32, height: 32, margin: '0 auto', display: 'block' }}
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="upload-label-text">
                    {photo ? photo.name : 'انقر لرفع صورة المستفيد'}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
                {photoPreview && (
                  <img src={photoPreview} alt="معاينة الصورة" className="upload-preview" />
                )}
              </div>
            </div>

          </div>

          {/* Submit */}
          <button
            id="submit-btn"
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'جارٍ الحفظ...' : 'حفظ وإنشاء الشهادة'}
          </button>
        </form>

        {/* Error */}
        {error && <div className="error-box">{error}</div>}

        {/* Success */}
        {result && (
          <div className="success-box">
            <h3>✅ تم إنشاء الشهادة بنجاح!</h3>
            <p>رقم الشهادة: <strong>{result.person.certificateNumber || '—'}</strong></p>
            <p style={{ marginTop: 6 }}>امسح رمز QR لعرض الشهادة الصحية:</p>
            <img
              src={result.qrCode}
              alt="QR Code"
              className="qr-img"
              width={200}
              height={200}
            />
            <br />
            {/* زر تحميل QR */}
            <button
              id="download-qr-btn"
              onClick={handleDownloadQR}
              style={{
                marginTop: 12,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#fff', border: '1.5px solid #222',
                color: '#222', padding: '8px 20px', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ width: 16, height: 16 }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              تحميل رمز QR
            </button>
            <br />
            <a
              href={`/certificate/${result.person._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              عرض الشهادة الصحية ←
            </a>
            <br />
            <button
              id="add-another-btn"
              onClick={handleReset}
              style={{
                marginTop: 14, background: 'none', border: '1px solid #5a9a6a',
                color: '#006c35', padding: '8px 20px', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
              }}
            >
              إضافة شهادة أخرى
            </button>
          </div>
        )}
      </div>
    </BalaydLayout>
  );
}
