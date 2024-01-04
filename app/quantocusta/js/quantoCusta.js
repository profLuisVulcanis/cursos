function consultarProduto(){
    let barcode = document.querySelector(".barcode");
    let produto = document.querySelector(".produto");
    let unidade = document.querySelector(".unidade");
    let valor = document.querySelector(".valor");
    let cod = document.querySelector("#cod").value;

    (
        async()=>{
            let workbook = XLSX.read(await (await fetch("./xlsx/lista.xlsx")).arrayBuffer());
            let sheet_name_list = workbook.SheetNames;
            let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            for (let i = 0; i < xlData.length; i++) {
                if (xlData[i]['id'] === cod) {
                    let valorObtido = xlData[i]['valor'];
                    let valorReal = valorObtido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
                    //Exibir o valor correspondente na div com ID 'teste'
                    barcode.innerHTML = xlData[i]['id']; 
                    produto.innerHTML = xlData[i]['name']; 
                    //unidade.innerHTML = xlData[i]['un']; 
                    valor.innerHTML = valorReal; 
                    setTimeout(function () {
                        window.location.reload();
                    },5000);
                    break;
                }
            }
        }
    )()

}

// Chamar a função quando necessário (por exemplo, ao enviar o formulário)
document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    consultarProduto();
    document.querySelector("#cod").value = "";
});