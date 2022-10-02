import { reactive, computed } from 'vue';

const state = reactive({
  activeProject: 'uuid1',

  openProjects: [
    'uuid1',
    'uuid2',
    'uuid3',
    'uuid4',
  ],

  availableProjects: [
    'uuid1',
    'uuid2',
    'uuid3',
  ],
});

export default function useProjects() {
  const activeProject = computed(() => {
    return state.availableProjects.find(ap => ap === state.activeProject);
  });

  const openProjects = computed(() => {
    return state.openProjects
      .map(op => state.availableProjects.find(ap => ap === op))
      .filter(item => item !== undefined) as string[];
  });

  const activateProject = (id: string) => {
    state.activeProject = id;
  };

  const closeProject = (id: string) => {
    state.openProjects = state.openProjects.filter(projectId => projectId !== id);

    // Activate last open project when active project is closed.
    if (state.activeProject === id && state.openProjects.length > 0) {
      state.activeProject = state.openProjects[state.openProjects.length - 1];
    }
  };

  return {
    state,
    activeProject,
    openProjects,
    activateProject,
    closeProject,
  };
}
