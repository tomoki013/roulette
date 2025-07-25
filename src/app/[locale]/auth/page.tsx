'use client';

import { motion } from 'framer-motion';
import AuthForm from '@/components/features/auth/AuthForm';

const AuthPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <AuthForm enablePageNavigation={true} />
            </div>
        </motion.div>
    );
};

export default AuthPage;
