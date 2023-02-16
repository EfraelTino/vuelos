export const getCity = (codeiata, data) => {
  let codeDeparture = ''
  let codeReturn = ''

  for (const code in codeiata) {
    if (codeiata[code] === data.itineraries[0].segments[0].departure.iataCode) {
      codeDeparture = code
    }
  }

  for (const code in codeiata) {
    if (codeiata[code] === data.itineraries[1].segments[0].departure.iataCode) {
      codeReturn = code
    }
  }

  return { codeDeparture, codeReturn }
}
