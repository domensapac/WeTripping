import { DateRange } from "react-day-picker";
import { format } from "date-fns"
import { MoveLeft } from "lucide-react";

type PropType = {
    destination : string; 
    date : DateRange | undefined;
    setStep : React.Dispatch<React.SetStateAction<string>>
    handleSubmit: () => void;
}

export default function ConfirmationStep({destination, date, setStep, handleSubmit} : PropType){
    return( 
    <div className="tracking-[1px] flex w-full text-black">
      <div className="relative w-90 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
        <span className="hover:cursor-pointer absolute top-4 left-4" onClick={() => {setStep('dates')}}><MoveLeft /></span>
        <div className="my-3">
          <span className="text-2xl">Trip details</span>
        </div>
        <div className="my-3 flex flex-col">
           <div className="my-1 flex flex-col">
              <span className="text-xs">
                DESTINATION
              </span>
              <span className="text-2xl">
                {destination}
              </span>
           </div>
           <div className="my-1 flex flex-col">
              <span className="text-xs">
                PERIOD
              </span>
              <span className="text-2xl">
                {date?.from && date?.to ? (`${format(date.from, "LLL dd, yy")} - ${" "}  ${format(date.to, "LLL dd, yy")}`) : ('Missing data')}
              </span>
           </div>
        </div>
        <div className="mt-5">
          <button className="w-23 border-black border-1 rounded-sm p-1 hover:cursor-pointer" onClick={ () => { setStep('success'); handleSubmit}} disabled={!destination}>Finish</button>
        </div>
      </div>
    </div>
    )
}