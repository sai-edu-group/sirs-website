/** Represents one year option consumed by filter components. */
export type YearOptionData = {
  /** Query/API year value. */
  value: string | number;
  /** UI text shown in the filter. */
  label: string;
};

/**
 * Normalizes mixed year inputs into UI-safe string value/label objects.
 */
export const normalizeYearOptions = (
  years: Array<number | YearOptionData>,
): Array<{ value: string; label: string }> => {
  return years.map((yearOption) => {
    // Number input becomes plain year value and plain year label.
    if (typeof yearOption === "number") {
      return {
        // Convert to string for URL params and data attributes.
        value: yearOption.toString(),
        // Keep plain-year label for generic pages.
        label: yearOption.toString(),
      };
    }

    // Object input keeps custom label, normalizes value to string.
    return {
      value: yearOption.value.toString(),
      label: yearOption.label,
    };
  });
};

/**
 * Builds final filter options for generic pages.
 * Optionally prepends current year as plain-year label.
 */
export const buildFinalYearOptions = ({
  years,
  shouldIncludeCurrentYear,
  currentYear,
}: {
  years: Array<number | YearOptionData>;
  shouldIncludeCurrentYear: boolean;
  currentYear: number;
}): Array<{ value: string; label: string }> => {
  // First normalize all incoming values to one consistent shape.
  const baseYearOptions = normalizeYearOptions(years);

  // If auto-current-year is disabled, return only provided options.
  if (!shouldIncludeCurrentYear) {
    return baseYearOptions;
  }

  // Auto-generated current-year option for pages like media/results.
  const currentYearOption = {
    value: currentYear.toString(),
    label: currentYear.toString(),
  };

  // Put current year first and prevent duplicate entries.
  return [
    currentYearOption,
    ...baseYearOptions.filter(
      (yearOption) => yearOption.value !== currentYearOption.value,
    ),
  ];
};
