// Design System Configuration
export const designTokens = {
  colors: {
    primary: {
      50: 'hsl(210 100% 97%)',
      100: 'hsl(210 100% 92%)',
      500: 'hsl(210 90% 45%)',
      600: 'hsl(210 90% 40%)',
      700: 'hsl(210 90% 35%)',
    },
    status: {
      success: 'hsl(142 76% 36%)',
      warning: 'hsl(38 92% 50%)',
      error: 'hsl(0 84% 60%)',
      pending: 'hsl(38 92% 50%)',
      running: 'hsl(210 90% 45%)',
      completed: 'hsl(142 76% 36%)',
      defaulted: 'hsl(0 84% 60%)',
    },
    neutral: {
      50: 'hsl(210 40% 98%)',
      100: 'hsl(210 40% 96%)',
      200: 'hsl(214 31% 91%)',
      500: 'hsl(215 16% 47%)',
      600: 'hsl(215 19% 35%)',
      700: 'hsl(215 25% 27%)',
      900: 'hsl(210 20% 15%)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
} as const;

export const componentVariants = {
  badge: {
    success: 'bg-green-100 text-green-700 hover:bg-green-100',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    error: 'bg-red-100 text-red-700 hover:bg-red-100',
    primary: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  },
  button: {
    primary: 'bg-smartcash-blue hover:bg-blue-600 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
  },
} as const;