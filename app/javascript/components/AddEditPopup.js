import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import TagSelect from "./TagSelect";

class AddEditPopup extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <Dialog open={this.props.isOpened} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="dialogTitle_addTask">
                    {this.props.isAdding ? "Add Task" : "Edit Task"}
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText> 
                        Please fill in the information below
                    </DialogContentText>

                    {
                      this.props.selectedTask
                        ? <div>
                            <TextField autoFocus required={true} margin="dense" id="field_addEdit_title" label="Title" fullWidth defaultValue={this.props.selectedTask.title}/>
                            <TextField multiline required={true} margin="dense" id="field_addEdit_description" label="Description" fullWidth defaultValue={this.props.selectedTask.description}/>
                        </div>
                        : <div>
                            <TextField autoFocus required={true} margin="dense" id="field_addEdit_title" label="Title" fullWidth defaultValue={this.props.newTitle}/>
                            <TextField multiline required={true} margin="dense" id="field_addEdit_description" label="Description" fullWidth defaultValue={this.props.newDescription}/>
                        </div>
                    }
                    
                    <br></br>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        required={true}
                        ampm={false}
                        showTodayButton
                        value={this.props.selectedTask ? this.props.selectedTask.due_date : this.props.newDueDate}
                        onChange={this.props.onDateChange}
                        id="dateTimePicker_dueDate"
                        format="dd/MM/yyyy HH:mm"
                        label="Due date"
                      />
                    </MuiPickersUtilsProvider>
                    <br></br>
                    <br></br>

                    <TagSelect tags={this.props.tags} tag_id={this.props.newTagId} onChange={this.props.onTagChange} />

                    <IconButton color="primary" onClick={this.props.onNewTag}>
                      <AddIcon />
                    </IconButton>

                    {this.props.isAddingTag 
                        ? <div>
                            <TextField margin="dense" id="field_new_add_tag" label="New Tag" />
                            <IconButton color="primary" onClick={this.props.onAddTag}>
                              <DoneIcon />
                            </IconButton> 
                            <IconButton color="primary" onClick={this.props.onCancelTag}>
                              <CloseIcon />
                            </IconButton> 
                          </div> 
                        : <div></div>}
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.onClose} color="primary">
                    Cancel
                  </Button>
                  {
                    this.props.isAdding
                      ? <Button onClick={() => this.props.onSubmit(document.getElementById("field_addEdit_title").value, document.getElementById("field_addEdit_description").value)} color="primary">Submit</Button>
                      : <Button onClick={() => this.props.onConfirm(document.getElementById("field_addEdit_title").value, document.getElementById("field_addEdit_description").value)()} color="primary">Confirm</Button>
                  }
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddEditPopup;