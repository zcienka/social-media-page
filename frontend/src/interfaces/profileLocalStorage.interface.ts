export interface TokenAuth {
    access: string | null,
    refresh: string | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface Persist {
    version: number,
    rehydrated: boolean,
}

export interface PersistProfile {
    auth: string,
    _persist: string,
}