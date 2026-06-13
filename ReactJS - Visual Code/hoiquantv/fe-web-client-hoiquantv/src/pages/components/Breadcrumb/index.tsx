import clsx from "clsx";
import { IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
interface Segment {
  text: string;
  path: string;
}
export default function Breadcrumb({ segments }: { segments: Segment[] }) {
  return (
    <nav className="w-full text-xs text-gray-600 py-4 px-2 flex items-center space-x-1 overflow-hidden">
      {/* Phần đầu */}

      {/* Phần breadcrumb còn lại */}
      <ol className="w-full flex items-center space-x-1 flex-1">
        <li className="flex items-center gap-1 flex-shrink-0">
          <Link to={`/${segments.at(0)?.path}`} className="flex-shrink-0 hover:underline text-blue-500 font-semibold">
            {segments.at(0)?.text}
          </Link>
        </li>
        {segments.slice(1).map((segment, index) => {
          const to = "/" + segment.path;
          const isLast = index === segments.length - 2;

          return !isLast ? (
            <li key={index} className={clsx("w-fit flex items-center gap-1")}>
              <IoChevronForwardOutline size={8} className="flex-shrink-0" />
              <Link to={to} className="hover:underline text-blue-500">
                {segment.text}
              </Link>
            </li>
          ) : (
            <div key={index} className="flex-1 flex items-center gap-1 overflow-hidden">
              <IoChevronForwardOutline size={8} className="flex-shrink-0" />
              <span className="block w-full truncate">{segment.text}</span>
            </div>
          );
        })}
      </ol>
    </nav>
  );
}
