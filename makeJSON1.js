const fs = require('fs')
const yargs = require('./node_modules/yargs')

// const input1 = process.argv[2]
// const input2 = process.argv[3]

const studentInformation = (input1, input2) => {
    const result = {
        name: input1,
        university: input2
    }

    const resultJSON = JSON.stringify(result)
    console.log(resultJSON)

    fs.writeFileSync('tonight.json', resultJSON)
}


yargs.command({
    command: 'add',
    describe: 'input data',
    builder: {
        name: {
            title: 'your name',
            type: 'string',
            demandOption: true
        },

        course: {
            title: 'what do you study',
            type: 'string',
            demandOption: true
        }
    },

    handler: function (argv) {
        console.log(`get the infromation about ${argv.name}, ${argv.course}`)
        studentInformation(argv.name, argv.course)
    }
})

yargs.command({
    command: 'read',
    describe: 'provide the file of your JSON',
    builder: {
        myfile: {
            title: 'your file name',
            type: 'string',
            demandOption: true
        }
    },
    handler: function (argv) {
        const bufferread = fs.readFileSync(`${argv.myfile}`)
        const parsetoJson = JSON.parse(bufferread)
        const stringTheJson = JSON.stringify(parsetoJson)
        console.log(`get the infromation about : ${argv.myfile}`)
        console.log(stringTheJson)
    }
})

yargs.command({
    command: "update",
    describe: "the only to describe",
    builder: {
        filename: {
            title: "read the file name",
            type: "string",
            demandOption: true
        },
        name: {
            title: "write over data",
            type: "string",
            demandOption: true
        },
        course: {
            title: "change the course",
            type: "string",
            demandOption: true
        }
    },

    handler: function (argv) {
        const readtheFile = fs.readFileSync(argv.filename)
        const changeToJson = JSON.parse(readtheFile)

        changeToJson.name = argv.name
        changeToJson.course = argv.course

        const JSONStringify = JSON.stringify(changeToJson)
        console.log("change to : " + JSONStringify)

        console.log("processing.... to write the new updates")

        fs.writeFileSync(argv.filename, JSONStringify)
        console.log("done..")
    }
})

yargs.parse()
