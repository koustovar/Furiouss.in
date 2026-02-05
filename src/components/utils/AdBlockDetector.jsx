import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCcw, ExternalLink } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const AdBlockDetector = () => {
    const [isBlocked, setIsBlocked] = useState(false);
    const [reason, setReason] = useState('adblock'); // 'adblock' or 'keys'

    useEffect(() => {
        const checkEnvironment = async () => {
            // 1. Check for missing environment variables (The "Keys" part)
            const requiredKeys = [
                'VITE_FIREBASE_API_KEY',
                'VITE_RAZORPAY_KEY_ID'
            ];

            const missingKeys = requiredKeys.filter(key => !import.meta.env[key]);

            if (missingKeys.length > 0) {
                setReason('keys');
                setIsBlocked(true);
                return;
            }

            // 2. Check for AdBlocker (The ERR_BLOCKED_BY_CLIENT part)
            try {
                // Try to fetch a script that adblockers hate
                const response = await fetch('https://www.google-analytics.com/analytics.js', {
                    method: 'HEAD',
                    mode: 'no-cors',
                    cache: 'no-store'
                }).catch(() => {
                    setIsBlocked(true);
                    setReason('adblock');
                });

                // Also check if Razorpay script from index.html was blocked
                setTimeout(() => {
                    if (!window.Razorpay) {
                        setIsBlocked(true);
                        setReason('adblock');
                    }
                }, 2000);

            } catch (error) {
                setIsBlocked(true);
                setReason('adblock');
            }
        };

        checkEnvironment();
    }, []);

    return (
        <Modal
            isOpen={isBlocked}
            onClose={() => setIsBlocked(false)}
            title={reason === 'adblock' ? "Connection Blocked" : "Configuration Required"}
            icon={ShieldAlert}
        >
            <div className="space-y-6">
                {reason === 'adblock' ? (
                    <>
                        <p>
                            We've detected that some essential services (like <span className="text-white font-bold">Payments</span> and <span className="text-white font-bold">Database</span>) are being blocked by your browser or an extension.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary">How to fix this:</h4>
                            <ul className="text-sm space-y-2 list-disc pl-4 text-gray-300">
                                <li>Disable <span className="text-white font-bold">AdBlockers</span> or <span className="text-white font-bold">Brave Shields</span> for this site.</li>
                                <li>Check your network firewalls or VPN settings.</li>
                                <li>Refresh the page once disabled.</li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <p>
                            Essential <span className="text-white font-bold">Environment Keys</span> are missing from your configuration.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                            <p className="text-sm text-red-400 font-medium italic">
                                "Ensure your .env file contains all VITE_ tokens and restart your development server."
                            </p>
                        </div>
                    </>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <Button onClick={() => window.location.reload()} className="w-full flex items-center justify-center gap-2">
                        <RefreshCcw className="w-4 h-4" /> Reload Page
                    </Button>
                    <Button variant="outline" onClick={() => setIsBlocked(false)} className="w-full opacity-50 hover:opacity-100 transition-opacity">
                        Ignore
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AdBlockDetector;
