const core = require('@actions/core')
const exec = require('@actions/exec')
const github = require('@actions/github')

const fs = require('fs')

const filePath = core.getInput('PATH')

function run() {
    core.notice(filePath)
    try {
        var configFile = fs.readFileSync(filePath)
        
        var parseData = JSON.parse(configFile)

        setOutput("buildRunStaticValidation", parseData.workflow.habilitarValidacaoEstatica)
        setOutput("buildCompile", parseData.workflow.habilitarConstrucao)
        setOutput("buildRunUnitTests", parseData.workflow.habilitarTestesUnidade)
        setOutput("buildRunIntegrationTests", parseData.workflow.habilitarTestesIntegracao)
        setOutput("buildRunSonar", parseData.workflow.habilitarSonar)
        setOutput("buildPackage", parseData.workflow.habilitarEmpacotamento)
        setOutput("buildDocker", parseData.workflow.habilitarEmpacotamentoDocker)
        setOutput("buildPublish", parseData.workflow.habilitarPublicacao)
        setOutput("buildDebug", parseData.workflow.habilitarDebug)
        setOutput("buildAutodeploy", parseData.workflow.autodeploy)

    } catch (err) {
        core.notice("falha ao ler arquivo de configuracao")
        core.setFailed(err)
    }
    
}

run()