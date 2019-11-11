#!/usr/bin/env node


const fs = require( 'fs' )

var Xray = require( 'x-ray' )
var x = Xray( {
  filters: {
    trim: ( txt_in ) => {
      return txt_in.trim()
    }
  }
} )



x('http://127.0.0.1:42051/_ref/worldometer-world-population/table1.html',
  'table tr',
  [{
    1: 'td:nth-of-type(1) | trim',     // 'rank',
    2: 'td:nth-of-type(1) a@href',
    3: x('td:nth-of-type(1) a@href',
          x('table tr',[{
            1: 'td:nth-of-type(1)',
            2: 'td:nth-of-type(2)',
            3: 'td:nth-of-type(3)',
            4: 'td:nth-of-type(4)',
          }]))
  }]
)
  .then(res => {
    fs.writeFileSync('./parsed_china1.json', JSON.stringify(res))
  })
