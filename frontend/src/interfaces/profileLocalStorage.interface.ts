export interface UserAuth {
    username: string | null,
    user_id: number | null,
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