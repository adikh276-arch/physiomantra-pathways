import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { Database, HardDrive, Globe } from 'lucide-react';

export const SystemStatus = () => {
    const [searchParams] = useSearchParams();

    // NUCLEAR OPTION: Regex scan entire URL for uid
    const detectUid = () => {
        const href = window.location.href;
        const match = href.match(/[?&]uid=([^&#]*)/i);
        return match ? match[1] : null;
    };

    const urlUid = detectUid();

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
        <div className="fixed top-0 left-0 w-full z-50 bg-slate-900 text-slate-400 text-[10px] px-4 py-1 flex justify-between items-center border-b border-slate-800 font-mono">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Database className={`w-3 h-3 ${dbStatus === 'connected' ? 'text-emerald-500' : 'text-red-500'}`} />
                    <span>DB: {dbStatus === 'connected' ? 'OK' : 'ERR'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <HardDrive className={`w-3 h-3 ${storageStatus === 'ready' ? 'text-emerald-500' : 'text-red-500'}`} />
                    <span>STR: {storageStatus === 'ready' ? 'OK' : 'ERR'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span>UID: {urlUid || 'Guest'}</span>
                </div>
            </div>
            {urlUid && (
                <div className="flex items-center gap-2">
                    <span>Profile: {profileStatus.toUpperCase()}</span>
                </div>
            )}
        </div>
    );
};
