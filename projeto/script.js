window.requestAnimationFrame(() => {
  fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL")
    .then((res) => res.json())
    .then((data) => {
      let dados = data;
      console.log(dados);

      var ctx = document.getElementById("myChart").getContext("2d");

      let valor1 = document.querySelector("#moedabase").innerText;
    //  let moedas = valor1.split("\n");
      let btnConverte = document.querySelector('button');

      btnConverte.addEventListener("click", ()=>{
          console.log("funciona");
          exibicaoMoeda();
      })
      

      function exibicaoMoeda() {
        const exibeMoeda = document.querySelector(".base");
        const exibeMoeda2 = document.querySelector(".convertida");
        exibeMoeda.innerHTML="";
        adicionaNomeValor(exibeMoeda);
        exibeMoeda2.innerHTML="";
        adicionaNomeValor(exibeMoeda2);

        function adicionaNomeValor(moedaNomeValor){
            let nomeMoeda = document.createElement("p");
            nomeMoeda.innerText = dados.USDBRL.code;
            let valorMoeda = document.createElement("p");
            valorMoeda.innerText = dados.USDBRL.ask;
            moedaNomeValor.append(nomeMoeda);
            moedaNomeValor.append(valorMoeda);

        } 
        
      };

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            dados.USDBRL.code + "- Dólar ",
            dados.EURBRL.code + " - Euro",
            dados.GBPBRL.code + " - Libra Esterlina",
          ],
          datasets: [
            {
              label: "Cotação das Moedas",
              data: [dados.USDBRL.ask, dados.EURBRL.ask, dados.GBPBRL.ask],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => console.log("ERROR"));
});
