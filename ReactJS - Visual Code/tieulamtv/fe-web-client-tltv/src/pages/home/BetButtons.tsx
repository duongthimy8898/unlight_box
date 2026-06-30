const BUTTONS = [
  { href: "#!", label: "CƯỢC NGAY", className: "bg-[#D71D1D]" },
  { href: "#!", label: "CƯỢC NGAY", className: "bg-[#D71D1D]" },
  { href: "#!", label: "CƯỢC NGAY", className: "bg-blue-700" },
  { href: "#!", label: "CƯỢC NGAY", className: "bg-blue-700" },
];

const BetButtons = () => {
  return (
    <section className="w-full mt-4 flex flex-col flex-wrap text-balance justify-center items-center gap-1 px-2">
      <div className="w-fit flex flex-row flex-wrap justify-center items-center gap-1">
        <div className="flex gap-1">
          {BUTTONS.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 shrink-0 block py-1 px-2 text-white rounded text-[10px] sm:text-sm text-center font-semibold truncate no-underline ${btn.className}`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BetButtons;
