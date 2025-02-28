'use client';

import React from 'react';
import { useOverlay } from '../../_hooks/use-overlay';

export const Overlay = () => {
  const { overlay } = useOverlay();
  return overlay ? <div className="fixed inset-0 bg-black/40" /> : null;
};
