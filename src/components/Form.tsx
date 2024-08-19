import React, { useState, ChangeEvent } from 'react'
import {
    Box,
    Button,
    CardActions,
    TextField,
    Checkbox,
    AppBar,
    Toolbar,
    CardContent,
    Typography,
    Card
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Form() {
    const [form, setForm] = useState<any>([
        {
            // id: "",
            name: "",
            questions: [
                {
                    // questionId: '',
                    title: "",
                    choice: [
                        {
                            // choiceId: "",
                            checked: false,
                            description: ""
                        },
                    ]
                }
            ]
        }
    ])

    // const [question, setQuestion] = useState<any>([])

    // const addData = () => {
    //     const data = {
    //         name: "",
    //         question: [
    //             {
    //                 title: "",
    //                 choice: [
    //                     {
    //                         checked: false,
    //                         description: ""
    //                     },
    //                 ]
    //             }
    //         ]
    //     }
    //     setQuestion((prevQuestion) => [...prevQuestion, data]);
    // }

    const handleSubmit = () => {
        console.log(form)
    }

    return (
        <Box>
            <AppBar position="static"
                sx={{
                    boxShadow: "none",

                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #c2c2c2",
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button variant="outlined">CANCEL</Button>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "#FF5C00",
                            ml: 1,
                            width: 180,
                            border: "none"
                        }}
                        onClick={handleSubmit}
                        type='submit'
                    >
                        SAVE
                    </Button>
                </Toolbar>
            </AppBar>

            <Card sx={{ m: 3 }}>
                <CardContent
                    sx={{
                        borderBottom: "1px solid #c2c2c2",
                    }}
                >
                    <Typography>Questionnaire Detail</Typography>
                    <TextField
                        label="Name*"
                        variant="outlined"
                        fullWidth
                        sx={{
                            my: 2
                        }}
                        name='name'
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </CardContent>

                <CardContent
                    sx={{
                        borderBottom: "1px solid #c2c2c2",
                    }}
                >
                    <Typography>Question 1</Typography>
                    <TextField
                        label="Question*"
                        variant="outlined"
                        fullWidth
                        onChange={e => setForm({
                            ...form,
                            questions: [
                                { title: e.target.value }
                            ]
                        })}
                    />


                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Checkbox />

                        <Box
                            sx={{
                                width: "100%"
                            }}
                        >
                            <TextField
                                label="Description*"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    my: 2
                                }}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        questions: [
                                            {
                                                choice: [
                                                    {
                                                        description: e.target.value
                                                    }
                                                ]
                                            }
                                        ]
                                    })
                                }
                            />
                        </Box>

                        <Button>
                            <DeleteOutlineIcon />
                        </Button>
                    </Box>


                    <Button
                        sx={{
                            color: "#FF5C00"
                        }}
                    >
                        + ADD CHOICE
                    </Button>

                    <hr />

                    <Button>
                        <ContentCopyIcon />
                        DUPLICATE
                    </Button>
                    <Button>
                        <DeleteOutlineIcon />
                        DELETE
                    </Button>
                </CardContent>

                <CardActions
                    sx={{
                        p: 3,
                    }}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                            height: 48,
                            borderRadius: 2
                        }}
                    >
                        + ADD QUESTION
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
