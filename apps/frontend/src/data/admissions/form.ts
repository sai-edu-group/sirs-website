export interface GradeOption {
  label: string;
  value: string;
}

// SIRS is a fully residential school for Classes IV-XII.
export const grades: GradeOption[] = [
  { label: "Class IV", value: "Class IV" },
  { label: "Class V", value: "Class V" },
  { label: "Class VI", value: "Class VI" },
  { label: "Class VII", value: "Class VII" },
  { label: "Class VIII", value: "Class VIII" },
  { label: "Class IX", value: "Class IX" },
  { label: "Class X", value: "Class X" },
  { label: "Class XI - Science", value: "Class XI-Science" },
  { label: "Class XI - Commerce", value: "Class XI-Commerce" },
  { label: "Class XI - Humanities", value: "Class XI-Humanities" },
  { label: "Class XII - Science", value: "Class XII-Science" },
  { label: "Class XII - Commerce", value: "Class XII-Commerce" },
  { label: "Class XII - Humanities", value: "Class XII-Humanities" },
];
