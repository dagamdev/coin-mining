import { type FormEvent, useState, useEffect } from "react"
import type { SetState } from "../types"

export default function NumberInputForm ({title, handleSubmit, stats, buttonText}: {
  title: string
  handleSubmit(ev: FormEvent, value: number, setMessage: SetState<string>, clear: () => void): void
  stats?: {
    name: string
    getValue(value: number): number | string
  }[],
  buttonText: string
}) {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (message) setTimeout(() => {
      setMessage('')
    }, 15_000)
  }, [message])

  return (
    <form onSubmit={(ev) => handleSubmit(ev, +inputValue, setMessage, () => setInputValue(''))}>
      <label>
        <h3>{title}</h3>

        <div className="form_section">
          <input type="number" onChange={(ev) => {
            setInputValue(ev.target.value)
            setMessage('')
          }} value={inputValue} min={0} />

          <button className="form-button" disabled={inputValue.length === 0}>{buttonText}</button>
        </div>
      </label>

      {message.length !== 0 && <p className="error">{message}</p>}
      {(stats && inputValue.length !== 0) && <div className="form_stats">
        {stats.map(stat => <p className="text-sm">{stat.name}<strong>{stat.getValue(+inputValue)}</strong></p>)}
      </div>}
    </form>
  )
}