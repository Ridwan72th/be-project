import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, ITask } from './task.model';
import { v4 as uuid } from "uuid"
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
    private task: ITask[] = [{ id: "1x", title: "test", description: "desc", status: ETaskStatus.OPEN }];

    getAllTasks(): ITask[] {
        return this.task
    }

    getTaskWithFilter(filterDto: GetTaskFilterDto): ITask[] {
        const { status, search } = filterDto
        let task = this.getAllTasks()

        if (status) {
            task = task.filter((item) => item.status === status)
        }
        if (search) {
            task = task.filter((item) =>
                item.title.includes(search) || item.description.includes(search))
        }

        return task
    }

    getTaskById(id: string): ITask {
        const found = this.task.find((item) => item.id === id)
        if (!found) {
            throw new NotFoundException(`task id: ${id} not found`)
        }
        return found
    }

    createTask(createTaskDto: CreateTaskDto): ITask {
        const { title, description } = createTaskDto
        const task: ITask = {
            id: uuid(),
            title,
            description,
            status: ETaskStatus.OPEN
        }
        this.task.push(task)
        return task
    }

    deleteTask(id: string): void {
        this.task.filter((item) => item.id !== id)
    }

    updateTaskStatus(id: string, status: ETaskStatus): ITask {
        const tast = this.getTaskById(id)
        tast.status = status;
        return tast;
    }
}
