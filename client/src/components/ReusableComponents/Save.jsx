import { useState } from "react";
import {
  CheckIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";

//PageButton
function SaveButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleClick}
        className="flex items-center px-4 py-2 text-black bg-white rounded hover:bg-[#F2EEED] active:bg-[#F2EEED]"
      >
        {isClicked ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <BookmarkIcon className="h-5 w-5" />
        )}
        <span>
          Save
        </span>
      </button>
    </div>
  );
}

//FAB Button

export default SaveButton;
