import { rpc } from '@/rpc';

export default function useSettings() {
  return {
    async getSetting<T>(key: string): Promise<T | undefined> {
      const settings = await rpc.request.getSettings({});
      if (settings) {
        return settings[key] ?? undefined;
      }
    },

    async setSetting(key: string, value: any) {
      await rpc.request.setSettings({ key, value: JSON.parse(JSON.stringify(value ?? null)) });
    },
  };
}
