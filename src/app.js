// const obj = {
//   name:'Imran',
//   getName(){
//     return this.name;
//   }
// };

// // issue was that when we broke it down in func we lost the context and we have a regular func
// // and reg func have undefined for there this

// //bind can be done in either way
// //const getName = obj.getName.bind(obj);
// const getName = obj.getName.bind({name: 'Andrew'});

// console.log(getName());

// class IndecisionApp extends React.Component {
//   constructor(props){
//     super(props);
//     this.handleDeleteOption=this.handleDeleteOption(bind);
//     this.state={
//       options:['one','two','three']
//     }
//   }
//   handleDeleteOption(){
//     this.setState(()=>{
//     return{
//       options:[]
//     };
//   });
// }
//   render() {
//   const title = 'Indecision';
//   const subtitle = 'Put your life in the hands of a computer';
//   // const options = ['one','two','three'];
//    return (
//       <div>
//         <Header title={title} subtitle={subtitle}/>
//         <Action hasOptions={this.state.options.length>0}/>
//         <Options options={this.state.options}
//         handleDeleteOption={this.handleDeleteOption}        
//         />
//         <AddOption />
//       </div>
//     )
//   }
// }


// //extends gives all features
// class Header extends React.Component {

//   render() {
//    // console.log(this.props);
//     return (
//       <div>
//         <h1> {this.props.title} </h1>
//         <h2> {this.props.subtitle} </h2>
//       </div>
//     )
//   }
// }

// class Action extends React.Component{
//   handlePick(){
//     alert('handlePick');
//   }
//   render(){
//     return (
//       <div>
      
//       <button onClick={this.handlePick}
//       disable={!this.props.hasOptions}
//       > 
      
//       What should I do?</button>
//       </div>
//     )
//   }
// }

// //options -> options component here
// //nesting component
// // render new p tag for each option (set text, set key) -- use map

// //add remove all
// // handleremove all
// //onclick

// //constructor doesnt get called
// //get called with props object
// //inorder to ensure we not break call props with super
// //to get access this -- super(props)

// class Options extends React.Component{
//   // constructor(props){
//   //   super(props);
//   //   this.handleRemoveAll = this.handleRemoveAll.bind(this) ;
//   // } 
//   // handleRemoveAll(){
//   //   console.log(this.props.options);
//   //   //alert('remove');
//   // }

//   render(){
    
//     return (
//       <div>
//       <button onClick={this.props.handleDeleteOption}> Remove All</button>
//       {
//      // this.props.options.map((option) => <p key={option}>{option}</p>) 
//     //to retrun instance of option 
//     this.props.options.map((option) => <Option key={option} optionText={option} />) 
    
//   }
 
   
//       <Option />
//       </div>
//     );
//   }
// }

// class Option extends React.Component {
//   render(){
//     return (
//       <div>
//       {this.props.optionText}
//       </div>
//     )
//   }
// }

// // Addoption -> Addoption component here
// class AddOption extends React.Component{
// handleaddoption(e){

// //prevents default form submission
// e.preventDefault();

// const option = e.target.elements.option.value.trim();

// if (option){
//   alert(option);
// }
// }
//   render(){
//     return (
      
//       <div>
      
//       <form onSubmit={this.handleaddoption}>
//       <input type='text' name='option'></input>
//       <button onClick={this.addoption}>Add Option</button>
//       </form>
//       </div>
//     );
//   }
// }

// //components can reused
// // const jsx =(
// //   <div>
// //     <Header />
// //     <Action />
// //     <Options />
// //     <AddOption />
// //   </div>
// // )

// //below code to render on the screen

// ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: ['Thing one', 'Thing two', 'Thing three']
    };
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option); 
  }
  handleAddOption(option) {
    //console.log(option);
    if(!option){
      return 'Enter a valid string!'
    }
    else if(this.state.options.indexOf(option)>-1){
      return 'This option already exists'
    }
    else{
    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      };

    });
  }
}
  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption 
        handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {
          this.props.options.map((option) => <Option key={option} optionText={option} />)
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        {this.props.optionText}
      </div>
    );
  }
}

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state={
      error:undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error= this.props.handleAddOption(option);
    this.setState(()=>{
      return {
        error
      };
    });
    // if (option) {
    //   this.props.handleAddOption(option);
    //   //alert(option);
    // }

  }
  render() {
    return (
      <div>
      {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
