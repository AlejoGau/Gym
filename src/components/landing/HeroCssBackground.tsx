'use client';

import { GymConfig } from '@/lib/config';
import { motion } from 'framer-motion';

interface HeroCssBackgroundProps {
  config: GymConfig;
}

export default function HeroCssBackground({ config }: HeroCssBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 bg-[#131313]">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        alt={`Hero fallback for ${config.name}`}
        className="w-full h-full object-cover grayscale"
        src={config.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
    </div>
  );
}
