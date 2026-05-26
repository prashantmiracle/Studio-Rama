import { useState } from "react";
import { Product, BrandTheme } from "../types";
import { PRODUCTS } from "../data";
import { Check, Sparkles, Scissors, Undo2, Award, Heart, PlusCircle } from "lucide-react";

interface StyleMatrimonyProps {
  theme: BrandTheme;
  onAddToCuration: (product: Product) => void;
  curationIds: string[];
}

export default function StyleMatrimony({ theme, onAddToCuration, curationIds }: StyleMatrimonyProps) {
  // Filter appropriate elements for matching
  const sarees = PRODUCTS.filter((p) => p.category === "Saree");
  const blouses = PRODUCTS.filter((p) => p.category === "Blouse" || p.category === "Designer Blouse");
  const dupattas = PRODUCTS.filter((p) => p.category === "Dupatta");

  // State for combinations
  const [selectedSaree, setSelectedSaree] = useState<Product>(sarees[0]);
  const [selectedBlouse, setSelectedBlouse] = useState<Product>(blouses[0]);
  const [selectedDupatta, setSelectedDupatta] = useState<Product>(dupattas[0]);
  
  // Custom styling tip generated dynamically based on chosen fabrics
  const getStylingTip = () => {
    const combinesKalamkari = 
      selectedBlouse.name.toLowerCase().includes("kalamkari") || 
      selectedDupatta.name.toLowerCase().includes("kalamkari");
    
    const combinesSilk = 
      selectedSaree.fabricCraft.toLowerCase().includes("silk") ||
      selectedDupatta.fabricCraft.toLowerCase().includes("silk");

    if (combinesSilk && combinesKalamkari) {
      return {
        title: "The Sovereign Craft Fusion",
        description: "Blending high-tension Gadwal silk with fluid Kalamkari handwork offsets rigid luxury with whimsical storytelling. Perfect for high-profile public festivals or camera events.",
        rating: "9.8 / 10 Masterpiece Rating"
      };
    } else if (combinesSilk) {
      return {
        title: "Bespoke Royal Heritage Style",
        description: "The sheen of pure handloom zari creates an opulent frame. Best styled with low-profile gold antique earrings, classic bun drape, and deep kohl eyes.",
        rating: "9.5 / 10 Traditional Elegance"
      };
    } else {
      return {
        title: "Modern Artisanal Polish",
        description: "A comfortable, breathable cotton-rich blend that highlights organic dyes and premium textures. Excellent for day-long festive styling, professional panel hosting, and cultural assemblies.",
        rating: "9.0 / 10 Contemporary Grace"
      };
    }
  };

  const tip = getStylingTip();

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${theme.cardBg} backdrop-blur-md`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h4 className="font-serif text-xl font-medium text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Bespoke Styling Lab
          </h4>
          <p className="text-xs text-white/60 font-sans mt-1">
            Recreate Step 3 of the Studio Rama Experience: Expert mix-and-match sizing, colorways & draping hints.
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex gap-2">
          <span className="text-2xl font-serif text-[#D4AF37] font-medium">
            ₹{(selectedSaree.price + selectedBlouse.price + selectedDupatta.price).toLocaleString("en-IN")}
          </span>
          <span className="text-xs self-center bg-white/10 px-2.5 py-1 rounded-full text-white/80 font-mono">
            3-Piece Combo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1: Saree */}
        <div className="space-y-3">
          <label className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block">
            1. Saree Choice
          </label>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {sarees.map((s) => (
              <button
                key={s.id}
                id={`btn-saree-${s.id}`}
                onClick={() => setSelectedSaree(s)}
                className={`w-full text-left p-3 rounded-lg text-sm border flex items-center justify-between transition-all duration-200 ${
                  selectedSaree.id === s.id
                    ? "bg-white/10 border-amber-400/80 text-white"
                    : "bg-black/20 border-white/5 text-white/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: s.colorHex }}
                  />
                  <div>
                    <div className="font-sans font-medium line-clamp-1">{s.name.split("–")[0]}</div>
                    <div className="text-[10px] opacity-70 font-mono">₹{s.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
                {selectedSaree.id === s.id && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Layer 2: Blouse */}
        <div className="space-y-3">
          <label className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block">
            2. Designer Blouse
          </label>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {blouses.map((b) => (
              <button
                key={b.id}
                id={`btn-blouse-${b.id}`}
                onClick={() => setSelectedBlouse(b)}
                className={`w-full text-left p-3 rounded-lg text-sm border flex items-center justify-between transition-all duration-200 ${
                  selectedBlouse.id === b.id
                    ? "bg-white/10 border-amber-400/80 text-white"
                    : "bg-black/20 border-white/5 text-white/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: b.colorHex }}
                  />
                  <div>
                    <div className="font-sans font-medium line-clamp-1">{b.name.split("—")[0]}</div>
                    <div className="text-[10px] opacity-70 font-mono">₹{b.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
                {selectedBlouse.id === b.id && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Layer 3: Dupatta drape */}
        <div className="space-y-3">
          <label className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block">
            3. Accompanying Dupatta
          </label>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {dupattas.map((d) => (
              <button
                key={d.id}
                id={`btn-dupatta-${d.id}`}
                onClick={() => setSelectedDupatta(d)}
                className={`w-full text-left p-2.5 rounded-lg text-[13px] border flex items-center justify-between transition-all duration-200 ${
                  selectedDupatta.id === d.id
                    ? "bg-white/10 border-amber-400/80 text-white"
                    : "bg-black/20 border-white/5 text-white/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: d.colorHex }}
                  />
                  <div>
                    <div className="font-sans font-medium line-clamp-1">{d.name.split("–")[0]}</div>
                    <div className="text-[10px] opacity-70 font-mono">₹{d.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
                {selectedDupatta.id === d.id && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Styled Interactive Layout Canvas */}
      <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Layered swatch preview */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-3 border-r border-white/5 pr-4">
          <div className="text-xs font-mono text-white/40 uppercase">Ensemble Coordinates</div>
          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedSaree.colorHex }} />
              <span className="font-medium text-amber-100 text-xs truncate">Saree: {selectedSaree.name.split("–")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedBlouse.colorHex }} />
              <span className="font-medium text-amber-100 text-xs truncate">Blouse: {selectedBlouse.name.split("—")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedDupatta.colorHex }} />
              <span className="font-medium text-amber-100 text-xs truncate">Dupatta: {selectedDupatta.name.split("–")[0]}</span>
            </div>
          </div>
          
          <div className="pt-2 flex flex-wrap gap-2">
            {[selectedSaree, selectedBlouse, selectedDupatta].map((item) => {
              const inside = curationIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  id={`btn-add-curation-${item.id}`}
                  onClick={() => onAddToCuration(item)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                    inside
                      ? "bg-amber-400/20 text-yellow-300 border-amber-400/30"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border-white/10"
                  }`}
                >
                  <PlusCircle className="w-3 h-3" />
                  {inside ? "Curated" : `Add ${item.category.split(" ")[0]}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Styling Tip */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Rama’s Curation Tip
            </span>
            <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded font-mono">
              {tip.rating}
            </span>
          </div>
          <h5 className="font-serif text-sm font-medium text-white">{tip.title}</h5>
          <p className="text-xs text-white/70 font-sans leading-relaxed">
            {tip.description}
          </p>
        </div>
      </div>
    </div>
  );
}
