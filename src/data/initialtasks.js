// this is the starting list of tasts 
// every other file will import this 

const initialTasks = [
    {
        id: 1, 
        title : 'Work out',
        description: 'Complete abs and arm workout.',
        status: 'done',   //todo - done
        expanded: 'false',  //controls wheather description is visible 
    },
    {
        id: 2,
        title: 'Get breakfast.',
        description: "It's the most important meal of the day.",
        status: 'todo',
        expanded: 'false',
    },
        {
        id: 3,
        title: 'Go to library and do homework.',
        description: "Lock in before class.",
        status: 'todo',
        expanded: 'false',
    },
];

export default initialTasks;