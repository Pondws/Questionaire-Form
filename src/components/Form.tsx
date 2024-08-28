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
  Card,
  RadioGroup,
  Divider
} from '@mui/material';

// icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormDataProp {
  name: string,
  error: boolean,
  questions: QuestionProp[]
}
interface ChoicesProp {
  checked: boolean,
  description: string
  error: boolean
}
interface QuestionProp {
  title: string,
  choices: ChoicesProp[],
  error: boolean
}

export default function Form() {
  const [formData, setFormData] = useState<FormDataProp>(
    {
      name: "",
      error: false,
      questions: [
        {
          title: "",
          error: false,
          choices: [
            {
              checked: true,
              description: "",
              error: false,
            },
            {
              checked: false,
              description: "",
              error: false,
            },
          ]
        }
      ]
    }
  )

  const defaultChoices = [
    {
      checked: true,
      description: "",
      error: false
    },
    {
      checked: false,
      description: "",
      error: false
    },
  ]

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleAddQuestion = () => {
    const prevData = [...formData.questions]
    prevData.push({
      title: "",
      error: false,
      choices: defaultChoices
    })

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        questions: prevData
      }
    })
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    const updatedQuestion = [...formData.questions]
    updatedQuestion.splice(questionIndex, 1)

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        questions: updatedQuestion
      }
    })
  };

  const handleAddChoice = (questionIndex: number) => {
    const prevQuestion = [...formData.questions]
    const prevChoice = prevQuestion[questionIndex].choices
    prevChoice.push({
      checked: false,
      description: "",
      error: false,
    })

    setFormData(prevFormData => {
      return {
        ...prevFormData,
      }
    })
  }

  const handleDeleteChoice = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestion = [...formData.questions]
    updatedQuestion[questionIndex].choices.splice(choiceIndex, 1)

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        questions: updatedQuestion
      }
    })
  }

  const handleTitleChange = (questionIndex: number, value: any) => {
    const prevQuestion = [...formData.questions]
    prevQuestion[questionIndex].title = value

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
      }
    })
  }

  const handleCheckedChange = (questionIndex: number, choiceIndex: number,) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question, index) =>
        index === questionIndex
          ? {
            ...question,
            choices: question.choices.map((choice, index) =>
              index === choiceIndex
                ? {
                  ...choice, checked: true,
                } : { ...choice, checked: false }
            )
          } : question
      )
    }))
  }

  const handleDescriptionChange = (questionIndex: number, choiceIndex: number, value: any) => {
    const prevQuestion = [...formData.questions]
    prevQuestion[questionIndex].choices[choiceIndex].description = value

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
      }
    })
  }

  const handleCopyQuestion = (questionIndex: number) => {
    const copyQuestion = JSON.parse(JSON.stringify({...formData.questions[questionIndex]}));

    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions,
        copyQuestion
      ]
    }))
  }

  const handleResetForm = () => {
    setFormData({
      name: "",
      error: false,
      questions: [
        {
          title: "",
          error: false,
          choices: defaultChoices
        }
      ]
    })
  }

  const validateForm = () => {
    setFormData((prevFormData) => {
      const nameEmpty = formData.name.trim() === ""
      const updatedQuestions = formData.questions.map((question) => {
        const questionTitleEmpty = question.title.trim() === "";

        const updatedChoices = question.choices.map((choice) => {
          const choiceDescriptionEmpty = choice.description.trim() === "";

          return {
            ...choice,
            errors: choiceDescriptionEmpty
          };
        });

        return {
          ...question,
          errors: questionTitleEmpty,
          choices: updatedChoices
        };
      });
      return {
        ...prevFormData,
        errors: nameEmpty,
        questions: updatedQuestions
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    validateForm()
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
                error={formData.error ? true : false}
                helperText={formData.error
                  ? "Please fill in this option"
                  : ""
                }
              />
            </Box>
          </CardContent>

          {formData.questions.map((question, questionIndex) => (
            <CardContent
              sx={{
                borderTop: "1px solid #c2c2c2",
              }}
              key={questionIndex}
            >
              <Typography component={"h6"} sx={{
                fontWeight: "400",
                fontSize: "20px",
                pb: 2
              }}>
                Question {questionIndex + 1}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Question*"
                  fullWidth
                  name='question'
                  value={question.title}
                  InputProps={{ sx: { borderRadius: 2 } }}
                  onChange={(e) => handleTitleChange(questionIndex, e.target.value)}
                  error={question.error ? true : false}
                  helperText={question.error
                    ? "Please fill in this option"
                    : ""
                  }
                />
              </Box>

              <RadioGroup>

                {question.choices.map((choice, choiceIndex) => (
                  <Box
                    sx={{
                      display: "flex",
                    }}
                    key={choiceIndex}
                  >

                    <Radio
                      sx={{
                        color: "#00040C",
                        "&:hover": {
                          backgroundColor: 'transparent'
                        },
                        pl: 0,
                        width: 50,
                      }}
                      name={question.title}
                      checked={choice.checked}
                      value={choice.checked}
                      onChange={() => handleCheckedChange(questionIndex, choiceIndex)}
                      checkedIcon={<CheckCircleIcon style={{ fontSize: 24, color: '#00C62B' }} />}
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
                        onChange={(e) => handleDescriptionChange(questionIndex, choiceIndex, e.target.value)}
                        error={choice.error ? true : false}
                        helperText={choice.error
                          ? "Please fill in this option"
                          : ""
                        }
                      />
                      {choice.checked
                        ? <Typography sx={{
                          fontSize: "12px"
                        }}>
                          This answer is correct
                        </Typography>
                        : ""
                      }
                    </Box>

                    <Box
                      sx={{
                        color: "#00040C",
                        pr: 0,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: 50,
                      }}
                      onClick={() => handleDeleteChoice(questionIndex, choiceIndex)}
                    >
                      <DeleteOutlineIcon />
                    </Box>

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
                onClick={() => handleAddChoice(questionIndex)}
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
                  onClick={() => handleCopyQuestion(questionIndex)}
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
                  onClick={() => handleDeleteQuestion(questionIndex)}
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