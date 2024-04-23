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

        core.setOutput("buildRunStaticValidation", parseData.workflow.habilitarValidacaoEstatica)
        core.setOutput("buildCompile", parseData.workflow.habilitarConstrucao)
        core.setOutput("buildRunUnitTests", parseData.workflow.habilitarTestesUnidade)
        core.setOutput("buildRunIntegrationTests", parseData.workflow.habilitarTestesIntegracao)
        core.setOutput("buildRunSonar", parseData.workflow.habilitarSonar)
        core.setOutput("buildPackage", parseData.workflow.habilitarEmpacotamento)
        core.setOutput("buildDocker", parseData.workflow.habilitarEmpacotamentoDocker)
        core.setOutput("buildPublish", parseData.workflow.habilitarPublicacao)
        core.setOutput("buildDebug", parseData.workflow.habilitarDebug)
        core.setOutput("buildAutodeploy", parseData.workflow.autodeploy)

    } catch (err) {
        core.notice("falha ao ler arquivo de configuracao")
        core.setFailed(err)
    }
    
}

run()