declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'jsvectormap' {
  const jsvectormap: any
  export default jsvectormap
}
