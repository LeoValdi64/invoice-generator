"use client";

import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Hash,
  Calendar,
  Plus,
  Trash2,
  Percent,
  FileText,
  DollarSign,
} from "lucide-react";
import type { InvoiceData } from "@/types/invoice";
import { CURRENCIES } from "@/types/invoice";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (invoice: InvoiceData) => void;
}

function InputField({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}

export default function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const update = (field: keyof InvoiceData, value: unknown) => {
    onChange({ ...invoice, [field]: value });
  };

  const updateItem = (index: number, field: string, value: unknown) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...invoice, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length <= 1) return;
    const newItems = invoice.items.filter((_, i) => i !== index);
    onChange({ ...invoice, items: newItems });
  };

  return (
    <div className="space-y-6">
      {/* Invoice Details */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Hash className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">Invoice Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            icon={Hash}
            label="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={(v) => update("invoiceNumber", v)}
            placeholder="INV-001"
          />
          <InputField
            icon={Calendar}
            label="Issue Date"
            value={invoice.issueDate}
            onChange={(v) => update("issueDate", v)}
            type="date"
          />
          <InputField
            icon={Calendar}
            label="Due Date"
            value={invoice.dueDate}
            onChange={(v) => update("dueDate", v)}
            type="date"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Currency</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={invoice.currency}
              onChange={(e) => update("currency", e.target.value)}
              className="w-full sm:w-48 pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
            >
              {Object.entries(CURRENCIES).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sender Info */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">From (Your Info)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            icon={User}
            label="Name / Business"
            value={invoice.senderName}
            onChange={(v) => update("senderName", v)}
            placeholder="Your name or business"
          />
          <InputField
            icon={Mail}
            label="Email"
            value={invoice.senderEmail}
            onChange={(v) => update("senderEmail", v)}
            type="email"
            placeholder="you@email.com"
          />
          <InputField
            icon={Phone}
            label="Phone"
            value={invoice.senderPhone}
            onChange={(v) => update("senderPhone", v)}
            placeholder="+1 (555) 000-0000"
          />
          <InputField
            icon={MapPin}
            label="Address"
            value={invoice.senderAddress}
            onChange={(v) => update("senderAddress", v)}
            placeholder="123 Main St, City, State"
          />
        </div>
      </section>

      {/* Client Info */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">Bill To (Client)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            icon={Building}
            label="Client Name / Business"
            value={invoice.clientName}
            onChange={(v) => update("clientName", v)}
            placeholder="Client name or business"
          />
          <InputField
            icon={Mail}
            label="Client Email"
            value={invoice.clientEmail}
            onChange={(v) => update("clientEmail", v)}
            type="email"
            placeholder="client@email.com"
          />
          <div className="sm:col-span-2">
            <InputField
              icon={MapPin}
              label="Client Address"
              value={invoice.clientAddress}
              onChange={(v) => update("clientAddress", v)}
              placeholder="456 Business Ave, City, State"
            />
          </div>
        </div>
      </section>

      {/* Line Items */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-slate-900">Line Items</h2>
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_100px_120px_120px_40px] gap-3 mb-2 px-1">
          <span className="text-xs font-medium text-slate-500">Description</span>
          <span className="text-xs font-medium text-slate-500">Qty</span>
          <span className="text-xs font-medium text-slate-500">Rate</span>
          <span className="text-xs font-medium text-slate-500">Amount</span>
          <span />
        </div>

        <div className="space-y-3">
          {invoice.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_120px_40px] gap-3 items-center bg-slate-50 rounded-lg p-3 sm:p-2"
            >
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                placeholder="Item description"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, "quantity", Math.max(0, Number(e.target.value)))
                }
                min={0}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={item.rate}
                onChange={(e) =>
                  updateItem(index, "rate", Math.max(0, Number(e.target.value)))
                }
                min={0}
                step={0.01}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="px-3 py-2 text-sm font-medium text-slate-700">
                {(item.quantity * item.rate).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <button
                onClick={() => removeItem(index)}
                disabled={invoice.items.length <= 1}
                className="p-2 text-slate-400 hover:text-red-500 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tax & Notes */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Percent className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">Tax & Notes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Tax Rate (%)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                value={invoice.taxRate}
                onChange={(e) => update("taxRate", Math.max(0, Number(e.target.value)))}
                min={0}
                max={100}
                step={0.1}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Notes / Terms
          </label>
          <textarea
            value={invoice.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Payment terms, bank details, thank you note..."
            rows={3}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>
      </section>
    </div>
  );
}
