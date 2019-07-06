import React from 'react';

export default ({ task, index, completeTask, taskInProgress }) => {
    
    return(
		<div className={`task ${task.completed ? 'completed' : ''}`}>
			<ul className="tasks">
				<li>{task.description}</ li>
                <li>
                    {task.inProgress &&
                    <img className="" src="assets/loading.svg" alt="Task in progress.." />}
				    {!task.completed && !task.inProgress &&
                    <button onClick={() => completeTask(task)} disabled={taskInProgress}>Complete</button>}
                </ li>
			</ ul>
		</div>
    )
}