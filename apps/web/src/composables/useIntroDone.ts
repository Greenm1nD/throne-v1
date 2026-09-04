import { ref } from 'vue'

/**
 * Flips true the moment the intro loader dissolves. Entrance choreography
 * (e.g. the hero "lights come on" reveal) waits on this so it plays in view,
 * not hidden underneath the loader.
 */
export const introDone = ref(false)
