import { Project } from '@/types';
import { ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import useSettings from '@/compositions/useSettings';

const activeProject = ref<Project>();
const availableProjects = ref<Map<string, Project>>(new Map<string, Project>());
const openProjects = ref<Map<string, Project>>(new Map<string, Project>());

export default function useProjects() {
  const { getSetting, setSetting } = useSettings();

  // Watch for changes and store them in the settings.
  watch(activeProject,     value => setSetting('activeProject', value));
  watch(openProjects,      value => setSetting('openProjects', [...value.values()]), { deep: true });
  watch(availableProjects, value => setSetting('availableProjects', [...value.values()]), { deep: true });

  const loadProjects = async () => {
    activeProject.value = await getSetting<Project>('activeProject');

    const aps = await getSetting<Project[]>('availableProjects');
    if (aps && aps.length) {
      aps.forEach(p => availableProjects.value.set(p.id, p));
    }

    const opp = await getSetting<Project[]>('openProjects');
    if (opp && opp.length) {
      opp.forEach(p => openProjects.value.set(p.id, p));
    }
  };

  const activateProject = (id: string) => {
    activeProject.value = openProjects.value.get(id);
  };

  const closeProject = (id: string) => {
    const project = openProjects.value.get(id);
    if (project) openProjects.value.delete(id);

    if (openProjects.value.size > 0) {
      const lastOpenProject = [...openProjects.value.values()][openProjects.value.size - 1];
      if (lastOpenProject) activeProject.value = lastOpenProject;
    } else {
      activeProject.value = undefined;
    }
  };

  const addProject = (host: string, port: number, name: string) => {
    const id = uuid();

    availableProjects.value.set(id, {
      id,
      name,
      type: 'elasticsearch',
      host,
      port,
    });

    return id;
  };

  const openProject = (id: string) => {
    const project = availableProjects.value.get(id);
    if (project) {
      openProjects.value.set(id, project);
      setSetting('openProjects', [...openProjects.value.values()]);
    }
  };

  return {
    loadProjects,
    activeProject,
    availableProjects,
    openProjects,
    activateProject,
    closeProject,
    addProject,
    openProject,
  };
}
