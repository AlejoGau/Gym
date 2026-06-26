# Portal Privado del Usuario — Especificación e Implementación

> Documento de trabajo del **portal privado simulado** (sin autenticación real,
> roles, backend, pagos ni APIs). Datos **mock** tipados con TypeScript. No
> reemplaza ni modifica la landing ni la página de contacto.

## 🟢 Estado actual

**Etapa 1 y Etapa 2 implementadas y verificadas** (`tsc --noEmit` ✓ · `next build` ✓).

| Pantalla | Ruta | Estado |
|---|---|---|
| Inicio del usuario | `/inicio` | ✅ Hecho |
| Mis entrenamientos | `/entrenamientos` | ✅ Hecho |
| Entrenamiento activo | `/entrenamientos/actual` | ✅ Hecho (localStorage) |
| Mi alimentación + detalle de comida | `/alimentacion` | ✅ Hecho (localStorage) |
| Perfil | `/perfil` | ✅ Hecho (placeholder) |

**Notas de implementación:**
- Estado en localStorage resuelto con `useSyncExternalStore` ([src/lib/useLocalStorage.ts](src/lib/useLocalStorage.ts))
  para cumplir las reglas estrictas del React Compiler que usa el ESLint del proyecto
  (no permite `setState` síncrono en efectos ni funciones impuras en render).
- Los diálogos (`Ver detalle` / `Ver técnica`) se renderizan con `createPortal` a `document.body`
  ([Modal.tsx](src/components/portal/ui/Modal.tsx)): las tarjetas `.glass-card-3d` usan `perspective`
  y `backdrop-filter`, que atrapaban el overlay `position: fixed` dentro de la card.
- Lint: persisten errores **pre-existentes** de la landing (`Testimonials.tsx`, `Background3D.tsx`),
  fuera del alcance (no se modifica la landing). El código del portal no agrega errores ni warnings.

---

## 1. Análisis del proyecto actual

### 1.1 Framework y stack detectado

| Área | Detectado |
|---|---|
| Framework | **Next.js 16.2.9** con **App Router** (`src/app/`) |
| Lenguaje | **TypeScript 5** (`strict: true`) |
| UI | **React 19.2.4** |
| Estilos | **Tailwind CSS v4** (configuración por `@theme` en `globals.css`, sin `tailwind.config`) |
| Animación | **framer-motion 12** |
| 3D | **three 0.184** (fondo WebGL de la landing) |
| Iconos | **Material Symbols Outlined** (Google Fonts, cargado en `layout.tsx`) |
| Tipografías | **Montserrat** (display/títulos) + **Inter** (cuerpo), vía `next/font/google` |
| Alias de imports | `@/*` → `./src/*` |
| Deploy | Vercel |

> ⚠️ `AGENTS.md` advierte que esta versión de Next puede tener *breaking changes*
> respecto a versiones conocidas. Antes de usar APIs nuevas de Next conviene
> consultar `node_modules/next/dist/docs/`.

### 1.2 Estructura de carpetas actual

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fuentes, <html>, Material Symbols
│   ├── page.tsx            # Landing (Suspense → GymConfigWrapper)
│   ├── globals.css         # @theme de Tailwind v4 + utilidades (glass-card, etc.)
│   ├── generator/page.tsx  # Generador de configuración de landing
│   └── api/shorten/route.ts
├── components/
│   ├── landing/            # Navbar, Hero, Benefits, Activities, Plans,
│   │                       # Schedule, Testimonials, Location, ContactCTA,
│   │                       # Footer, GymConfigWrapper
│   └── ui/                 # Card3D, Background3D  (reutilizables)
└── lib/
    └── config.ts           # GymConfig + getGymConfig(searchParams)
