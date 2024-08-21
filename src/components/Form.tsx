import React, { useState } from 'react'
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
  Card,
  FormControl,
  FormControlLabel,
  RadioGroup
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
  const [formData, setFormData] = useState<FormDataProp>(
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

  const [nameError, setNameError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setdDescriptionError] = useState(false)

  const handleAddQuestion = () => {
    // setFormData((prev) => {
    //   const prevData = [...prev.questions]
    //   const questionId = prevData.at(-1)
    //   prevData.push({
    //     questionId: questionId.questionId + 1,
    //     title: "",
    //     choices: [
    //       {
    //         choiceId: 1,
    //         checked: false,
    //         description: "",
    //       },
    //     ]
    //   })
    //   return {
    //     ...prev,
    //     questions: prevData
    //   }
    // })
    setFormData(prevFormData => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions,
        {
          questionId: prevFormData.questions.length + 1,
          title: "",
          choices: [{
            checked: false,
            choiceId: 1,
            description: ""
          },
          {
            checked: false,
            choiceId: 2,
            description: ""
          }]
        }
      ]
    }))
  };

  const handleDeleteQuesiton = (questionId: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions.filter((question) => question.questionId !== questionId)
      ]
    }))
  }

  const handleAddChoice = (questionId: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions.map((question) =>
          question.questionId === questionId
            ? {
              ...question,
              choices: [
                ...question.choices,
                {
                  checked: false,
                  choiceId: question.choices.length + 1,
                  description: ""
                }
              ]
            } : question
        )
      ]
    }))
  }

  const handleDeleteChoice = (questionId: number, choiceId: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions.map((question) =>
          question.questionId === questionId
            ? {
              ...question,
              choices: [
                ...question.choices.filter((choice) => choice.choiceId !== choiceId)
              ]
            } : question
        )
      ]
    }))
  }

  const handleQuestionChange = (questionId: number, e: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) =>
        question.questionId === questionId
          ? { ...question, title: e }
          : question
      )
    }))
  }

  const handleCheckedChange = (questionId: number, choiceId: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) =>
        question.questionId === questionId
          ? {
            ...question,
            choices: question.choices.map((choice) =>
              choice.choiceId === choiceId
                ? {
                  ...choice, checked: true
                } : choice
            )
          } : question
      )
    }))
  }

  const handleDescriptionChange = (questionId: number, choiceId: number, e: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) =>
        question.questionId === questionId
          ? {
            ...question,
            choices: question.choices.map((choice) =>
              choice.choiceId === choiceId
                ? {
                  ...choice, description: e
                } : choice
            )
          } : question
      )
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim() || "") {
      setNameError(true)
    } else {
      setNameError(false)
    }

    formData.questions.forEach((question) => {
      if (!question.title.trim() || "") {
        setTitleError(true)
      } else {
        setTitleError(false)
      }

      question.choices.forEach((choice) => {
        if (!choice.description.trim() || "") {
          setdDescriptionError(true)
        } else {
          setdDescriptionError(false)
        }
      })
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    validateForm()
    console.log(formData)
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
          <Button
            variant="outlined"
          >
            CANCEL
          </Button>
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={nameError ? true : false}
          />
          {nameError && <Typography sx={{ color: 'error.main' }}>Please fill in this option</Typography>}
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
              value={question.title}
              onChange={(e) => handleQuestionChange(question.questionId, e.target.value)}
              error={titleError ? true : false}
            />
            {titleError && <Typography sx={{ color: 'error.main' }}>Please fill in this option</Typography>}

            {question.choices.map((choice) => (
              <Box
                key={choice.choiceId}
                sx={{
                  display: "flex",
                }}
              >

                <RadioGroup>
                  <Radio
                    name={question.title}
                    onChange={() => handleCheckedChange(question.questionId, choice.choiceId)}
                  />
                </RadioGroup>

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
                    value={choice.description}
                    onChange={(e) => handleDescriptionChange(question.questionId, choice.choiceId, e.target.value)}
                    error={descriptionError ? true : false}
                  />
                  {/* <Typography>This answer is correct</Typography>*/}
                  {descriptionError && <Typography sx={{ color: 'error.main' }}>Please fill in this option</Typography>}
                </Box>

                <Button
                  onClick={() => handleDeleteChoice(question.questionId, choice.choiceId)}
                >
                  <DeleteOutlineIcon />
                </Button>

              </Box>
            ))}

            <Button
              onClick={() => handleAddChoice(question.questionId)}
            >
              + ADD CHOICE
            </Button>

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

    </Box >

  )
}