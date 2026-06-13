import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuCheck } from "react-icons/lu";

type Option = {
  value: string;
  text: string;
};

export default function Combobox({
  options,
  defaultOption = null,
  onChange = () => {},
}: {
  options: Option[];
  defaultOption?: Option | null;
  onChange?: (value: Option | null) => void;
}) {
  const [query, setQuery] = useState(defaultOption?.text ?? "");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(defaultOption);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Lọc theo query
  const filtered = query === "" ? options : options.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));

  // Xử lý phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const choice = filtered[highlight];
      if (choice) {
        setSelected(choice);
        setQuery(choice.text);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Click ngoài thì đóng
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#combobox-root")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div id="combobox-root" className="relative w-full text-gray-100">
      {/* Input */}
      <div className="flex items-center bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent  focus-within:outline-blue-500">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Vui lòng chọn..."
          className="flex-1 px-3 py-2 text-sm bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
            setOpen((o) => !o);
          }}
          className="px-2 text-gray-300 hover:text-white"
        >
          <LuChevronDown size={16} />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-gray-900 border border-gray-700 shadow-lg z-50">
          <li
            onClick={() => {
              setSelected(null);
              setQuery("");
              setOpen(false);
            }}
            onMouseEnter={() => setHighlight(0)}
            className={`flex items-center gap-2 cursor-pointer px-3 py-2 text-sm ${"text-gray-200 hover:bg-gray-700"}`}
          >
            <LuCheck className={`${selected?.value === null ? "visible text-sky-400" : "invisible"}`} />
            -- Không có --
          </li>
          {filtered.map((option, idx) => (
            <li
              key={option.value}
              onClick={() => {
                setSelected(option);
                setQuery(option.text);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlight(idx)}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 text-sm ${
                idx === highlight ? "bg-gray-700 text-white" : "text-gray-200 hover:bg-gray-700"
              }`}
            >
              <LuCheck className={`${selected?.value === option.value ? "visible text-sky-400" : "invisible"}`} />
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
