export function getLocalData (key: string, notString?: boolean) {
  const data = localStorage.getItem(key)

  if (!data) return undefined
  
  try {
    if (notString) return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }

  return data
}

export function saveLocalData <T=any> (key: string, data: T) {
  localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data))
}

export function formattedTime (time: number) {
  const parts: string[] = []
  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24
  const partTimes = [time / day, time % day / hour, time % hour / minute, time % minute / second]
  let validPart = false

  for (const partTime of partTimes) {
    const part = Math.floor(partTime).toString().padStart(2, '0')

    if (validPart === false && part !== '00') validPart = true

    if (part !== '00' || validPart) {
      parts.push(part)
    }
  }

  return parts.length === 0 ? '0' : parts.join(':')
}
