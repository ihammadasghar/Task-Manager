// May be used like: rgb2hex('rgb(14,43,104)'), rgb2hex('rgb(144,44,84)')
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

export { rgb2hex }
