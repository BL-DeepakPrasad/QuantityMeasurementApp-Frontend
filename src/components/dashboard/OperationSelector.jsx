import { OPERATIONS } from "./constants";

/**
 * Renders a horizontal button group for selecting the operation
 * (Compare, Convert, Add, Subtract, Divide).
 */
export default function OperationSelector({ selected, onSelect }) {
  return (
    <>
      <h6 className="text-uppercase text-muted fw-bold small mb-3">Choose Action</h6>
      <div className="btn-group w-100 mb-4" role="group">
        {OPERATIONS.map((op) => (
          <button
            key={op.value}
            type="button"
            className={`btn ${selected === op.value ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => onSelect(op.value)}
          >
            {op.label}
          </button>
        ))}
      </div>
    </>
  );
}
