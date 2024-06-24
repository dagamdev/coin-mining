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