import { useState } from "react";
import { CheckIcon, PlusCircleIcon, CheckCircleIcon, BookmarkIcon } from "@heroicons/react/24/solid";

//PageButton
function SaveButton() {
  return (
    <div className="flex justify-center space-x-4">
      <button className="flex items-center px-4 py-2 text-black bg-white rounded hover:bg-[#F2EEED] active:bg-[#F2EEED]">
        <Icon className="h-5 w-5" />
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
          Save
        </span>
      </button>
    </div>
  );
}

//FAB Button

export default SaveButton;
