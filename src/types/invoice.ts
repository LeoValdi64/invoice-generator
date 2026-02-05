export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  senderName: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: LineItem[];
  taxRate: number;
  notes: string;
  currency: string;
}

export const CURRENCIES: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "\u20AC", name: "Euro" },
  GBP: { symbol: "\u00A3", name: "British Pound" },
  MXN: { symbol: "$", name: "Mexican Peso" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
};

export function formatCurrency(amount: number, currency: string): string {
  const cur = CURRENCIES[currency] || CURRENCIES.USD;
  return `${cur.symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

export function calculateTotal(subtotal: number, tax: number): number {
  return subtotal + tax;
}
