import { ipcRenderer } from 'electron';

export default function useSettings() {
  return {
    async getSetting<T>(key: string): Promise<T | undefined> {
      const settings = await ipcRenderer.invoke('getSettings');
      if (settings) {
        return settings[key] ?? undefined;
      }
    },

    async setSetting(key: string, value: any) {
      await ipcRenderer.invoke('setSettings', key, JSON.parse(JSON.stringify(value ?? null)));
    },
  };
}
