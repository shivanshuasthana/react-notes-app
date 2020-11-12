import React, {
    useEffect,
    useState
} from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

export function NoteContent(props) {
    const classes = useStyles();

    const [titleFieldValue, setTitleFieldValue] = useState(props.title);
    const [contentFieldValue, setContentFieldValue] = useState(props.content);

    useEffect(() => { setTitleFieldValue(props.title) }, [props.title])
    useEffect(() => { setContentFieldValue(props.content) }, [props.content])

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" disabled={!(titleFieldValue && contentFieldValue)} onClick={() => {
                        props.addNote({ title: titleFieldValue, content: contentFieldValue });
                        props.selectNote({ title: titleFieldValue, content: contentFieldValue });
                    }}>
                        Add
                    </Button>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-helperText"
                        label="Title"
                        variant="outlined"
                        value={titleFieldValue}
                        required={true}
                        onChange={(e) => setTitleFieldValue(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-helperText"
                        label="Body"
                        variant="outlined"
                        multiline
                        rows={20}
                        required={true}
                        value={contentFieldValue}
                        onChange={(e) => setContentFieldValue(e.target.value)}

                    />
                </Grid>
                <Grid container justify="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!(titleFieldValue && contentFieldValue)}
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            props.updateNote({ title: titleFieldValue, content: contentFieldValue });
                            props.clearAllField()
                        }}
                    >
                        Save
                 </Button>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = (state) => ({
    title: state.selectedNote ? state.selectedNote.title : '',
    content: state.selectedNote ? state.selectedNote.content : ''
});

const mapDispatchToProps = dispatch => {
    return {
        addNote: (newNote) => {
            dispatch({ type: "ADD_NOTE", payload: newNote })
        },
        updateNote: (updatedNote) => {
            dispatch({ type: "UPDATE_NOTE", payload: updatedNote })
        },
        selectNote: (selectedNote) => {
            dispatch({ type: "SELECT_NOTE", payload: selectedNote })
        },
        clearAllField: () => {
            dispatch({ type: "CLEAR_ALL_FIELD" })
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteContent)
