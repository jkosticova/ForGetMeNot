import {useState} from "react";

interface SearchBarProps {
    suggestions: string[];
}
export default function SearchBar({ suggestions }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Filter suggestions based on input
    const filteredSuggestions = suggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="relative">
            <div className="flex items-center pl-5 pr-5 pt-2 pb-2 bg-[var(--clr-surface-a20)] rounded-full">
                <input
                    type="text"
                    className="bg-transparent outline-none w-full"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(e.target.value.length > 0);
                    }}
                />
                <span className="flex">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-gray-600"
          >
            <path
                fillRule="evenodd"
                d="M12 16.5l-6-6h12l-6 6z"
                clipRule="evenodd"
            />
          </svg>
        </span>
            </div>

            {isOpen && (
                <div className="mt-2 rounded-xl shadow-md transition-all duration-300 ease-in-out">
                    <ul className="max-h-60 overflow-y-auto"> {}
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((item: string, index: number) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer rounded-xl hover:bg-[var(--clr-surface-a10)]"
                                    onClick={() => {
                                        setQuery(item);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}