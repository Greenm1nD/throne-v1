/**
 * Profile navigation redesign flag (VITE_ENABLE_PROFILE_NAV_REDESIGN).
 * Off → the account area renders the original sidebar (full rollback).
 */
export const profileNavRedesign =
  (import.meta as any).env?.VITE_ENABLE_PROFILE_NAV_REDESIGN === 'true'
