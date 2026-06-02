import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProject } from '../data/projects'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectSection from '../components/project/ProjectSection'
import ProjectImage from '../components/project/ProjectImage'
import NextProjectPicker from '../components/project/NextProjectPicker'
import SmeetsProjectContent from '../components/project/SmeetsProjectContent'
import AbTestingProjectContent from '../components/project/AbTestingProjectContent'
import MichaelProjectContent from '../components/project/MichaelProjectContent'
import ReasyProjectContent from '../components/project/ReasyProjectContent'
import OasisProjectContent from '../components/project/OasisProjectContent'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug ?? '')

  if (!project) return <Navigate to="/" replace />

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <div>
        <ProjectHeader project={project} />

        <div className="editorial-main project-typography pb-16">
        {project.slug === 'smeets' ? (
          <SmeetsProjectContent project={project} />
        ) : project.slug === 'ab-testing' ? (
          <AbTestingProjectContent project={project} />
        ) : project.slug === 'michael' ? (
          <MichaelProjectContent project={project} />
        ) : project.slug === 'reasy' ? (
          <ReasyProjectContent project={project} />
        ) : project.slug === 'osis-hotel' ? (
          <OasisProjectContent project={project} />
        ) : (
          <>
            {project.heroImage && (
              <div className="editorial-block pt-4 pb-2">
                <ProjectImage src={project.heroImage} />
              </div>
            )}

            {project.sections.map((section, i) => {
              if (section.image && !section.title && !section.body?.length && !section.stats) {
                return <ProjectImage key={i} src={section.image} />
              }

              if (section.image) {
                return (
                  <div key={i}>
                    <ProjectSection section={section} />
                    <ProjectImage src={section.image} />
                  </div>
                )
              }

              return <ProjectSection key={i} section={section} />
            })}
          </>
        )}

        <NextProjectPicker currentSlug={project.slug} />
        </div>
      </div>
    </motion.div>
  )
}
