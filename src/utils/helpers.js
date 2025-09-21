// src/utils/helpers.js

import { useState, useEffect } from "react";

// 🧩 Persist to localStorage safely
export const storage = {
    get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    },
    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch { }
    },
};

// 🧩 Debounce hook for snappy search
export function useDebounced(value, delay = 120) {
    const [v, setV] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setV(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return v;
}
