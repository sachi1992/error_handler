import { useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

const Ex2 = (): JSX.Element => {
  const [count, setCount] = useState(0)

  const maxCount = 5

  const { showBoundary } = useErrorBoundary()

  const handleClick = (): void => {
    try {
      if (count === maxCount) {
        throw new Error('max count')
      } else {
        setCount((c) => c + 1)
      }
    } catch (error) {
      showBoundary(error)
    }
  }

  return (
    <div>
      {count}
      <br />
      <button onClick={handleClick}> count </button>
    </div>
  )
}

export default Ex2
