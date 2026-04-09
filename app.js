/**
 * Main Application Entry Point
 */

import { initDB } from './db.js';
import { navigate, render, saveCurrentRecord } from './ui.js';

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize Database
        await initDB();
        console.log('DB Initialized');

        // Initial Render
        await render();

        // Navigation Handlers
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                // Prevent double clicks
                if (e.currentTarget.classList.contains('active')) return;

                const target = e.currentTarget.dataset.target;
                navigate(target);
            });
        });

        // Save Record Handler (Global event delegation)
        document.getElementById('app-container').addEventListener('click', async (e) => {
            if (e.target.id === 'btn-save') {
                const form = document.getElementById('calc-form');
                if (form) await saveCurrentRecord(form);
            }
        });

        // Service Worker Registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('SW Registered', reg))
                .catch(err => console.log('SW Error', err));
        }

    } catch (err) {
        console.error('App Init Error:', err);
        alert('Failed to initialize app. Please clear site data and reload.');
    }
});
