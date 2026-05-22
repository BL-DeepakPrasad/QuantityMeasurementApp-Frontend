import { formatUnit } from "./constants";


export default function ValueInputCard({
  label,
  value,
  onValueChange,
  unit,
  onUnitChange,
  units,
  inputId,
  selectId,
  placeholder,
}) {
  const showInput = typeof onValueChange === "function";

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="text-uppercase text-muted fw-bold small mb-2">{label}</h6>

        {showInput ? (
          <input
            type="number"
            className="form-control value-input mb-3"
            id={inputId}
            placeholder="0"
            step="0.01"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            required
          />
        ) : (
          <div className="value-input text-muted mb-3">{placeholder ?? "—"}</div>
        )}

        <select
          className="form-select"
          id={selectId}
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          {units.map((u) => (
            <option key={u} value={u}>
              {formatUnit(u)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
