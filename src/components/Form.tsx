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
  RadioGroup,
  Divider
} from '@mui/material';

// icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';

interface FormDataProp {
  name: string,
  errors: boolean,
  questions: QuestionProp[]
}
interface ChoicesProp {
  choiceId: number,
  checked: boolean,
  description: string
  errors: boolean
}
interface QuestionProp {
  questionId: number,
  title: string,
  choices: ChoicesProp[],
  errors: boolean
}

export default function Form() {
  const [formData, setFormData] = useState<FormDataProp>(
    {
      name: "",
      errors: false,
      questions: [
        {
          questionId: Math.random(),
          title: "",
          errors: false,
          choices: [
            {
              choiceId: Math.random(),
              checked: false,
              description: "",
              errors: false,
            },
            {
              choiceId: Math.random(),
              checked: false,
              description: "",
              errors: false,
            },
          ]
        }
      ]
    }
  )

  // const [nameError, setNameError] = useState(false)
  // const [titleError, setTitleError] = useState(false)
  // const [descriptionError, setDescriptionError] = useState(false)

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
          questionId: Math.random(),
          title: "",
          errors: false,
          choices: [{
            checked: false,
            choiceId: Math.random(),
            description: "",
            errors: false,
          },
          {
            checked: false,
            choiceId: Math.random(),
            description: "",
            errors: false,
          }]
        }
      ]
    }))
  };

  const handleDeleteQuestion = (questionId: number) => {
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
                  choiceId: Math.random(),
                  description: "",
                  errors: false,
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
                  ...choice, checked: true,
                } : { ...choice, checked: false }
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

  const handleCopyQuestion = (questionId: number) => {
    const copiedQuestion = {
      ...formData.questions.find((question) => question.questionId === questionId)
    };

    copiedQuestion.questionId = Math.random()
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions,
        copiedQuestion
      ]
    }))
  }

  const handleResetForm = () => {
    setFormData({
      name: "",
      errors: false,
      questions: [
        {
          questionId: Math.random(),
          title: "",
          errors: false,
          choices: [
            {
              choiceId: Math.random(),
              checked: false,
              description: "",
              errors: false,
            },
            {
              choiceId: Math.random(),
              checked: false,
              description: "",
              errors: false,
            },
          ]
        }
      ]
    })
  }

  const validateForm = () => {
    const formIsValid = false;
    // if (formData.name.trim() === "") {
    //   setFormData(true)
    // } else {
    //   setFormData(false)
    // }

    // question.choices.map((choice, index) => {
    //   if (choice.description.trim() === "") {
    //     setFormData(true)
    //   } else {
    //     setFormData(false)
    //   }
    // })

    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) =>
        question.title.trim() === ""
          ? {
            ...question,
            choices: question.choices.map((choice) =>
              choice.description.trim() === ""
                ? {
                  ...choice, errors: true,
                } : { ...choice, errors: false }
            )
          } : question
      )
    }))
}

const handleSubmit = (e: any) => {
  e.preventDefault()
  validateForm()
  console.log('formData: ', formData)
}

