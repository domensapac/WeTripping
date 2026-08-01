'use client'

import * as React from "react"

import { Progress } from "@/components/ui/progress"

type PropType = {
  step : string;
}

export function ProgressBar({step} : PropType) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let targetProgress = 0; 

    switch(step) {
      case 'destination': 
        targetProgress = 25; 
        break; 
      case 'dates': 
        targetProgress = 50; 
        break; 
      case 'confirmation': 
        targetProgress = 75; 
        break; 
      case 'success': 
        targetProgress = 100; 
        break; 
      default: 
        targetProgress = 0; 
    }
    setProgress(targetProgress);
  }, [step])

  return <Progress value={progress} className="w-[100%]" />
}
