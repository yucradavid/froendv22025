// vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "browser": false,  // Desactiva la variable 'browser'
        "fs": false,        // Desactiva acceso a archivos del sistema
        "path": false,      // Desactiva acceso al módulo 'path'
        "os": false         // Desactiva acceso al módulo 'os'
      }
    }
  }
});
