import { Project } from '@/types';
import { computed, ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import useSettings from '@/compositions/useSettings';

const activeProject = ref<string>();
const availableProjects = ref<Map<string, Project>>(new Map<string, Project>());
const openProjects = ref<Map<string, string>>(new Map<string, string>());

export default function useProjects() {
  const { getSetting, setSetting } = useSettings();

  // Watch for changes and store them in the settings.
  watch(activeProject,     value => setSetting('activeProject', value));
  watch(openProjects,      value => setSetting('openProjects', [...value.values()]), { deep: true });
  watch(availableProjects, value => setSetting('availableProjects', [...value.values()]), { deep: true });

  const loadProjects = async () => {
    activeProject.value = await getSetting<string>('activeProject');

    const aps = await getSetting<Project[]>('availableProjects');
    if (aps && aps.length) {
      aps.forEach(p => availableProjects.value.set(p.id, p));
    }

    const opp = await getSetting<string[]>('openProjects');
    if (opp && opp.length) {
      opp.forEach(p => openProjects.value.set(p, p));
    }
  };

  const activateProject = (id: string) => {
    const project = availableProjects.value.get(id);
    if (project) activeProject.value = project.id;
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

  const createProject = (host: string, port: number, name: string) => {
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

  const deleteProject = (id: string) => {
    const availableProject = availableProjects.value.get(id);
    if (availableProject) availableProjects.value.delete(id);

    closeProject(id);
  };

  const updateProject = (id: string, host: string, port: number, name: string) => {
    const availableProject = availableProjects.value.get(id);
    if (availableProject) {
      availableProjects.value.set(id, {
        id,
        name,
        type: 'elasticsearch',
        host,
        port,
      });
    }
  };

  const openProject = (id: string) => {
    const availableProject = availableProjects.value.get(id);
    if (availableProject) openProjects.value.set(id, availableProject.id);
  };

  return {
    activeProject: computed(() => {
      return activeProject.value ? availableProjects.value.get(activeProject.value) : undefined
    }),
    availableProjects,
    activateProject,
    createProject,
    closeProject,
    loadProjects,
    openProject,
    openProjects: computed(() => {
      return [...openProjects.value.values()].map(p => {
        return availableProjects.value.get(p);
      }) as Project[];
    }),
    deleteProject,
    updateProject,
  };
}
