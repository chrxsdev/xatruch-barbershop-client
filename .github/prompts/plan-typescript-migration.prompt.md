# Plan: Migrate React Barbershop Project to TypeScript

This is a **moderate-to-complex migration** for a modern React 18 + Redux Toolkit + Vite application with 8 Redux slices, custom hooks abstraction, TanStack Table, React Hook Form, and comprehensive API integration. The project has ~60-80 component/page files with zero existing type coverage.

## Steps

1. **Create a new Branch** — Start a new branch from `main` named `feature-typescript-migration` to isolate migration work.

2. **Install TypeScript infrastructure** — Add `typescript` (~5.3), `@types/react-modal`, `@types/react-datepicker`, `@types/node` to devDependencies; create `tsconfig.json` with strict mode enabled and JSX preserve for React; configure Vite to handle `.ts/.tsx` files alongside existing `.js/.jsx`

3. **Define core type system** — Create `src/types/` directory with `entities.ts` (User, Service, Booking, CartItem, Review, Barber), `api.ts` (ApiResponse, ApiError, validation error structures), `store.ts` (RootState, AppDispatch, ThunkConfig), and `forms.ts` (LoginForm, SignUpForm, ServiceForm with React Hook Form integration types)

4. **Migrate API layer** — Convert `src/api/clientApi.js` and all 9 files in `src/api/fetch/` (`auth.js`, `services.js`, `bookings.js`, `cart.js`, `barber.js`, `review.js`, `user.js`, `settings.js`, `fileUpload.js`) to TypeScript, typing Axios instance with interceptors, adding generic response types, and handling nested destructuring patterns like `const { data: { data, message } }`

5. **Migrate Redux layer** — Convert all 8 slices in `src/store/` (`authSlice.js`, `serviceSlice.js`, `cartSlice.js`, `bookingsSlice.js`, `barbersSlice.js`, `reviewsSlice.js`, `settingSlice.js`, `uiSlice.js`) using Redux Toolkit's typed patterns, define state interfaces, type all action payloads and thunks, configure typed `store.js` with RootState and AppDispatch exports

6. **Migrate custom hooks** — Convert 8 hooks in `src/hooks/` (`useAuthStore.js`, `useServiceStore.js`, `useCartStore.js`, `useBookingStore.js`, `useBarberStore.js`, `useReviewStore.js`, `useSettingStore.js`, `useUiStore.js`) with explicit return type interfaces, leveraging typed Redux selectors from Step 4 to provide type-safe component boundaries

7. **Migrate components and views incrementally** — Start with simple presentational components (`Header.jsx`, `Footer.jsx`, `SpinnerLoader.jsx`), progress to layout components (`AdminLayout.jsx`, `AppLayout.jsx`, `AuthLayout.jsx`), then complex components (TanStack Table components with generic column definitions, React Hook Form integration in modals), and finally pages/views, adding Props interfaces for all component parameters and typing event handlers
