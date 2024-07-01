import { type ChangeEvent, useEffect, useState, useRef } from "react"
import { useMainStore } from "../store/main"
import { INTERVAL_VALUES } from "../lib/constants"

export default function BalanceIntervalSelector () {
  const [value, setValue] = useState(4)
  const [miningInterval, updateMiningInterval] = useMainStore(store => [
    store.miningInterval, store.updateMiningInterval
  ])
  const timeout = useRef<number | undefined>()

  useEffect(() => {
    setValue(miningInterval)
  }, [miningInterval])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const inputVlue = +ev.currentTarget.value

    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      console.log('Update mining interval:', inputVlue)
      updateMiningInterval(inputVlue)
    }, 1000)

    setValue(inputVlue)
  }

  return (
    <label>
      <h4>Update balance every {INTERVAL_VALUES[value]} seconds</h4>
      
      <div>
        <input type="range" onChange={handleChange} value={value} max={INTERVAL_VALUES.length - 1} />
      </div>
    </label>
  )
}