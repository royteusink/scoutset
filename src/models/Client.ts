import { Project } from '@/types';
import { ipcRenderer } from 'electron';

export default abstract class Client {

  constructor(protected project: Project) {
  }

  async request(url: string) {
    return await ipcRenderer.invoke('request', url);
  };

  abstract indices(): Promise<Record<string, string>[]>;
  abstract documents(index: string, page: number): Promise<Record<string, string>[]>;
  abstract show(): Promise<any>;

  abstract mappings(index: string): Promise<any>;
}
