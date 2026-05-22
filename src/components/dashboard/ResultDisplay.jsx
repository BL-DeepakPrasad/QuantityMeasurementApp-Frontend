import { useState, useEffect } from "react";
import { formatUnit } from "./constants";

/**
 * A single, always-visible result card with a left accent bar.
 * Shows the result value on the left and the target-unit dropdown on the right.
 *
 * Props:
 *  - result            : { text, type } | null
 *  - loading           : boolean
 *  - showTargetUnit    : boolean
 *  - targetUnit        : string
 *  - onTargetUnitChange: function
 *  - units             : string[]
 */
export default function ResultDisplay({
  result,
  loading,
  showTargetUnit,
  targetUnit,
  onTargetUnitChange,
  units = [],
}) {
  const [animate, setAnimate] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger the pop-in animation whenever a new result arrives
  useEffect(() => {
    if (result) {
      setAnimate(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [result]);

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const accentColor = !result
    ? "#20c997"
    : result.type === "success"
      ? "#20c997"
      : "#dc3545";

  return (
    <div
      className={`result-box mt-4 ${loading ? "result-box--loading" : ""} ${animate ? "result-box--pop" : ""}`}
      style={{ "--result-accent": accentColor }}
      id="resultDisplay"
    >
      <div className="result-box__label">Result</div>

      <div className="result-box__body">
        {/* Left side: value or placeholder */}
        {loading ? (
          <div className="result-box__placeholder">
            <span className="result-box__dot" />
            <span className="result-box__dot" />
            <span className="result-box__dot" />
          </div>
        ) : result ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              className="result-box__value"
              id="finalResult"
              onClick={handleCopy}
              title="Click to copy"
              style={{ cursor: "pointer" }}
            >
              {result.text}
            </p>
            <small className="result-box__hint" onClick={handleCopy}>
              {copied ? "✅ Copied!" : "📋"}
            </small>
          </div>
        ) : (
          <p className="result-box__empty">—</p>
        )}

        {/* Right side: target unit dropdown */}
        {showTargetUnit && (
          <select
            className="form-select result-box__unit-select"
            id="targetUnitSelect"
            value={targetUnit}
            onChange={(e) => onTargetUnitChange(e.target.value)}
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {formatUnit(u)}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
