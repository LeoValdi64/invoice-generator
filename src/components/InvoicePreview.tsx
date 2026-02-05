"use client";

import type { InvoiceData } from "@/types/invoice";
import {
  formatCurrency,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/types/invoice";

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className="invoice-preview bg-white p-8 sm:p-10 min-h-[700px] text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">INVOICE</h2>
          <p className="text-sm text-slate-500 mt-1">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">
            <div>
              <span className="font-medium text-slate-600">Issued:</span>{" "}
              {invoice.issueDate
                ? new Date(invoice.issueDate + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </div>
            <div className="mt-0.5">
              <span className="font-medium text-slate-600">Due:</span>{" "}
              {invoice.dueDate
                ? new Date(invoice.dueDate + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </div>
          </div>
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            From
          </p>
          <p className="font-semibold text-slate-900">
            {invoice.senderName || "Your Name"}
          </p>
          {invoice.senderAddress && (
            <p className="text-sm text-slate-600 mt-0.5">{invoice.senderAddress}</p>
          )}
          {invoice.senderEmail && (
            <p className="text-sm text-slate-600 mt-0.5">{invoice.senderEmail}</p>
          )}
          {invoice.senderPhone && (
            <p className="text-sm text-slate-600 mt-0.5">{invoice.senderPhone}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Bill To
          </p>
          <p className="font-semibold text-slate-900">
            {invoice.clientName || "Client Name"}
          </p>
          {invoice.clientAddress && (
            <p className="text-sm text-slate-600 mt-0.5">{invoice.clientAddress}</p>
          )}
          {invoice.clientEmail && (
            <p className="text-sm text-slate-600 mt-0.5">{invoice.clientEmail}</p>
          )}
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th className="text-right py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">
                Qty
              </th>
              <th className="text-right py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                Rate
              </th>
              <th className="text-right py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="py-3 text-sm text-slate-700">
                  {item.description || "Item description"}
                </td>
                <td className="py-3 text-sm text-slate-600 text-right">{item.quantity}</td>
                <td className="py-3 text-sm text-slate-600 text-right">
                  {formatCurrency(item.rate, invoice.currency)}
                </td>
                <td className="py-3 text-sm font-medium text-slate-800 text-right">
                  {formatCurrency(item.quantity * item.rate, invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-64">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium text-slate-700">
              {formatCurrency(subtotal, invoice.currency)}
            </span>
          </div>
          {invoice.taxRate > 0 && (
            <div className="flex justify-between py-2 text-sm border-b border-slate-100">
              <span className="text-slate-500">Tax ({invoice.taxRate}%)</span>
              <span className="font-medium text-slate-700">
                {formatCurrency(tax, invoice.currency)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-3 text-lg border-t-2 border-slate-800 mt-1">
            <span className="font-bold text-slate-900">Total</span>
            <span className="font-bold text-slate-900">
              {formatCurrency(total, invoice.currency)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase">{invoice.currency}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Notes / Terms
          </p>
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          Generated with InvoiceForge
        </p>
      </div>
    </div>
  );
}
