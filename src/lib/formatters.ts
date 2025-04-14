
/**
 * Format a number as INR currency
 * @param amount Number to format
 * @param options Formatting options
 * @returns Formatted INR string without the ₹ symbol (added via CSS)
 */
export function formatINR(amount: number, options: { compact?: boolean } = {}): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    maximumFractionDigits: 0,
    notation: options.compact ? 'compact' : 'standard',
    compactDisplay: 'short',
  });
  
  return formatter.format(amount);
}

/**
 * Format a number as a percentage
 * @param value Number to format as percentage
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercent(value: number | undefined | null, decimals: number = 1): string {
  if (value === undefined || value === null) {
    return '0.0%';
  }
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a large number with K/M/B suffix
 * @param num Number to format
 * @returns Formatted number with suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
}

/**
 * Parse an INR string into a number
 * @param inrString INR string (with or without ₹ symbol)
 * @returns Numeric value
 */
export function parseINR(inrString: string): number {
  // Remove the ₹ symbol and commas
  const cleanedString = inrString.replace(/₹|,/g, '');
  return parseFloat(cleanedString);
}
