interface DropdownListProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  className?: string;
}

export default function DropdownList({
  options,
  selectedOption,
  setSelectedOption,
  className = "",
}: DropdownListProps) {
  return (
      <div className={`dropdown ${className}`}>
          <button className="dropdown-button">
              {selectedOption || "Select an option"}
          </button>
          <ul className="dropdown-list">
              {options.map((option, index) => (
                  <li key={index} className="dropdown-item" onClick={() => setSelectedOption(option)}>
                      {option}
                  </li>
              ))}
          </ul>
      </div>
  );
}
