
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function getHeaders(extra = {}) {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}`} : {}),
        ...extra
    };  
}

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: getHeaders(options.headers || {})
    });
    
    if (!res.ok) {
        const contentType = res.headers.get('Content-Type') || '';
        const body = contentType.includes('application/json')
            ? await res.json()
            : await res.text();
        throw new Error(body?.message || body || 'Erro na requisição');
    }

    const contentType = res.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
        return res.json();
    }
    return null;
}

export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
    put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (path, body) => request(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
    delete: (path) => request(path, { method: 'DELETE' }),
}