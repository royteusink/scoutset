import { rpc } from '@/rpc';

export default function useSettings() {
  const getSetting = async <T>(key: string): Promise<T | undefined> => {
    const settings = await rpc.request.getSettings({});
    if (settings) {
      return settings[key] ?? undefined;
    }
  };

  const setSetting = async (key: string, value: any) => {
    await rpc.request.setSettings({ key, value: JSON.parse(JSON.stringify(value ?? null)) });
  };

  return { getSetting, setSetting };
}
