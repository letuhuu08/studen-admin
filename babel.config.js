const removeConsolePlugin = []
// removeConsolePlugin.push("transform-remove-console") 
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: removeConsolePlugin
}
