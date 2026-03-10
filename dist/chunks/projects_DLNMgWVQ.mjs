import { a as getCollection } from './_astro_content_Cj0tcYxz.mjs';
import 'react/jsx-runtime';

async function getProjectSlugs() {
  try {
    const projects = await getCollection("projects");
    return projects.map((project) => project.id);
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return [];
  }
}
async function getAllProjects() {
  try {
    const projects = await getCollection("projects");
    const projectData = projects.map((project) => ({
      ...project.data
    }));
    return projectData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (error) {
    console.error("Error reading all projects:", error);
    return [];
  }
}
async function getProjectsByCategoryFrontmatter(category) {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.category === category);
}
async function getProjectsBySlugsFrontmatter(slugs) {
  const allProjects = await getAllProjects();
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));
  return slugs.map((slug) => projectMap.get(slug)).filter((project) => project !== void 0);
}

export { getProjectSlugs as a, getProjectsByCategoryFrontmatter as b, getProjectsBySlugsFrontmatter as c, getAllProjects as g };
