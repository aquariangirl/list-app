import './App.css';
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],  
    };
  }
 
  handleChange = (event) => {
    this.setState({ task: event.target.value });
  };
  
  handleSubmitTask = (event) => {
    // event.preventDefault();
    this.setState({
      tasks: [...this.state.tasks, this.state.task],
      task: ''
    });
  };

  handleDeleteTask = (index) => {
    const tasks = [...this.state.tasks];  // creates a copy of the tasks array
    tasks.splice(index, 1); // removes the task at the specified index
    this.setState({ tasks }); // updates the state with the new tasks array
  };
  
  render() {
    // const task = this.state.task;
    // const tasks = this.state.tasks;

    return (
      <div className='App' style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>  
        <br />

        <div className='inputBox'>
          <input 
          type="text"
          placeholder="Enter New Task"
          value={this.state.task}
          onChange={this.handleChange}  // allows the textbox to not clear as user types
          />
            <button onClick={this.handleSubmitTask}>Add task</button>
        </div>

        <DragDropContext>
          <Droppable droppableId='tasks'>
            {(provided) => (
              <div className='tasks' {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.tasks.map(({task}, index) => {  // allows each input to populate in separate div
                  return (
                    <Draggable key={task} draggableId={task} index={index}>
                      {(provided) => (
                      <section ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      >
                        <div className="pinkTask">
                          {task}
                          <button onClick={() => this.handleDeleteTask(index)} type="delete">X</button>
                        </div>
                      </section>
                      )}    
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div> 
            )}   
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}       
                

export default App;