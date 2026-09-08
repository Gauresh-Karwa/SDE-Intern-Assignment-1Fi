export default function VariantSelector({ variants, selectedId, onSelect }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Select your variant</p>
      <div className="flex flex-col gap-2">
        {variants.map((v) => {
          const active = v.id === selectedId;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`w-full text-left rounded-xl px-4 py-3 flex items-center justify-between border transition ${
                active ? "border-brand-600 bg-brand-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    active ? "border-brand-600" : "border-gray-300"
                  }`}
                >
                  {active && <span className="w-2 h-2 rounded-full bg-brand-600" />}
                </span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{v.label}</p>
                  <p className="text-xs text-gray-500">{v.sublabel}</p>
                </div>
              </div>
              <p className="font-semibold text-sm text-gray-900">₹{v.price.toLocaleString("en-IN")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
