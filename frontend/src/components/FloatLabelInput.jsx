/**
 * FloatLabelInput – reusable float-label field (matching Balady design)
 *
 * Props:
 *  label      – Arabic label text
 *  id         – unique HTML id
 *  value      – controlled value
 *  onChange   – change handler (omit for readonly)
 *  type       – input type (default "text")
 *  readOnly   – boolean
 *  required   – boolean
 */
export default function FloatLabelInput({
  label,
  id,
  value = '',
  onChange,
  type = 'text',
  readOnly = false,
  required = false,
  name,
}) {
  const hasVal = value !== '' && value !== null && value !== undefined;
  return (
    <div className={`fl-field${hasVal ? ' has-val' : ''}`}>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        placeholder=" "
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
