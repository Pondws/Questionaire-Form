import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CardActions,
  TextField,
  Radio,
  AppBar,
  Toolbar,
  CardContent,
  Typography,
  Card
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface FormDataProp {
  name: string,
  questions: QuestionProp[]
}
interface ChoicesProp {
  choiceId: number,
  checked?: boolean,
  description: string
}
interface QuestionProp {
  questionId: number,
  title: string,
  choices: ChoicesProp[]
}

export default function Form() {
  const [formData, setFormData] = useState(
    {
      name: "",
      questions: [
        {
          questionId: 1,
          title: "",
          choices: [
            {
              choiceId: 1,
              checked: false,
              description: "",
            },
            {
              choiceId: 2,
              checked: false,
              description: "",
            },
          ]
        }
      ]
    }
  )

  // const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //     setFormData({
  //         name: e.target.value
  //     })
  // };

  const handleAddQuestion = () => {
    setFormData((prev) => {
      const prevData = [...prev.questions]
      const questionId = prevData.at(-1)
      prevData.push({
        questionId: questionId.questionId + 1,
        title: "",
        choices: [
          {
            choiceId: 1,
            checked: false,
            description: "",
          },
        ]
      })
      return {
        ...prev,
        questions: prevData
      }
    })
  };

  const handleDeleteQuesiton = (questionId: number) => {
    for (let i = 0; i < formData.questions.length; i++) {
      if (formData.questions[i].questionId === questionId) {
        formData.questions.splice(i, 1);
        break;
      }
    }
    setFormData({ ...formData });
  }

  // const handleAddChoice = (choiceId: number) => {
  //   setFormData(prevForm => )
  // }

  // const handleDeleteChoice = (choiceId: number) => {
  //   for (let i = 0; i < formData.questions.length; i++) {
  //     if (formData.questions[i].choices.choiceId === choiceId) {
  //       formData.questions.splice(i, 1);
  //       break;
  //     }
  //   }
  //   setFormData({ ...formData });
  // }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <Box>
      {/* <form onSubmit={handleSubmit}> */}
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
            type='submit'
            onClick={handleSubmit}
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

          />
        </CardContent>

        {formData.questions.map((question, index) => (
          <CardContent
            key={question.questionId}
          >
            <Typography>Question {index + 1}</Typography>
            <TextField
              label="Question*"
              variant="outlined"
              fullWidth
              name='question'
            />

            {question.choices.map((choice, index) => (
              <Box
                key={choice.choiceId}
                sx={{
                  display: "flex",
                }}
              >
                <Radio
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'A' }}
                />

                <Box
                  sx={{
                    width: "100%"
                  }}
                >
                  <TextField
                    label="Description*"
                    variant="outlined"
                    fullWidth
                    name='description'
                    sx={{
                      my: 2
                    }}
                  />
                </Box>

                <Button>
                  <DeleteOutlineIcon />
                </Button>


                <Button
                  onClick={() => handleAddChoice(question.questionId)}
                >
                  + ADD CHOICE
                </Button>
              </Box>
            ))}



            <hr />

            <Button>
              <ContentCopyIcon />
              DUPLICATE
            </Button>
            <Button
              onClick={() => handleDeleteQuesiton(question.questionId)}
            >
              <DeleteOutlineIcon />
              DELETE
            </Button>
          </CardContent>

        ))}

        <CardActions
          sx={{
            p: 3,
            borderTop: "1px solid #c2c2c2"
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: 48,
              borderRadius: 2
            }}
            onClick={handleAddQuestion}
          >
            + ADD QUESTION
          </Button>
        </CardActions>

      </Card>
      {/* </form> */}
    </Box >
  )
}