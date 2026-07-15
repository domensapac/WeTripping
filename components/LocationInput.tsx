import { MapPinned } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type InputProps = {
  destination : string,
  setDestination : React.Dispatch<React.SetStateAction<string>>
}

export function InputGroupIcon({destination, setDestination} : InputProps) {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput type="text" value={destination} onChange={(e) => setDestination(e.target.value)}/>
        <InputGroupAddon>
          <MapPinned />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
