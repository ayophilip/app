import PocketBase from 'pocketbase'

import type {
    TypedPocketBase,
    ProjectsResponse,
  } from '@src/data/pocketbase-types'

// Initialize PocketBase to this
export const pb = new PocketBase(import.meta.env.POCKETBASE_URL ||
    process.env.POCKETBASE_URL) as TypedPocketBase

pb.autoCancellation(false)

//Create a getProjects function that will retrieve the projects list
export async function getProjects() {
    const projects = await pb
        .collection('projects')
        .getFullList()
    
        return projects.sort(
            (a, b) => getStatus(a) - getStatus(b)
          )        
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

// associate project status to a number for sorting
function getStatus(project: ProjectsResponse) {
    switch (project.status) {
      case 'not started':
        return 7
      case 'on hold':
        return 6
      case 'started':
        return 5
      case 'in progress':
        return 4
      case 'almost finished':
        return 3
      case 'ongoing':
        return 2
      case 'done':
        return 1
      default:
        return 0
    }
  }
