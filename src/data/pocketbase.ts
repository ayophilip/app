import PocketBase from 'pocketbase'

// Initialize PocketBase to this
export const pb = new PocketBase(import.meta.env.POCKETBASE_URL ||
    process.env.POCKETBASE_URL)

//Create a getProjects function that will retrieve the projects list
export async function getProjects() {
    const projects = await pb
        .collection('projects')
        .getFullList()
    
    return projects
}

//Create an addProject() function
export async function addProject(name:string) {
    const newProject = await pb.collection('projects')
        .create({
            name,
            status: 'not started',
        })
    return newProject
}

// Fetch project from PocketBase
export async function getProject(id:string) {
    const project = await pb.collection('projects').getOne(id)
    
    return project
}