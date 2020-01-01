// import React from "react";
// import { Dialog, DialogContent, DialogContentText, TextField } from "@material-ui/core";

// class AddEditPopup extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     handleClose = () => {

//     }

//     handleDateChange = () => {

//     }

//     handleNewTag = () => {

//     }

//     handleSubmitTag = () => {

//     }

//     handleCancelTag = () => {

//     }

//     render() {
//         return(
//             <Dialog open={this.props.isOpened} onClose={this.handleClose} aria-labelledby="form-dialog-title">
//                 {
//                     this.props.isAdding 
//                         ? <DialogTitle>Add Task</DialogTitle>
//                         : <DialogTitle>Edit Task</DialogTitle>
//                 }
//                 <DialogContent>
//                     <DialogContentText> 
//                         Please fill in the information below
//                     </DialogContentText>

//                     <TextField autoFocus required={true} margin="dense" id="field_addEdit_title" label="Title" fullWidth defaultValue={this.props.title}/>
//                     <TextField multiline required={true} margin="dense" id="field_addEdit_description" label="description" fullWidth defaultValue={this.props.title}/>
//                     <br></br>
//                     <br></br>
                    
//                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                       <KeyboardDateTimePicker
//                         required={true}
//                         ampm={false}
//                         showTodayButton
//                         value={this.state.dueDate}
//                         onChange={this.handleDateChange}
//                         id="dateTimePicker_dueDate"
//                         format="dd/MM/yyyy HH:mm"
//                         label="Due date"
//                       />
//                     </MuiPickersUtilsProvider>
//                     <br></br>
//                     <br></br>

//                     {/* Tag Select */}
//                     <IconButton color="primary" onClick={this.handleNewTag}>
//                       <AddIcon />
//                     </IconButton>
//                     {this.state.isAddingTag 
//                         ? <div>
//                             <TextField margin="dense" id="field_new_add_tag" label="New Tag" />
//                             <IconButton color="primary" onClick={this.handleSubmitTag}>
//                               <DoneIcon />
//                             </IconButton> 
//                             <IconButton color="primary" onClick={this.handleCancelTag}>
//                               <CloseIcon />
//                             </IconButton> 
//                           </div> 
//                         : <div></div>}
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={this.handleClose} color="primary">
//                     Cancel
//                   </Button>
//                   <Button onClick={this.handleSubmit} color="primary">
//                     {this.isAdding ? "Submit" : "Confirm"}
//                   </Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     }
// }