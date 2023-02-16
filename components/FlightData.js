import styles from '@/styles/FlightData.module.css'

export default function FlightData({ data }) {
  const carriersObj = data?.dictionaries?.carriers
  const carriersArr = carriersObj && Object.values(carriersObj)

  return (
    <>
      {carriersArr && (
        <article className={styles.container}>
          <div className={styles.flightData}>
            <h1 className={styles.title}>Aerolíneas</h1>
            <ul className={styles.carriers}>
              {carriersArr && carriersArr.map((carrier) => <li>{carrier}</li>)}
            </ul>
          </div>
        </article>
      )}
    </>
  )
}
