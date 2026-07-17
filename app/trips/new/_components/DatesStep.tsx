import { DatePickerWithRange } from "@/components/DatePicker";
import { MoveLeft } from 'lucide-react';
import { DateRange } from "react-day-picker";

type PropType = {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
    setStep: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: () => void;
}

export default function DatesStep({date, setDate, setStep, handleSubmit} : PropType){
    return(
        <div className="tracking-[1px] min-h-screen flex bg-gray-400 w-full justify-center items-center text-gray-400">
        <div className="relative flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
          <span className="absolute top-4 left-4" onClick={() => {setStep('destination')}}><MoveLeft /></span>
          <div className="my-3">
            <span className="text-2xl flex ">Dates?</span>
          </div>
          <div className="my-3">
            <DatePickerWithRange date={date} setDate={setDate}/>
          </div>
          <div className="mt-5">
            <button className="border-1 rounded-sm p-1 hover:cursor-pointer w-18" onClick={handleSubmit}>Done</button>
          </div>
        </div>
      </div>
    )
}