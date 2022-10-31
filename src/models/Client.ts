import { Project } from '@/types';
import { ipcRenderer } from 'electron';

export type IndicesData = Array<{
  id: string
  name: string
  total: number
}>

export type DocumentsData = Array<{
  id: string
  data: Record<string, string>
}>

export default abstract class Client {

  constructor(protected project: Project) {
  }

  async request<T>(url: string): Promise<T | undefined> {
    return await ipcRenderer.invoke('request', url);
  };

  abstract indices(): Promise<IndicesData>;
  abstract documents(index: string, page: number): Promise<DocumentsData>;
  abstract show(): Promise<any>;
  abstract mappings(index: string): Promise<any>;
}
