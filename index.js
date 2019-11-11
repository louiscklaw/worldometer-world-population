#!/usr/bin/env node

// https://www.worldometers.info/world-population/population-by-country/


const fs = require( 'fs' )

var Xray = require( 'x-ray' )
var x = Xray( {
  filters: {
    trim: ( txt_in ) => {
      return txt_in.trim()
    }
  }
} ).concurrency(2)
  .throttle(1, 333)
  .delay(100,1000)


const col_names = [
  'rank', 'country', 'population', 'yearly_change', 'net_change', 'density', 'land_area', 'migrants', 'fert_rate', 'med_age', 'urban_pop', 'world_share'
]

var lookup_col_name_fr_idx = ( idx ) => {
  return col_names[ idx ]
}

var lookup_idx_fr_col_name = ( col_name ) => {
  return col_names.indexOf( col_name )
}

// x('https://www.worldometers.info/world-population/population-by-country','table@html')
//   .then(res => {
//     fs.writeFileSync('./debug.html', res)
//   })

x( 'https://www.worldometers.info/world-population/population-by-country/',
    'table tr',
    [ {
      1: 'td:nth-of-type(1) | trim', // 'rank',
      2: 'td:nth-of-type(2) | trim', // 'country',
      3: 'td:nth-of-type(3) | trim', // 'population', 'yearly_change',
      4: 'td:nth-of-type(4) | trim', // 'net_change',
      5: 'td:nth-of-type(5) | trim', // 'density',
      6: 'td:nth-of-type(6) | trim', // 'land_area',
      7: 'td:nth-of-type(7) | trim', // 'migrants',
      8: 'td:nth-of-type(8) | trim', // 'fert_rate',
      9: 'td:nth-of-type(9) | trim', // 'med_age',
      10: 'td:nth-of-type(10) | trim', // 'urban_pop',
      11: 'td:nth-of-type(11) | trim', // 'world_share'
      // 12: x( 'td:nth-of-type(2) a@href', 'div.table-responsive@html' ),
      13: x( 'td:nth-of-type(2) a@href',
        x('div.table-responsive tr', [{
          1: 'td:nth-of-type(1) | trim',     // 'rank',
      //     2: 'td:nth-of-type(2) | trim',     // 'country',
      //     3: 'td:nth-of-type(3) | trim',     // 'population', 'yearly_change',
      //     4: 'td:nth-of-type(4) | trim',     // 'net_change',
      //     5: 'td:nth-of-type(5) | trim',     // 'density',
      //     6: 'td:nth-of-type(6) | trim',     // 'land_area',
      //     7: 'td:nth-of-type(7) | trim',     // 'migrants',
      //     8: 'td:nth-of-type(8) | trim',     // 'fert_rate',
      //     9: 'td:nth-of-type(9) | trim',     // 'med_age',
      //     10: 'td:nth-of-type(10) | trim',   // 'urban_pop',
      //     11: 'td:nth-of-type(11) | trim',   // 'world_share'
        }]) ), // 'country population breakdown'
    } ]
  )
  .then( res => {
    const now = new Date()
    fs.writeFileSync('./worldometer-world-population.json', JSON.stringify({
      result: res,
      last_update: now.toGMTString()
    }))
  } )
  .catch( err => {
    console.log(err)
    throw err
  })
