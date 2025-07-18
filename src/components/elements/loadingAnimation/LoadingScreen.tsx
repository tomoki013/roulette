'use client';

import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LoadingSpinner />
        </motion.div>
    );
};

export default LoadingScreen;
