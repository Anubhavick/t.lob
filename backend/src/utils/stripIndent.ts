export function stripIndents(strings: TemplateStringsArray, ...values: any[]): string {
  const fullString = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ?? '');
  }, '');

  const lines = fullString.split('\n');
  
  // Find minimum indentation (ignoring empty lines)
  const minIndent = lines
    .filter(line => line.trim().length > 0)
    .reduce((min, line) => {
      const indent = line.match(/^\s*/)?.[0].length ?? 0;
      return Math.min(min, indent);
    }, Infinity);

  // Remove the minimum indentation from all lines
  const strippedLines = lines.map(line => {
    return line.length > 0 ? line.slice(minIndent) : line;
  });

  // Remove leading and trailing empty lines
  while (strippedLines.length > 0 && strippedLines[0]?.trim() === '') {
    strippedLines.shift();
  }
  while (strippedLines.length > 0 && strippedLines[strippedLines.length - 1]?.trim() === '') {
    strippedLines.pop();
  }

  return strippedLines.join('\n');
}
