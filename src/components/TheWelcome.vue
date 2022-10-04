<template>
  <div>
    <label for="">Expresion</label>
    <input  v-model="expression"
            class="input"
            type="text" 
            placeholder="X=a+b*c" />
  </div>

  <button class="btn-calculate" @click="calculate">Calcular</button>

  <br>
  <br>

  <div>
    <table
      class="table"
    >

    <thead>
      <th>registro</th>
      <th>op</th>
      <th>arg1</th>
      <th>arg2</th>
    </thead>

    <tbody>
      <tr 
          v-for="(resul, index) in finalResults"
          class="table table-dark table-striped"
          >
        <td>{{ index + 1 }}</td>
        <td>{{ resul[0] }}</td>
        <td>{{ resul[1] }}</td>
        <td>{{ resul[2] }}</td>
      </tr>
    </tbody>

    </table>
  </div>
</template>

<script setup>
    import { ref } from "vue"

    import { countParentheses, getIndexParentheses }  from '../helpers/getParentheses'
    import { resolveExpression, countParentheses2 } from "../helpers/expresion";

    /** Reactive variables */

    // const expression = ref("x=((a*b/c)-c)-(e*f)")
    // const expression = ref("x=a/b-c*d")
    // const expression = ref("m+(n*p-q)/(s+t)")
    const expression = ref("s+(t-r/w)*z")
    // const expression = ref("a=b*c+d-e/f+h*g")
    // const expression = ref("a=b*((c+d-e)/f+h)*g")

    /**Common variables */
    let registro = 0
    const operadores = ["^", "*", "/", "+", "-", "="]
    let valueBeforeEqual = ''
    let finalResults = []
    let originalExpresion = ''

    const removeBeforeEqual = () => {

        originalExpresion = expression.value
        const indexEqual = expression.value.indexOf('=')
        
        if(  indexEqual != -1 ){
            valueBeforeEqual = expression.value.substring(0, indexEqual )
            expression.value = expression.value.substring( indexEqual + 1 )
       
        }

        // containsParentheses()
    }

    const containsParentheses = () => {
      console.log( expression.value );
      if( !expression.value.includes('(') && !expression.value.includes(')') ) return [ [], registro ]

      //obtengo la cantidad de parentesis de la expresion
      const parenthesesLength = countParentheses( expression.value )

      //obtengo los indices de la mitad de los parentesis, si es impar la cantidad de parentesis se le resta 1
      const indexParentheses =  getIndexParentheses( expression.value, parenthesesLength )

      //obtentner la expresion dentro de parentesis anidados

      let subExpresionP = expression.value.substring( indexParentheses[0], indexParentheses[1]+1 )


      const [ results, counter ] = resolveExpression(subExpresionP.substring(1, subExpresionP.length - 1).replace('(',""), operadores, registro, finalResults)


      const [ aux1, aux2 ] = countParentheses2(subExpresionP)

      if( aux1 > 1 ) subExpresionP = subExpresionP.replace('(','')
      if( aux2 > 1 ) subExpresionP = subExpresionP.replace(')','')
      
      expression.value = expression.value.replace(subExpresionP, `[${counter}]`)
      console.log( subExpresionP )
      console.log(expression.value);

      finalResults = results
      registro = counter
      
      containsParentheses();

      
      return [ results, counter ]
    }

    const calculate = () => {


      removeBeforeEqual()

      const [ results, counter ] = containsParentheses()
      console.log('-----------------SALIO DE RECURSIVIDAD');
      finalResults = results.length === 0 ? finalResults: results
      // registro = results.length === 0 ?  0 : counter

      console.log('registro ' + registro);
      
          
    const [ resultsPrev, counterPrev ] = resolveExpression( expression.value, operadores, registro, finalResults )


    console.log('Resultados finales');

    if( valueBeforeEqual.length > 0 ){
      resultsPrev.push( [ '=', valueBeforeEqual, `[${counterPrev}]` ] )
    }

    console.table( resultsPrev )
    console.log(counterPrev);


    expression.value = originalExpresion
    finalResults = resultsPrev
      
    }


</script>

<style scoped>

  @import '../assets/bootstrap.min.css';
  .input {
    width: 25vw;
    min-width: 25vw;
    height: 4vh;
    border-radius: 8px;
    font-size: 1.5rem;
    margin: 10px;
    text-align: center;
  }

  .btn-calculate {
    width: 100px;
    height: 40px;
    background-color: hsla(160, 100%, 37%, 1);
    border-radius: 16px;
    border: 0;
    color: #FFF;
    font-size: 16px;
  }


  label {
    font-size: 1.5rem;
  }
</style>
