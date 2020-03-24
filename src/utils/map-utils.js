export const stateIdToState = [
  {
    id: '01',
    code: 'AL',
    name: 'Alabama'
  },
  {
    id: '02',
    code: 'AK',
    name: 'Alaska'
  },
  {
    id: '04',
    code: 'AZ',
    name: 'Arizona'
  },
  {
    id: '05',
    code: 'AR',
    name: 'Arkansas'
  },
  {
    id: '06',
    code: 'CA',
    name: 'California'
  },
  {
    id: '08',
    code: 'CO',
    name: 'Colorado'
  },
  {
    id: '09',
    code: 'CT',
    name: 'Connecticut'
  },
  {
    id: '10',
    code: 'DE',
    name: 'Delaware'
  },
  {
    id: '11',
    code: 'DC',
    name: 'District of Columbia'
  },
  {
    id: '12',
    code: 'FL',
    name: 'Florida'
  },
  {
    id: '13',
    code: 'GA',
    name: 'Georgia'
  },
  {
    id: '15',
    code: 'HI',
    name: 'Hawaii'
  },
  {
    id: '16',
    code: 'ID',
    name: 'Idaho'
  },
  {
    id: '17',
    code: 'IL',
    name: 'Illinois'
  },
  {
    id: '18',
    code: 'IN',
    name: 'Indiana'
  },
  {
    id: '19',
    code: 'IA',
    name: 'Iowa'
  },
  {
    id: '20',
    code: 'KS',
    name: 'Kansas'
  },
  {
    id: '21',
    code: 'KY',
    name: 'Kentucky'
  },
  {
    id: '22',
    code: 'LA',
    name: 'Louisiana'
  },
  {
    id: '23',
    code: 'ME',
    name: 'Maine'
  },
  {
    id: '24',
    code: 'MD',
    name: 'Maryland'
  },
  {
    id: '25',
    code: 'MA',
    name: 'Massachusetts'
  },
  {
    id: '26',
    code: 'MI',
    name: 'Michigan'
  },
  {
    id: '27',
    code: 'MN',
    name: 'Minnesota'
  },
  {
    id: '28',
    code: 'MS',
    name: 'Mississippi'
  },
  {
    id: '29',
    code: 'MO',
    name: 'Missouri'
  },
  {
    id: '30',
    code: 'MT',
    name: 'Montana'
  },
  {
    id: '31',
    code: 'NE',
    name: 'Nebraska'
  },
  {
    id: '32',
    code: 'NV',
    name: 'Nevada'
  },
  {
    id: '33',
    code: 'NH',
    name: 'New Hampshire'
  },
  {
    id: '34',
    code: 'NJ',
    name: 'New Jersey'
  },
  {
    id: '35',
    code: 'NM',
    name: 'New Mexico'
  },
  {
    id: '36',
    code: 'NY',
    name: 'New York'
  },
  {
    id: '37',
    code: 'NC',
    name: 'North Carolina'
  },
  {
    id: '38',
    code: 'ND',
    name: 'North Dakota'
  },
  {
    id: '39',
    code: 'OH',
    name: 'Ohio'
  },
  {
    id: '40',
    code: 'OK',
    name: 'Oklahoma'
  },
  {
    id: '41',
    code: 'OR',
    name: 'Oregon'
  },
  {
    id: '42',
    code: 'PA',
    name: 'Pennsylvania'
  },
  {
    id: '44',
    code: 'RI',
    name: 'Rhode Island'
  },
  {
    id: '45',
    code: 'SC',
    name: 'South Carolina'
  },
  {
    id: '46',
    code: 'SD',
    name: 'South Dakota'
  },
  {
    id: '47',
    code: 'TN',
    name: 'Tennessee'
  },
  {
    id: '48',
    code: 'TX',
    name: 'Texas'
  },
  {
    id: '49',
    code: 'UT',
    name: 'Utah'
  },
  {
    id: '50',
    code: 'VT',
    name: 'Vermont'
  },
  {
    id: '51',
    code: 'VA',
    name: 'Virginia'
  },
  {
    id: '53',
    code: 'WA',
    name: 'Washington'
  },
  {
    id: '54',
    code: 'WV',
    name: 'West Virginia'
  },
  {
    id: '55',
    code: 'WI',
    name: 'Wisconsin'
  },
  {
    id: '56',
    code: 'WY',
    name: 'Wyoming'
  },
  {
    id: '60',
    code: 'AS',
    name: 'America Samoa'
  },
  {
    id: '64',
    code: 'FM',
    name: 'Federated States of Micronesia'
  },
  {
    id: '66',
    code: 'GU',
    name: 'Guam'
  },
  {
    id: '68',
    code: 'MH',
    name: 'Marshall Islands'
  },
  {
    id: '69',
    code: 'MP',
    name: 'Northern Mariana Islands'
  },
  {
    id: '70',
    code: 'PW',
    name: 'Palau'
  },
  {
    id: '72',
    code: 'PR',
    name: 'Puerto Rico'
  },
  {
    id: '74',
    code: 'UM',
    name: 'U.S. Minor Outlying Islands'
  },
  {
    id: '78',
    code: 'VI',
    name: 'Virgin Islands of the United States'
  }
].reduce((map, state) => {
  map[state.id] = state;
  return map;
}, {});
