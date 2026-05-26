import { useState, useMemo } from "react";
import { Product, BrandTheme } from "../types";
import { PRODUCTS } from "../data";
import { Filter, Search, Grid, List, Check, Heart, Plus, ZoomIn, X, Compass, ShoppingBag } from "lucide-react";

interface LookbookGridProps {
  theme: BrandTheme;
  curationIds: string[];
  onToggleCuration: (product: Product) => void;
}

export default function LookbookGrid({ theme, curationIds, onToggleCuration }: LookbookGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // All unique categories for filtering
  const categories = useMemo(() => {
    const cats = new Set(PRODUCTS.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabricCraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search silk, handloom, Kalamkari, Chanderi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 transition-all font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.replace(/\s+/g, "-")}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all uppercase shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#D4AF37] text-[#1E0105] font-semibold shadow-md shadow-[#D4AF37]/10"
                  : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/5"
              }`}
            >
              {cat === "Designer Blouse" ? "Blouses (Designer)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products Card layout */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-black/10 border border-dash border-white/10">
          <Compass className="w-10 h-10 text-amber-400/40 mx-auto mb-3 animate-spin" />
          <h5 className="font-serif text-lg text-white font-medium">No Weaver Creations Found</h5>
          <p className="text-xs text-white/50 mt-1 max-w-md mx-auto">
            Try adjusting your search query or selecting a different curated category from Hyderabad's premium catalog.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const isCurated = curationIds.includes(product.id);
            return (
              <div
                key={product.id}
                className={`group relative rounded-xl border p-4 flex flex-col justify-between transition-all duration-300 ${theme.cardBg} hover:-translate-y-1 hover:shadow-xl`}
                style={{
                  boxShadow: isCurated ? `0 4px 20px ${theme.glowColor}` : undefined
                }}
              >
                {/* Product Metadata */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/30 px-2 py-0.5 rounded border border-white/5">
                      {product.category}
                    </span>
                    <span className="text-xs text-white/50 font-sans italic flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: product.colorHex }} />
                      {product.visualTag}
                    </span>
                  </div>

                  <h4 className="font-serif text-base text-white font-medium leading-tight group-hover:text-amber-300 transition-colors line-clamp-2">
                    {product.name}
                  </h4>

                  <span className="inline-block mt-1 text-xs font-mono text-white/60">
                    {product.fabricCraft}
                  </span>

                  <p className="text-xs text-white/70 font-sans mt-3 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-white/40 block leading-none">Price Value</span>
                    <span className="text-base font-serif text-[#D4AF37] font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    {/* Zoom details button */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                      title="Enlarge details"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Toggle Curation checklist */}
                    <button
                      id={`btn-toggle-product-${product.id}`}
                      onClick={() => onToggleCuration(product)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all ${
                        isCurated
                          ? "bg-amber-400 text-[#1E0105] hover:bg-amber-500 font-semibold"
                          : "bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {isCurated ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          Curated
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Curate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Lookbook Item Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#1D080A] p-6 md:p-8 space-y-6 text-white text-left shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xxs font-mono tracking-widest text-[#D4AF37] uppercase bg-[#DCD1BA]/10 px-2 py-1 rounded">
                  {selectedProduct.category}
                </span>
                <span className="text-xs text-white/50">{selectedProduct.fabricCraft}</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F4F1EA] pr-8 leading-tight">
                {selectedProduct.name}
              </h3>
            </div>

            {/* Design Specifications list */}
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3 font-sans text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Fabric & Curation Style</span>
                <span className="font-medium text-white/90">{selectedProduct.fabricCraft}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Pallette Tone</span>
                <span className="font-medium text-white/90 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: selectedProduct.colorHex }} />
                  {selectedProduct.visualTag}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Availability Code</span>
                <span className="font-mono text-white/90">SR-LTD-{selectedProduct.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Design Guarantee</span>
                <span className="text-amber-300 font-medium font-serif italic">1-of-1 Original Handloom</span>
              </div>
            </div>

            {/* Expanded Lifestyle Description */}
            <div className="space-y-2">
              <label className="text-xxs font-mono tracking-widest text-white/40 uppercase block">Lifestyle Detail</label>
              <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed italic">
                "{selectedProduct.description}"
              </p>
            </div>

            {/* Bottom Panel with Buy Options */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-xxs font-mono text-white/45 block">Est. Boutique Value</span>
                <span className="text-2xl font-serif text-[#D4AF37] font-semibold">
                  ₹{selectedProduct.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onToggleCuration(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-sans font-medium flex items-center gap-1.5 transition-all ${
                    curationIds.includes(selectedProduct.id)
                      ? "bg-red-400/20 text-red-200 border border-red-500/30 hover:bg-red-400/30"
                      : "bg-[#D4AF37] text-[#1E0105] hover:bg-[#C5A880] font-semibold"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {curationIds.includes(selectedProduct.id) ? "Remove Curation" : "Add to Client Curation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
