import { MouseEventHandler } from "react";

const PaginationButton = ({ text, clickHandler }: { text: string, clickHandler: MouseEventHandler }) => {
    return (
        <button 
            className="bg-[#F2F2F2] px-2 py-1 rounded-md drop-shadow-md hover:bg-primary hover:text-white"
            onClick={clickHandler}>
            { text }
        
        </button>
    )
}

export default PaginationButton;