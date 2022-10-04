

export const countParentheses = ( expression ) => {
    let countOpen = 0
    let countClose = 0

    for (let i = 0; i < expression.length; i++) {
        if( expression[i] ===  '(' ) countOpen++;
        if( expression[i] ===  ')' ) countClose++;
        
    }

    console.log( [countClose] );
    if( countOpen === countClose )  return countClose

    return -1

}

export const getIndexParentheses = ( expression = '', count ) => {

    let countMin = ( count === 1)? count: count - 1
    let tempCount = 0
    let parenthesesOpen = -1
    let parenthesesClose = -1

    for (let i = 0; i < expression.length; i++) {
        
        if( expression[i] === '(' ) tempCount++;

        if( tempCount === countMin ){
            parenthesesOpen = i
            break
        }
        
    }

    

    for (let j = parenthesesOpen; j < expression.length; j++) {
        
        if( expression[j] == ')' ){
            parenthesesClose = j
            break
        }
    }

    console.log( [parenthesesOpen, parenthesesClose] );

    return [parenthesesOpen, parenthesesClose]

}