# PrompTest

![v](https://badgen.net/npm/v/promptest)
![license](https://badgen.net/github/license/moekidev/promptest)

The Prompt testing library for LLM that allows comparing patterns of prompts.

## Installation

    $ npm i --save-dev promptest

## Usage

```ts
const { Configuration, OpenAIApi } = require("openai")
const { variable, promptest } = require('promptest')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

variable("name", ["John", "Jane"])
variable("age", ["20", "30"])

promptest(
  "Your name is {{name}}, and you are {{age}} years old.",
  "Hello!",
  async (subject: string, input: string) => {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: subject },
        { role: "user", content: input },
      ],
    })
    return chatCompletion.data.choices[0].message.content
  }
).then(console.log).catch(console.error)
```

### Variable

```ts
variable("name", ["John", "Jane"])
```

`variable` is called with variable name and patterns.

### Template

The subject prompt template is defined with `{{name}}`.

```ts
promptest(
  "Your name is {{name}}, and you are {{age}} years old.",
  // ...
)
```

### Input

Input is ordinary user prompt for testing.

```ts
promptest(
  // ..
  "Hello!"
  // ..
)
```

### Callback

The callback is test function. The arguments are subject prompt and input prompt.

```ts
promptest(
  // ...
  async (subject: string, input: string) => {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: subject },
        { role: "user", content: input },
      ],
    })
    return chatCompletion.data.choices[0].message.content
  }
)
```

### Result

The result is JSON.

```json
{
  "input": "Hello!",
  "results": [
    {
      "subject": "Your name is John, and you are 20 years old",
      "output": "Hello! How can I assist you today?"
    },
    {
      "subject": "Your name is Jane, and you are 20 years old",
      "output": "Hello! How can I assist you today?"
    },
    {
      "subject": "Your name is John, and you are 30 years old",
      "output": "Hello! How can I help you today?"
    },
    {
      "subject": "Your name is Jane, and you are 30 years old",
      "output": "Hello! How can I assist you today?"
    },
  ]
}
```

## Development

After checking out the repo, run `npm i` to install dependencies. Then, run `npm run test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/moekidev/promptest. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/moekidev/promptest/blob/main/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Promptest project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/moekidev/promptest/blob/main/CODE_OF_CONDUCT.md).
