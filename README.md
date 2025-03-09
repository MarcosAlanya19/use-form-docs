# Formulario Accesible con React Hook Form y Yup

Este proyecto implementa un formulario accesible en React utilizando `react-hook-form` y `yup` para la validación.

## Características
- Validación con `yup`.
- Manejo de estado del formulario con `react-hook-form`.
- Modos de validación: `onSubmit`, `onBlur`, `onChange`, `all`.
- Carga de valores predeterminados de manera asíncrona.
- Feedback de validación y mensajes de error.
- Visualización del estado y datos del formulario en tiempo real.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```sh
npm install
```

## Uso

Ejecuta el proyecto con:

```sh
npm start
```

## Estructura del Proyecto

```
📦 src
 ┣ 📂 components
 ┃ ┣ 📜 Checkbox.tsx
 ┃ ┣ 📜 DataDisplay.tsx
 ┃ ┣ 📜 Form.tsx
 ┃ ┣ 📜 FormStateDisplay.tsx
 ┃ ┣ 📜 Input.tsx
 ┃ ┗ 📜 Select.tsx
 ┣ 📜 App.tsx
 ┗ 📜 main.tsx
```

## Componentes Principales

### `App.tsx`
- Define el esquema de validación con `yup`.
- Configura `react-hook-form`.
- Muestra el formulario y los estados en tiempo real.

### `Form.tsx`
- Renderiza los campos del formulario e integra los componentes de entrada.

### `Input.tsx`, `Select.tsx`, `Checkbox.tsx`
- Componentes reutilizables con integración en `react-hook-form`.

### `DataDisplay.tsx`
- Muestra datos en tiempo real en un formato JSON.

### `FormStateDisplay.tsx`
- Muestra el estado del formulario en tiempo real.

## Validación con Yup

El esquema de validación se define en `App.tsx`:

```ts
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  country: yup.string().required('Selecciona un país'),
  acceptTerms: yup.boolean().oneOf([true], 'Debes aceptar los términos'),
  darkMode: yup.boolean(),
});
```

## Licencia

Este proyecto está bajo la licencia MIT.
