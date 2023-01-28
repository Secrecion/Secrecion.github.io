var entrada = "pepelepu y tu mama";
var entradaDos= "fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!";

function encriptacion(intro){
    let separar =[];
    let array1=[];
    let stringFinal=""
    separar=intro.split("");
    separar.map(valor=>{
    switch(valor){
        case "a":
            array1.push("ai");
            break;
            case "e":
            array1.push("enter");
            break;
            case "i":
            array1.push("imes");
            break;
            case "o":
            array1.push("ober");
            break;
            case "u":
            array1.push("ufat");
            break;
            default:
            array1.push(valor)
    }
console.log(array1)
    }
    )
    stringFinal=array1.join("")
    console.log(stringFinal)
}

function desencriptacion(intro){
    let separar =[];
    let array1=[];
    let stringFinal=""
    separar=intro.split("ai").join("a").split("enter").join("e").split("imes").join("i").split("ober").join("o").split("ufat").join("u");
    console.log(separar)
}
desencriptacion(entradaDos)

