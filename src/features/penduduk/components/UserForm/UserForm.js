// src/features/users/components/UserForm.js
'use client';

import { useActionState } from 'react';
import { createUserAction } from '../../actions';
import styles from './UserForm.module.css';

const initialState = {
  success: false,
  message: '',
  errors: {},
  inputs: { username: '', email: '', password: '' }, 
};

export default function UserForm() {
  const [state, formAction, isPending] = useActionState(
    createUserAction,
    initialState
  );
  const currentState = state || initialState;
  const inputs = currentState.inputs || initialState.inputs;
  const errors = currentState.errors || {};

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Registrasi Penduduk Baru</h3>

      {state.message && (
        <div className={state.success ? styles.successBanner : styles.errorMessage}>
          {state.message}
        </div>
      )}

      <form action={formAction}>
        {/* Username */}
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={state.inputs?.username || ''}
            className={`${styles.input} ${state.errors?.username ? styles.inputError : ''}`}
            placeholder="johndoe"
          />
          {state.errors?.username && (
            <span className={styles.errorMessage}>{state.errors.username[0]}</span>
          )}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={state.inputs?.email || ''}
            className={`${styles.input} ${state.errors?.email ? styles.inputError : ''}`}
            placeholder="john@example.com"
          />
          {state.errors?.email && (
            <span className={styles.errorMessage}>{state.errors.email[0]}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={state.inputs?.password || ''}
            className={`${styles.input} ${state.errors?.password ? styles.inputError : ''}`}
            placeholder="******"
          />
          {state.errors?.password && (
            <span className={styles.errorMessage}>{state.errors.password[0]}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? 'Mendaftarkan...' : 'Daftar User'}
        </button>
      </form>
    </div>
  );
}