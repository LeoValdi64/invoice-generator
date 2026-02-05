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
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">InvoiceForge</h1>
              <p className="text-xs text-slate-500">Free Invoice Generator</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="no-print max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <InvoiceForm invoice={invoice} onChange={setInvoice} />
          </div>

          {/* Preview */}
          <div className="xl:sticky xl:top-24 xl:self-start">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Live Preview
            </h2>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="max-h-[80vh] overflow-y-auto">
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
