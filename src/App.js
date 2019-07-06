import React, { useState } from 'react';
import './App.css';

import Robot from './helpers/robot';
import RobotData from './helpers/robotsData.js';

import Leaderboard from './components/leaderboard';
import Task from './components/task';
import Form from './components/form';


function App() {

    const [robots, setRobots] = useState(RobotData.get() || {});
    const [completedTasks, setCompletedTasks] = useState({});
    const [taskInProgress, setTaskInProgress] = useState();
    const [errors, setErrors] = useState([]);
        
    // Create robot
    function addRobot(name, type) {

		if(!validRobot(name, type)) {
			return;
		}
	    
        const robotsCopy = {...robots};
        
        // Check if robot doesn't exist
        if (!robotsCopy[name]) {
            robotsCopy[name] = new Robot(name, type);
        } else {
            robotsCopy[name].getTasks();
        }
        
        updateRobots(robotsCopy);
        
        return true;
    }
    
    function validRobot(name, type) {
	    const newErrors = [];
	    
	    if (!name) {
		    newErrors.push('Please enter the name');
	    }
	    if (!type) {
            newErrors.push('Please select the type');
	    }

	    setErrors(newErrors);
	    
		return name && type;
    }
    
    // Update state and localStorage
    function updateRobots(robots) {
	    setRobots(robots);
	    RobotData.set(robots);
    }
    
    // Clear state and localStorage
    function clear() {
	    setRobots({});
	    RobotData.clear();
    }
        
    function completeTask(task) {
        /*console.log('task', task)
        window.task = task;
        return;     */
        
        const promise = task.complete();
        setTaskInProgress(true);
        
        // After task is completed..
        promise.then(task => {
            setTaskInProgress(false);
            updateRobots({...robots});
            
            const tasksCopy = {...completedTasks};
            
            if(!tasksCopy[task.description]) {
                tasksCopy[task.description] = 0;
            }
            
            tasksCopy[task.description]++;
            
            setCompletedTasks(tasksCopy);
        });
    }

    return (
        <div className="App">
            <Leaderboard completedTasks={completedTasks} />
            
            <Form addRobot={addRobot} clear={clear} errors={errors} />
            {Object.values(robots).map((robot, index) => (
                <div className="robot" key={index}>
                    <h3>{robot.name}</h3>
                    {robot.tasks.map(
                        (task, taskIndex) => <Task key={`${index}-${taskIndex}`} index={taskIndex} task={task} completeTask={completeTask} taskInProgress={taskInProgress} />)}
                </div>
            ))}
        </div>
    );
}

export default App;
