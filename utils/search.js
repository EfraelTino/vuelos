export function searchFlight({
  location,
  destination,
  date,
  returnDate,
  adults
}) {
  let Amadeus = require('amadeus')

  let amadeus = new Amadeus({
    clientId: 'j4Yc6Ce2Zo3RBkhCG9tgG29YzW7AUfZ0',
    clientSecret: 'fMD8ltfaL9QDLQGp'
  })

  const response = amadeus.shopping.flightOffersSearch.get({
    originLocationCode: location,
    destinationLocationCode: destination,
    departureDate: date,
    returnDate: returnDate,
    adults: adults
  })

  return response
}
