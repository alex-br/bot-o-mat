import taskData from '../enum/taskData.js'

const cannotDo = {
    UNIPEDAL: ['do the dishes', 'sweep the house'],
    BIPEDAL: ['make a sammich'],
    QUADRUPEDAL: ['do the dishes'],
    ARACHNID: ['make a sammich'],
    RADIAL: ['wash the car', 'do the laundry'],
    AERONAUTICAL: ['make a sammich', 'do the dishes']
};

class Task {
    constructor (description, eta, completed = false) {
        this.description = description;
        this.eta = eta;
        this.completed = completed;
        this.inProgress = false;
    }
    
    complete () {
        return new Promise((resolve, reject) => {
            this.inProgress = true;
            setTimeout(() => {
                this.completed = true;
                this.inProgress = false;
                resolve(this);
            }, this.eta);
        });
    }
}

class Robot {
    constructor (name, type, tasks) {
        this.name = name;
        this.type = type;
        this.tasks = tasks ? tasks.map(task => new Task(task.description, task.eta, task.completed)) : [];
        !this.tasks.length && this.getTasks(); 
    }
    
    getTasks () {
      // Creates a tasksClone, excluding the tasks in cannotDo list
      const excludeList = cannotDo[this.type];
      const tasksClone = taskData.filter(
          task => !excludeList.includes(task)
      );
      
      const tasks = []

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * tasksClone.length);
        const task = tasksClone.splice(randomIndex, 1)[0];
        tasks.push(new Task(task.description, task.eta));
      }
        
      this.tasks = [...this.tasks, ...tasks];
      
      return this.tasks;
    }
    
    runTask () {
        // if(this.tasks.length === 0) return;
    }
}
    
export default Robot;