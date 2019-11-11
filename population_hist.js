#!/usr/bin/env node

// https://www.worldometers.info/world-population/china-population/


const fs = require('fs')

var Xray = require( 'x-ray' )
var x = Xray({filters:{
  trim: (txt_in) => {
    return txt_in.trim()
  }
}})

const col_names = [
  'year', 'population', 'population','yearly_change_pct', 'yearly_change', 'migrants_net','median_age','fertility_rate','density','urban_pop_pct','urban_pop','country_share_of_world_pop', 'world_population', 'global_rank'
]

var lookup_col_name_fr_idx = (idx) => {
  return col_names[idx]
}

var lookup_idx_fr_col_name = (col_name) =>{
  return col_names.indexOf(col_name)
}

// x('https://www.worldometers.info/world-population/china-population/','div.table-responsive@html')
//   .then(res => {
//     fs.writeFileSync('./debug.html', res)
//   })

x('https://www.worldometers.info/world-population/china-population/',
  'div.table-responsive tr',
  [{
    1: 'td:nth-of-type(1) | trim',     // 'rank',
    2: 'td:nth-of-type(2) | trim',     // 'country',
    3: 'td:nth-of-type(3) | trim',     // 'population', 'yearly_change',
    4: 'td:nth-of-type(4) | trim',     // 'net_change',
    5: 'td:nth-of-type(5) | trim',     // 'density',
    6: 'td:nth-of-type(6) | trim',     // 'land_area',
    7: 'td:nth-of-type(7) | trim',     // 'migrants',
    8: 'td:nth-of-type(8) | trim',     // 'fert_rate',
    9: 'td:nth-of-type(9) | trim',     // 'med_age',
    10: 'td:nth-of-type(10) | trim',   // 'urban_pop',
    11: 'td:nth-of-type(11) | trim',   // 'world_share'

  }]
)
  .then(res => {
    fs.writeFileSync('./parsed_china.json', JSON.stringify(res))
  })
