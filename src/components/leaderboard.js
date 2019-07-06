import React from 'react';

const leaderboard = (props) => {
    return (
        <div className="leaderboard">
            <h3>Task Leaderboard</h3>
            {Object.entries(props.completedTasks).map(([task, nCompleted]) => <div class="completed-task">{task} <strong>({nCompleted})</strong></div>)}
        </div>
    );
};

export default leaderboard;