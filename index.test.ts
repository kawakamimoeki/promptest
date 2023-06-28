const { variable, promptest } = require('./index')

test("promptest", async () => {
  variable("name", ["John", "Jane"])
  variable("age", ["20", "30"])

  const runner = (subject: string, input: string) => {
    return `${subject} ${input}`
  }

  const results = await promptest("{{name}} is {{age}} years old", "Hello", runner)

  expect(results).toEqual({
    input: "Hello",
    results: [
      {
        subject: "John is 20 years old",
        output: "John is 20 years old Hello",
      },
      {
        subject: "Jane is 20 years old",
        output: "Jane is 20 years old Hello",
      },
      {
        subject: "John is 30 years old",
        output: "John is 30 years old Hello",
      },
      {
        subject: "Jane is 30 years old",
        output: "Jane is 30 years old Hello",
      },
    ],
  })
});