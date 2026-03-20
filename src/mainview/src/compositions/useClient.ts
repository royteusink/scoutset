import ElasticSearch from '@/models/ElasticSearch';
import { Project } from '@/types';

export default function useClient() {

  const getClient = function(project: Project) {
    switch (project.type) {
      case 'elasticsearch': return new ElasticSearch(project);
    }
  };

  return {
    getClient,
  };
}
