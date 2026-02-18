import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../app.state';

const STORAGE_KEY = 'app_state';

// Guarda el estado en localStorage
function saveToLocalStorage(state: AppState): void {
  try {
    const stateToSave = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, stateToSave);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
    localStorage.removeItem(STORAGE_KEY); // Limpia el storage corrupto
    location.reload();
  }
}

// Carga el estado desde localStorage
function loadFromLocalStorage(): AppState | undefined {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    localStorage.removeItem(STORAGE_KEY); // Limpia el storage corrupto
  }
  return undefined;
}

// Meta-reducer que sincroniza con localStorage
export function localStorageSyncMetaReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    // En la inicialización, intenta cargar desde localStorage
    if (action.type === INIT || action.type === UPDATE) {
      const savedState = loadFromLocalStorage();
      if (savedState) {
        console.log('State loaded from localStorage');
        state = savedState;
      }
    }

    // Ejecuta el reducer normalmente
    const nextState = reducer(state, action);

    // Guarda el nuevo estado en localStorage
    saveToLocalStorage(nextState);

    return nextState;
  };
}
