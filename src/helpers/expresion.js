
export const resolveExpression = ( subExpresion = '', operadores = [], contResul = 0, results = [] ) => {

    const jerarquias = []
    let indexOp = -1
    let operacion = ''
    let auxResult = []
    let operador  = ''

    jerarquias.push( subExpresion.includes('^') )
    jerarquias.push( subExpresion.includes('/') || subExpresion.includes('*') )
    jerarquias.push( subExpresion.includes('+') || subExpresion.includes('-') )

    if( indexOperador( subExpresion,  operadores )  === -1 ) return [results, contResul]

    
    contResul =  contResul + 1 
    
    if( jerarquias[0] ){
        indexOp = subExpresion.indexOf('^')
    }else if ( jerarquias[1] ){
        const indexAux1 =  subExpresion.indexOf('*')
        const indexAux2 =  subExpresion.indexOf('/')

        indexOp = indexAux1 === -1? 
                    indexAux2: indexAux2 === -1?
                        indexAux1: indexAux1 < indexAux2?
                            indexAux1: indexAux2

    }else if ( jerarquias[2] ){
        const indexAux1 =  subExpresion.indexOf('+')
        const indexAux2 =  subExpresion.indexOf('-')
        indexOp = indexAux1 === -1? 
                    indexAux2: indexAux2 === -1?
                        indexAux1: indexAux1 < indexAux2?
                            indexAux1: indexAux2

    }

    operador = subExpresion[indexOp]

    let nextIndexOp = indexOperador( subExpresion.substring( indexOp + 1 ), operadores )
    let befIndexOp  = indexOperadorBef( subExpresion.substring( 0 ,indexOp  ), operadores )

    if( nextIndexOp === -1 && befIndexOp  === -1 ){
        operacion = subExpresion

    }else if( nextIndexOp !== -1 && befIndexOp  === -1 ){
        nextIndexOp += indexOp
        operacion = subExpresion.substring(0, nextIndexOp)

    }else if ( befIndexOp  !== -1  && nextIndexOp === -1 ){

        operacion = subExpresion.substring( befIndexOp , subExpresion.length )
    }
    else{
        nextIndexOp += indexOp
        operacion = subExpresion.substring(befIndexOp   , nextIndexOp)
       
    }
   
    

    auxResult = operacion.split(operador)
    auxResult.unshift(operador)

    console.table( auxResult )
    results.push( auxResult )
    

    subExpresion = subExpresion.replace(operacion, `[${contResul}]`)
    
    const result = resolveExpression( subExpresion, operadores, contResul, results)


    

    return [ result[0], result[1] ]
    

}


export const indexOperador = ( expression = '', operadores ) => {

    // console.log('Expresion para siguiente op ' + expression);

    for (let i = 0; i < expression.length; i++) {
        for (let j = 0; j < operadores.length; j++) {
            if( expression[i]  === operadores[j] ){
                
                return i + 1
            }
            
        }
        
    }

    return -1

}

export const indexOperadorBef = ( expression, operadores ) => {

    for (let i = expression.length - 1; i >= 0; i--) {
        for (let j = 0; j < operadores.length; j++) {
            if( expression[i]  === operadores[j] ){
                return i + 1
            }
            
        }
        
    }

    return -1
}

export const countParentheses2 = ( expression ) => {
    let parOpen = 0
    let parClose = 0

    for (let i = 0; i < expression.length; i++) {
        if( expression[i]  === '(' ) parOpen++
        if( expression[i]  === ')' ) parClose++
        
    }

    return [ parOpen, parClose ]
}