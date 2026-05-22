/**
 * Shared constants and utilities for the Dashboard feature.
 */

export const UNIT_MAP = {
  LENGTH: ["INCH", "FEET", "YARD", "CENTIMETER"],
  VOLUME: ["GALLON", "LITRE", "MILLILITER"],
  WEIGHT: ["GRAM", "KILOGRAM", "TONNE"],
  TEMPERATURE: ["CELSIUS", "FAHRENHEIT"],
};

export const TYPE_ICONS = {
  LENGTH: "📏",
  WEIGHT: "⚖️",
  TEMPERATURE: "🌡️",
  VOLUME: "🧪",
};

export const OPERATIONS = [
  { value: "COMPARE", label: "Comparison" },
  { value: "CONVERT", label: "Conversion" },
  { value: "ADD", label: "Add" },
  { value: "SUBTRACT", label: "Subtract" },
  { value: "DIVIDE", label: "Divide" },
];

/**
 * Title-case a unit string, e.g. "CENTIMETER" → "Centimeter"
 */
export function formatUnit(unit) {
  return unit.charAt(0) + unit.slice(1).toLowerCase();
}
