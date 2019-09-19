const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.soma = functions.database.ref('/movimentacoes/{date}')
    .onWrite(async(change, context) => {
        const monthsRef = admin.database().ref(`/meses/${context.params.date}`)
        const movementsRef = change.after.ref
        const movementsSS = await movementsRef.once('value')
        const movements = movementsSS.val()

        let entradas = 0
        let saidas = 0

        Object
            .keys(movements)
            .forEach( mov => {
                if (movements[mov].valor > 0) {
                    entradas = entradas + movements[mov].valor
                } else {
                    saidas = saidas - movements[mov].valor
                }
            })

        return monthsRef.transaction(current => {
            if (current === null) {
                return {
                    previsao_entrada: 0,
                    entradas,
                    previsao_saida: 0,
                    saidas
                }
            }
            return {
                ...current,
                entradas,
                saidas
            }
        })
    })