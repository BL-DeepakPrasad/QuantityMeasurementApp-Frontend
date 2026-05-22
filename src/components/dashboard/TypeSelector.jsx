import { UNIT_MAP, TYPE_ICONS, formatUnit } from "./constants";

/**
 * Renders a row of clickable cards for selecting the quantity type
 * (Length, Volume, Weight, Temperature).
 */
export default function TypeSelector({ selected, onSelect }) {
  return (
    <>
      <h6 className="text-uppercase text-muted fw-bold small mb-3">Choose Type</h6>
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
        {Object.keys(UNIT_MAP).map((type) => (
          <div className="col" key={type}>
            <div
              className={`card text-center py-3 border-2 type-card ${selected === type ? "active" : ""}`}
              onClick={() => onSelect(type)}
            >
              <div className="type-icon">{TYPE_ICONS[type]}</div>
              <div className="fw-semibold mt-1">{formatUnit(type)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