```

### 1.3 Sistema de estilos y tokens

- **Sin `tailwind.config`**: los tokens viven en `globals.css` bajo `@theme`.
- **Colores semánticos** (clases Tailwind disponibles):
  - Fondo: `bg-background` (`#131313`), texto `text-on-background` (`#e5e2e1`)
  - Superficies: `surface-container`, `surface-container-low`, `surface-container-lowest`, `surface-container-highest`, `surface-variant`
  - Acento/marca: `primary-fixed` (lime dinámico, default `#caf300`), `on-primary-fixed`
  - Secundario: `secondary-container` (naranja, default `#ff571a`), `on-secondary-container`
  - Texto tenue: `on-surface-variant` (`#c5c9ac`), bordes `outline` / `outline-variant`
- **Colores dinámicos**: `--color-primary/secondary/accent` se setean en runtime y existen
  además variantes RGB (`--color-primary-rgb`) para glows. En la landing se inyectan desde
  query params; **el portal usará los valores por defecto del tema** (no necesita query params).
- **Tipografía** (clases utilitarias): `font-display-lg`, `font-display-lg-mobile`,
  `font-headline-lg`, `font-headline-md`, `font-body-md`, `font-body-lg`, `font-label-md`.
- **Glassmorphism**: `.glass-card` y `.glass-card-3d` (blur + borde 1px blanco 10%).
- **Forma**: botones `rounded-lg` (8px), tarjetas grandes `rounded-xl` (~16px).
- **Idioma**: español rioplatense ("Entrená", "Comenzá", "Mirá la técnica").

### 1.4 Navegación y responsive (referencia: `Navbar.tsx`)

- **Mobile-first**. Breakpoint principal `md:` (768px).
- **Desktop**: barra superior fija con links horizontales.
- **Mobile**: barra **inferior** fija (`fixed bottom-0 … md:hidden`) con íconos + label,
  más menú desplegable y un FAB. **Este patrón es la base del layout privado.**
- Estado activo: `text-primary-fixed` + fondo `bg-surface-variant/50` redondeado.

### 1.5 Convenciones de componentes

- Componentes interactivos marcados con `'use client'`.
- Animaciones de entrada con `framer-motion` (`initial/animate`, `whileInView`, `whileTap`).
- Contenedor estándar: `max-w-7xl mx-auto px-container-margin-mobile md:px-12`.
- Botón primario: `bg-primary-fixed text-on-primary-fixed rounded-lg font-bold uppercase`.
- Botón secundario: `border border-primary-fixed text-primary-fixed`.

### 1.6 Componentes / recursos reutilizables

| Recurso | Reutilización en el portal |
|---|---|
| `components/ui/Card3D.tsx` | Tarjetas con tilt 3D (resumen de rutina, accesos rápidos) |
| Clases `.glass-card-3d` / `.glass-card` | Todas las tarjetas del portal |
| Tokens de color/tipografía de `globals.css` | Identidad visual completa (sin cambios) |
| Patrón de nav inferior de `Navbar.tsx` | Base de `BottomNav` del layout privado |
| Material Symbols (ya cargado en `layout.tsx`) | Íconos del portal, sin dependencias nuevas |
| `framer-motion` | Animaciones sutiles (evitar excesos, según spec) |

> **No se reutiliza** `GymConfigWrapper` ni `getGymConfig` (atados a la landing y a query
> params). El portal define su propio contexto/usuario mock.

---

## 2. Arquitectura propuesta (organización por features)

Se respeta la estructura existente y se agrega una capa `src/features/` para el portal,
más rutas privadas bajo un grupo de App Router `(portal)` que **no afecta** la landing.

