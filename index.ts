const R = require('remeda');

type Variable = {
  name: string
  patterns: string[]
}

let variables: Variable[] = []

export const variable = (name: string, patterns: string[]) => {
  variables.push({name, patterns})
}

export const promptest = async (
  template: string,
  input: string,
  runner: (subject: string, input: string) => string | Promise<string>
) => {
  let subjects: string[] = [template]
  addSubject(subjects, template, variables, 0, 0)
  subjects = R.uniq(subjects.filter((subject) => {
    const results = variables.map((variable) => {
      if (subject.includes(`{{${variable.name}}}`)) {
        return false
      }
    })
    return !results.includes(false)
  }))
  const runs: string[] = []

  await Promise.all(subjects.map(async (subject) => {
    const run = await runner(subject, input)
    runs.push(run)
  }))

  return {
    input,
    results: R.zip(subjects, runs).map(([subject, run]: string[]) => {
      return {
        subject: subject,
        output: run,
      }
    })
  }
}

const addSubject = (
  subjects: string[],
  template: string,
  variables: Variable[],
  variableIndex: number,
  patternIndex: number
) => {
  const subjectCopy = [...subjects]
  subjectCopy.forEach((subject) => {
    const result = subject.replace(
      `{{${variables[variableIndex].name}}}`,
      variables[variableIndex].patterns[patternIndex]
    )
    subjects.push(result)
  })
  if (patternIndex < variables[variableIndex].patterns.length - 1) {
    addSubject(subjects, template, variables, variableIndex, patternIndex + 1)
  } else if (variableIndex < variables.length - 1) {
    addSubject(subjects, template, variables, variableIndex + 1, 0)
  }
}