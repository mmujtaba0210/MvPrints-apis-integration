import { Charity } from '../types/charityTypes';

interface CharityActionsProps {
  charity: Charity;
  onEdit: (charity: Charity) => void;
  onDelete: (id: string) => void;
}

export default function CharityActions({ charity, onEdit, onDelete }: CharityActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(charity)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition duration-200"
        aria-label="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button
        onClick={() => onDelete(charity.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-200"
        aria-label="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}