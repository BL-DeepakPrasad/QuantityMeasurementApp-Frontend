import React from "react";
import "./HistoryCard.css";

export default function HistoryCard({ history, onClear, loading }) {
  if (!history || history.length === 0) {
    return (
      <div className="card mt-4 shadow-sm border-0 history-card">
        <div className="card-body p-4 text-center text-muted">
          <h5 className="card-title mb-3">Operation History</h5>
          <p>No history available.</p>
        </div>
      </div>
    );
  }

  const formatRecord = (record) => {
    switch (record.operation) {
      case "CONVERT":
        return `${record.inputValue} ${record.inputUnit} → ${record.resultValue.toFixed(3)} ${record.targetUnit}`;
      case "COMPARE":
        return `${record.inputValue} ${record.inputUnit} == ${record.secondValue} ${record.secondUnit} : ${record.resultString}`;
      case "ADD":
        return `${record.inputValue} ${record.inputUnit} + ${record.secondValue} ${record.secondUnit} = ${record.resultValue.toFixed(3)} ${record.targetUnit}`;
      case "SUBTRACT":
        return `${record.inputValue} ${record.inputUnit} - ${record.secondValue} ${record.secondUnit} = ${record.resultValue.toFixed(3)} ${record.targetUnit}`;
      case "DIVIDE":
        return `${record.inputValue} ${record.inputUnit} ÷ ${record.secondValue} ${record.secondUnit} = ${record.resultValue.toFixed(3)} ${record.targetUnit}`;
      default:
        return `${record.operation} operation`;
    }
  };

  return (
    <div className="card mt-4 shadow-sm border-0 history-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Operation History</h5>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={onClear}
            disabled={loading}
          >
            {loading ? "Clearing..." : "Clear History"}
          </button>
        </div>
        
        <ul className="list-group list-group-flush history-list">
          {history.map((record) => (
            <li key={record.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-secondary me-2">{record.operation}</span>
                <span className="text-secondary small me-2">{record.quantityType}</span>
                <span className="fw-medium">{formatRecord(record)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
