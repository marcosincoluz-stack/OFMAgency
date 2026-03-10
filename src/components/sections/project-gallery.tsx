import type { ProjectImage } from '@/lib/types';

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="section-padding bigger-container">
      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[335px] w-full overflow-hidden md:h-[450px] lg:h-[900px]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="size-full object-cover"
              sizes="100vw"
              fetchPriority="high"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
