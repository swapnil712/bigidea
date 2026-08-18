export const getRows = (value: string, minRows = 2, maxRows = 12) => {

  if (!value) { return minRows }

  const lineBreaks = (value.match(/\n/g) || []).length;
  const estimatedLines = Math.ceil(value.length / 80); // ~80 chars per line
  const rows = Math.max(lineBreaks + 1, estimatedLines);
  return Math.min(Math.max(rows, minRows), maxRows);
};