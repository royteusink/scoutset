import Client from '@/models/Client'

export default class ElasticSearch extends Client {

  async indices(): Promise<Record<string, string>[]> {
    const records = await this.request(`https://${this.project.host}:${this.project.port}/_cat/indices?format=json`);
    records.sort((a: { index: string }, b: { index: string }) => a.index.localeCompare(b.index));

    return records.filter((record) => record.index !== '.geoip_databases');
  }

  async documents(index: string, page: number): Promise<Record<string, string>[]> {
    const pageSize = 100;
    const pageOffset = page * pageSize;
    return await this.request(`https://${this.project.host}:${this.project.port}/${index}/_search?format=json&size=${pageSize}&from=${pageOffset}`);
  }

  async show(): Promise<any> {

  }

  async mappings(index: string): Promise<any> {
    return await this.request(`https://${this.project.host}:${this.project.port}/${index}/_mapping?format=json`);
  }
}