```
src/
├── app/
│   ├── (portal)/                 # Grupo de rutas privadas — NO toca la landing
│   │   ├── layout.tsx            # Layout privado (sidebar + bottom nav + header)
│   │   ├── inicio/page.tsx       # /inicio
│   │   ├── entrenamientos/
│   │   │   ├── page.tsx          # /entrenamientos
│   │   │   └── actual/page.tsx   # /entrenamientos/actual   (Etapa 2)
│   │   ├── alimentacion/page.tsx # /alimentacion             (Etapa 2)
│   │   └── perfil/page.tsx       # /perfil
│   └── … (landing intacta)
│
├── features/
│   ├── dashboard/
│   │   ├── components/   # GreetingHeader, TodayWorkoutCard, WeeklyProgress,
│   │   │                 #   TodayNutritionCard, NextActivityCard, QuickActions
│   │   ├── data/         # mock del resumen de inicio
│   │   ├── types/        # tipos del dashboard
│   │   └── pages/        # InicioPage (composición)
│   │
│   ├── workouts/
│   │   ├── components/   # WorkoutSummaryCard, ExerciseCard, ExerciseDetail,
│   │   │                 #   WorkoutProgress
│   │   ├── data/         # mock de rutina + ejercicios + sesiones
│   │   ├── types/        # Workout, Exercise, ExerciseSet, WorkoutSession
│   │   ├── hooks/        # useActiveWorkout (Etapa 2, localStorage)
│   │   ├── utils/        # formato de duración, cálculo de progreso
│   │   └── pages/        # WorkoutsPage, ActiveWorkoutPage (Etapa 2)
│   │
│   └── nutrition/                # Etapa 2
│       ├── components/   # NutritionDayHeader, MacroSummary, MealCard, MealDetail,
│       │                 #   NutritionDisclaimer
│       ├── data/         # mock de plan alimentario + comidas + ingredientes
│       ├── types/        # NutritionPlan, Meal, Ingredient, MacroTargets
│       ├── hooks/        # useMealProgress
│       └── pages/        # AlimentacionPage
│
└── components/
    └── portal/                   # UI compartida del portal (layout)
        ├── PortalLayout.tsx      # Orquesta sidebar + header + bottom nav
        ├── Sidebar.tsx           # Nav lateral (desktop)
        ├── BottomNav.tsx         # Nav inferior (mobile)
        ├── PortalHeader.tsx      # Nombre + avatar + accesos rápidos
        └── ui/                   # Primitivas: Card, SectionTitle, ProgressBar,
                                  #   EmptyState, Skeleton, IconButton
```

### Datos mock tipados

Archivos separados de los componentes (la spec lo exige):

- `features/workouts/types/*` y `features/workouts/data/*` → usuario referenciado, rutina,
  ejercicios, sesiones.
- `features/nutrition/types/*` y `.../data/*` → plan alimentario, comidas, ingredientes.
- `features/dashboard/data/*` → resumen de inicio (compone datos de otros features).
- Usuario mock compartido: `src/features/dashboard/data/user.ts` (o `src/lib/mock/user.ts`),
  tipado con `User { id, name, avatarUrl, goal }`.

Imágenes de ejercicios: **placeholders locales** en `public/portal/exercises/` (o un
componente `ExerciseImage` con fondo de superficie + ícono Material Symbols como *fallback*,
para no agregar binarios pesados).

---

## 3. Mapa de rutas

| Ruta | Etapa | Pantalla |
|---|---|---|
| `/inicio` | **1** | Inicio del usuario (dashboard) |
| `/entrenamientos` | **1** | Mis entrenamientos |
| `/perfil` | **1** | Perfil (mínimo, placeholder) |
| `/entrenamientos/actual` | 2 | Entrenamiento activo (mobile-first + localStorage) |
| `/alimentacion` | 2 | Mi alimentación + detalle de comida |

> El layout privado se monta una sola vez en `app/(portal)/layout.tsx` y envuelve todas las
> rutas anteriores.

---

## 4. Detalle funcional de pantallas

### 4.1 Layout privado simulado
- **Desktop**: navegación lateral (Sidebar) con: Inicio, Entrenamientos, Alimentación, Perfil.
- **Mobile**: navegación inferior (BottomNav) con los mismos accesos, patrón tomado de `Navbar.tsx`.
- **Header**: nombre + avatar del usuario (mock) y accesos rápidos a *Entrenar* y *Alimentación*.
- Accesible por teclado (foco visible, `aria-current` en el ítem activo, roles de nav).

### 4.2 Inicio (`/inicio`)
Saludo al usuario · Entrenamiento de hoy · Progreso semanal · Plan alimentario de hoy ·
Próxima actividad · Accesos rápidos. Todo con datos simulados.

