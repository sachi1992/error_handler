type IE = {
  Person: any
}

const Ex1 = ({ Person }: IE): JSX.Element => {
  return (
    <h1>
      hello {Person.fn.toUpperCase()} {Person.ln.toUpperCase()}
    </h1>
  )
}

export default Ex1
