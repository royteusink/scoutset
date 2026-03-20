export type ScoutsetRPC = {
  bun: {
    requests: {
      request: {
        params: { url: string; body?: any; headers?: Record<string, string> };
        response: any;
      };
      getSettings: {
        params: {};
        response: Record<string, any>;
      };
      setSettings: {
        params: { key: string; value: any };
        response: { success: boolean };
      };
    };
    messages: {};
  };
  webview: {
    requests: {};
    messages: {};
  };
};
