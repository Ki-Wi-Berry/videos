const files = require.context('./', true, /\index.js$/)

export default files.keys().filter(v => v != './index.js').reduce((arr, key) => {
  let comp = files(key).default
  return [...arr, comp]
}, [])
