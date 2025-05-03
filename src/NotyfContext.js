// src/NotyfContext.js
import { createContext } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'info',
      background: '#3b82f6',
      icon: false,
    },
    {
      type: 'warning',
      background: '#facc15',
      icon: false,
    },
  ],
});

const NotyfContext = createContext(notyf);

export default NotyfContext;
