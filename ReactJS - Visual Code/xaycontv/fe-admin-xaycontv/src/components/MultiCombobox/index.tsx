import { useState, useRef, useEffect } from "react";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";

type Option = {
  value: string;
  text: string;
};

export default function MultiCombobox({
  options,
  defaultOptions = [],
  onChange = () => {},
}: {
  options: Option[];
  defaultOptions?: Option[];
  onChange?: (values: Option[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(defaultOptions);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const filtered =
    query === "" ? options : options.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()) && !selected.some((s) => s.value === o.value));

  const toggleOption = (opt: Option) => {
    if (selected.some((s) => s.value === opt.value)) {
      setSelected((prev) => prev.filter((s) => s.value !== opt.value));
    } else {
      setSelected((prev) => [...prev, opt]);
    }
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && e.key === "ArrowDown") {
      setOpen(true);
    }
    if (open && filtered.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (h + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        toggleOption(filtered[highlight]);
      }
    }
    if (e.key === "Backspace" && query === "" && selected.length > 0) {
      // Xóa tag cuối khi backspace
      setSelected((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#multi-tag-combobox-root")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div id="multi-tag-combobox-root" className="relative w-full text-gray-100">
      {/* Ô nhập + tags */}
      <div className="flex flex-wrap items-center gap-1 bg-[#1c2433] border border-white/10 focus-within:outline-2 focus-within:outline-blue-500 px-2 py-1">
        {selected.map((s) => (
          <span key={s.value} className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-sky-600 text-white">
            {s.text}
            <button type="button" onClick={() => setSelected((prev) => prev.filter((p) => p.value !== s.value))} className="hover:text-gray-200">
              <LuX size={12} />
            </button>
          </span>
        ))}
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
          placeholder={selected.length === 0 ? "Chọn..." : ""}
          className="flex-1 min-w-[100px] px-1 py-1 text-sm bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
            setOpen((o) => !o);
          }}
          className="px-1 text-gray-300 hover:text-white"
        >
          <LuChevronDown size={16} />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-gray-900 border border-gray-700 shadow-lg z-50">
          {filtered.map((option, idx) => (
            <li
              key={option.value}
              onClick={() => toggleOption(option)}
              onMouseEnter={() => setHighlight(idx)}
              className={`flex justify-start gap-2 items-center px-3 py-2 text-sm cursor-pointer ${
                idx === highlight ? "bg-gray-700 text-white" : "text-gray-200 hover:bg-gray-700"
              }`}
            >
              <LuCheck className={`${selected.map((s) => s.value).includes(option.value) ? "visible text-sky-400" : "invisible"}`} />
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
