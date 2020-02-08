// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

const fs = require("fs")
const glob = require("glob")
const sass = require("sass")

glob(`${__dirname}/src/**/*.scss`, (_, matches) => {
  matches.forEach(filePath => {
    console.log(`Compiling ${filePath}...`)
    const css = sass
      .renderSync({ file: filePath, outputStyle: "compressed" })
      .css.toString("utf8")
    const ts = `// Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

export default \`${css}\`
`
    fs.writeFileSync(filePath.replace(/\.scss$/, ".css.ts"), ts, {
      mode: 0o644
    })
  })
  console.log("DONE!")
})
