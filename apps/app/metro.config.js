const path = require("path")

const { getDefaultConfig } = require("expo/metro-config")

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, "../..")

const config = getDefaultConfig(projectRoot, {
  isCSSEnabled: true
})

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot, projectRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules"),
]

config.resolver.sourceExts.push('cjs');
config.resolver.sourceExts.push('mjs');
config.resolver.assetExts.push(
  'css'
);


module.exports = config
