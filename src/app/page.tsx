"use client";

import { useState, useCallback } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { FileText, Download } from "lucide-react";
import type { InvoiceData } from "@/types/invoice";

const defaultInvoice: InvoiceData = {
  senderName: "",
  senderAddress: "",
  senderEmail: "",
  senderPhone: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  items: [{ description: "", quantity: 1, rate: 0 }],
  taxRate: 0,
  notes: "",
  currency: "USD",
};

export default function Home() {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">InvoiceForge</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Free Invoice Generator</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span> PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="no-print max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Form */}
          <div>
            <InvoiceForm invoice={invoice} onChange={setInvoice} />
          </div>

          {/* Preview */}
          <div className="xl:sticky xl:top-24 xl:self-start">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 sm:mb-4">
              Live Preview
            </h2>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Print-only preview */}
      <div className="hidden print-only">
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
}
