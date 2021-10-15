function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });

  chart.update();
}
function addDataLine(chart, label, data1, id1, data2, id2) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) =>{
  if(dataset.id==id1){
      dataset.data.push(data1)  
  }
  if(dataset.id==id2){
    dataset.data.push(data2)
  }
    })
  chart.update();
}

function removeData(chart) {
  while (chart.data.labels.length > 0) {
    chart.data.labels.pop();
  }
  chart.data.datasets.forEach((dataset) => {
    dataset.data.length = 0;
  });
  chart.update();
}

window.requestAnimationFrame(() => {
  fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,USD-EUR,BRL-EUR,GBP-EUR,USD-GBP,BRL-GBP,EUR-GBP,BRL-USD,EUR-USD,GBP-USD"
  )
    .then((res) => res.json())
    .then((data) => {
      let dados = data;

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            dados.USDBRL.code + " - Dólar",
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

      var ctx2 = document.getElementById("myChart2").getContext("2d");
      var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["A","B","C","D"],
          datasets: [
            {
              id:1,
              label: "Variação - Alta",
              data: [1,23,15,12],
              backgroundColor: [
                "rgba(99, 132, 255, 1)",  
                  
              ],
              borderColor: [
                "rgba(99, 132, 255, 1)",
                ,
               
              ],
              borderWidth: 1,
            },
            {
              id:2,
              label: "Variação - Baixa",
              data: [2,21,14,11],
              backgroundColor: [
                
                "rgba(255, 99, 132, 1)",
                
              ],
              borderColor: [
                
                "rgba(255, 99, 132, 1)"
               
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });

      let btnConverte = document.querySelector("button");
      var moedasConversao;

      btnConverte.addEventListener("click", () => {
        moedasConversao = "";
        limpaSecao();
        exibicaoMoeda();
        moedaSelecionada();
      });

      function limpaSecao() {
        let limpaSection = document.querySelectorAll(".exibicao>section");
        limpaSection.forEach((secao) => {
          secao.innerHTML = "";
        });
        let limpaTitulo = document.querySelector(".exibicao>h4");
        if (limpaTitulo != null) {
          limpaTitulo.remove();
        }
      }

      function exibicaoMoeda() {
        const exibeMoeda = Array.from(
          document.querySelectorAll(".exibicao>section")
        );
        exibeMoeda.forEach((secaoMoeda) => {
          secaoMoeda.innerHTML = "";
          adicionaNomeValor(secaoMoeda);
        });

        function adicionaNomeValor(secaoMoeda) {
          var nomeMoeda = document.createElement("p");
          var valorMoeda = document.createElement("p");
          secaoMoeda.append(nomeMoeda);
          secaoMoeda.append(valorMoeda);
        }
      }

      function moedaSelecionada() {
        let selecaoMoeda = Array.from(document.querySelectorAll("select"));
        selecaoMoeda.forEach((moedaEscolhida) => {
          let moedaBase =
            moedaEscolhida.options[moedaEscolhida.selectedIndex].text;
          comparaMoeda(moedaBase);
        });

        function comparaMoeda(moedaSelec) {
          switch (moedaSelec) {
            case "Dólar":
              moedasConversao += "USD";
              break;
            case "Libra":
              moedasConversao += "GBP";
              break;
            case "Euro":
              moedasConversao += "EUR";
              break;
            case "Real":
              moedasConversao += "BRL";
              break;
          }
          let secaoExibe = document.querySelector(".exibicao");
          if (moedasConversao.length > 4) {
            let checarMoeda = verificaConversao(moedasConversao);
            if (checarMoeda) {
              secaoExibe.style.visibility = "visible";
              mensagemConversao(
                moedasConversao.substring(0, moedasConversao.length)
              );
            } else {
              window.alert("Solicitação inválida");
              secaoExibe.style.visibility = "hidden";
            }
          }
        }
      }

      function verificaConversao(moeda) {
        let cheque = true;
        if (moeda.substring(0, 2) === moeda.substring(3, 5)) {
          cheque = false;
        }
        return cheque;
      }

      function mensagemConversao(msg) {
        let conversao;
        for (let i in dados) {
          if (i == msg) {
            conversao = dados[i];
          }
        }
        passagemdeValores(conversao, msg);
      }

      function passagemdeValores(conversao, msg) {
        let titulo = document.createElement("h4");
        titulo.innerText = msg.substring(3, 6);
        let exibeTitulo = document.querySelector(".exibicao");
        exibeTitulo.append(titulo);
        let exibeBase = document.querySelector(".base>p");
        let exibeConv = document.querySelector(".convertida>p");
        let quebraLinha = document.createElement("br");
        let quebraLinha2 = document.createElement("br");
        exibeBase.append(conversao.code + " - Baixa ");
        exibeBase.append(quebraLinha2);
        exibeBase.append(conversao.low);
        exibeConv.append(conversao.code + " - Alta ");
        exibeConv.append(quebraLinha);
        exibeConv.append(conversao.high);
        removeData(myChart);
        addData(myChart, conversao.code + " - Baixa", conversao.low);
        addData(myChart, conversao.code + " - Alta", conversao.high);
        criarNovoGrafico();
      }

      function criarNovoGrafico() {
        let solicita = moedasConversao;
        solicita = solicita.substring(0, 3) + "-" + solicita.substring(3, 6);

        fetch(`https://economia.awesomeapi.com.br/json/daily/${solicita}/30`)
          .then((res) => res.json())
          .then((data) => {
           
            /*if (chavesObjeto[j] == "timestamp") {
                  let dia=valoresObjeto[j]
                  dia=parseInt(dia)
                  let diaNovo = new Date(dia)
                  diaNovo=diaNovo.toLocaleString();
                  console.log(diaNovo)}*/

            removeData(myChart2);
            for (let i in data) {
              let extraiObjeto = data[i];
              let chavesObjeto = Object.keys(extraiObjeto);
              console.log(chavesObjeto);
              let valoresObjeto = Object.values(extraiObjeto);
              let valorAlta=0;
              let valorBaixa=0;
              for (let j in chavesObjeto) {
                if (chavesObjeto[j] == "high") {
                  valorAlta=valoresObjeto[j];
                 // addDataLine(myChart2, "Alta - "+solicita.substring(0,3), valoresObjeto[j], 1);
                }
                 if (chavesObjeto[j] == "low") {
                  valorBaixa=valoresObjeto[j]
                  //addDataLine(myChart2, "Baixa - "+solicita.substring(0,3), valoresObjeto[j], 2);
                }
                if(valorAlta !=0 && valorBaixa !=0){
                  addDataLine(myChart2, solicita.substring(0,3), valorAlta, 1, valorBaixa, 2)
                  valorBaixa =0;
                  valorAlta =0;
                }
              }
            }
          })
          .catch((error) => console.log("ERROR", error));
      }
    })

    .catch((error) => console.log("ERROR", error));
});
