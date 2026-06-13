import { Link } from "react-router-dom";
import type { Replay } from "../../../../types/Replay";


const ReplayCard = ({ replay }: { replay: Replay }) => {
  return (
    <Link to={`/xem-lai/${replay.sport.slug}/${replay.slug}/${replay.id}`} className="block rounded shadow-2xl overflow-hidden group cursor-pointer">
      <div className="relative">
        <img
          alt={replay.title}
          loading="lazy"
          className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
          src={replay.thumbnailUrl}
        />
        <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 sm:w-12 sm:h-12 text-white opacity-70 group-hover:opacity-100"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[11px] sm:text-xs px-2 py-1 rounded-sm">{replay.createdAt}</div>
        {/* <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[11px] sm:text-xs px-1.5 py-0.5 rounded-sm">{duration}</div> */}
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-blue-500 transition-colors" title={replay.title}>
          {replay.title}
        </h3>
        {/* <p className="text-[11px] sm:text-xs text-gray-400 truncate">
          BLV {props.commentator} - <span className="text-[11px] sm:text-xs text-gray-500">{props.category}</span>
        </p> */}
      </div>
    </Link>
  );
};

export default ReplayCard;
