'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header 
      className="bg-white py-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <SidebarTrigger />
        </div>
        <span className="text-xl font-semibold text-blue-600">Deeptrack</span>
      </div>
    </motion.header>
  )
}