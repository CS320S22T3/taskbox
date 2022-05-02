import React from "react";

// A generic component to display a single task. 
// It accepts a prop task that is an object that will contain the fields to display.
// The component display the following generic task field. 
// assigner.full_name
// assignee.full_name
// due_date
// created_date
// info_type

type Person = {
    full_name: string;
}

type Info = {
    type: string;
    start_date: Date;
    end_date: Date;
    notes: string[];
    link: string;
}

type Task = {
    assigner: Person;
    assignee: Person;
    due_date: Date;
    create_date: Date;
    info: Info
}

interface TaskComponentPropsType {
    task: Task;
}

function TaskComponent({task}: TaskComponentPropsType): JSX.Element {
    return (
        <div>
            <h1>{task.assigner.full_name}</h1>
            <h1>{task.assignee.full_name}</h1>
            <h1>{task.due_date}</h1>
            <h1>{task.create_date}</h1>
            <h1>{task.info.type}</h1>
            {task.info.type === 'time_off_requests' && 
                <>
                    <h1>{task.info.start_date}</h1>
                    <h1>{task.info.end_date}</h1>
                    <h1>{task.info.notes}</h1>
                </>
            }
            {task.info.type === 'training_assignments' &&
                <h1>{task.info.link}</h1>
            }
        </div>
    );
}

export default TaskComponent;
