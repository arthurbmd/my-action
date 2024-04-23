const core = require('@actions/core')
const exec = require('@actions/exec')
const github = require('@actions/github')

const fs = require('fs')

const filePath = core.getInput('PATH')

function run() {
    core.notice(filePath)
    try {
        const configFile = fs.readFile(filePath)
        
        const parseData = JSON.parse(configFile)

        var configs = {
            "buildRunStaticValidation": parseData.workflow.habilitarValidacaoEstatica,
            "buildCompile": parseData.workflow.habilitarConstrucao,
            "buildRunUnitTests": parseData.workflow.habilitarTestesUnidade,
            "buildRunIntegrationTests": parseData.workflow.habilitarTestesIntegracao,
            "buildRunSonar": parseData.workflow.habilitarSonar,
            "buildPackage": parseData.workflow.habilitarEmpacotamento,
            "buildDocker": parseData.workflow.habilitarEmpacotamentoDocker,
            "buildPublish": parseData.workflow.habilitarPublicacao,
            "buildDebug": parseData.workflow.habilitarDebug,
            "buildAutodeploy": parseData.workflow.autodeploy
        }

    core.setOutput('configs', configs)

    } catch (err) {
        core.notice("falha ao ler arquivo de configuracao")
        core.setFailed(err)
    }
    
}

run()