return (
  <Box>
    <form onSubmit={handleSubmit}>
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
            sx={{
              borderColor: "#FF5C00",
              color: "#FF5C00",
              '&:hover': {
                borderColor: "#FF5C00",
              },
            }}
            variant="outlined"
            onClick={handleResetForm}
          >
            CANCEL
          </Button>
          <Button
            sx={{
              backgroundColor: "#FF5C00",
              color: "#fff",
              ml: 1,
              width: 180,
              border: "none",
              '&:hover': {
                borderColor: "#FF5C10",
                color: "#fff",
                backgroundColor: "#db4d00",
              },
            }}
            type='submit'
          >
            SAVE
          </Button>
        </Toolbar>
      </AppBar>

      <Card sx={{ m: 3 }}>
        <CardContent>
          <Box>
            <Typography component={"h6"} sx={{
              fontWeight: "400",
              fontSize: "20px",
              mb: 2
            }}>
              Questionnaire Detail
            </Typography>
            <TextField
              label="Name*"
              fullWidth
              InputProps={{ sx: { borderRadius: 2 } }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formData.errors ? true : false}
            />
          </Box>
          {formData.errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""}
          {/* {errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""} */}
        </CardContent>

        {formData.questions.map((question, index) => (
          <CardContent
            sx={{
              borderTop: "1px solid #c2c2c2",
            }}
            key={question.questionId}
          >
            <Typography component={"h6"} sx={{
              fontWeight: "400",
              fontSize: "20px",
              pb: 2
            }}>
              Question {index + 1}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Question*"
                fullWidth
                name='question'
                value={question.title}
                InputProps={{ sx: { borderRadius: 2 } }}
                onChange={(e) => handleQuestionChange(question.questionId, e.target.value)}
                error={question.errors ? true : false}
              />
              {question.errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""}
              {/* {question.title === "" ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""} */}
              {/* {errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""} */}
            </Box>

            <RadioGroup>
              {question.choices.map((choice) => (
                <Box
                  key={choice.choiceId}
                  sx={{
                    display: "flex",
                  }}
                >

                  <Radio
                    sx={{
                      color: "#00040C"
                    }}
                    name={question.title}
                    checked={choice.checked}
                    value={choice.checked}
                    onChange={() => handleCheckedChange(question.questionId, choice.choiceId)}
                  />

                  <Box
                    sx={{
                      width: "100%",
                      my: 1
                    }}
                  >
                    <TextField
                      label="Description*"
                      fullWidth
                      name='description'
                      value={choice.description}
                      InputProps={{ sx: { borderRadius: 2 } }}
                      onChange={(e) => handleDescriptionChange(question.questionId, choice.choiceId, e.target.value)}
                      error={choice.errors ? true : false}
                    />
                    {choice.checked
                      ? <Typography sx={{
                        fontSize: "12px"
                      }}>
                        This answer is correct
                      </Typography>
                      : ""
                    }
                    {choice.errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""}
                    {/* {errors ? <Typography sx={{ color: 'error.main', fontSize: 12 }}>Please fill in this option</Typography> : ""} */}
                  </Box>

                  <Button
                    sx={{
                      color: "#00040C",
                      p: 0
                    }}
                    onClick={() => handleDeleteChoice(question.questionId, choice.choiceId)}
                  >
                    <DeleteOutlineIcon />
                  </Button>

                </Box>
              ))}
            </RadioGroup>
            <Button
              sx={{
                p: 0,
                fontSize: 14,
                color: "#FF5C00",
                my: 2
              }}
              onClick={() => handleAddChoice(question.questionId)}
            >
              <AddIcon />
              <Typography sx={{
                ml: 1
              }}>
                ADD CHOICE
              </Typography>

            </Button>

            <Divider sx={{ backgroundColor: "#C2C9D1" }} />

            <Box
              sx={{
                mt: 2
              }}
            >
              <Button sx={{
                color: "#00040C",
                p: 0
              }}
                onClick={() => handleCopyQuestion(question.questionId)}
              >
                <ContentCopyIcon />
                <Typography sx={{
                  ml: 1
                }}>
                  DUPLICATE
                </Typography>

              </Button>
              <Button sx={{
                color: "#00040C",
                p: 0,
                ml: 2
              }}
                onClick={() => handleDeleteQuestion(question.questionId)}
              >
                <DeleteOutlineIcon />
                <Typography sx={{
                  ml: 1
                }}>
                  DELETE
                </Typography>

              </Button>
            </Box>
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
              borderRadius: 2,
              borderColor: "#FF5C00",
              color: "#FF5C00",
              '&:hover': {
                borderColor: "#FF5C00",
              },
            }}
            onClick={handleAddQuestion}
          >
            <AddIcon />
            <Typography sx={{
              pr: 2
            }}>
              ADD QUESTION
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </form>
  </Box >
)
}