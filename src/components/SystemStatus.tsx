import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSearchParams } from 'react-router-dom';

export const SystemStatus = () => {
    const [searchParams] = useSearchParams();
    const urlUid = searchParams.get('uid') || new URLSearchParams(window.location.search).get('uid');

    const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const [storageStatus, setStorageStatus] = useState<'checking' | 'ready' | 'error'>('checking');
    const [profileStatus, setProfileStatus] = useState<'none' | 'found' | 'created' | 'error'>('none');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        checkConnection();
    }, [urlUid]);

    const checkConnection = async () => {
        try {
            // 1. Check basic DB connection
            const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
            if (error) throw error;
            setDbStatus('connected');

            // 2. Check Storage Connection
            const { data: storageData, error: storageError } = await supabase.storage.from('pathway-uploads').list();
            if (storageError) {
                console.error("Storage Check Failed", storageError);
                setStorageStatus('error');
                setErrorMsg("Storage Blocked: " + storageError.message);
            } else {
                setStorageStatus('ready');
            }

            // 3. Check Profile if UID exists
            if (urlUid) {
                setProfileStatus('none');
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', urlUid)
                    .single();

                if (profile) {
                    setProfileStatus('found');
                } else {
                    setProfileStatus('created');
                    setErrorMsg(`Profile missing for ${urlUid}`);
                }
            }

        } catch (e: any) {
            setDbStatus('error');
            setErrorMsg(e.message);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/90 text-white text-xs p-2 flex items-center justify-between font-mono">
            <div className="flex gap-4">
                <span className="font-bold text-yellow-500">DEBUG MODE</span>

                <div className="flex items-center gap-2">
                    <span>DB:</span>
                    {dbStatus === 'checking' && <span className="text-yellow-400">...</span>}
                    {dbStatus === 'connected' && <span className="text-green-400 font-bold">ONLINE</span>}
                    {dbStatus === 'error' && <span className="text-red-500 font-bold">OFFLINE</span>}
                </div>

                <div className="flex items-center gap-2">
                    <span>STORAGE:</span>
                    {storageStatus === 'checking' && <span className="text-yellow-400">...</span>}
                    {storageStatus === 'ready' && <span className="text-green-400 font-bold">READY</span>}
                    {storageStatus === 'error' && <span className="text-red-500 font-bold">BLOCKED</span>}
                </div>

                <div className="flex items-center gap-2">
                    <span>UID:</span>
                    <span className="text-blue-300">{urlUid || 'None'}</span>
                </div>

                {urlUid && (
                    <div className="flex items-center gap-2">
                        <span>Profile:</span>
                        {profileStatus === 'found' && <span className="text-green-400">FOUND</span>}
                        {profileStatus === 'created' && <span className="text-yellow-400">MISSING</span>}
                    </div>
                )}
            </div>

            <div className="text-red-400 max-w-md truncate">
                {errorMsg}
            </div>
        </div>
    );
};
