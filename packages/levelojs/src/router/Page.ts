// src/router/page.ts
interface PageProps {
  path: string;
  component: (props: any) => Element;
}

/**
 * Configuration schema defining a standalone path pattern matching node.
 * Executed via Levelo's h() Factory.
 */
export function Page(props: PageProps): Record<string, any> {
  return {
    type: 'PAGE_CONFIG',
    path: props.path,
    component: props.component
  };
}