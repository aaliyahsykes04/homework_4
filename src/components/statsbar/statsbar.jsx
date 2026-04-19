// import the css file for this component 
import './statbar.css';

//statsbar component
//receives the tasks array as a prop from board.jsx and compute all the numbers it needs from it 

//there is no state and it just receives data and displays is 
function StatsBar ({tasks}) {
    //derived values 
    //we never store these in state separately 
    //calculate them fresh from the tasks array every render 
    //if tasks changes, theses automatically update too 

    //total number of tasks 
    const total = tasks.length;

    //count how many are done 
    //.filter() return a new array of only the matching items 
    //.length gives us the count 
    const completedCount = tasks.filter(task => task.status === 'done').length;

    //count how many are still todo 
    const todoCount = tasks.filter(task => task.statue === 'todo').length;

    //calculate % complete 
    //guard against divinding by zero when the list is empty 
    const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100 );
    
    
    return (
        <div className='statsbar'>

            {/** --Metric Card -- 
             *  Three summary numbers shown side by */}
             <div className='stats-cards'>

                <div className='stat-card'>
                    <span className='stat-number'>{total}</span>
                    <span className='stat-label'>total tasks</span>
                </div>

                <div className='stat-card'>
                    <span className='stat-number'>{completedCount}</span>
                    <span className='stat-label'>remaining</span>
                </div>

             </div>

             {/** -- Progress Bar
              *  Width is driven by % value above 
              * incline style is used here because the value is dynamic 
              * in react, incline styles are objects {{property: objects}}
              */}
              <div className='progress-track'>
                <div 
                    className='progress-fill'
                    style= {{width: '${percent}%'}}>
                    </div>

                {/**--Percentage label */}
                <p className='progress-label'>{percentage}% complete</p>
              </div>
        </div>
    )
}

export default StatsBar;