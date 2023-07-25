module.exports = {
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        console.log('override')
        let loaders = config.resolve
        loaders.fallback = {
            "net": false,
            "tls":false,
            "path":false,
            "fs":false,
            "vm":false,
            "crypto":false,
            "http":false,
            "https":false,
            "stream":false,
            "zlib":false,
            "os":false,
            "child_process":false,
        }
      return config
    },
  }