'use client';

import { useState } from 'react';
import { projects, projectCategories } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { getProjects } from '@/lib/data';

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const allProjects = getProjects();

  const filteredProjects =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {projectCategories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? 'default' : 'outline'}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
