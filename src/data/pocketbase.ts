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

// adds new tasks to pocketbase

export async function addTask(
    project_id:string,
    text: string) {
    const newTask = await pb.collection('tasks').create({
        project: project_id,
        text,
    })

    return newTask
}

//fetch the tasks from pocketbase

export async function getTasks(project_id:string) {
    const options = {
        filter: `project = "${project_id}"`,
    }
    

    const tasks = await pb
        .collection('tasks')
        .getFullList(options)

    return tasks
}

