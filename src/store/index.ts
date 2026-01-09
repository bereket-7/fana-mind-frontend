import { createPinia } from "pinia";

// Create the main pinia instance
export const pinia = createPinia();

// Re-export all stores
export * from './modules/auth';
export * from './modules/courses';
export * from './modules/notifications';
export * from './modules/analytics';
export * from './modules/ui';
