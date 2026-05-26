import { useState, FormEvent } from "react";
import { Product, BrandTheme } from "../types";
import { PRODUCTS } from "../data";
import { Printer, X, Trash2, Award, ClipboardCheck, Mail, Send, Check } from "lucide-react";

interface CurationPanelProps {
  theme: BrandTheme;
  curatedItems: Product[];
  onRemoveItem: (product: Product) => void;
  onClearCuration: () => void;
  onClose: () => void;
}

export default function CurationPanel({
  theme,
  curatedItems,
  onRemoveItem,
  onClearCuration,
  onClose
}: CurationPanelProps) {
  const [clientName, setClientName] = useState("");
  const [eventName, setEventName] = useState("");
  const [stylistNote, setStylistNote] = useState("");
  const [successSent, setSuccessSent] = useState(false);

  // Group items by category for refined pricing layout
  const totalValue = curatedItems.reduce((acc, p) => acc + p.price, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleSendProposal = (e: FormEvent) => {
    e.preventDefault();
    setSuccessSent(true);
    setTimeout(() => setSuccessSent(false), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1A0306] border-l border-white/10 text-white text-left p-5 md:p-6 overflow-y-auto space-y-6">
      {/* Drawer Title Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="font-serif text-lg font-medium text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-amber-400" />
            Client Curation Suite
          </h3>
          <p className="text-[11px] text-white/50 font-sans mt-0.5">
            Compile individual selections into bespoke wardrobe proposals.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {curatedItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-16">
          <Award className="w-12 h-12 text-[#D4AF37] opacity-25 animate-pulse" />
          <h4 className="font-serif text-sm font-medium text-white/80">No Curations Yet</h4>
          <p className="text-xs text-white/40 font-sans max-w-[240px]">
            Explore the presentation slides or lookbook showroom, and tap "Curate" to capture heritage pieces.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between space-y-6">
          {/* List of Curated Assets */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-white/40">
              <span>Curated Assets ({curatedItems.length})</span>
              <button
                onClick={onClearCuration}
                className="text-red-400/80 hover:text-red-400 flex items-center gap-1 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Close Session
              </button>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {curatedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] block mb-0.5">
                      {item.category.toUpperCase()}
                    </span>
                    <h5 className="font-sans font-medium text-xs text-white truncate">{item.name}</h5>
                    <span className="text-[10px] text-white/50 font-mono block">
                      {item.fabricCraft}
                    </span>
                  </div>
                  <div className="flex items-center gap-2shrink-0">
                    <span className="font-serif text-xs text-[#D4AF37]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item)}
                      className="p-1 rounded text-white/40 hover:text-red-300 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summation Board */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400/10 to-red-950/25 border border-amber-400/20 flex justify-between items-center">
              <div>
                <span className="text-xxs font-mono tracking-widest text-[#D4AF37] uppercase block">
                  Curation Ledger Total
                </span>
                <span className="text-xs text-white/60 font-sans italic">
                  Subject to Banjara Hills availability
                </span>
              </div>
              <span className="text-xl font-serif text-white font-semibold">
                ₹{totalValue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Interactive Styling Metadata */}
          <form onSubmit={handleSendProposal} className="space-y-4 p-4 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
              Bespoke Proposal Parameters
            </span>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-white/60 block mb-1">Client Patron Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ananya Rao"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-amber-400/50 text-white placeholder-white/35 text-xs"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">Occasion / Event Suitability</label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad Cultural Connoisseurs Summit"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-amber-400/50 text-white placeholder-white/35 text-xs"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">Stylist Curation Note</label>
                <textarea
                  placeholder="e.g. This deep burnt orange Gadwal silk matches standard sizing 40 nicely with custom zari sleeve details."
                  value={stylistNote}
                  onChange={(e) => setStylistNote(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-amber-400/50 text-white placeholder-white/35 text-xs resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" /> Print Layout
              </button>

              <button
                type="submit"
                className="flex-1 py-2 bg-[#D4AF37] hover:bg-[#C5A880] text-[#1E0105] font-semibold rounded text-xs font-sans flex items-center justify-center gap-1.5 transition-all"
              >
                <ClipboardCheck className="w-3.5 h-3.5" /> Book Styling
              </button>
            </div>

            {successSent && (
              <div className="p-2.5 rounded bg-amber-400/25 border border-amber-400/40 text-amber-200 text-[11px] text-center font-sans animate-fade-in flex items-center justify-center gap-2">
                <Check className="w-3.5 h-3.5" />
                Curated request lock synced securely with styling desk!
              </div>
            )}
          </form>

          {/* Printable Blueprint container, hidden from standard view but appears on window.print() */}
          <div className="hidden print:block fixed inset-0 bg-[#FAF9F6] text-[#1E0105] p-12 text-left space-y-6 z-50">
            <div className="text-center pb-6 border-b border-gray-300">
              <h1 className="font-serif text-3xl font-bold tracking-widest text-[#2C070B]">STUDIO RAMA</h1>
              <p className="font-sans text-xs tracking-wider text-gray-500 uppercase mt-1">
                Hyderabad’s Destination for Handloom Luxury — Banjara Hills Road No. 3
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold uppercase text-gray-400">Prepared Patron</h4>
                <p className="font-serif text-base text-gray-800 font-medium">{clientName || "Discerning Client"}</p>
              </div>
              <div>
                <h4 className="font-bold uppercase text-gray-400">Occasion Suite</h4>
                <p className="font-serif text-base text-gray-800 font-medium">{eventName || "Gala Celebration"}</p>
              </div>
            </div>

            {stylistNote && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded text-xs italic text-gray-600">
                <span className="font-serif font-bold text-gray-700 block not-italic mb-1">Stylist Styling Note:</span>
                "{stylistNote}"
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold border-b pb-2 text-gray-700">Curated Wardrobe Assets</h3>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b text-gray-400 uppercase font-mono text-[10px]">
                    <th className="py-2">Item Classification</th>
                    <th className="py-2">Fabric / Craft Detailing</th>
                    <th className="py-2 text-right">Bespoke Est. Price</th>
                  </tr>
                </thead>
                <tbody>
                  {curatedItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 pr-2">
                        <span className="font-bold text-gray-700 block">{item.name}</span>
                        <span className="text-[10px] text-gray-500 uppercase font-mono">{item.category}</span>
                      </td>
                      <td className="py-3 text-gray-600">{item.fabricCraft}</td>
                      <td className="py-3 text-right font-serif font-medium text-gray-800">
                        ₹{item.price.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="py-4 text-right font-bold uppercase text-gray-500">Proposed Total Sum:</td>
                    <td className="py-4 text-right font-serif text-md font-bold text-[#2C070B] border-t-2 border-[#2C070B]">
                      ₹{totalValue.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-8 border-t border-gray-300 text-center text-[10px] text-gray-400 font-mono space-y-1">
              <p>Experience original design luxury in Flat No. 401, Aditya Residency, Road No. 3, Banjara Hills, Hyderabad.</p>
              <p>Secure appointments: +91 6300 240845 | design@studioramaonline.com | StudioRamaOnline.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
