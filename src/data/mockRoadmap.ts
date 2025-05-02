
import { Skill } from "../context/LearningContext";

export const fetchRoadmap = async (): Promise<Skill[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // This would be fetched from an API in a real app
  const mockRoadmap: Skill[] = [
    {
      id: "js-123",
      name: "JavaScript",
      description: "Master JavaScript programming language",
      level: "beginner",
      progress: 0,
      marketingStat: "73% of web developers use JavaScript daily",
      stages: [
        {
          id: "js-stage-1",
          number: 1,
          title: "JavaScript Basics",
          description: "Learn the fundamentals of JavaScript",
          isLocked: false,
          isCompleted: false,
          quizPassed: false,
          progress: 0,
          lessons: [
            {
              id: "js-lesson-1",
              title: "JavaScript Variables",
              type: "video",
              language: "English",
              content: "https://www.youtube.com/embed/PkZNo7MFNFg",
              completed: false,
            },
            {
              id: "js-lesson-2",
              title: "Variables en JavaScript",
              type: "video",
              language: "Spanish",
              content: "https://www.youtube.com/embed/sYqn4lhcMZE",
              completed: false,
            },
            {
              id: "js-lesson-3",
              title: "Data Types in JavaScript",
              type: "article",
              language: "English",
              content: "JavaScript has several data types: String, Number, Boolean, Object, undefined, etc. Strings are used for text content, while Numbers handle numerical values. Booleans are either true or false. Objects are collections of key-value pairs.",
              completed: false,
            }
          ],
          quiz: {
            id: "js-quiz-1",
            questions: [
              {
                id: "js-q1",
                question: "Which keyword is used to declare variables in modern JavaScript?",
                options: ["var", "let", "const", "All of the above"],
                correctOptionIndex: 3,
              },
              {
                id: "js-q2",
                question: "What is the output of: console.log(typeof([]));",
                options: ["array", "object", "undefined", "null"],
                correctOptionIndex: 1,
              },
              {
                id: "js-q3",
                question: "How do you create a function in JavaScript?",
                options: [
                  "function = myFunction()",
                  "function:myFunction()",
                  "function myFunction()",
                  "myFunction = function()"
                ],
                correctOptionIndex: 2,
              }
            ]
          }
        },
        {
          id: "js-stage-2",
          number: 2,
          title: "Functions & Scope",
          description: "Understanding functions and variable scope",
          isLocked: true,
          isCompleted: false,
          quizPassed: false,
          progress: 0,
          lessons: [
            {
              id: "js-lesson-4",
              title: "JavaScript Functions",
              type: "video",
              language: "English",
              content: "https://www.youtube.com/embed/xUI5Tsl2JpY",
              completed: false,
            },
            {
              id: "js-lesson-5",
              title: "Function Scope",
              type: "article",
              language: "English",
              content: "JavaScript has function scope. Variables defined inside a function are not accessible from outside the function. Functions defined in the global scope can be accessed from anywhere in your code.",
              completed: false,
            }
          ],
          quiz: {
            id: "js-quiz-2",
            questions: [
              {
                id: "js-q4",
                question: "What is the scope of a variable declared with 'var' inside a function?",
                options: ["Global scope", "Function scope", "Block scope", "Module scope"],
                correctOptionIndex: 1,
              },
              {
                id: "js-q5",
                question: "What is hoisting in JavaScript?",
                options: [
                  "Moving all variable declarations to the top",
                  "Moving all function declarations to the bottom",
                  "Removing unused variables",
                  "Organizing code in alphabetical order"
                ],
                correctOptionIndex: 0,
              },
            ]
          }
        }
      ]
    },
    {
      id: "react-456",
      name: "React",
      description: "Learn React framework for building user interfaces",
      level: "beginner",
      progress: 0,
      marketingStat: "React is used by over 11 million developers worldwide",
      stages: [
        {
          id: "react-stage-1",
          number: 1,
          title: "React Fundamentals",
          description: "Learn the basics of React",
          isLocked: false,
          isCompleted: false,
          quizPassed: false,
          progress: 0,
          lessons: [
            {
              id: "react-lesson-1",
              title: "Introduction to React",
              type: "video",
              language: "English",
              content: "https://www.youtube.com/embed/Tn6-PIqc4UM",
              completed: false,
            },
            {
              id: "react-lesson-2",
              title: "React का परिचय",
              type: "video",
              language: "Hindi",
              content: "https://www.youtube.com/embed/RGKi6LSPDLU",
              completed: false,
            },
            {
              id: "react-lesson-3",
              title: "Components and Props",
              type: "article",
              language: "English",
              content: "React components are like JavaScript functions that accept inputs (props) and return React elements. Props are read-only and allow you to pass data from parent to child components.",
              completed: false,
            }
          ],
          quiz: {
            id: "react-quiz-1",
            questions: [
              {
                id: "react-q1",
                question: "What is JSX in React?",
                options: [
                  "A JavaScript library",
                  "A syntax extension for JavaScript",
                  "A React component",
                  "A testing framework"
                ],
                correctOptionIndex: 1,
              },
              {
                id: "react-q2",
                question: "How do you create a React component?",
                options: [
                  "By creating a new JavaScript file",
                  "By creating a function that returns React elements",
                  "By importing React in your file",
                  "By using JSX"
                ],
                correctOptionIndex: 1,
              }
            ]
          }
        }
      ]
    },
    {
      id: "python-789",
      name: "Python",
      description: "Master Python programming language",
      level: "beginner",
      progress: 0,
      marketingStat: "Python is the fastest-growing programming language in 2023",
      stages: [
        {
          id: "python-stage-1",
          number: 1,
          title: "Python Basics",
          description: "Learn the fundamentals of Python",
          isLocked: false,
          isCompleted: false,
          quizPassed: false,
          progress: 0,
          lessons: [
            {
              id: "python-lesson-1",
              title: "Introduction to Python",
              type: "video",
              language: "English",
              content: "https://www.youtube.com/embed/_uQrJ0TkZlc",
              completed: false,
            },
            {
              id: "python-lesson-2",
              title: "Python Variables",
              type: "article",
              language: "English",
              content: "Python variables are containers for storing data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.",
              completed: false,
            },
            {
              id: "python-lesson-3",
              title: "Python కోసం పరిచయం",
              type: "video",
              language: "Telugu",
              content: "https://www.youtube.com/embed/Tto8TS-fJQU",
              completed: false,
            }
          ],
          quiz: {
            id: "python-quiz-1",
            questions: [
              {
                id: "python-q1",
                question: "Which of these is NOT a valid Python data type?",
                options: ["int", "float", "decimal", "complex"],
                correctOptionIndex: 2,
              },
              {
                id: "python-q2",
                question: "How do you create a comment in Python?",
                options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
                correctOptionIndex: 2,
              }
            ]
          }
        }
      ]
    }
  ];

  return mockRoadmap;
};

// List of available skills for selection
export const availableSkills = [
  { id: "js", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "python", name: "Python" },
  { id: "node", name: "Node.js" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "sql", name: "SQL" },
  { id: "git", name: "Git" },
  { id: "typescript", name: "TypeScript" },
];

// Languages supported by the application
export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
];