### 4.3 Entrenamientos (`/entrenamientos`)
Nombre de rutina · día · duración estimada · cantidad de ejercicios · progreso · botón
*Comenzar* · listado de ejercicios.
Cada ejercicio: nombre · imagen local de reemplazo · músculo principal · series · repeticiones ·
descanso · peso anterior · botón *Ver técnica* · botón *Comenzar*.
**Componentes:** `WorkoutSummaryCard`, `ExerciseCard`, `ExerciseDetail`, `WorkoutProgress`.

### 4.4 Entrenamiento activo (`/entrenamientos/actual`) — *Etapa 2*
Interfaz **mobile-first** con botones grandes: ejercicio actual · número de serie · registrar
peso y repeticiones · marcar serie completada · cronómetro de descanso · siguiente ejercicio ·
instrucciones · finalizar · resumen final. Progreso temporal en **localStorage** (sin backend).

### 4.5 Mi alimentación (`/alimentacion`) — *Etapa 2*
Selector de día · objetivo diario aproximado (calorías, proteínas, carbohidratos, grasas) ·
listado de comidas · progreso de comidas realizadas.
Cada comida: nombre · horario · ingredientes · cantidades · calorías · macros · botón *Ver
detalle* · marcar como realizada.
**Aviso discreto**: los valores son aproximados y los planes personalizados deben ser revisados
por un profesional.

---

## 5. Lineamientos de diseño (obligatorios)

- Mantener identidad visual actual (tokens existentes, sin re-skin).
- Mobile-first · tarjetas claras (`glass-card-3d`) · botones grandes en entrenamiento.
- Buena legibilidad · **estados vacíos** · **skeletons de carga simulados**.
- Accesible por teclado · `<label>` en todos los formularios · animaciones moderadas.

---

## 6. Restricciones

Sin auth real · sin roles · sin Supabase · sin APIs externas · sin Mercado Pago ·
sin modificar la página de contacto/landing · sin planes médicos · sin dependencias nuevas
(se usa lo ya instalado: Next, React, Tailwind v4, framer-motion, Material Symbols).

---

## 7. Plan de implementación por etapas

### ✅ Etapa 1 (completada)
1. **Datos mock + tipos**: `user`, `workout`, `exercises`, `sessions` (workouts) y el
   resumen del dashboard.
2. **Layout privado**: `app/(portal)/layout.tsx`, `PortalLayout`, `Sidebar`, `BottomNav`,
   `PortalHeader` + primitivas UI (`Card`, `ProgressBar`, `EmptyState`, `Skeleton`,
   `SectionTitle`, `Avatar`, `Button`).
3. **Inicio** (`/inicio`) con sus componentes de `features/dashboard`.
4. **Entrenamientos** (`/entrenamientos`) con `WorkoutSummaryCard`, `ExerciseCard`,
   `ExerciseDetail`, `WorkoutProgress`.
5. **Perfil** (`/perfil`): placeholder mínimo con datos del usuario mock.
6. **Skeletons** de carga (`loading.tsx`) en `/inicio` y `/entrenamientos`.

### ✅ Etapa 2 (completada)
- **Mock de nutrición** tipado: plan por día, comidas e ingredientes
  (`features/nutrition/{types,data}`).
- **Mi alimentación** (`/alimentacion`): `DaySelector`, `MacroSummary`, `MealCard`,
  `MealDetail`, `NutritionDisclaimer`. Marcado de comidas realizadas persistido en
  localStorage (`useMealProgress`).
- **Entrenamiento activo** (`/entrenamientos/actual`): `ActiveWorkoutPage`, `ActiveExercise`,
  `SetRow`, `RestTimer`, `WorkoutSummary`, con `useActiveWorkout` + localStorage y resumen final.
- **Infra compartida**: hook `useLocalStorage` (`useSyncExternalStore`) y componente `Modal`
  (portal) reutilizados por ambas features.

### ⏳ Próximos pasos (fuera de esta entrega)
- Reemplazar la capa `data/` mock por datos reales (auth + Supabase/API) sin tocar componentes.
- Editar perfil, historial de sesiones real, plan alimentario por usuario.

