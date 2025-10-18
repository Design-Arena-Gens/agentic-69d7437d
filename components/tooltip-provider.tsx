'use client';

import { Provider } from '@radix-ui/react-tooltip';
import type { TooltipProviderProps } from '@radix-ui/react-tooltip';

export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  return (
    <Provider {...props}>
      {children}
    </Provider>
  );
}
