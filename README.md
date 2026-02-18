# esdjl BasicNgRx - Proyecto de Aprendizaje

Proyecto educativo desarrollado con **Angular 19** y **NgRx 19** para aprender y comprender el funcionamiento del manejo de estado reactivo en aplicaciones Angular modernas.

## 🌐 Demo en Vivo

🔗 **[Ver aplicación desplegada](https://esdjl-basic-ngrx.netlify.app/)**

## 📋 Descripción General

Este proyecto fue creado con el objetivo principal de **aprender NgRx** y sus diferentes componentes (Store, Actions, Reducers, Effects, Selectors y Meta-Reducers). La aplicación implementa dos módulos principales que demuestran diferentes aspectos de la gestión de estado:

- **Characters Module**: Gestión de estado local con NgRx básico
- **Pokemons Module**: Integración de NgRx Effects para peticiones HTTP asíncronas

## 🎯 Objetivos de Aprendizaje

- ✅ Implementar el store de NgRx para gestión de estado global
- ✅ Crear y usar Actions, Reducers y Selectors
- ✅ Trabajar con Effects para operaciones asíncronas
- ✅ Utilizar Meta-Reducers para funcionalidades transversales
- ✅ Integrar Redux DevTools para debugging
- ✅ Sincronizar el estado con localStorage

## 🏗️ Arquitectura del Proyecto

### Characters Module (Estado Local)

Este módulo implementa las funcionalidades básicas de NgRx para manejar un arreglo de personajes en memoria:

**Características:**

- ✅ **Actions**: `addCharacter`, `removeCharacter`, `editCharacter`
- ✅ **Reducers**: Manejo inmutable del estado de personajes
- ✅ **Selectors**:
  - `selectCharacter`: Obtiene el arreglo completo
  - `selectCharactersCount`: Cuenta total de personajes
  - `selectNameFirstCharacter`: Nombre del primer personaje
- ❌ **No usa Effects** (no hay operaciones asíncronas)

**Estructura:**

```
characters/
├── interfaces/
│   ├── character.interface.ts
│   └── character-state.interface.ts
├── store/
│   ├── characters.actions.ts
│   ├── characters.reducers.ts
│   └── characters.selectors.ts
├── components/
│   └── character-card/
└── pages/
    ├── character-form-page/
    └── character-page/
```

### Pokemons Module (Peticiones HTTP con Effects)

Este módulo demuestra el uso de **NgRx Effects** para manejar operaciones asíncronas mediante peticiones a la [PokeAPI](https://pokeapi.co/).

**Características:**

- ✅ **Actions**:
  - Paginación: `loadingPokemonsPagination`, `loadNextPokemonsPage`, `loadPreviousPokemonsPage`
  - Detalles: `loadingPokemonDetail`, `loadPokemonDetailsSuccess`
  - Gestión: `removePokemon`, `clearPokemons`
- ✅ **Reducers**: Gestión del estado de paginación y detalles de pokémons
- ✅ **Effects**:
  - `loadPokemonsPagination$`: Carga pokémons con paginación
  - `loadPokemonsDetail$`: Obtiene detalles específicos de un pokémon
- ✅ **Selectors**:
  - `pokemonPaginationResultsSelector`: Lista de resultados
  - `currentPageSelector`: Página actual
  - `hasPreviousPageSelector` / `hassNextPageSelector`: Estado de navegación
  - `pokemonsSelector`: Pokémons con detalles cargados
  - Estados de carga: `isLoadingPokemonPaginationSelector`, `isLoadingPokemonDetailSelector`
- ✅ **Service**: `PokemonService` para comunicación con PokeAPI

**Estructura:**

```
pokemons/
├── interfaces/
│   ├── pokemon-info.interface.ts
│   └── pokemon-paginator.interface.ts
├── services/
│   └── pokemon.service.ts
├── store/
│   ├── pokemons.actions.ts
│   ├── pokemons.effects.ts
│   ├── pokemons.reducers.ts
│   ├── pokemos.selectors.ts
│   └── models/
│       └── pokemon-state.model.ts
└── pages/
    └── pokemons-page/
```

### Gestión Global del Estado

**App State** (`app.state.ts`):

```typescript
export interface AppState {
  characters: CharacterState;
  catalog: Article[];
  pokemons: PokemonState;
}
```

**Meta-Reducer para localStorage** (`store/storage.meta-reducer.ts`):

- Persiste automáticamente todo el estado en `localStorage`
- Recupera el estado al recargar la aplicación
- Maneja errores de serialización/deserialización
- Limpia el storage corrupto automáticamente

## ⚙️ Tecnologías Utilizadas

| Tecnología          | Versión | Propósito                             |
| ------------------- | ------- | ------------------------------------- |
| Angular             | 19.0.0  | Framework principal                   |
| NgRx Store          | 19.0.0  | Gestión de estado                     |
| NgRx Effects        | 19.0.0  | Side effects y operaciones asíncronas |
| NgRx Store DevTools | 19.0.0  | Debugging y time-travel               |
| RxJS                | 7.8.0   | Programación reactiva                 |
| Bootstrap           | 5.3.8   | Estilos y componentes UI              |
| TypeScript          | 5.6.2   | Lenguaje de programación              |

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- Angular CLI 19.0.2

### Pasos

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd esdjl-BasicNgRx
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar servidor de desarrollo**

```bash
npm start
# o
ng serve
```

4. **Abrir en el navegador**

```
http://localhost:4710/
```

## 🏗️ Build

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`.

## 📝 Notas Importantes

### ⚠️ Limitación Conocida: localStorage

El módulo de Pokémons realiza peticiones a PokeAPI que retornan una cantidad significativa de datos. Al implementar la sincronización con `localStorage`, esto puede causar que se **exceda el límite de almacenamiento del navegador**, provocando errores.

**¿Por qué no se resolvió?**

- El objetivo principal del proyecto era **aprender NgRx**, no optimizar el almacenamiento
- Es un proyecto educativo, no productivo
- Demuestra la importancia de considerar limitaciones de almacenamiento en aplicaciones reales

**Soluciones posibles** (no implementadas):

- Realizar un mapeo de datos al recuperar la información del API y solo recuperar y persistir los datos necesarios
- Implementar un filtro en el meta-reducer para excluir el módulo de pokémons
- Guardar solo IDs y recargar cuando sea necesario
- Usar IndexedDB en lugar de localStorage
- Implementar estrategias de cache más sofisticadas

### 📦 Sin Mapeo de Datos

La información de los pokémons **no está mapeada** a interfaces personalizadas más limpias. Los datos se usan tal como vienen de la API. Esto es intencional ya que el enfoque era aprender NgRx, no modelado de datos.

## 🔍 Herramientas de Desarrollo

### Redux DevTools

El proyecto incluye **@ngrx/store-devtools** configurado. Instala la extensión [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) en tu navegador para:

- 🔍 Inspeccionar el estado en tiempo real
- ⏮️ Time-travel debugging
- 📊 Visualizar el flujo de acciones
- 📈 Analizar el rendimiento

### localStorage Inspector

Puedes inspeccionar el estado persistido abriendo las DevTools del navegador:

```javascript
// En la consola del navegador
localStorage.getItem("app_state");
```

## 📚 Conceptos de NgRx Implementados

### 1. **Store**

Estado global e inmutable de la aplicación

### 2. **Actions**

Eventos que describen cambios en el estado

### 3. **Reducers**

Funciones puras que transforman el estado basándose en acciones

### 4. **Selectors**

Funciones que extraen y componen piezas específicas del estado

### 5. **Effects**

Manejo de side effects y operaciones asíncronas (HTTP, localStorage, etc.)

### 6. **Meta-Reducers**

Interceptores del flujo de acciones para funcionalidades transversales

## 🎓 Aprendizajes Clave

1. ✅ **Separación de responsabilidades**: Cada parte de NgRx tiene un propósito específico
2. ✅ **Inmutabilidad**: El estado nunca se modifica directamente
3. ✅ **Flujo unidireccional**: Los datos fluyen en una sola dirección
4. ✅ **Predictibilidad**: El estado es predecible y fácil de debuggear
5. ✅ **Testing**: La arquitectura facilita el testing unitario
6. ✅ **Escalabilidad**: Patrón que escala bien en aplicaciones grandes

## 🔗 Referencias

- [NgRx Documentation](https://ngrx.io/)
- [Angular Documentation](https://angular.dev/)
- [PokeAPI](https://pokeapi.co/)
- [Redux Pattern](https://redux.js.org/)
