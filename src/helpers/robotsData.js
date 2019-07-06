import Robot from './robot';

const RobotData = {
    get() {        
        const data = JSON.parse(localStorage.getItem('robots'));

        if (data) {                 
            Object.entries(data).forEach(([robotName, robot]) => {
                data[robotName] = new Robot(robot.name, robot.type, robot.tasks);
            });
        }
            
        return data;
	},
	
	set (robots) {
		localStorage.setItem('robots', JSON.stringify(robots));
	},
	
	clear () {
		this.set({});
	}
};

export default RobotData;
