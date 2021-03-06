import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, TextareaAutosize} from "@mui/material";
import {connect} from "react-redux";
import {create, upload} from "../../store/reducer/book";
import {toast} from "react-toastify";
import {useState, useEffect} from "react";

function FormWriter({create, file_path, upload}) {

    const [oldData, setOldData] = useState({})

    useEffect(() => {
        if (file_path !== '' && file_path) {
            create({
                name: oldData.get('name'),
                author: 'author',
                file_path: file_path,
                short_info: oldData.get('description'),
                page_count: 100
            })
        }
    }, [file_path])

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('name') && data.get('description') && data.get('file')) {
            upload(data)
            setOldData(data)
        } else toast.error("You need to fill all blanks", {autoClose: 1000})
    }


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
            />
            {/*<TextField*/}
            {/*    margin="normal"*/}
            {/*    required*/}
            {/*    fullWidth*/}
            {/*    id="author"*/}
            {/*    label="Author"*/}
            {/*    name="author"*/}
            {/*    autoComplete="author"*/}
            {/*    autoFocus*/}
            {/*/>*/}
            {/*<TextField*/}
            {/*    margin="normal"*/}
            {/*    required*/}
            {/*    fullWidth*/}
            {/*    id="page_count"*/}
            {/*    label="Count of pages"*/}
            {/*    name="page_count"*/}
            {/*    autoComplete="page_count"*/}
            {/*    type='number'*/}
            {/*    autoFocus*/}
            {/*/>*/}
            <TextareaAutosize
                name={'description'}
                aria-label="Description"
                placeholder="You can write here about Book"
                style={{width: '100%', height: 100}}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="file"
                label=" "
                name="file"
                autoComplete="file"
                type='file'
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Save
            </Button>
        </Box>
    )
}


export default connect(({book: {file_path}}) => ({file_path}), {create, upload})(FormWriter)