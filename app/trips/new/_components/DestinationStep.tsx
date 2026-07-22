import { InputGroupIcon } from "@/components/LocationInput";

type PropType = {
    destination : string; 
    setDestination : React.Dispatch<React.SetStateAction<string>>
    setStep : React.Dispatch<React.SetStateAction<string>>
}

export default function DestinationStep({destination, setDestination, setStep} : PropType){
    return( 
    <div className="tracking-[1px] min-h-screen flex bg-[#96beb5] w-full justify-center items-center text-black">
      <div className="flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
        <div className="my-3">
          <span className="text-2xl">Where to?</span>
        </div>
        <div className="my-3">
            <InputGroupIcon destination={destination} setDestination={setDestination}/>
        </div>
        <div className="mt-5">
          <button className="disabled:text-gray-500 border-1 rounded-sm p-1 hover:cursor-pointer" onClick={() => setStep('dates')} disabled={!destination}>Continue</button>
        </div>
      </div>
    </div>
    )
}