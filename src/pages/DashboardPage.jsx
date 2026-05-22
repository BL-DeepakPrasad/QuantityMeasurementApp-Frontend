import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { convert, compare, add, subtract, divide } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { UNIT_MAP, formatUnit } from "../components/dashboard/constants";
import TypeSelector from "../components/dashboard/TypeSelector";
import OperationSelector from "../components/dashboard/OperationSelector";
import ValueInputCard from "../components/dashboard/ValueInputCard";
import ResultDisplay from "../components/dashboard/ResultDisplay";

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [operation, setOperation] = useState("CONVERT");
  const [quantityType, setQuantityType] = useState("LENGTH");
  const [value1, setValue1] = useState("");
  const [unit1, setUnit1] = useState("INCH");
  const [value2, setValue2] = useState("");
  const [unit2, setUnit2] = useState("FEET");
  const [targetUnit, setTargetUnit] = useState("FEET");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const availableUnits = UNIT_MAP[quantityType];

  // Reset units & result whenever the quantity type changes
  useEffect(() => {
    setUnit1(availableUnits[0]);
    setUnit2(availableUnits.length > 1 ? availableUnits[1] : availableUnits[0]);
    setTargetUnit(availableUnits.length > 1 ? availableUnits[1] : availableUnits[0]);
    setResult(null);
  }, [quantityType]);

  function handleTypeSelect(type) {
    setQuantityType(type);
  }

  function handleOperationSelect(op) {
    setOperation(op);
    setResult(null);
  }

  function getButtonLabel() {
    if (operation === "CONVERT") return "Convert";
    if (operation === "COMPARE") return "Compare";
    if (operation === "ADD") return "Add";
    if (operation === "SUBTRACT") return "Subtract";
    if (operation === "DIVIDE") return "Divide";
    return operation;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      if (operation === "CONVERT") {
        const data = await convert(quantityType, parseFloat(value1), unit1, targetUnit);
        setResult({ text: data.resultValue.toFixed(3).toString(), type: "success" });
      } else if (operation === "COMPARE") {
        const data = await compare(quantityType, parseFloat(value1), unit1, parseFloat(value2), unit2);
        const isEqual = data === true || data === "true";
        setResult({ text: isEqual ? "EQUAL" : "NOT EQUAL", type: isEqual ? "success" : "danger" });
      } else if (operation === "ADD") {
        const data = await add(quantityType, parseFloat(value1), unit1, parseFloat(value2), unit2, targetUnit);
        setResult({ text: data.resultValue.toFixed(3).toString(), type: "success" });
      } else if (operation === "SUBTRACT") {
        const data = await subtract(quantityType, parseFloat(value1), unit1, parseFloat(value2), unit2, targetUnit);
        setResult({ text: data.resultValue.toFixed(3).toString(), type: "success" });
      } else if (operation === "DIVIDE") {
        const data = await divide(quantityType, parseFloat(value1), unit1, parseFloat(value2), unit2, targetUnit);
        setResult({ text: data.resultValue.toFixed(3).toString(), type: "success" });
      }
      toast.success("Operation successful!");
    } catch (err) {
      toast.error(err.message);
      if (err.message.includes("Session expired")) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  const showValue2 = operation === "COMPARE" || operation === "ADD" || operation === "SUBTRACT" || operation === "DIVIDE";
  const showTargetUnit = operation === "CONVERT" || operation === "ADD" || operation === "SUBTRACT" || operation === "DIVIDE";

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9">

          {/* Quantity Type Selector */}
          <TypeSelector selected={quantityType} onSelect={handleTypeSelect} />

          {/* Operation Selector */}
          <OperationSelector selected={operation} onSelect={handleOperationSelect} />

          {/* Conversion / Comparison Form */}
          <form onSubmit={handleSubmit} id="conversionForm">
            <div className="row g-3 mb-4 value-row">
              {/* VALUE 1 card */}
              <div className="col-md-6">
                <ValueInputCard
                  label="Value 1"
                  value={value1}
                  onValueChange={setValue1}
                  unit={unit1}
                  onUnitChange={setUnit1}
                  units={availableUnits}
                  inputId="inputValue1"
                  selectId="inputUnit1"
                />
              </div>

              {/* Operator icon */}
              {showValue2 && (
                <span className="operator-icon">
                  {operation === "ADD" ? "+" : operation === "SUBTRACT" ? "−" : operation === "DIVIDE" ? "÷" : "⇌"}
                </span>
              )}
              {!showValue2 && (
                <span className="operator-icon">→</span>
              )}

              {/* VALUE 2 / TO card */}
              <div className="col-md-6">
                {showValue2 ? (
                  <ValueInputCard
                    label="Value 2"
                    value={value2}
                    onValueChange={setValue2}
                    unit={unit2}
                    onUnitChange={setUnit2}
                    units={availableUnits}
                    inputId="inputValue2"
                    selectId="inputUnit2"
                  />
                ) : (
                  <ValueInputCard
                    label="To"
                    unit={targetUnit}
                    onUnitChange={setTargetUnit}
                    units={availableUnits}
                    selectId="targetUnit"
                  />
                )}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading} id="submitBtn">
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              {loading ? "Processing..." : getButtonLabel()}
            </button>
          </form>

          {/* Single unified Result box (includes target-unit picker when needed) */}
          <ResultDisplay
            result={result}
            loading={loading}
            showTargetUnit={showTargetUnit}
            targetUnit={targetUnit}
            onTargetUnitChange={setTargetUnit}
            units={availableUnits}
          />

        </div>
      </div>
    </div>
  );
}
