import { InputGroupIcon } from "@/components/LocationInput";
import { DateRange } from "react-day-picker";

type PropType = {
    destination : string; 
    date : DateRange | undefined;
    setStep : React.Dispatch<React.SetStateAction<string>>
    handleSubmit: () => void;
}

export default function ConfirmationStep({destination, date, setStep, handleSubmit} : PropType){
    return( 
    <div className="tracking-[1px] min-h-screen flex bg-[#96beb5] w-full justify-center items-center text-black">
      <div className="flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
        <div className="my-3">
          <span className="text-2xl">Trip details</span>
        </div>
        <div className="mt-5">
          <button className="disabled:text-gray-500 border-1 rounded-sm p-1 hover:cursor-pointer" onClick={handleSubmit} disabled={!destination}>Finish</button>
        </div>
      </div>
    </div>
    )
}