export const getRows = (value: string, minRows = 3, maxRows = 12) => {
  const lineBreaks = (value.match(/\n/g) || []).length;
  const estimatedLines = Math.ceil(value.length / 80); // ~80 chars per line

  console.log ( value.length )
  const rows = Math.max(lineBreaks + 1, estimatedLines);
  return Math.min(Math.max(rows, minRows), maxRows);
};