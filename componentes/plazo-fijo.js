app.component('plazo-fijo', {
    template:
    /*html*/
    `
        <h1>Simulador de Plazo Fijo</h1>
        <p> Ingrese el Nombre: <input type="text" id="Nombre" v-model="nombre"></p><br>
        <p> Ingrese el Apellido: <input type="text" id="Apellido" v-model="apellido"></p><br>
        <p> Ingrese el Monto: <input type="number" id="Monto" v-model="monto"></p><br>
        <p> Ingrese el Dias: <input type="number" id="Dias" v-model="dias" ></p><br>
        <br><button id="btn-calcular" v-on:click="Calcular">{{ textoBotonCalcular }}</button>
        <br><button id="btn-calcular" v-show="btnReinventir" v-on:click="ReinvertirCapital">{{ textoReinvertirCapital }}</button><br>
        <p id="mensajeError">{{ mensajeError }}</p>
        <p id="capital-invertido" v-show="textoCapitalInvertido">{{ textoResultadoDelCapitalInvertido }} {{ resultadoDelCapitalInvertido }}</p><br>
        
        <table v-show="tablaReinvertir">
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
            </tr>
        </table>
    `,
    data(){
        return{
            textoCapitalInvertido: false,
            mensajeError: "",
            nombre: "",
            apellido: "",
            monto: 0,
            montoInicial: 0,
            dias: 0,
            textoBotonCalcular: "Calcular",
            textoReinvertirCapital: "Reinvertir Capital",
            textoResultadoDelCapitalInvertido: "El resultado de lo invertido es: ",
            btnReinventir: false,
            resultadoDelCapitalInvertido: 0,
            tablaReinvertir: false,
            tableData: [
            ]
        }
    },
    methods:{
        Calcular(){
            let porcentaje, dias1 = parseFloat(this.dias), montoI = parseFloat(this.monto) 
            if(this.nombre != ""){
                if(this.apellido != ""){
                    if(this.monto >= 1000){
                        if(this.dias > 29){
                            if(this.dias >= 30 && this.dias <= 60){
                                porcentaje = 40
                            }
                            else if(this.dias >= 61 && this.dias <= 120){
                                porcentaje = 45
                            }
                            else if(this.dias >= 121 && this.dias <= 360){
                                porcentaje = 50
                            }
                            else{
                                porcentaje = 65
                            }
                            this.resultadoDelCapitalInvertido = parseFloat(montoI + (montoI * (dias1/360) * (porcentaje/100))),
                            this.montoInicial = montoI,
                            this.btnReinventir = true,
                            this.textoCapitalInvertido = true,
                            this.mensajeError = ""
                        }
                        else{
                            this.mensajeError = "Debe ingresar el dia correspondiente!(superior a 30)"
                        }
                    }
                    else{
                        this.mensajeError = "Debe ingresar el monto correspondiente!(superior a 1000)"
                    }
                }
                else{
                    this.mensajeError = "Debe ingresar el apellido!"
                }
            }
            else{
                this.mensajeError = "Debe ingresar el nombre!"
            }
        },
        ReinvertirCapital(){
            let ganancia = (this.resultadoDelCapitalInvertido - this.montoInicial)
            this.tableData = [
                ["Periodo", "Monto Inicial", "Monto Final"],
                ["1", parseFloat(this.montoInicial), parseFloat(this.resultadoDelCapitalInvertido) ],
                ["2", parseFloat(this.resultadoDelCapitalInvertido), (parseFloat(this.resultadoDelCapitalInvertido) + parseFloat(ganancia))],
                ["3", (parseFloat(this.resultadoDelCapitalInvertido) + parseFloat(ganancia)), (parseFloat(this.resultadoDelCapitalInvertido) + (parseFloat(ganancia) * 2))],
                ["4", (parseFloat(this.resultadoDelCapitalInvertido) + (parseFloat(ganancia) * 2)), (parseFloat(this.resultadoDelCapitalInvertido) + (parseFloat(ganancia) * 3))]      
            ]
            this.tablaReinvertir = true
        }
    },
})

