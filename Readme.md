# Profanity

This script/program works with perspective API to show the profane words in sentences.
<a href='https://www.perspectiveapi.com/'>Link to perspective API</a>

## Getting started

```
Run "npm i" in the root directory

```

Obtain a google API key from google console
add it in .env file as GCP_API_KEY=YourKey
add DISCOVERY_URL=https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1
in .env file

## Dependencies

<a href='https://www.npmjs.com/package/chalk'>chalk</a>
<a href='https://www.npmjs.com/package/dotenv'>dotenv</a>
<a href='https://www.npmjs.com/package/googleapis'>googleapis</a>

## Assumptions

Here I am extracting the sentences from the txt file which exists inside the project structure.
I have 3 high profane words, 1 safe word and 2 suspicious words.
The file type may vary for which a the system has to detect the file type and detect the sentences accordingly, but in my case I am using txt file only.
The sentences needs to be seprated via some sort of special character and . is being used to achieve that.

PS:- I am not a bad guy, the profane sentences are just for test :)
