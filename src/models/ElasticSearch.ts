import Client, { DocumentsData, IndicesData } from '@/models/Client'

type ElasticSearchSearchResponse = {
  hits: {
    hits: [
      {
        _id: string
        _source?: any
      }
    ]
  }
}

type ElasticSearchIndicesResponse = Array<{
  index: string
  uuid: string
  'docs.count': number
}>

export default class ElasticSearch extends Client {

  async indices(): Promise<IndicesData> {
    const records = await this.request<ElasticSearchIndicesResponse>(`https://${this.project.host}:${this.project.port}/_cat/indices?format=json`);

    if (!records) return [];

    records.sort((a: { index: string }, b: { index: string }) => a.index.localeCompare(b.index));

    return records.filter((record) => record.index !== '.geoip_databases').map(
        record => ({
        id: record.uuid,
        name: record.index,
        total: record['docs.count'],
      })
    );
  }

  async documents(index: string, page: number): Promise<DocumentsData> {
    const pageSize = 100;
    const pageOffset = page * pageSize;

    const records = await this.request<ElasticSearchSearchResponse>(`https://${this.project.host}:${this.project.port}/${index}/_search?format=json&size=${pageSize}&from=${pageOffset}`);
    if (!records) return [];

    return records.hits.hits.map((hit) => ({
      id: hit._id,
      data: hit._source,
    }));
  }

  async show(): Promise<any> {

  }

  async mappings(index: string): Promise<any> {
    return await this.request(`https://${this.project.host}:${this.project.port}/${index}/_mapping?format=json`);
  }
}
