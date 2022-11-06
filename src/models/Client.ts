import { Project } from '@/types';
import { ipcRenderer } from 'electron';

export type IndicesData = Array<{
  id: string
  name: string
  total: number
}>

export type DocumentInfo = {
  id: string
  data: Record<string, string>
};

export type DocumentsData = DocumentInfo[];

export default abstract class Client {

  constructor(protected project: Project) {
  }

  async request<T>(url: string, body?: any): Promise<T | undefined> {
    return await ipcRenderer.invoke('request', url, body);
  };

  abstract indices(): Promise<IndicesData>;
  abstract documents(index: string, page: number, search?: string): Promise<DocumentsData>;
  abstract mappings(index: string): Promise<any>;
}
