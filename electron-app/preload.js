/**
 * Preload script for Electron
 * Provides a secure bridge between renderer and main process
 */

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Add any IPC methods needed for future features
  version: process.versions.electron
});