---

## 8. Archivos creados (inventario real)

```
# Rutas (App Router) — grupo (portal), no afecta la landing
src/app/(portal)/layout.tsx
src/app/(portal)/inicio/{page,loading}.tsx
src/app/(portal)/entrenamientos/{page,loading}.tsx
src/app/(portal)/entrenamientos/actual/page.tsx
src/app/(portal)/alimentacion/page.tsx
src/app/(portal)/perfil/page.tsx

# Layout + primitivas compartidas del portal
src/components/portal/{PortalLayout,Sidebar,BottomNav,PortalHeader}.tsx
src/components/portal/nav-items.ts            # fuente única de la navegación
src/components/portal/ui/{Card,SectionTitle,ProgressBar,EmptyState,Skeleton,Avatar,Button,Modal}.tsx

# Infra compartida
src/lib/useLocalStorage.ts                    # useSyncExternalStore (SSR-safe)

# Feature: dashboard
src/features/dashboard/types/index.ts
src/features/dashboard/data/{user,summary}.ts
src/features/dashboard/components/{GreetingHeader,TodayWorkoutCard,WeeklyProgressCard,
                                   TodayNutritionCard,NextActivityCard,QuickActions}.tsx
src/features/dashboard/pages/InicioPage.tsx

# Feature: workouts
src/features/workouts/types/{index,session}.ts
src/features/workouts/data/{exercises,workouts,sessions}.ts
src/features/workouts/utils/format.ts
src/features/workouts/hooks/useActiveWorkout.ts
src/features/workouts/components/{WorkoutSummaryCard,WorkoutProgress,ExerciseCard,ExerciseDetail,
                                  ExerciseImage,ActiveExercise,SetRow,RestTimer,WorkoutSummary}.tsx
src/features/workouts/pages/{WorkoutsPage,ActiveWorkoutPage}.tsx

# Feature: nutrition
src/features/nutrition/types/index.ts
src/features/nutrition/data/{meals,plan}.ts
src/features/nutrition/utils/macros.ts
src/features/nutrition/hooks/useMealProgress.ts
src/features/nutrition/components/{DaySelector,MacroSummary,MealCard,MealDetail,NutritionDisclaimer}.tsx
src/features/nutrition/pages/AlimentacionPage.tsx
```

### Modificar
- **Ninguno de la landing.** Sólo se agrega la carpeta `(portal)`.
- Posible (opcional) `public/portal/…` para imágenes placeholder de ejercicios.

> No se modifican: `page.tsx` (landing), componentes de `landing/`, ni la página de contacto.

---

## 9. Criterios de aceptación

### Etapa 1
- [x] `/inicio`, `/entrenamientos` y `/perfil` renderizan dentro del layout privado.
- [x] Sidebar visible en desktop; BottomNav en mobile; header con nombre + avatar.
- [x] Datos provienen de archivos mock tipados, **no** embebidos en componentes.
- [x] Componentes `WorkoutSummaryCard`, `ExerciseCard`, `ExerciseDetail`, `WorkoutProgress`
      existen y son reutilizables.
- [x] Estados vacíos y skeletons simulados presentes.
- [x] Navegación accesible por teclado; identidad visual idéntica a la landing.
- [x] La landing y la página de contacto quedan intactas.

### Etapa 2
- [x] `/alimentacion`: selector de día, objetivo diario (kcal + macros), listado de comidas
      y progreso de comidas realizadas.
- [x] Cada comida muestra nombre, horario, ingredientes, calorías y macros, con detalle
      (modal) y opción de marcarla como realizada.
- [x] Aviso discreto de valores nutricionales aproximados.
- [x] `/entrenamientos/actual` mobile-first: ejercicio actual, número de serie, registrar
      peso y reps, marcar serie, cronómetro de descanso, siguiente ejercicio, instrucciones,
      finalizar y resumen final.
- [x] Progreso de alimentación y de entrenamiento persistido en localStorage.
- [x] `tsc --noEmit` y `next build` sin errores; el código del portal no agrega lint.
```
